document.addEventListener("DOMContentLoaded", function () {
  initFilterButtons();
});

function initFilterButtons() {
  filterSelection("*");
  const filterButtons: NodeListOf<HTMLElement> =
    document.querySelectorAll(".filter-button");
  filterButtons.forEach((filterButton: HTMLElement) => {
    filterButton.onclick = () =>
      filterSelection(filterButton.getAttribute("data-filter"));
  });
}

function filterSelection(filter: string) {
  const activeButton: HTMLElement = document.querySelector(".filter-active"),
    clickedButton: HTMLElement = document.querySelector(
      ".filter-button[data-filter='" + filter + "']"
    ),
    filterItems: NodeListOf<HTMLElement> =
      document.querySelectorAll(".filter-item");
  if (filter === "*") {
    filterItems.forEach((item: HTMLElement) => {
      item.style.display = "block";
    });
  } else {
    filterItems.forEach((item: HTMLElement) => {
      if (item.getAttribute("filter-categories")?.includes(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  activeButton.classList.toggle("filter-active");
  clickedButton.classList.toggle("filter-active");
}
