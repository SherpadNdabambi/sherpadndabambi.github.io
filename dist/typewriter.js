document.addEventListener("DOMContentLoaded", function () {
    initTypewriter();
});
function initTypewriter() {
    var textElement = document.getElementById("typewriter-text");
    if (!textElement)
        return;
    // Respect prefers-reduced-motion
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        textElement.textContent = "A software engineer.";
        return;
    }
    var phrases = [
        "A software engineer.",
        "A problem solver."
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 100;
    var deleteSpeed = 50;
    var pauseAfterType = 2200;
    var pauseAfterDelete = 400;
    // Clear pre-rendered text for animated start
    textElement.textContent = "";
    function tick() {
        var currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            charIndex--;
        }
        else {
            charIndex++;
        }
        textElement.textContent = currentPhrase.substring(0, charIndex);
        var nextDelay = isDeleting ? deleteSpeed : typeSpeed;
        if (!isDeleting && charIndex === currentPhrase.length) {
            nextDelay = pauseAfterType;
            isDeleting = true;
        }
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            nextDelay = pauseAfterDelete;
        }
        setTimeout(tick, nextDelay);
    }
    // Begin typing first phrase
    setTimeout(tick, 500);
}
