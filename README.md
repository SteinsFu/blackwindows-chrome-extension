# Black Windows Chrome Extension

A Chrome extension that opens black fullscreen windows on all monitors except the current one.

## How to Install

1. Open Chrome and go to `chrome://extensions`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked" and select this folder:
   ```
   path/to/blackwindows-chrome-extension
   ```
4. The extension icon will appear in your toolbar

## How to Use

Click the extension icon to open a popup with two buttons:
- **Open Black Windows**: Closes any existing black windows, then opens fullscreen black windows on all monitors except the one you're currently using
- **Close Black Windows**: Closes all black windows

## Features

- **Auto-detection**: Automatically detects all connected monitors and opens one black window per monitor (excluding the current one)
- **Auto-close on startup**: Black windows are automatically closed when Chrome starts up, preventing them from being restored after PC restart
- **Smart window management**: Opening black windows automatically closes any existing ones first

## Files

- `manifest.json` — Manifest v3 configuration
- `background.js` — Service worker that manages black windows across monitors
- `black.html` — Simple page that displays a black fullscreen window
- `popup.html` / `popup.css` / `popup.js` — Popup UI for controlling the extension
- `icon.png` — Extension icon

## Permissions

- `windows` — Required to create and manage browser windows
- `system.display` — Required to detect monitor configuration and positions

