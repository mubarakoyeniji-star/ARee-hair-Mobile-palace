const services = [
  {
    icon: 'scissors',
    name: 'Signature Fades',
    tier: 'Premium',
    desc: 'Precision skin fades, tapers, and temple fades tailored to your head shape and hair texture.',
    features: ['Skin Fades', 'Tapers', 'Temple Cuts']
  },
  {
    icon: 'wind',
    name: 'Beard Grooming',
    tier: 'Essential',
    desc: 'Sculpting, trimming, and hot towel treatment for a sharp, clean, and healthy beard.',
    features: ['Hot Towel', 'Sculpting', 'Beard Oil']
  },
  {
    icon: 'baby',
    name: "Kids' Royal Cut",
    tier: 'Standard',
    desc: 'Patient and professional grooming for the younger kings in a comfortable home environment.',
    features: ['Kid-Friendly', 'At Home', 'Quick Service']
  },
  {
    icon: 'home',
    name: 'The Palace Home Service',
    tier: 'All-Inclusive',
    desc: 'Our full-suite mobile experience including consultation, cut, and post-trim styling at your location.',
    features: ['Consultation', 'Full Cut', 'Styling']
  }
];

function renderServices() {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = services.map((s, i) => `
    <div class="service-card reveal" style="transition-delay: ${i * 80}ms">
      <div class="flex items-start justify-between mb-6">
        <div class="service-icon">
          <i data-lucide="${s.icon}" class="w-6 h-6 text-white"></i>
        </div>
        <span class="text-[10px] tracking-widest uppercase text-[#778DA9] border border-[#415A77]/50 px-2.5 py-1 rounded-full">${s.tier}</span>
      </div>
      <h3 class="font-serif text-2xl font-bold mb-3">${s.name}</h3>
      <p class="text-sm text-[#E0E1DD]/70 leading-relaxed mb-5">${s.desc}</p>
      <div class="flex flex-wrap gap-2 mb-6">
        ${s.features.map(f => `<span class="text-[11px] bg-[#1B263B] border border-[#415A77]/40 px-2.5 py-1 rounded-full text-[#778DA9]">${f}</span>`).join('')}
      </div>
      <a href="#booking" class="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#778DA9] transition group">
        Book this service
        <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
      </a>
    </div>
  `).join('');
}

function initLucide() {
  if (window.lucide) window.lucide.createIcons();
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initHeroAnimation() {
  if (!window.gsap) return;
  gsap.to('.hero-fade', {
    opacity: 1,
    y: 0,
    duration: 1.1,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.2
  });
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
}

function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('shadow-2xl', 'shadow-black/40');
    } else {
      nav.classList.remove('shadow-2xl', 'shadow-black/40');
    }
  });
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const selectedServices = data.getAll('service');
    const summary = `🪒 *New Booking - Aree Hair Palace*%0A%0A`
      + `*Services:* ${selectedServices.join(', ') || 'Not selected'}%0A`
      + `*Date:* ${data.get('date')}%0A`
      + `*Time:* ${data.get('time')}%0A`
      + `*Area:* ${data.get('area')}%0A`
      + `*Address:* ${data.get('address')}%0A`
      + `*Name:* ${data.get('name')}%0A`
      + `*Phone:* ${data.get('phone')}`;
    window.open(`https://wa.me/2349020802318?text=${summary}`, '_blank');
  });

  const dateInput = form.querySelector('input[name="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  initLucide();
  initReveal();
  initHeroAnimation();
  initMobileMenu();
  initNavbarScroll();
  initBookingForm();
});
