#pragma once
#include <ctime>
#include <cstdint>

namespace cat_flap {
// End is exclusive. Equal hours explicitly disable the schedule.
constexpr bool night_hour(unsigned hour, unsigned start, unsigned end) {
  return hour < 24 && start < 24 && end < 24 && start != end &&
    (start < end ? hour >= start && hour < end : hour >= start || hour < end);
}
static_assert(night_hour(22, 22, 6) && night_hour(0, 22, 6) && night_hour(5, 22, 6));
static_assert(!night_hour(21, 22, 6) && !night_hour(6, 22, 6));
static_assert(night_hour(12, 9, 17) && !night_hour(17, 9, 17));
static_assert(!night_hour(23, 6, 6));

// Convert the next LOCAL end time to an absolute deadline. mktime handles
// calendar rollover and DST; adding a fixed eight hours would not.
inline uint32_t night_sleep_ms(std::time_t now, unsigned end) {
  if (end >= 24) return 0;
  const auto *local = std::localtime(&now);
  if (!local) return 0;
  std::tm target = *local;
  target.tm_hour = end;
  target.tm_min = 0;
  target.tm_sec = 0;
  target.tm_isdst = -1;
  auto until = std::mktime(&target);
  if (until <= now) {
    target = *std::localtime(&now);
    target.tm_mday++;
    target.tm_hour = end;
    target.tm_min = 0;
    target.tm_sec = 0;
    target.tm_isdst = -1;
    until = std::mktime(&target);
  }
  const auto seconds = std::difftime(until, now);
  // Reject impossible clocks/deadlines instead of sleeping indefinitely.
  return seconds > 0 && seconds <= 25 * 3600 ? uint32_t(seconds) * 1000UL : 0;
}
}  // namespace cat_flap
