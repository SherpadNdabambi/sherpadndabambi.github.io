document.addEventListener("DOMContentLoaded", function () {
    initHamburgerMenu();
});
function initHamburgerMenu() {
    var toggle = document.getElementById("hamburger-toggle");
    var nav = document.getElementById("primary-navigation");
    if (!toggle || !nav)
        return;
    function setMenuState(open) {
        toggle.setAttribute("aria-expanded", String(open));
        if (open) {
            nav.classList.add("is-open");
            toggle.classList.add("is-open");
        }
        else {
            nav.classList.remove("is-open");
            toggle.classList.remove("is-open");
        }
    }
    // Hamburger click toggles the menu
    toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = toggle.getAttribute("aria-expanded") === "true";
        setMenuState(!isOpen);
    });
    // Clicking a navigation link closes the menu
    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setMenuState(false);
        });
    });
    // Clicking outside both side drawer and toggle button closes an open menu
    document.addEventListener("click", function (e) {
        var target = e.target;
        if (toggle.getAttribute("aria-expanded") === "true") {
            if (!nav.contains(target) && !toggle.contains(target)) {
                setMenuState(false);
            }
        }
    });
    // Pressing Escape while menu is open closes it and returns focus to toggle button
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            setMenuState(false);
            toggle.focus();
        }
    });
    // Resizing to >= 769px resets the menu state to closed
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 769 && toggle.getAttribute("aria-expanded") === "true") {
            setMenuState(false);
        }
    });
}
