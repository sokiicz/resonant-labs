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

// If site-data.js failed to load or parse, don't fail silently into an empty
// page — render a visible error in the grid so the outage is obvious.
const DATA_LOAD_FAILED = !window.SITE_DATA || !APPS.length;
const DATA_ERROR_HTML = '<p style="color:var(--text-3);padding:2rem 0;">⚠️ App data failed to load. Please refresh the page — if this persists, the site data file is broken.</p>';

/* Release dates arrive both as "2026-06-19" and as "6 May 2026". new Date()
   on the second form is not reliable across browsers (Safari), so parse both
   by hand. Returns null for anything else. */
const MONTHS = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11 };
function parseSiteDate(s) {
  if (!s) return null;
  let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  m = /^(\d{1,2}) ([A-Za-z]{3})[a-z]* (\d{4})$/.exec(s);
  if (m && MONTHS[m[2].toLowerCase()] !== undefined) return new Date(+m[3], MONTHS[m[2].toLowerCase()], +m[1]);
  return null;
}
const dateValue = s => (parseSiteDate(s) || new Date(0)).getTime();

const LIVE_APPS  = APPS.filter(a => a.status === 'live').sort((a, b) => dateValue(b.releaseDate) - dateValue(a.releaseDate));
const WIP_APPS   = APPS.filter(a => a.status === 'wip');

/* Render one card in isolation. A card built from incomplete app data used to
   throw mid-.map(), which abandoned the whole innerHTML assignment and wiped
   every app off the page. Now a bad entry costs exactly one card. */
function safeCard(app, build) {
  try {
    return build();
  } catch (err) {
    console.error('[site] skipped app card:', (app && app.name) || '<unnamed>', err);
    return '';
  }
}

/* ============================================
   RENDER: APP CARDS
   ============================================ */
function renderAppCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (DATA_LOAD_FAILED) {
    container.innerHTML = DATA_ERROR_HTML;
    return;
  }

  container.innerHTML = LIVE_APPS.map((app, i) => safeCard(app, () => {
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
  })).join('');
}

/* ============================================
   RENDER: ACTIVITY TICKER
   ============================================ */
