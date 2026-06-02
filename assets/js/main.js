/* =====================================================
   RESEARCHPULSE — MAIN JS
   Shared interactions, sidebar toggle, tabs, modals
   ===================================================== */

// ---- Sidebar Toggle ----
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('#sidebar-toggle');
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
}

// ---- Active nav link ----
document.querySelectorAll('.nav-link, .sidebar-item').forEach(link => {
  if (link.href && link.href === window.location.href) link.classList.add('active');
});

// ---- Tabs ----
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabGroup = btn.closest('[data-tabs]');
    if (!tabGroup) return;
    tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    tabGroup.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.querySelector(btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ---- Modal open/close ----
document.querySelectorAll('[data-modal-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.querySelector(btn.dataset.modalOpen);
    if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  });
});
document.querySelectorAll('[data-modal-close], .modal-overlay').forEach(el => {
  el.addEventListener('click', (e) => {
    if (el.classList.contains('modal-overlay') && e.target !== el) return;
    const modal = el.closest('.modal-overlay') || document.querySelector(el.dataset.modalClose);
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
  });
});

// ---- Dropdown toggle ----
document.querySelectorAll('[data-dropdown]').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = document.querySelector(trigger.dataset.dropdown);
    if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
});

// ---- Scroll: nav background ----
const publicNav = document.querySelector('.public-nav');
if (publicNav) {
  window.addEventListener('scroll', () => {
    publicNav.style.background = window.scrollY > 40
      ? 'rgba(11,13,17,0.95)' : 'rgba(11,13,17,0.8)';
  });
}

// ---- Animate on scroll (simple) ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeIn');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.feature-card, .step, .stat-card, .card, .journal-card, .article-card, .project-card').forEach(el => {
  observer.observe(el);
});

// ---- Tag remove ----
document.querySelectorAll('.tag-remove').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.tag').remove());
});

// ---- Password toggle ----
document.querySelectorAll('[data-password-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.querySelector(btn.dataset.passwordToggle);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.textContent = input.type === 'password' ? '👁️' : '🙈';
  });
});

// ---- Counter animation ----
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}
document.querySelectorAll('[data-count]').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounter(el); obs.disconnect(); }
  });
  obs.observe(el);
});

// ---- Search suggestions demo ----
const searchSuggestions = ['LLM', 'RAG', 'Transformer', 'Computer Vision', 'Reinforcement Learning', 'BERT', 'GPT', 'Diffusion Models', 'Graph Neural Networks'];
const heroSearch = document.querySelector('#hero-search');
const suggBox = document.querySelector('#hero-suggestions');
if (heroSearch && suggBox) {
  heroSearch.addEventListener('input', () => {
    const val = heroSearch.value.trim().toLowerCase();
    if (!val) { suggBox.style.display = 'none'; return; }
    const matches = searchSuggestions.filter(s => s.toLowerCase().includes(val));
    if (matches.length === 0) { suggBox.style.display = 'none'; return; }
    suggBox.innerHTML = matches.map(m => `<div class="dropdown-item" onclick="document.querySelector('#hero-search').value='${m}';document.querySelector('#hero-suggestions').style.display='none'">${m}</div>`).join('');
    suggBox.style.display = 'block';
  });
  document.addEventListener('click', e => { if (!heroSearch.contains(e.target)) suggBox.style.display = 'none'; });
}

console.log('%cResearchPulse FE loaded ✨', 'color:#00d4ff;font-weight:bold;font-size:14px');
