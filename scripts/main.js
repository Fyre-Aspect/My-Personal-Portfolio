const cursor = document.querySelector('.cursor');
const navbar = document.getElementById('navbar');

let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const magnitude = Math.sqrt(dx * dx + dy * dy);
  const offsetX = dx / magnitude * -10 || 0;
  const offsetY = dy / magnitude * -10 || 0;

  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.left = `${e.clientX + offsetX}px`;
  dot.style.top = `${e.clientY + offsetY}px`;
  document.getElementById('trail-wrapper').appendChild(dot);

  setTimeout(() => dot.remove(), 500);

  lastX = e.clientX;
  lastY = e.clientY;
dot.style.left = `${e.clientX + offsetX}px`;
dot.style.top = `${e.clientY + offsetY}px`;
dot.style.transform = 'translate(-75%, -35%)';
});



// Click animation
document.addEventListener('click', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
  setTimeout(() => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 150);
});

// Scroll-triggered animation
const elements = document.querySelectorAll('.scroll-animate');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// Hide nav on scroll down
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll) navbar.classList.add('hide');
  else navbar.classList.remove('hide');
  lastScroll = current;
});
const interactiveElements = document.querySelectorAll('a, button, .highlight');

interactiveElements.forEach(el => {
  el.classList.add('interactive-hover');
  el.addEventListener('mouseenter', () => {
    cursor.style.display = 'none';
    document.getElementById('trail-wrapper').style.display = 'none';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.display = 'block';
    document.getElementById('trail-wrapper').style.display = 'block';
  });
});

const themeBtn = document.getElementById('theme-toggle');

function updateThemeIcon() {
  themeBtn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  updateThemeIcon();
});

updateThemeIcon(); // Set on page load



// Optional: track mouse for light-mode glow
document.addEventListener('mousemove', e => {
  
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
  }
);

// === Modal Logic for Temp Sensor Project ===
const seeMoreBtn = document.querySelector('.see-more-temp'); // for temp sensor
const tempModal = document.getElementById('tempModal');
const closeTemp = document.getElementById('closeTemp');

seeMoreBtn.addEventListener('click', () => {
  tempModal.style.display = 'flex';
});

closeTemp.addEventListener('click', () => {
  tempModal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === tempModal) {
    tempModal.style.display = 'none';
  }
});

const calcBtn = document.querySelector('.see-more-tetris');
const calcModal = document.getElementById('tetrisModal');
const closeCalc = document.getElementById('closeTetris');

calcBtn?.addEventListener('click', () => {
  calcModal.style.display = 'flex';
});

closeCalc?.addEventListener('click', () => {
  calcModal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === calcModal) {
    calcModal.style.display = 'none';
  }
});

const uwBtn = document.querySelector('.see-more-uw');
const uwModal = document.getElementById('uwModal');
const closeUw = document.getElementById('closeUw');

uwBtn?.addEventListener('click', () => {
  uwModal.style.display = 'flex';
});

closeUw?.addEventListener('click', () => {
  uwModal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === uwModal) {
    uwModal.style.display = 'none';
  }
});

const kwBtn = document.querySelector('.see-more-kw');
const kwModal = document.getElementById('kwModal');
const closeKw = document.getElementById('closeKw');

kwBtn?.addEventListener('click', () => {
  kwModal.style.display = 'flex';
});

closeKw?.addEventListener('click', () => {
  kwModal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === kwModal) {
    kwModal.style.display = 'none';
  }
});

const gymBtn = document.querySelector('.see-more-gym');
const gymModal = document.getElementById('gymModal');
const closeGym = document.getElementById('closeGym');

gymBtn?.addEventListener('click', () => {
  gymModal.style.display = 'flex';
});

closeGym?.addEventListener('click', () => {
  gymModal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === gymModal) {
    gymModal.style.display = 'none';
  }
});

// Helper to open/close photo popouts
function togglePhotoModal(id, show = true) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = show ? 'flex' : 'none';
    if (show) {
      document.body.classList.add('photo-open');
    } else {
      document.body.classList.remove('photo-open');
    }
  }
}


// Open buttons
document.getElementById('kwPhotosBtn')?.addEventListener('click', () => togglePhotoModal('kwPhotos', true));
document.getElementById('uwPhotosBtn')?.addEventListener('click', () => togglePhotoModal('uwPhotos', true));
document.getElementById('gymPhotosBtn')?.addEventListener('click', () => togglePhotoModal('gymPhotos', true));

// Close buttons inside photo modal
document.querySelectorAll('.close-photo').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    togglePhotoModal(target, false);
  });
});
