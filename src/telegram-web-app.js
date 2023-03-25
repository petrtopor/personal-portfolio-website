document.addEventListener('DOMContentLoaded', function () {
  const existingPlatformInfo = document.getElementById('platform-info');

  if (!existingPlatformInfo) {
    const platformInfo = document.createElement('div');
    platformInfo.id = 'platform-info';
    document.body.appendChild(platformInfo);

    if (window.Telegram && window.Telegram.WebApp) {
      platformInfo.textContent = `Platform: ${window.Telegram.WebApp.platform}`;
    } else {
      platformInfo.textContent = 'Platform information not available.';
    }
  }
});
