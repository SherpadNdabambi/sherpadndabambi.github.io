document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
});

function initTypewriter(): void {
  const textElement = document.getElementById("typewriter-text");
  if (!textElement) return;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    textElement.textContent = "A software engineer.";
    return;
  }

  const phrases: string[] = [
    "A software engineer.",
    "A problem solver."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseAfterType = 2200;
  const pauseAfterDelete = 400;

  // Clear pre-rendered text for animated start
  textElement.textContent = "";

  function tick(): void {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textElement.textContent = currentPhrase.substring(0, charIndex);

    let nextDelay: number = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      nextDelay = pauseAfterType;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      nextDelay = pauseAfterDelete;
    }

    setTimeout(tick, nextDelay);
  }

  // Begin typing first phrase
  setTimeout(tick, 500);
}
