# Your cat's photo

One optional image is shared by the overview and reliable opening notifications. No firmware change is needed.

1. Install the updated dashboard resource (see [LOCALIZATION.md](LOCALIZATION.md)).
2. Create a Text helper named `Smart Cat Flap cat photo`, entity ID `input_text.smart_cat_flap_cat_photo`, maximum length 255. Alternatively use `reliable-opening-helper.yaml`; do not create the same helper twice.
3. Select **Your cat → Choose photo** to open the phone image picker or PC file dialog. The browser resizes to a maximum of 1600 pixels and uploads a JPEG without the original metadata to Home Assistant, then saves its path. Input files may be up to 25 MB and must be decodable by the browser (JPEG/PNG recommended). Upload requires a Home Assistant administrator and local media.
4. Alternatively use **Add or change photo** to enter an existing path such as `/media/local/cat.jpg`, an HTTPS image URL or `/local/cat.jpg`, then **Save photo**. Leave empty to restore the illustration.
5. Update the existing opening automation from `reliable-opening-automation.yaml`, retaining your phone target and installation variables. Its `cat_photo_entity` must match the helper. It conditionally adds `data.image`; journal acknowledgement and duplicate suppression are unchanged. If overriding `cat_photo_entity` in the card, override it in the automation too.

Local Media uses authenticated access; the dashboard obtains a temporary signed image URL. Files under `/local/` are publicly accessible to anyone who can reach that HA address. The phone must be able to reach your Home Assistant address to download local attachments, including away from home.

With no image configured, notifications remain text-only. Verify the first real opening notification after adding your image. The dashboard does not identify a cat from its photo.

Reference: [Home Assistant Companion notification attachments](https://companion.home-assistant.io/docs/notifications/notification-attachments/).
