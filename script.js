// --- DARK MODE ---
const toggle = document.getElementById('themeSwitch');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Acessibilidade com teclado
toggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggle.click();
  }
});

// Carregar tema salvo
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// --- MODAL DE IMAGENS ---
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const closeBtn = document.getElementById("modal-close");
const nextBtn = document.getElementById("modal-next");
const prevBtn = document.getElementById("modal-prev");
const galleryImages = document.querySelectorAll(".gallery img");

let currentIndex = 0;

// Abrir modal
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    openModal(img);
  });
});

function openModal(img) {
  modal.style.display = "block";
  modalImg.src = img.getAttribute("data-full");
  modalCaption.textContent = img.alt;
}

// Fechar modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Navegar
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  openModal(galleryImages[currentIndex]);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  openModal(galleryImages[currentIndex]);
});

// Teclado
window.addEventListener("keydown", (e) => {
  if (modal.style.display === "block") {
    if (e.key === "ArrowRight") {
      nextBtn.click();
    } else if (e.key === "ArrowLeft") {
      prevBtn.click();
    } else if (e.key === "Escape") {
      closeBtn.click();
    }
  }
});

