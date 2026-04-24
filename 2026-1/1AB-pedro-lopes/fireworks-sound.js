// Optional fireworks sound helper.
// To remove it later, delete this file and the matching audio/script tags in index.html.

(function () {
  const fireworksSound = document.getElementById("fireworksSound");

  if (!fireworksSound) {
    return;
  }

  document.addEventListener("click", () => {
    fireworksSound.currentTime = 0;
    fireworksSound.play().catch(() => {});
  });
})();
