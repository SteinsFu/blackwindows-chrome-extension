document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');

  openBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openWindows' }, () => {
      window.close();
    });
  });

  closeBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'closeWindows' }, () => {
      window.close();
    });
  });
});
