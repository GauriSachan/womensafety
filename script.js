// Side Panel Toggle
function toggleSidePanel() {
  const panel = document.getElementById("sidePanel");
  if (panel.style.width === "250px") {
    panel.style.width = "0";
  } else {
    panel.style.width = "250px";
  }
}

// Fade effect for hero text on scroll
window.addEventListener("scroll", () => {
  const heroText = document.querySelector(".hero h1");
  const scrollPos = window.scrollY;
  heroText.style.opacity = 1 - scrollPos / 300;
  heroText.style.transform = `translateY(-${scrollPos / 3}px)`;
});
