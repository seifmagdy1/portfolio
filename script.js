document.documentElement.classList.add('js');
/* ================================================================
   SEIF MAGDE PORTFOLIO — script.js  (ENHANCED)
   GSAP ScrollTrigger · Custom cursor · Magnetic buttons
   Card spotlight · Ripple · Tilt · Page transitions
   ================================================================ */

/* ——— EmailJS config (from inline window.PORTFOLIO_CONFIG) ——— */
const CONTACT_EMAIL  = 'seifmagde40@gmail.com';
const cfg            = window.PORTFOLIO_CONFIG || {};
const EMAILJS_SID    = cfg.serviceId  || '';
const EMAILJS_TID    = cfg.templateId || '';
const EMAILJS_KEY    = cfg.publicKey  || '';
const EMAILJS_READY  = Boolean(EMAILJS_SID && EMAILJS_TID && EMAILJS_KEY && window.emailjs);
if (EMAILJS_READY) emailjs.init({ publicKey: EMAILJS_KEY });

/* ================================================================
   TOUCH DETECTION
   ================================================================ */
const isTouchDevice = () => window.matchMedia('(pointer:coarse)').matches;
if (isTouchDevice()) document.body.classList.add('touch-device');

/* ================================================================
   PRELOADER
   ================================================================ */
const preloader = document.getElementById('preloader');
let preloaderClosed = false;

function showContentSafely() {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
}

function closePreloader() {
  if (preloaderClosed) return;
  preloaderClosed = true;
  preloader?.classList.add('hidden');
  showContentSafely();
  _heroEntrance();
}

window.addEventListener('load', () => {
  setTimeout(() => {
    closePreloader();
  }, 1800);
});

// Fallback: if load is delayed for any reason, don't keep content hidden.
setTimeout(closePreloader, 2800);

/* ================================================================
   GSAP — load from CDN, then init everything
   ================================================================ */
function loadScript(src, cb) {
  const s = document.createElement('script');
  s.src = src; s.onload = cb;
  document.head.appendChild(s);
}

loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  () => loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
    _initGSAP
  )
);

/* ================================================================
   GSAP INIT
   ================================================================ */
function _initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  /* Global defaults */
  gsap.defaults({ ease: 'power3.out', duration: 0.75 });

  /* ── Section headings ───────────────────────────────────── */
  gsap.utils.toArray('.section-head').forEach(head => {
    gsap.from(head.querySelector('.eyebrow'), {
      scrollTrigger: { trigger: head, start: 'top 85%' },
      opacity: 0, y: 20, duration: 0.5
    });
    gsap.from(head.querySelector('h2'), {
      scrollTrigger: { trigger: head, start: 'top 80%' },
      opacity: 0, y: 30, duration: 0.65, delay: 0.1
    });
    gsap.from(head.querySelector('.section-line'), {
      scrollTrigger: { trigger: head, start: 'top 78%' },
      scaleX: 0, transformOrigin: 'left', duration: 0.55, delay: 0.25
    });
  });

  /* ── Cards stagger ──────────────────────────────────────── */
  gsap.utils.toArray('.grid').forEach(grid => {
    const cards = grid.querySelectorAll('.card');
    gsap.from(cards, {
      scrollTrigger: { trigger: grid, start: 'top 82%' },
      opacity: 0, y: 40, scale: 0.96,
      stagger: 0.1, duration: 0.7
    });
  });

  /* ── Skills icon grid ───────────────────────────────────── */
  gsap.utils.toArray('.skill-group').forEach(group => {
    const items = group.querySelectorAll('.skill-item');
    gsap.from(items, {
      scrollTrigger: { trigger: group, start: 'top 85%' },
      opacity: 0, y: 24, scale: 0.85,
      stagger: 0.06, duration: 0.5, ease: 'back.out(1.7)'
    });
  });

  /* ── About section ──────────────────────────────────────── */
  const aboutPhoto = document.querySelector('.about-photo-wrap');
  if (aboutPhoto) {
    gsap.from(aboutPhoto, {
      scrollTrigger: { trigger: aboutPhoto, start: 'top 80%' },
      opacity: 0, x: -50, duration: 0.8
    });
  }
  const aboutText = document.querySelector('.about-text');
  if (aboutText) {
    gsap.from(aboutText.children, {
      scrollTrigger: { trigger: aboutText, start: 'top 80%' },
      opacity: 0, x: 40, stagger: 0.1, duration: 0.65
    });
  }

  /* ── Education items ────────────────────────────────────── */
  gsap.utils.toArray('.edu-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 85%' },
      opacity: 0, x: i % 2 === 0 ? -30 : 30, duration: 0.7
    });
  });

  /* ── Contact grid ───────────────────────────────────────── */
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) {
    gsap.from(contactInfo.children, {
      scrollTrigger: { trigger: contactInfo, start: 'top 80%' },
      opacity: 0, x: -30, stagger: 0.12, duration: 0.65
    });
  }
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    gsap.from(contactForm, {
      scrollTrigger: { trigger: contactForm, start: 'top 80%' },
      opacity: 0, x: 30, duration: 0.65
    });
  }

  /* ── Footer ─────────────────────────────────────────────── */
  gsap.from('.footer-quran', {
    scrollTrigger: { trigger: '.footer', start: 'top 90%' },
    opacity: 0, y: 30, duration: 0.8
  });

  /* ── Parallax on hero photo ──────────────────────────────── */
  const photoWrapper = document.querySelector('.photo-wrapper');
  if (photoWrapper) {
    gsap.to(photoWrapper, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 60, ease: 'none'
    });
  }

  /* ── Navbar progress bar ─────────────────────────────────── */
  _initProgressBar();
}

