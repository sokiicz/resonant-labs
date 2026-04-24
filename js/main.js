/* ============================================
   RESONANT STUDIO — Main JavaScript
   Built entirely with Claude Code
   ============================================ */

document.documentElement.classList.add('js-ready');

/* ============================================
   APP DATA + BLOG POST DATA
   Loaded from js/site-data.js — edit that file.
   ============================================ */
const APPS      = (window.SITE_DATA && window.SITE_DATA.apps) || [];
const BLOG_POSTS = (window.SITE_DATA && window.SITE_DATA.posts) || [];
const LIVE_APPS  = APPS.filter(a => a.status === 'live').sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
const WIP_APPS   = APPS.filter(a => a.status === 'wip');

/* ============================================
   RENDER: APP CARDS
   ============================================ */
function renderAppCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = LIVE_APPS.map((app, i) => {
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
      <article class="app-card fade-in fade-in-delay-${delay}" data-tags="${app.tags.map(t => t.toLowerCase()).join(',')}">
        <div class="app-card-preview">
          ${previewHtml}
        </div>
        <div class="app-card-body">
          <div class="app-card-meta">
            <span class="app-release-date">${app.releaseDate}</span>
          </div>
          <h3 class="app-card-title"><a href="${app.detailUrl}">${app.name}</a></h3>
          <p class="app-card-desc">${app.shortDesc}</p>
          <div class="app-card-tags">
            ${app.tags.map(t => `<button class="tag tag-filter-btn" onclick="filterAppsByTag('${t}')">${t}</button>`).join('')}
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
   RENDER: ACTIVITY TICKER
   ============================================ */
function renderActivityTicker(containerId) {
  const viewport = document.getElementById(containerId);
  if (!viewport) return;

  // Collect updates from public apps only, newest first
  const all = [];
  APPS.filter(a => a.status !== 'hidden').forEach(app => {
    (app.updates || []).forEach(u => {
      all.push({
        date: u.date,
        label: u.label || u.note,
        name: app.name,
        emoji: app.emoji,
      });
    });
  });
  all.sort((a, b) => b.date.localeCompare(a.date));
  const recent = all.slice(0, 10);
  if (!recent.length) {
    viewport.closest('.ticker-strip')?.remove();
    return;
  }

  // Duplicate for seamless infinite horizontal loop
  const items = [...recent, ...recent];
  const track = document.createElement('div');
  track.className = 'ticker-track';
  track.innerHTML = items.map(u => `
    <span class="ticker-item">
      <span class="ticker-emoji" aria-hidden="true">${u.emoji}</span>
      <span class="ticker-app">${u.name}</span>
      <span class="ticker-sep">—</span>
      <span class="ticker-label">${u.label}</span>
      <span class="ticker-date">${u.date}</span>
    </span>`).join('');
  viewport.appendChild(track);

  // ~3s per item, min 20s
  track.style.animationDuration = `${Math.max(recent.length * 5, 35)}s`;
}

/* ============================================
   RENDER: APP CHANGELOG (sidebar)
   ============================================ */
function renderAppUpdateLog() {
  document.querySelectorAll('[data-changelog-id]').forEach(el => {
    const app = APPS.find(a => a.id === el.dataset.changelogId);
    if (!app || !app.updates || !app.updates.length) return;
    const updates = [...app.updates].reverse();
    el.innerHTML = `
      <h4 class="sidebar-card-title">Changelog</h4>
      <ul class="app-update-list">
        ${updates.map(u => `
          <li class="app-update-entry">
            <span class="app-update-date">${u.date}</span>
            <span class="app-update-text">${u.note}</span>
          </li>`).join('')}
      </ul>`;
  });
}

/* ============================================
   RENDER: WIP SECTION
   ============================================ */
function renderWipSection(containerId) {
  if (WIP_APPS.length === 0) {
    section.style.display = 'none';
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = WIP_APPS.map((app, i) => {
    const delay = (i % 3) + 1;

    const previewHtml = app.image
      ? `<img src="${app.image}" alt="${app.name} screenshot" loading="lazy" /><div class="app-card-preview-overlay" style="background:linear-gradient(135deg,${app.gradientFrom},${app.gradientTo});"></div>`
      : `<div class="app-card-preview-gradient" style="background:linear-gradient(135deg,${app.gradientFrom},${app.gradientTo});"></div><span class="app-card-emoji">${app.emoji}</span>`;

    const titleHtml = app.detailUrl
      ? `<a href="${app.detailUrl}">${app.name}</a>`
      : app.name;

    const latestUpdate = app.updates && app.updates.length
      ? app.updates[app.updates.length - 1]
      : null;

    const updateHtml = latestUpdate
      ? `<p class="app-update-note"><span class="app-update-dot"></span>${latestUpdate.note}</p>`
      : '';

    const githubStyle = !app.githubUrl ? 'style="opacity:0.38;pointer-events:none;"' : '';
    const githubAttrs = app.githubUrl ? 'target="_blank" rel="noopener"' : '';
    const githubHref  = app.githubUrl || '#';

    return `
      <article class="app-card fade-in fade-in-delay-${delay}" data-tags="${app.tags.map(t => t.toLowerCase()).join(',')}">
        <div class="app-card-preview">
          ${previewHtml}
          <span class="wip-card-badge">In Progress</span>
        </div>
        <div class="app-card-body">
          <div class="app-card-meta">
            <span class="app-release-date">Coming soon</span>
          </div>
          <h3 class="app-card-title">${titleHtml}</h3>
          <p class="app-card-desc">${app.shortDesc}</p>
          ${updateHtml}
          <div class="app-card-tags">
            ${app.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="app-card-actions">
            <a href="#" class="btn-live" style="opacity:0.38;pointer-events:none;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>
              Coming Soon
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
function blogCardHTML(post, i, delay) {
  return `
    <article class="blog-card fade-in fade-in-delay-${delay || (i + 1)}" data-category="${(post.tag || '').toLowerCase()}">
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
    </article>`;
}

function renderBlogPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  // Show only the 3 most recent posts on the main page
  container.innerHTML = BLOG_POSTS.slice(0, 3).map((post, i) => blogCardHTML(post, i)).join('');
}

function renderBlogAll(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = BLOG_POSTS.map((post, i) => blogCardHTML(post, i)).join('');
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
   APP TAG FILTER (clicking a tag on a card filters the tab)
   ============================================ */
const TAG_TO_TAB = {
  'Web App': 'tab-web', 'Maps': 'tab-web', 'Music': 'tab-web', 'Interactive': 'tab-web', 'Community': 'tab-web',
  'Windows': 'tab-desktop', 'Desktop': 'tab-desktop', 'Utility': 'tab-desktop',
};
function filterAppsByTag(tag) {
  const tabId = TAG_TO_TAB[tag];
  if (!tabId) return;
  const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (btn) btn.click();
  document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  const pageId = thread.dataset.pageId || '';
  if (!appId || !pageId) return;
  if (!thread.dataset.pageUrl) thread.dataset.pageUrl = window.location.href;
  if (!thread.dataset.pageTitle) thread.dataset.pageTitle = document.title;

  thread.style.display = 'none';
  const container = thread.parentNode;

  // Check if visitor has accepted functional cookies via ConsentKit
  function hasFunctionalConsent() {
    try {
      const record = JSON.parse(localStorage.getItem('ck_consent') || '{}');
      return !!(record.choices && record.choices.functional === true);
    } catch { return false; }
  }

  // --- Comment list (rendered from Cusdis public API — plain JSON, no iframe) ---
  const listEl = document.createElement('div');
  listEl.className = 'cusdis-comment-list';
  listEl.innerHTML = '<p class="cusdis-loading">Loading comments…</p>';
  container.insertBefore(listEl, thread);

  // --- Pending approval note ---
  const pending = document.createElement('div');
  pending.className = 'comments-pending-note';
  pending.style.display = 'none';
  pending.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg> Comments are reviewed before appearing — yours will show up after approval.';
  container.insertBefore(pending, thread);

  // Fetch approved comments from Cusdis public API
  fetch(`https://cusdis.com/api/open/comments?appId=${encodeURIComponent(appId)}&pageId=${encodeURIComponent(pageId)}`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(data => {
      const comments = data?.data?.data || [];
      listEl.innerHTML = '';
      if (comments.length === 0) {
        listEl.innerHTML = '<p class="cusdis-no-comments">No comments yet — be the first.</p>';
      } else {
        comments.forEach(c => {
          const el = document.createElement('div');
          el.className = 'cusdis-comment-item';
          const meta = document.createElement('div');
          meta.className = 'cusdis-comment-meta';
          const name = document.createElement('strong');
          name.textContent = c.by_nickname || 'Anonymous';
          const date = document.createElement('time');
          date.textContent = new Date(c.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
          meta.append(name, document.createTextNode(' · '), date);
          const body = document.createElement('p');
          body.textContent = c.content;
          el.append(meta, body);
          listEl.appendChild(el);
        });
      }
    })
    .catch(() => { listEl.innerHTML = ''; });

  // --- Write area: button if consent granted, soft note if not ---
  let writeEl = null;
  let loaded = false;

  function renderWriteArea() {
    if (writeEl) { writeEl.remove(); writeEl = null; }
    if (loaded) return;

    if (hasFunctionalConsent()) {
      const btn = document.createElement('button');
      btn.className = 'comments-toggle-btn';
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> Write a comment';
      btn.addEventListener('click', () => {
        if (!loaded) {
          loaded = true;
          listEl.remove();
          btn.remove();
          writeEl = null;
          pending.style.display = '';
          thread.style.display = '';
          const s = document.createElement('script');
          s.src = 'https://cusdis.com/js/cusdis.es.js';
          s.async = true;
          document.body.appendChild(s);
        }
      });
      writeEl = btn;
    } else {
      const note = document.createElement('p');
      note.className = 'cusdis-consent-note';
      note.innerHTML = 'Want to leave a comment? Accept <strong>functional cookies</strong> using the cookie settings button.';
      writeEl = note;
    }
    container.insertBefore(writeEl, thread);
  }

  renderWriteArea();

  // Re-evaluate if the visitor updates their consent preferences
  window.addEventListener('storage', (e) => {
    if (e.key === 'ck_consent') renderWriteArea();
  });
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
/* ============================================
   LIGHTBOX (app detail page images)
   ============================================ */
function initLightbox() {
  const imgs = document.querySelectorAll('.app-preview-container img');
  if (!imgs.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="App screenshot enlarged" />';
  document.body.appendChild(overlay);

  const lb = overlay.querySelector('img');

  function open(src) {
    lb.src = src;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  imgs.forEach(img => img.addEventListener('click', () => open(img.src)));
  overlay.addEventListener('click', (e) => { if (e.target !== lb) close(); });
  overlay.querySelector('.lightbox-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

function initBgAmbient() {
  if (document.getElementById('bg-orb-1')) return;
  // 8 orbs spread across the full document height — absolute, not fixed.
  // User scrolls through them; they stay at their spots in the page.
  const orbs = [
    { top: '2%',  left: '-8vw',  w: '44vw', color: 'rgba(34,211,238,0.28)',  anim: 'orbDrift1', dur: '8s',  delay: '0s'  },
    { top: '13%', right: '-6vw', w: '34vw', color: 'rgba(139,92,246,0.26)', anim: 'orbDrift2', dur: '11s', delay: '-4s' },
    { top: '25%', left: '28vw',  w: '22vw', color: 'rgba(139,92,246,0.20)', anim: 'orbDrift3', dur: '14s', delay: '-7s' },
    { top: '38%', right: '4vw',  w: '30vw', color: 'rgba(34,211,238,0.22)', anim: 'orbDrift1', dur: '9s',  delay: '-3s' },
    { top: '52%', left: '-4vw',  w: '38vw', color: 'rgba(139,92,246,0.24)', anim: 'orbDrift2', dur: '12s', delay: '-6s' },
    { top: '65%', left: '38vw',  w: '20vw', color: 'rgba(34,211,238,0.18)', anim: 'orbDrift3', dur: '10s', delay: '-2s' },
    { top: '78%', right: '-7vw', w: '32vw', color: 'rgba(139,92,246,0.22)', anim: 'orbDrift1', dur: '13s', delay: '-5s' },
    { top: '91%', left: '12vw',  w: '26vw', color: 'rgba(34,211,238,0.20)', anim: 'orbDrift2', dur: '7s',  delay: '-1s' },
  ];
  orbs.forEach((o, i) => {
    const el = document.createElement('div');
    el.id = 'bg-orb-' + (i + 1);
    el.className = 'bg-orb';
    el.style.cssText = `
      width:${o.w}; height:${o.w};
      background:radial-gradient(circle,${o.color} 0%,transparent 65%);
      top:${o.top};
      ${o.left  ? 'left:'  + o.left  + ';' : ''}
      ${o.right ? 'right:' + o.right + ';' : ''}
      animation:${o.anim} ${o.dur} ease-in-out infinite;
      animation-delay:${o.delay};
    `;
    document.body.appendChild(el);
  });
}

function populateDynamicStats() {
  // Total apps built (live + wip, excludes hidden)
  const appsTotalEl = document.getElementById('stat-apps-total');
  if (appsTotalEl) appsTotalEl.textContent = LIVE_APPS.length + WIP_APPS.length;

  // Apps in progress
  const inProgressEl = document.getElementById('stat-in-progress');
  if (inProgressEl) inProgressEl.textContent = WIP_APPS.length;

  // Code lines written (last 7 days) — from code-stats.js
  const codeLinesEl = document.getElementById('stat-code-lines');
  if (codeLinesEl) {
    const n = (window.CODE_STATS && window.CODE_STATS.lines7d) || 0;
    codeLinesEl.textContent = n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n;
  }

  // Apps released this month
  const releasedMonthEl = document.getElementById('stat-released-month');
  if (releasedMonthEl) {
    const now = new Date();
    const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const count = LIVE_APPS.filter(a => (a.releaseDate || '').startsWith(ym)).length;
    releasedMonthEl.textContent = count;
  }
}

/* ============================================
   DRAGGABLE CONSENTKIT REOPENER
   - Draggable via mouse and touch
   - Drag below 85% of viewport to hide for the session
   - Session persistence via sessionStorage
   - Shows a drag hint on first appearance
   ============================================ */
function initDraggableCookieWidget() {
  const SESSION_KEY = 'ck-reopener-hidden';

  const observer = new MutationObserver(() => {
    const host = document.getElementById('consentkit-reopener');
    if (!host || !host.shadowRoot) return;
    observer.disconnect();

    // If hidden this session, instantly hide and bail
    if (sessionStorage.getItem(SESSION_KEY)) {
      host.style.display = 'none';
      return;
    }

    requestAnimationFrame(() => {
      const btn = host.shadowRoot.querySelector('.ck-reopener');
      if (!btn) return;

      // Convert bottom/left to top/left for drag math
      btn.style.bottom = 'auto';
      btn.style.top = (window.innerHeight - 20 - 42) + 'px';
      btn.style.cursor = 'grab';
      btn.style.touchAction = 'none';

      // Inject visual indicator styles into shadow DOM
      const indicatorStyle = document.createElement('style');
      indicatorStyle.textContent = `
        @keyframes ck-nudge { 0%,100%{transform:translateY(0)} 40%{transform:translateY(6px)} 60%{transform:translateY(3px)} }
        .ck-reopener.nudge { animation: ck-nudge 0.7s ease 0.6s 2; }
        .ck-reopener { transition: opacity 0.2s, box-shadow 0.2s; }
        .ck-reopener.fading { opacity: 0.25; box-shadow: none; }
      `;
      host.shadowRoot.appendChild(indicatorStyle);

      // Brief downward nudge animation hints the widget is draggable
      btn.classList.add('nudge');
      btn.addEventListener('animationend', () => btn.classList.remove('nudge'), { once: true });

      let dragging = false, hasMoved = false, startX, startY;

      function hideWidget() {
        sessionStorage.setItem(SESSION_KEY, '1');
        host.style.display = 'none';
      }

      function onDown(e) {
        dragging = true;
        hasMoved = false;
        const rect = btn.getBoundingClientRect();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;
        startX = cx - rect.left;
        startY = cy - rect.top;
        btn.style.cursor = 'grabbing';
        btn.style.transition = 'none';
        e.preventDefault();
      }

      function onMove(e) {
        if (!dragging) return;
        hasMoved = true;
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;
        btn.style.left = (cx - startX) + 'px';
        btn.style.top  = (cy - startY) + 'px';
        // Fade out as it nears the hide threshold
        const rect = btn.getBoundingClientRect();
        btn.classList.toggle('fading', rect.top > window.innerHeight * 0.7);
        e.preventDefault();
      }

      function onUp() {
        if (!dragging) return;
        dragging = false;
        btn.style.cursor = 'grab';
        btn.classList.remove('fading');
        if (hasMoved) {
          btn.addEventListener('click', ev => ev.stopPropagation(), { once: true, capture: true });
          const rect = btn.getBoundingClientRect();
          if (rect.top > window.innerHeight * 0.85) {
            hideWidget();
          }
        }
        hasMoved = false;
      }

      btn.addEventListener('mousedown', onDown);
      btn.addEventListener('touchstart', onDown, { passive: false });
      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchend', onUp);
    });
  });

  observer.observe(document.body, { childList: true });
}

document.addEventListener('DOMContentLoaded', () => {
  renderActivityTicker('activity-ticker');
  populateDynamicStats();
  renderAppCards('apps-grid');
  renderWipSection('wip-grid');
  renderAppUpdateLog();
  renderBlogPreview('blog-preview-grid');
  renderBlogAll('all-posts-grid');
  initNav();
  initTabs();
  initCounters();
  initShareButtons();
  initCusdis();
  initReadingProgress();
  initNewsletter();
  initLightbox();
  initBgAmbient();
  initDraggableCookieWidget();
  requestAnimationFrame(() => observeFadeIns());
});
