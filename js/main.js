/* ============================================
   RESONANT STUDIO — Main JavaScript
   Built entirely with Claude Code
   ============================================ */

document.documentElement.classList.add('js-ready');

/* ============================================
   APP DATA
   ============================================ */
const APPS = [
  {
    id: 'music-mouse',
    name: 'Music Mouse',
    shortDesc: 'An interactive musical canvas inspired by Laurie Spiegel\'s 1986 classic. Move your mouse — make music. No keyboard, no notes, no rules.',
    tags: ['Web App', 'Music', 'Interactive'],
    emoji: '\uD83C\uDFB5',
    image: 'Media/Music-mouse.png',
    gradientFrom: '#8b5cf6',
    gradientTo: '#22d3ee',
    liveUrl: null,
    liveLabel: null,
    githubUrl: null,
    detailUrl: 'apps/music-mouse.html',
    releaseDate: '3 Mar 2026',
  },
  {
    id: 'keepawake-pro',
    name: 'KeepAwake Pro',
    shortDesc: 'Keeps your Windows PC awake when you need it. Smart AFK simulation, system tray, scheduled hours, global hotkeys — invisible until needed.',
    tags: ['Windows', 'Utility', 'Desktop'],
    emoji: '\u2615',
    image: 'Media/KeepAwake.png',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
    liveUrl: 'https://github.com/sokiicz/keepawake-pro',
    liveLabel: 'Download',
    githubUrl: 'https://github.com/sokiicz/keepawake-pro',
    detailUrl: 'apps/keepawake-pro.html',
    releaseDate: '12 Feb 2026',
  },
  {
    id: 'spekplatz',
    name: 'SpekPlatz',
    shortDesc: 'A community map for discovering and sharing hidden spots — rooftops, viewpoints, parks, beaches, and more. Find places worth remembering.',
    tags: ['Web App', 'Community', 'Maps'],
    emoji: '\uD83D\uDCCD',
    image: 'Media/Spekplatz.png',
    gradientFrom: '#10b981',
    gradientTo: '#3b82f6',
    liveUrl: 'https://spekplatz.app',
    liveLabel: 'Open App',
    githubUrl: 'https://github.com/sokiicz/SpekPlatz',
    detailUrl: 'apps/spekplatz.html',
    releaseDate: '20 Feb 2026',
  },
];

/* ============================================
   BLOG POST DATA
   ============================================ */
const BLOG_POSTS = [
  {
    id: 'why-ai-not-code',
    title: 'Why I\'m Building Apps with AI Instead of Learning to Code',
    excerpt: 'I\'ve always had ideas. What I lacked was the technical ability to bring them to life — until Claude Code changed everything.',
    date: '15 Feb 2026',
    readTime: '5 min read',
    tag: 'Thoughts',
    tagClass: 'badge-primary',
    gradientFrom: '#8b5cf6',
    gradientTo: '#22d3ee',
    url: 'blog/why-ai-not-code.html',
  },
  {
    id: 'art-of-prompting',
    title: 'The Art of Prompting: How I Describe My Vision to Claude',
    excerpt: 'Talking to an AI is a skill in itself. Here\'s how I\'ve learned to communicate ideas clearly enough to get exactly what I imagine.',
    date: '22 Feb 2026',
    readTime: '7 min read',
    tag: 'Process',
    tagClass: 'badge-amber',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
    url: 'blog/art-of-prompting.html',
  },
  {
    id: 'open-source-and-ai',
    title: 'Open Source and AI: A New Model for Sharing Software',
    excerpt: 'If an AI wrote every line, should I charge for it? The answer felt obvious — give it all away, and let ideas multiply.',
    date: '28 Jan 2026',
    readTime: '4 min read',
    tag: 'Philosophy',
    tagClass: 'badge-cyan',
    gradientFrom: '#10b981',
    gradientTo: '#3b82f6',
    url: 'blog/open-source-and-ai.html',
  },
];

/* ============================================
   RENDER: APP CARDS
   ============================================ */
function renderAppCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = APPS.map((app, i) => {
    const delay = (i % 3) + 1;

    const previewHtml = app.image
      ? `<img src="${app.image}" alt="${app.name} screenshot" loading="lazy" /><div class="app-card-preview-overlay" style="background:linear-gradient(135deg,${app.gradientFrom},${app.gradientTo});"></div>`
      : `<div class="app-card-preview-gradient" style="background:linear-gradient(135deg,${app.gradientFrom},${app.gradientTo});"></div><span class="app-card-emoji">${app.emoji}</span>`;

    const liveDisabled = !app.liveUrl;
    const liveAttrs = app.liveUrl ? 'target="_blank" rel="noopener"' : '';
    const liveStyle = liveDisabled ? 'style="opacity:0.38;pointer-events:none;"' : '';
    const liveHref = app.liveUrl || '#';
    const liveLabel = liveDisabled ? 'Coming Soon' : (app.liveLabel || 'Live Demo');
    const liveIcon = (app.liveLabel === 'Download')
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'
      : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

    const githubAttrs = app.githubUrl ? 'target="_blank" rel="noopener"' : '';
    const githubStyle = !app.githubUrl ? 'style="opacity:0.38;pointer-events:none;"' : '';
    const githubHref = app.githubUrl || '#';

    return `
      <article class="app-card fade-in fade-in-delay-${delay}">
        <a href="${app.detailUrl}" class="app-card-preview" aria-label="View ${app.name} details">
          ${previewHtml}
        </a>
        <div class="app-card-body">
          <div class="app-card-meta">
            <span class="app-release-date">${app.releaseDate}</span>
          </div>
          <h3 class="app-card-title">${app.name}</h3>
          <p class="app-card-desc">${app.shortDesc}</p>
          <div class="app-card-tags">
            ${app.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="app-card-actions">
            <a href="${liveHref}" class="btn-live" ${liveAttrs} ${liveStyle}>
              ${liveIcon} ${liveLabel}
            </a>
            <a href="${githubHref}" class="btn-github" ${githubAttrs} ${githubStyle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </article>`;
  }).join('');
}

