async function fetchPhrases(elementId, jsonFile, interval) {
  try {
    console.log(`fetchPhrases(elementId: ${elementId}, jsonFile: ${jsonFile}, interval: ${interval})`)
    const response = await fetch(jsonFile);
    const phrases = await response.json();

    if (!phrases) throw new Error(`Phrases not found for key: ${jsonFile}`);

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
  fetchPhrases("dynamicPhrase", "https://nestjs-backend-service.onrender.com/phrases/subheader", 4000);
  fetchPhrases("footerPhrase", "https://nestjs-backend-service.onrender.com/phrases/footer", 3000);
});
