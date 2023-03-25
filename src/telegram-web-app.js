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
  createTextElement('platform-info', `Platform: ${window.Telegram.WebApp.platform}`, 'Platform information not available.');

  const fetchDataButton = document.getElementById('fetchDataButton');

  fetchDataButton.addEventListener('click', async () => {
    const response = await fetch('https://a917-5-76-59-196.eu.ngrok.io');
    const data = await response.text();
    fetchDataButton.textContent = data;
  });
});
