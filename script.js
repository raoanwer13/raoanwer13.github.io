const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  navigation?.classList.toggle("open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton?.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuButton?.focus();
  }
});

const desktopNavigation = window.matchMedia("(min-width: 861px)");

function closeMenuAtDesktop(event) {
  if (event.matches) {
    closeMenu();
  }
}

if (typeof desktopNavigation.addEventListener === "function") {
  desktopNavigation.addEventListener("change", closeMenuAtDesktop);
} else {
  desktopNavigation.addListener(closeMenuAtDesktop);
}

const filterButtons = document.querySelectorAll("[data-filter]");
const publicationRows = document.querySelectorAll(".publication-row[data-year]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    publicationRows.forEach((publication) => {
      publication.hidden =
        selectedFilter !== "all" && publication.dataset.year !== selectedFilter;
    });
  });
});

const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}
