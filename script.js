// Tema escuro: alternar e salvar
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

// ------------------
// Modal da galeria
// ------------------
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.getElementById('modal-close');
const modalNext = document.getElementById('modal-next');
const modalPrev = document.getElementById('modal-prev');
const images = document.querySelectorAll('.gallery img');

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = img.dataset.full;
    modalCaption.textContent = img.alt;
    currentIndex = index;
  });
});

function openModal() {
  modal.style.display = 'flex';
  updateModalContent();
}

function updateModalContent() {
  const img = images[currentIndex];
  modalImg.src = img.dataset.full || img.src;
  captionText.textContent = img.alt;
}

// Fechar modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Navegação
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateModalContent();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModalContent();
});

// Fechar com ESC / Navegar com teclado
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      updateModalContent();
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModalContent();
    }
  }
});
