(() => {
  if (window.lucide) lucide.createIcons();

  document.querySelectorAll('[data-placeholder="linkedin"]').forEach((el) => {
    el.addEventListener('click', (e) => e.preventDefault());
    el.title = 'LinkedIn URL to be added';
  });

  const header = document.querySelector('.site-header');
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];

  const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-42% 0px -50% 0px', threshold: 0 });
  sections.forEach((section) => observer.observe(section));

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.section .reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%', once: true } }
      );
    });
    gsap.to('.hero-cambridge', { yPercent: 5, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.hero-vancouver', { yPercent: 4, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top top', end: 'bottom top', scrub: 1 } });
  }

  if (window.Lenis && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const target = a.getAttribute('href');
        if (!target || target === '#') return;
        const el = document.querySelector(target);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -62, duration: 1.15 });
      });
    });
  }
})();
