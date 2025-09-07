document.addEventListener("DOMContentLoaded", function () {
    initFilterButtons();
});
function initFilterButtons() {
    filterSelection("*");
    var filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach(function (filterButton) {
        filterButton.onclick = function () {
            return filterSelection(filterButton.getAttribute("data-filter"));
        };
    });
}
function filterSelection(filter) {
    var activeButton = document.querySelector(".filter-button-active"), clickedButton = document.querySelector(".filter-button[data-filter='" + filter + "']"), filterItems = document.querySelectorAll(".filter-item");
    if (filter === "*") {
        filterItems.forEach(function (item) {
            item.style.display = "block";
        });
    }
    else {
        filterItems.forEach(function (item) {
            var _a;
            if ((_a = item.getAttribute("filter-categories")) === null || _a === void 0 ? void 0 : _a.includes(filter)) {
                item.style.display = "block";
            }
            else {
                item.style.display = "none";
            }
        });
    }
    activeButton.classList.toggle("filter-button-active");
    clickedButton.classList.toggle("filter-button-active");
}
