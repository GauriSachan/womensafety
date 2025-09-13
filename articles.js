let slideIndex = 0;
const slides = document.querySelectorAll(".video-slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.style.display = (i === n) ? "block" : "none";
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Auto-play like Instagram Stories
setInterval(nextSlide, 8000);

// Initialize
showSlide(slideIndex);
