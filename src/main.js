document.addEventListener("DOMContentLoaded", () => {
  const phrasesElement = document.getElementById("dynamicPhrase");
  const delay = 3000;

  const fetchPhrases = async() => {
    try {
      const response = await fetch("phrases.json");
      const phrasesJson = await response.json();
      const phrases = phrasesJson['phrases']
      let index = 0;

      setInterval(() => {
        phrasesElement.textContent = phrases[index];
        index = (index + 1) % phrases.length;
      }, delay);
    } catch (error) {
      console.error("Ошибка при загрузке фраз:", error);
    }
  }

  fetchPhrases();
});
