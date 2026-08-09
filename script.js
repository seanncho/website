// Cache DOM elements
const menu = document.querySelector(".menu-links");
const icon = document.querySelector(".hamburger-icon");

// Open the menu when the hamburger icon is clicked
function toggleMenu() {
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Close the menu when a link is clicked
document.addEventListener("click", (event) => {
  const target = event.target;
  if (!menu.contains(target) && !icon.contains(target)) {
    menu.classList.remove("open");
    icon.classList.remove("open");
  }
});

// Staggered scroll reveal: tags pop in left-to-right when scrolled into view
const STAGGER_MS = 120;
const GRID_SELECTOR =
  ".cert-grid, .skill-grid, .project-grid, .contact-grid, .book-grid";

function getGridColumnCount(grid) {
  const columns = getComputedStyle(grid).gridTemplateColumns
    .split(" ")
    .filter((col) => col.trim().length > 0);
  return Math.max(columns.length, 1);
}

function setStaggerDelays() {
  document.querySelectorAll(GRID_SELECTOR).forEach((grid) => {
    const columns = getGridColumnCount(grid);

    grid.querySelectorAll(":scope > .tag").forEach((tag, index) => {
      // Redundancy removed: simplified delay calculation since we know the grid is selected via GRID_SELECTOR
      const delay = (index % columns) * STAGGER_MS; 
      tag.style.setProperty("--stagger-delay", `${delay}ms`);
    });
  });
}

function isVisible(element) {
  const rect = element.getBoundingClientRect();
  const viewHeight = window.innerHeight;
  return rect.top < viewHeight * 0.8 && rect.bottom > viewHeight * 0.05;
}

function updateReveal() {
  document.querySelectorAll(".tag").forEach((tag) => {
    const visible = isVisible(tag);
     if (visible) {
      tag.classList.remove("fade-out");
      tag.classList.add("revealed");
    } 
    else if (tag.classList.contains("revealed")) {
      tag.classList.remove("revealed");
      tag.classList.add("fade-out");
    }
  });
}

setStaggerDelays();
window.addEventListener("scroll", updateReveal, { passive: true });
window.addEventListener("resize", () => {
  setStaggerDelays();
  updateReveal();
});
updateReveal();