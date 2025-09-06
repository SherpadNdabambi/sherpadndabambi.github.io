document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementsByTagName("header")[0],
    topButton = document.getElementsByClassName("top-button")[0];
  const scrollThreshold = 1;

  window.addEventListener("scroll", function () {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
      topButton.classList.add("active");
    } else {
      header.classList.remove("scrolled");
      topButton.classList.remove("active");
    }
  });
});
