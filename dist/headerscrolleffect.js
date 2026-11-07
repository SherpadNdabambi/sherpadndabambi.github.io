document.addEventListener("DOMContentLoaded", function () {
    initHeaderScrollEffect();
});
function initHeaderScrollEffect() {
    var header = document.getElementsByTagName("header")[0], topButton = document.getElementById("top-button");
    var scrollThreshold = 1;
    window.addEventListener("scroll", function () {
        if (window.scrollY > scrollThreshold) {
            header.classList.add("scrolled");
            topButton.classList.add("active");
        }
        else {
            header.classList.remove("scrolled");
            topButton.classList.remove("active");
        }
    });
}
