# WhatsApp Opener Extension

Simple Chrome extension to open selected phone numbers in WhatsApp Web.

## Installation

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** (toggle in the top right corner).
3. Click **Load unpacked** (top left).
4. Select the `whatsapp_opener` folder containing this README.
   - Path: `c:/Users/dvir4/Desktop/playgound/chrome_extension/whatsapp_opener`

## Usage

1. Go to any website (e.g., yad2.co.il).
2. Select a phone number with your mouse.
3. Right-click the selection.
4. Click **Open in WhatsApp** in the context menu.
5. A new tab will open with the WhatsApp chat for that number.

## Manual Verification

- **Test Israeli Mobile**: Select `052-1234567` -> Should open `wa.me/972521234567`.
- **Test No Separators**: Select `0521234567` -> Should open `wa.me/972521234567`.
- **Test Partial**: Select `52-1234567` -> Should open `wa.me/972521234567`.
