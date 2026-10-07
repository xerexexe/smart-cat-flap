#pragma once
#include <array>
#include <cstdint>
#include <cstdio>
#include <cstring>
#include <string>
#include "esphome/core/preferences.h"
#include "esp_random.h"

namespace cat_flap {
struct OpeningRecord {
  uint32_t sequence{0};
  uint32_t timestamp{0}; // Zero explicitly means the event clock was not synchronized.
  uint8_t direction{0};
  uint8_t test{0};
  uint8_t reserved[2]{};
};
struct JournalData {
  uint32_t version{1};
  uint32_t generation{0};
  uint32_t next_sequence{1};
  uint32_t overflow{0};
  uint16_t head{0};
  uint16_t size{0};
  std::array<OpeningRecord, 256> records{};
  constexpr bool push(uint8_t direction, bool test, uint32_t timestamp) {
    if (size == records.size() || next_sequence == UINT32_MAX) { ++overflow; return false; }
    records[(head + size) % records.size()] = {next_sequence++, timestamp, direction, uint8_t(test), {}};
    ++size;
    return true;
  }
  constexpr bool pop(uint32_t sequence) {
    if (!size || records[head].sequence != sequence) return false;
    head = (head + 1) % records.size();
    --size;
    return true;
  }
};
// Compile-time regression checks exercise FIFO order, overflow and stale acknowledgements.
constexpr bool journal_checks() {
  JournalData data;
  if (!data.push(1, false, 123) || !data.push(2, true, 124)) return false;
  if (data.pop(2) || !data.pop(1) || data.pop(1)) return false;
  if (data.records[data.head].direction != 2 || data.records[data.head].timestamp != 124) return false;
  if (!data.pop(2)) return false;
  for (unsigned i = 0; i < 256; ++i) if (!data.push(1, false, 0)) return false;
  return !data.push(2, false, 0) && data.size == 256 && data.overflow == 1;
}
static_assert(journal_checks(), "Opening journal FIFO/overflow checks failed");

class EventJournal {
 public:
  void begin() {
    if (initialized_) return;
    initialized_ = true;
    preference_ = esphome::global_preferences->make_preference<JournalData>(0x43464A01);
    JournalData loaded;
    if (preference_.load(&loaded)) {
      if (loaded.version != 1 || loaded.size > 256 || loaded.head >= 256 || loaded.generation == 0 || loaded.next_sequence == 0) {
        storage_error_ = true;
        blocked_ = true; // Do not silently overwrite an incompatible/corrupt journal.
        return;
      }
      data_ = loaded;
    } else {
      data_.generation = esp_random();
      if (!data_.generation) data_.generation = 1;
      persist();
    }
  }
  bool append(uint8_t direction, bool test, uint32_t timestamp) {
    begin();
    if (blocked_) return false;
    const bool accepted = data_.push(direction, test, timestamp);
    persist(); // Persist before the first transmission; failed writes keep the RAM copy.
    return accepted && !storage_error_;
  }
  bool acknowledge(const std::string &event_id) {
    begin();
    if (blocked_ || !data_.size || event_id != front_id()) return false;
    const JournalData before = data_;
    data_.pop(data_.records[data_.head].sequence);
    if (!persist()) { data_ = before; return false; }
    return true;
  }
  bool persist() {
    if (blocked_) return false;
    const bool saved = preference_.save(&data_);
    const bool synced = saved && esphome::global_preferences->sync();
    storage_error_ = !synced;
    return synced;
  }
  uint16_t size() const { return data_.size; }
  uint32_t overflow() const { return data_.overflow; }
  bool storage_error() const { return storage_error_; }
  const OpeningRecord &front() const { return data_.records[data_.head]; }
  std::string front_id() const {
    if (!data_.size) return "";
    char value[32];
    std::snprintf(value, sizeof(value), "%08lx:%lu", (unsigned long) data_.generation,
                  (unsigned long) front().sequence);
    return value;
  }
 private:
  JournalData data_{};
  esphome::ESPPreferenceObject preference_;
  bool initialized_{false};
  bool storage_error_{false};
  bool blocked_{false};
};
} // namespace cat_flap