/* ============================================
   RENDER: BLOG PREVIEW
   ============================================ */
function renderBlogPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = BLOG_POSTS.map((post, i) => `
    <article class="blog-card fade-in fade-in-delay-${i + 1}">
      <a href="${post.url}" class="blog-card-cover">
        <div class="blog-card-cover-bg" style="background:linear-gradient(135deg,${post.gradientFrom},${post.gradientTo});opacity:0.85;position:absolute;inset:0;"></div>
        <div class="blog-card-cover-label">
          <span class="badge ${post.tagClass}">${post.tag}</span>
        </div>
      </a>
      <div class="blog-card-body">
        <div class="blog-meta">
          <span>${post.date}</span>
          <span class="blog-meta-dot"></span>
          <span>${post.readTime}</span>
        </div>
        <h3 class="blog-card-title"><a href="${post.url}">${post.title}</a></h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="blog-card-footer">
          <a href="${post.url}" class="read-more">
            Read more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <span class="read-time">${post.readTime}</span>
        </div>
      </div>
    </article>`).join('');
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
let fadeObserver = null;

function observeFadeIns() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    return;
  }
  if (!fadeObserver) {
    fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
  }
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => fadeObserver.observe(el));
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!nav) return;

  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
  nav.classList.toggle('scrolled', window.scrollY > 20);

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ============================================
   ANIMATED COUNTERS
   ============================================ */
function animateCounter(el, target, duration) {
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  if (!('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseFloat(entry.target.dataset.count), parseInt(entry.target.dataset.duration || '1500'));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => observer.observe(el));
}

/* ============================================
   TABS
   ============================================ */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns.length) return;
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const pane = document.getElementById(btn.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });
}

/* ============================================
   SHARE BUTTONS
   ============================================ */
function initShareButtons() {
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.share === 'copy') {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const orig = btn.innerHTML;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.innerHTML = orig; }, 2000);
        }).catch(() => {});
      } else if (btn.dataset.share === 'twitter') {
        window.open('https://x.com/intent/tweet?text=' + encodeURIComponent(document.title + ' — ' + window.location.href), '_blank');
      }
    });
  });
}

/* ============================================
   CUSDIS COMMENTS
   ============================================ */
function initCusdis() {
  const thread = document.getElementById('cusdis_thread');
  if (!thread) return;
  const appId = thread.dataset.appId || '';
  if (!appId || appId === '28a85f51-4564-4fc1-bb33-5dd218c38b0e') {
    thread.innerHTML = `<div class="cusdis-setup-note"><p><strong style="color:var(--text-2)">💬 Comments — almost ready</strong><br><br>Sign up at <a href="https://cusdis.com" target="_blank" rel="noopener">cusdis.com</a>, create a website, then replace <code>28a85f51-4564-4fc1-bb33-5dd218c38b0e</code> in each page.</p></div>`;
    return;
  }
  if (!thread.dataset.pageUrl) thread.dataset.pageUrl = window.location.href;
  if (!thread.dataset.pageTitle) thread.dataset.pageTitle = document.title;
  const s = document.createElement('script');
  s.src = 'https://cusdis.com/js/cusdis.es.js';
  s.async = true; s.defer = true;
  document.body.appendChild(s);
}

/* ============================================
   READING PROGRESS BAR
   ============================================ */
function initReadingProgress() {
  const bar = document.getElementById('reading-progress');
  const article = document.getElementById('article-content');
  if (!bar || !article) return;
  window.addEventListener('scroll', () => {
    const total = article.offsetHeight - window.innerHeight;
    const progress = total > 0 ? Math.max(0, Math.min(100, (-article.getBoundingClientRect().top / total) * 100)) : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ============================================
   NEWSLETTER FORM
   ============================================ */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"]');
    const email = emailInput ? emailInput.value.trim() : '';
    if (!email) return;

    if (btn) { btn.textContent = 'Subscribing...'; btn.disabled = true; }

    // Submit to Buttondown embed endpoint — no API key required
    const data = new FormData();
    data.append('email', email);
    fetch('https://buttondown.email/api/emails/embed-subscribe/ResonantLabs', {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    })
      .then(() => {
        form.innerHTML = '<p style="color:var(--green);font-weight:600;text-align:center;padding:8px 0;">You\'re in! Check your inbox to confirm. 🎉</p>';
      })
      .catch(() => {
        if (btn) { btn.textContent = 'Subscribe'; btn.disabled = false; }
      });
  });
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderAppCards('apps-grid');
  renderBlogPreview('blog-preview-grid');
  initNav();
  initTabs();
  initCounters();
  initShareButtons();
  initCusdis();
  initReadingProgress();
  initNewsletter();
  requestAnimationFrame(() => observeFadeIns());
});
