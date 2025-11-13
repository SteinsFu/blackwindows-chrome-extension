# Black Windows Chrome extension

This is a simple chrome extension that opens black fullscreen windows on other monitors.

How to load locally (Chrome/Edge):

1. Open Chrome and go to chrome://extensions
2. Enable "Developer mode" (top-right)
3. Click "Load unpacked" and select this folder:
   ```
   path/to/blackwindows-chrome-extension
   ```

4. Click the extension icon — the extension will open three small black popup windows.

Files of interest:

- `manifest.json` — manifest v3 entry; uses a background service worker to handle clicks
- `background.js` — service worker that opens three `black.html` windows
- `black.html` / `black.css` — page that renders a full-black window
- `popup.html` / `popup.css` / `popup.js` — previous popup UI (kept in the repo but no longer used)

Notes:

- Permission `windows` is required to create new browser windows. If you want different sizes or types (e.g., `normal` instead of `popup`), I can change the settings in `background.js`.
- I left the original popup files in place in case you want to revert or use them in another action.

