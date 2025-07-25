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
