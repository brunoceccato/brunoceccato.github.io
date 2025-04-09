// Dark mode: Alternar tema e salvar preferência
const toggle = document.getElementById('themeSwitch');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
toggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggle.click();
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// Modal da Galeria
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const closeModal = document.getElementById('modal-close');
const nextBtn = document.getElementById('modal-next');
const prevBtn = document.getElementById('modal-prev');
const galleryImages = Array.from(document.querySelectorAll('.gallery img'));
let currentIndex = 0;

function updateModalContent(index) {
  const img = galleryImages[index];
  modalImg.src = img.dataset.full;
  modalCaption.textContent = img.alt;
}

function openModal(index) {
  currentIndex = index;
  updateModalContent(currentIndex);
  modal.style.display = 'flex';
  closeModal.focus();
}

function closeModalFunc() {
  modal.style.display = 'none';
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateModalContent(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateModalContent(currentIndex);
}

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => openModal(index));
});

closeModal.addEventListener('click', closeModalFunc);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Fechar modal com tecla Esc ou setas
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'Escape') {
      closeModalFunc();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  }
});

// Acessibilidade: fechar com Enter ou Espaço no botão fechar
closeModal.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    closeModalFunc();
  }
});

// Fechar ao clicar fora da imagem
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModalFunc();
  }
});