function renderActivityTicker(containerId) {
  const viewport = document.getElementById(containerId);
  if (!viewport) return;

  // Collect updates from public apps only, newest first. Several updates of one
  // app on the same day become one item, and nothing older than 90 days is
  // shown: a strip labelled "Activity" must not present old news as current.
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const byAppDay = new Map();
  APPS.filter(a => a.status === 'live' || a.status === 'wip').forEach(app => {
    (app.updates || []).forEach(u => {
      if (!u.date || dateValue(u.date) < cutoff) return;
      // Updates are oldest first, so the last one of the day overwrites the rest.
      byAppDay.set(app.id + '|' + u.date, {
        date: u.date,
        label: u.label || u.note,
        name: app.name,
        emoji: app.emoji,
      });
    });
  });
  const all = [...byAppDay.values()];
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
  const container = document.getElementById(containerId);
  if (!container) return;

  if (WIP_APPS.length === 0) {
    const section = container.closest('section');
    if (section) section.style.display = 'none';
    return;
  }

  container.innerHTML = WIP_APPS.map((app, i) => safeCard(app, () => {
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

    // An app in progress can already be open to early users (e.g. Ylaway, by
    // invitation). Then the card links to it instead of saying "Not public yet".
    const earlyAccess = !!app.liveUrl;
    const statusLabel = earlyAccess ? (app.liveLabel || 'Early access') : 'Not public yet';
    const liveButton = earlyAccess
      ? `<a href="${app.liveUrl}" class="btn-live" target="_blank" rel="noopener">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              ${statusLabel}
            </a>`
      : `<a href="#" class="btn-live" style="opacity:0.38;pointer-events:none;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>
              Not public yet
            </a>`;

    return `
      <article class="app-card fade-in fade-in-delay-${delay}" data-tags="${app.tags.map(t => t.toLowerCase()).join(',')}">
        <div class="app-card-preview">
          ${previewHtml}
          <span class="wip-card-badge">${earlyAccess ? 'Early Access' : 'In Progress'}</span>
        </div>
        <div class="app-card-body">
          <div class="app-card-meta">
            <span class="app-release-date">${statusLabel}</span>
          </div>
          <h3 class="app-card-title">${titleHtml}</h3>
          <p class="app-card-desc">${app.shortDesc}</p>
          ${updateHtml}
          <div class="app-card-tags">
            ${app.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="app-card-actions">
            ${liveButton}
            <a href="${githubHref}" class="btn-github" ${githubAttrs} ${githubStyle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </article>`;
  })).join('');
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
  // Count each app once, even if the data lists it twice.
  const uniqueIds = list => new Set(list.map(a => a.id)).size;

  // Total apps built (live + wip, excludes hidden)
  const appsTotalEl = document.getElementById('stat-apps-total');
  if (appsTotalEl) appsTotalEl.textContent = uniqueIds([...LIVE_APPS, ...WIP_APPS]);

  // Apps in progress
  const inProgressEl = document.getElementById('stat-in-progress');
  if (inProgressEl) inProgressEl.textContent = uniqueIds(WIP_APPS);

  // Code lines written (last 7 days) — from code-stats.js. The file is only
  // refreshed when someone uploads it, so an old number would be presented as
  // "last 7 days". If the data is more than 14 days old, hide the stat.
  const codeLinesEl = document.getElementById('stat-code-lines');
  if (codeLinesEl) {
    const stats = window.CODE_STATS;
    const updated = stats && parseSiteDate(stats.updatedAt);
    const fresh = updated && (Date.now() - updated.getTime()) <= 14 * 24 * 60 * 60 * 1000;
    if (fresh) {
      const n = stats.lines7d || 0;
      codeLinesEl.textContent = n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n;
    } else {
      const item = codeLinesEl.closest('.stat-item');
      if (item) item.remove();
      document.querySelector('.stats-grid')?.classList.add('stats-grid-3');
    }
  }

  // Apps released this month
  const releasedMonthEl = document.getElementById('stat-released-month');
  if (releasedMonthEl) {
    const now = new Date();
    const count = new Set(LIVE_APPS.filter(a => {
      const d = parseSiteDate(a.releaseDate);
      return d && d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).map(a => a.id)).size;
    releasedMonthEl.textContent = count;
  }
}

/* ============================================
   COOKIE SETTINGS LINK (footer)
   Withdrawing consent must be as easy as giving it. The floating reopener can
   be dragged away for the session, so every footer also gets a link that
   reopens the ConsentKit preferences.
   ============================================ */
function initCookieSettingsLink() {
  // First footer column ("Explore"): the bottom-right corner is covered by
  // the chatbot button, so the link goes into the list every footer has.
  const list = document.querySelector('footer .footer-col ul');
  if (!list || list.querySelector('.footer-cookie-settings')) return;
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'footer-cookie-settings';
  btn.textContent = 'Cookie settings';
  btn.addEventListener('click', () => {
    if (window.ConsentKit && typeof window.ConsentKit.openPreferences === 'function') {
      window.ConsentKit.openPreferences();
      return;
    }
    // The consent widget did not load (blocked script, network). Do not fail
    // silently: open the privacy page, which explains how to change consent.
    const cfg = window.__consentKitConfig;
    const url = (cfg && cfg.banner && cfg.banner.privacyPolicyUrl) || '/privacy.html';
    window.location.href = url;
  });
  li.appendChild(btn);
  list.appendChild(li);
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
  initReadingProgress();
  initLightbox();
  initBgAmbient();
  initDraggableCookieWidget();
  initCookieSettingsLink();
  requestAnimationFrame(() => observeFadeIns());
});
