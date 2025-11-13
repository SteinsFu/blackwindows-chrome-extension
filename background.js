// background service worker: manage opening/closing black windows (one per monitor)

// Get display information for all monitors
function getDisplayInfo() {
  return new Promise((resolve) => {
    chrome.system.display.getInfo((displays) => {
      resolve(displays);
    });
  });
}

// Find all black windows (windows containing black.html)
function findBlackWindows() {
  return new Promise((resolve) => {
    chrome.windows.getAll({ populate: true }, (windows) => {
      const blackWindows = windows.filter((window) => {
        return window.tabs?.some(tab => 
          tab.url && tab.url.includes('black.html')
        );
      });
      resolve(blackWindows);
    });
  });
}

// Close all black windows
function closeAllBlackWindows() {
  return new Promise(async (resolve) => {
    const blackWindows = await findBlackWindows();
    
    if (blackWindows.length === 0) {
      resolve({ success: true, message: 'no windows to close' });
      return;
    }

    let closedCount = 0;
    const windowsToClose = blackWindows.length;
    
    blackWindows.forEach((window) => {
      chrome.windows.remove(window.id, () => {
        closedCount++;
        if (closedCount === windowsToClose) {
          resolve({ success: true, message: 'windows closed', count: windowsToClose });
        }
      });
    });
  });
}

// Open black windows - one per monitor (except the current monitor)
function openBlackWindows(mousePosition) {
  return new Promise(async (resolve) => {
    // First, close any existing black windows
    await closeAllBlackWindows();

    // Get display information
    getDisplayInfo().then((displays) => {
      let createdCount = 0;
      
      // Find the current display based on mouse position
      const mouseX = mousePosition?.x;
      const mouseY = mousePosition?.y;
      
      const currentDisplay = displays.find(display => {
        return mouseX >= display.bounds.left &&
               mouseX < display.bounds.left + display.bounds.width &&
               mouseY >= display.bounds.top &&
               mouseY < display.bounds.top + display.bounds.height;
      });

      // Filter out the current display
      const otherDisplays = displays.filter(display => display.id !== (currentDisplay?.id));
      const windowsToCreate = otherDisplays.length;

      if (windowsToCreate === 0) {
        resolve({ success: false, message: 'no other monitors available' });
        return;
      }

      otherDisplays.forEach((display) => {
        chrome.windows.create({
          url: chrome.runtime.getURL('black.html'),
          type: 'popup',
          left: display.bounds.left,
          top: display.bounds.top,
          width: display.bounds.width,
          height: display.bounds.height
        }, (window) => {
          if (window) {
            // Maximize the window to fullscreen
            chrome.windows.update(window.id, { state: 'fullscreen' });
            createdCount++;
            if (createdCount === windowsToCreate) {
              resolve({ success: true, message: 'windows opened', count: windowsToCreate });
            }
          }
        });
      });
    });
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openWindows') {
    openBlackWindows(request.mousePosition).then(sendResponse);
    return true; // keep the message channel open for async response
  } else if (request.action === 'closeWindows') {
    closeAllBlackWindows().then(sendResponse);
    return true; // keep the message channel open for async response
  }
});

// Auto-close any black windows when Chrome starts (prevents restoration after PC restart)
chrome.runtime.onStartup.addListener(() => {
  closeAllBlackWindows();
});