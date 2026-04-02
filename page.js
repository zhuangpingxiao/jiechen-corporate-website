document.addEventListener('DOMContentLoaded', () => {
  // Header scroll state
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.getElementById('mobileOverlay');

  function closeMenu() {
    menuToggle && menuToggle.classList.remove('active');
    navLinks && navLinks.classList.remove('open');
    overlay && overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  function openMenu() {
    menuToggle && menuToggle.classList.add('active');
    navLinks && navLinks.classList.add('open');
    overlay && overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  if (overlay) overlay.addEventListener('click', closeMenu);
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }

  // Scroll reveal refined
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .page-hero');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => observer.observe(el));

});
