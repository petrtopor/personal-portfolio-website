import './telegram-web-app.scss';

const createTextElement = (elementId, contentText, fallbackText) => {
  const existingPlatformInfo = document.getElementById(elementId);

  if (!existingPlatformInfo) {
    const platformInfo = document.createElement('div');
    platformInfo.id = elementId;
    document.body.appendChild(platformInfo);

    if (window.Telegram && window.Telegram.WebApp) {
      platformInfo.textContent = contentText;
    } else {
      platformInfo.textContent = fallbackText;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  /*
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
  */

  createTextElement('platform-info', `Platform: ${window.Telegram.WebApp.platform}`, 'Platform information not available.')
  createTextElement('text_color', `text_color: ${window.Telegram.WebApp.ThemeParams.text_color}`, 'text_color information not available.')
  createTextElement('bg_color', `bg_color: ${window.Telegram.WebApp.ThemeParams.bg_color}`, 'bg_color information not available.')
});
