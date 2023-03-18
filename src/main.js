async function fetchPhrases(elementId, jsonFile, phrasesKey, interval) {
  try {
    const response = await fetch(jsonFile);
    const data = await response.json();
    const phrases = data[phrasesKey];

    if (!phrases) throw new Error(`Phrases not found for key: ${phrasesKey}`);

    const element = document.getElementById(elementId);
    if (!element) throw new Error(`Element not found for id: ${elementId}`);

    let currentIndex = 0;
    let timer;
    let isPaused = false;

    const updatePhrase = () => {
      element.textContent = phrases[currentIndex];
      currentIndex = (currentIndex + 1) % phrases.length;
    };

    const startInterval = () => {
      timer = setInterval(updatePhrase, interval);
    };

    const stopInterval = () => {
      clearInterval(timer);
    };

    element.addEventListener("click", () => {
      if (isPaused) {
        startInterval();
      } else {
        stopInterval();
      }
      isPaused = !isPaused;
    });

    startInterval();
  } catch (error) {
    console.error(`Error in fetchPhrases: ${error}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchPhrases("dynamicPhrase", "phrases.json", "subheaderPhrases", 4000);
  fetchPhrases("footerPhrase", "phrases.json", "footerPhrases", 3000);
});