/* ================================================================
   HERO ENTRANCE (runs after preloader)
   ================================================================ */
function _heroEntrance() {
  if (typeof gsap === 'undefined') {
    // Fallback if GSAP hasn't loaded yet
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl
    .from('.terminal-bar',  { opacity: 0, y: 20, duration: 0.5 })
    .from('.greeting',      { opacity: 0, y: 20, duration: 0.45 }, '-=0.2')
    .from('.name-first',    { opacity: 0, y: 30, duration: 0.55 }, '-=0.2')
    .from('.name-role',     { opacity: 0, y: 30, duration: 0.55 }, '-=0.35')
    .from('.role-line',     { opacity: 0, y: 16, duration: 0.4  }, '-=0.2')
    .from('.tagline-block', { opacity: 0, x: -20, duration: 0.5 }, '-=0.2')
    .from('.hero-btns .btn',{ opacity: 0, y: 16, stagger: 0.12,
                              duration: 0.45, ease: 'back.out(1.6)' }, '-=0.15')
    .from('.socials .social-btn', {
      opacity: 0, scale: 0.5, stagger: 0.08,
      duration: 0.4, ease: 'back.out(2)'
    }, '-=0.25')
    .from('.photo-wrapper', { opacity: 0, scale: 0.9, duration: 0.7, ease: 'power4.out' }, '-=0.5')
    .from('.code-card',     { opacity: 0, y: 20, duration: 0.5 }, '-=0.4')
    .from('.particle',      { opacity: 0, scale: 0, stagger: 0.06, duration: 0.3 }, '-=0.3');
}

/* ================================================================
   SCROLL PROGRESS BAR
   ================================================================ */
function _initProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'progress-bar';
  Object.assign(bar.style, {
    position: 'fixed', top: '0', left: '0', height: '2px',
    background: 'linear-gradient(90deg,#7c3aed,#a78bfa)',
    zIndex: '9999', width: '0%',
    transition: 'width 0.1s linear',
    pointerEvents: 'none'
  });
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ================================================================
   CUSTOM CURSOR
   ================================================================ */
if (!isTouchDevice()) {
  const dot  = document.createElement('div'); dot.id  = 'cursor-dot';
  const ring = document.createElement('div'); ring.id = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Dot follows immediately; ring lerps
  function animCursor() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // Hover states
  const hoverEls = 'a,button,.card,.skill-item,.social-btn,.edu-tag,.contact-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) ring.classList.remove('hovering');
  });
  document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(0.6)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });
}

/* ================================================================
   CARD SPOTLIGHT (mouse-tracking gradient)
   ================================================================ */
