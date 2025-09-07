document.addEventListener("DOMContentLoaded", function () {
  initHeaderScrollEffect();
});

function initHeaderScrollEffect() {
  const header: HTMLElement = document.getElementsByTagName("header")[0],
    topButton: HTMLElement = document.getElementById("top-button");
  const scrollThreshold: number = 1;

  window.addEventListener("scroll", function () {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
      topButton.classList.add("active");
    } else {
      header.classList.remove("scrolled");
      topButton.classList.remove("active");
    }
  });
}
