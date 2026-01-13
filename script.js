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

// Fade in and out elements on scroll
const elementsToFadeInUpOnScroll = document.querySelectorAll(".tag");

function handleScroll() {
  const windowHeight = window.innerHeight;
  elementsToFadeInUpOnScroll.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0;
    
    element.classList.toggle("fade-in-up", isVisible);
    element.classList.toggle("fade-out", !isVisible);
  });
}

// Add scroll event listener
window.addEventListener("scroll", handleScroll);

// Initial check to fade in elements if they are already in the viewport without scrolling
handleScroll();