document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');

  openBtn.addEventListener('click', () => {
    // Get the popup window's position to determine mouse location
    chrome.windows.getCurrent({}, (popupWindow) => {
      // Use the popup position as a proxy for mouse position
      const mouseX = popupWindow.left + (popupWindow.width / 2);
      const mouseY = popupWindow.top + (popupWindow.height / 2);
      
      chrome.runtime.sendMessage({ 
        action: 'openWindows',
        mousePosition: { x: mouseX, y: mouseY }
      }, () => {
        window.close();
      });
    });
  });

  closeBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'closeWindows' }, () => {
      window.close();
    });
  });
});
