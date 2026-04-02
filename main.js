document.addEventListener('DOMContentLoaded', () => {

  // ==================== CAROUSEL ====================
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const total = slides.length;
  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + total) % total;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoplay() { timer = setInterval(next, 5000); }
  function resetAutoplay() { clearInterval(timer); startAutoplay(); }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.index)); resetAutoplay(); });
  });
  startAutoplay();

  // ==================== HEADER SCROLL STATE ====================
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  // ==================== MOBILE MENU ====================
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
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close menu when a nav link is clicked (mobile)
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ==================== SCROLL REVEAL ====================
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .page-hero');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // uncomment if you only want it to animate once
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
  
  revealElements.forEach(el => observer.observe(el));
  const s = document.createElement('style');
  s.textContent = '.revealed{opacity:1!important;transform:translateY(0)!important}';
  document.head.appendChild(s);

});
