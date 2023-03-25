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
};

const createButton = (buttonText, onClickFunction) => {
  const button = document.createElement('button');
  button.textContent = buttonText;
  document.body.appendChild(button);
  button.addEventListener('click', onClickFunction);
};

document.addEventListener('DOMContentLoaded', function () {
  createTextElement(
    'platform-info',
    `Platform: ${window.Telegram.WebApp.platform}`,
    'Platform information not available.'
  );

  createButton('Press me', () => {
    fetch('https://a917-5-76-59-196.eu.ngrok.io')
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        const button = document.querySelector('button');
        button.textContent = data;
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });
});
