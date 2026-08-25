document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
});

function initHamburgerMenu(): void {
  const toggle = document.getElementById("hamburger-toggle") as HTMLButtonElement | null;
  const nav = document.getElementById("primary-navigation") as HTMLElement | null;

  if (!toggle || !nav) return;

  function setMenuState(open: boolean): void {
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      nav.classList.add("is-open");
      toggle.classList.add("is-open");
    } else {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
    }
  }

  // Hamburger click toggles the menu
  toggle.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  // Clicking a navigation link closes the menu
  nav.querySelectorAll("a").forEach((link: HTMLAnchorElement) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  // Clicking outside both side drawer and toggle button closes an open menu
  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as Node;
    if (toggle.getAttribute("aria-expanded") === "true") {
      if (!nav.contains(target) && !toggle.contains(target)) {
        setMenuState(false);
      }
    }
  });

  // Pressing Escape while menu is open closes it and returns focus to toggle button
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
      toggle.focus();
    }
  });

  // Resizing to >= 769px resets the menu state to closed
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 769 && toggle.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
    }
  });
}
