const fetchPhrases = async(elementId, filename, delay = 3000) => {
  const phrasesElement = document.getElementById(elementId);

  try {
    const response = await fetch(filename);
    const phrases = await response.json();
    let index = 0;

    setInterval(() => {
      phrasesElement.textContent = phrases[index];
      index = (index + 1) % phrases.length;
    }, delay);
  } catch (error) {
    console.error("Ошибка при загрузке фраз:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchPhrases("dynamicPhrase", "phrases.json");
});
