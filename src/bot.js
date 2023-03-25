let API_TOKEN;
let API_BASE_URL;

async function sendRequest(method, requestData = {}) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/${method}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function getUpdates(offset, webAppDeepLink) {
  const updates = await sendRequest('getUpdates', { offset, timeout: 30 });

  if (updates && updates.result) {
    for (const update of updates.result) {
      if (update.message && update.message.text && update.message.text.toLowerCase().startsWith('/start')) {
        await sendStartMessage(update.message.chat.id, webAppDeepLink);
      }
      offset = update.update_id + 1;
    }
  }

  setTimeout(() => getUpdates(offset, webAppDeepLink), 1000);
}

async function sendStartMessage(chatId, webAppDeepLink) {
  const inlineKeyboard = {
    inline_keyboard: [
      [
        {
          text: 'Open Web App',
          url: webAppDeepLink,
        },
      ],
    ],
  };

  await sendRequest('sendMessage', {
    chat_id: chatId,
    text: 'Welcome to the bot! Click the button below to access the web app.',
    reply_markup: JSON.stringify(inlineKeyboard),
  });
}

function startBot(apiToken, webAppDeepLink) {
  API_TOKEN = apiToken;
  API_BASE_URL = `https://api.telegram.org/bot${API_TOKEN}`;
  getUpdates(0, webAppDeepLink);
}
