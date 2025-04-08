// Dark mode
const toggle = document.getElementById('themeSwitch');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
toggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggle.click();
  }
});
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// Modal
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const closeModal = document.getElementById("modal-close");
const prevBtn = document.getElementById("modal-prev");
const nextBtn = document.getElementById("modal-next");
const images = document.querySelectorAll(".gallery img");
let currentIndex = 0;

function openModal(index) {
  const img = images[index];
  modal.style.display = "block";
  modalImg.src = img.getAttribute("data-full");
  modalCaption.textContent = img.alt;
  currentIndex = index;
}

images.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

function closeModalFunc() {
  modal.style.display = "none";
}

function showNext(n) {
  currentIndex = (currentIndex + n + images.length) % images.length;
  openModal(currentIndex);
}

closeModal.onclick = closeModalFunc;
nextBtn.onclick = () => showNext(1);
prevBtn.onclick = () => showNext(-1);

document.addEventListener("keydown", e => {
  if (modal.style.display === "block") {
    if (e.key === "Escape") closeModalFunc();
    if (e.key === "ArrowRight") showNext(1);
    if (e.key === "ArrowLeft") showNext(-1);
  }
});