document.querySelectorAll('.card,.edu-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top ) / rect.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

/* ================================================================
   MAGNETIC BUTTONS
   ================================================================ */
if (!isTouchDevice()) {
  document.querySelectorAll('.btn-primary,.btn-secondary,.social-btn,.back-top').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width  / 2;
      const dy = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ================================================================
   RIPPLE EFFECT
   ================================================================ */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = document.createElement('span');
    r.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top  - size/2}px;
    `;
    btn.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  });
});

/* ================================================================
   LANGUAGE TOGGLE
   ================================================================ */
let currentLang = 'en';
const html      = document.documentElement;
const langBtn   = document.getElementById('langToggle');
const langLabel = document.getElementById('langLabel');
const rolesEN   = ['Frontend Developer','React Specialist','.NET Engineer','UI Craftsman'];
const rolesAR   = ['مطوّر واجهات أمامية','متخصص React','مهندس .NET','صانع تجارب رقمية'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function applyLanguage(lang) {
  currentLang = lang;
  html.lang   = lang;
  html.dir    = lang === 'ar' ? 'rtl' : 'ltr';
  if (langLabel) langLabel.textContent = lang === 'ar' ? 'EN' : 'AR';
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-en]').forEach(el => {
    const t = el.getAttribute(`data-${lang}`);
    if (t) el.textContent = t;
  });
  charIdx = 0; deleting = false;
}
applyLanguage(localStorage.getItem('lang') || 'en');
langBtn?.addEventListener('click', () => {
  // Flip with a quick scale animation
  langBtn.style.transform = 'scale(0.8)';
  setTimeout(() => { langBtn.style.transform = ''; }, 150);
  applyLanguage(currentLang === 'en' ? 'ar' : 'en');
});

/* ================================================================
   DARK / LIGHT MODE
   ================================================================ */
const themeBtn  = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (!themeBtn || !themeIcon) return;
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  themeBtn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}
applyTheme(localStorage.getItem('theme') || 'dark');
themeBtn?.addEventListener('click', () => {
  const cur = html.getAttribute('data-theme');
  // Spin the icon
  themeIcon.style.transform = 'rotate(360deg)';
  themeIcon.style.transition = 'transform 0.4s ease';
  setTimeout(() => { themeIcon.style.transform = ''; themeIcon.style.transition = ''; }, 400);
  applyTheme(cur === 'dark' ? 'light' : 'dark');
});

/* ================================================================
   TYPEWRITER
   ================================================================ */
function typeWriter() {
  if (!typeEl) return;
  const roles   = currentLang === 'ar' ? rolesAR : rolesEN;
  const current = roles[roleIdx % roles.length];
  typeEl.textContent = deleting
    ? current.slice(0, --charIdx)
    : current.slice(0, ++charIdx);
  if (!deleting && charIdx === current.length) {
    deleting = true; setTimeout(typeWriter, 1800); return;
  }
  if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
  }
  setTimeout(typeWriter, deleting ? 48 : 88);
}
typeWriter();

/* ================================================================
   REVEAL ON SCROLL (IntersectionObserver fallback)
   ================================================================ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ================================================================
   ACTIVE NAV
   ================================================================ */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.getAttribute('id');
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  });
}, { threshold: 0.38 });
sections.forEach(s => navObs.observe(s));

/* ================================================================
   NAVBAR SCROLL STYLE
   ================================================================ */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ================================================================
   BACK TO TOP
   ================================================================ */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop?.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ================================================================
   SMOOTH SCROLL
   ================================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ================================================================
   SECTION WATERMARK NUMBERS
   ================================================================ */
const sectionNums = ['01','02','03','04','05','06','07','08'];
document.querySelectorAll('main section[id]').forEach((sec, i) => {
  sec.setAttribute('data-num', sectionNums[i] || '');
});

/* ================================================================
   CONTACT FORM
   ================================================================ */
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (form && submitBtn && formStatus) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name    = document.getElementById('from_name')?.value.trim() || '';
    const email   = document.getElementById('reply_to')?.value.trim()  || '';
    const subject = document.getElementById('subject')?.value.trim()   || '';
    const message = document.getElementById('message')?.value.trim()   || '';

    if (!name || !email || !subject || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.className   = 'form-status error';
      // Shake animation
      form.style.animation = 'none';
      form.offsetHeight;
      form.style.animation = 'shake 0.4s ease';
      return;
    }

    const btnSpan = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('i');
    if (btnSpan) btnSpan.textContent = 'Sending...';
    if (btnIcon) btnIcon.className   = 'fa-solid fa-spinner fa-spin';
    submitBtn.disabled     = true;
    formStatus.textContent = '';
    formStatus.className   = 'form-status';

    try {
      if (!EMAILJS_READY) throw new Error('EmailJS not configured');
      await emailjs.send(EMAILJS_SID, EMAILJS_TID, {
        from_name: name, reply_to: email, subject, message,
        to_email: CONTACT_EMAIL,
      });
      formStatus.textContent         = '✓ Message sent successfully!';
      formStatus.className           = 'form-status success';
      if (btnSpan) btnSpan.textContent = 'Sent!';
      if (btnIcon) btnIcon.className  = 'fa-solid fa-check';
      submitBtn.style.background      = '#16a34a';
      form.reset();
      setTimeout(() => {
        if (btnSpan) btnSpan.textContent = 'Send Message';
        if (btnIcon) btnIcon.className   = 'fa-solid fa-paper-plane';
        submitBtn.disabled               = false;
        submitBtn.style.background       = '';
        formStatus.textContent           = '';
        formStatus.className             = 'form-status';
      }, 3500);
    } catch (err) {
      console.error('[EmailJS]', err);
      formStatus.textContent = `Send failed: ${err?.message || 'Unknown error'}`;
      formStatus.className   = 'form-status error';
      if (btnSpan) btnSpan.textContent = 'Send Message';
      if (btnIcon) btnIcon.className   = 'fa-solid fa-paper-plane';
      submitBtn.disabled = false;
    }
  });
}

/* shake keyframe — injected via JS */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-8px)}
  40%{transform:translateX(8px)}
  60%{transform:translateX(-5px)}
  80%{transform:translateX(5px)}
}`;
document.head.appendChild(shakeStyle);
