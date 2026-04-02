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

  // Scroll reveal
  const els = document.querySelectorAll('.content-section, .cards-grid, .stat-bar, .cta-block');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
  }, { threshold: 0.1 });
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    obs.observe(el);
  });
  const s = document.createElement('style');
  s.textContent = '.revealed{opacity:1!important;transform:translateY(0)!important}';
  document.head.appendChild(s);
});
