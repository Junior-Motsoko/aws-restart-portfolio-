/*
portfolio.js
───────────────────────────────────────────────────────────────
All logic for the AWS re/Start Portfolio markdown viewer.
Features:
- Loads nav.json and builds dynamic sidebar navigation
- Fetches and renders markdown files using marked.js
- Supports front matter metadata (title, description, tags)
- Syntax highlighting via highlight.js
- GitHub badge resolution (stars, contributors)
- Modal popups for Instructions/Architecture markdown
- PDF preview modal for certificates
- Hash-based routing
- Mobile hamburger menu
*/

// ═══════════════════════════════════════════════════════════
//  Front Matter Parser
// ═══════════════════════════════════════════════════════════

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: raw };

  const metaRaw = match[1];
  const body = raw.slice(match[0].length);
  const meta = {};

  metaRaw.split('\n').forEach(line => {
    const colon = line.indexOf(':');
    if (colon === -1) return;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(t => t.trim()).filter(Boolean);
    }
    meta[key] = val;
  });

  return { meta, body };
}

// ═══════════════════════════════════════════════════════════
//  Meta Card Builder
// ═══════════════════════════════════════════════════════════

function buildMetaCard(meta) {
  if (!meta.title && !meta.description && !meta.tags) return '';
  const tags = Array.isArray(meta.tags)
    ? meta.tags.map(t => `<span class="meta-tag">${t}</span>`).join('')
    : '';
  return `<div class="meta-card">
    ${meta.title ? `<div class="meta-title">${meta.title}</div>` : ''}
    ${meta.description ? `<div class="meta-desc">${meta.description}</div>` : ''}
    ${tags ? `<div class="meta-tags">${tags}</div>` : ''}
  </div>`;
}

// ═══════════════════════════════════════════════════════════
//  Navigation Stripper
// ═══════════════════════════════════════════════════════════

function stripNavigation(body) {
  return body
    .replace(/^##[^\n]*Navigation[^\n]*\n[\s\S]*?\n---/m, '')
    .replace(/^[^\n]*img\.shields\.io[^\n]*$/gm, '');
}

// ═══════════════════════════════════════════════════════════
//  Marked.js Configuration
// ═══════════════════════════════════════════════════════════

marked.setOptions({
  breaks: true,
  gfm: true,
});

const renderer = new marked.Renderer();
marked.use({ renderer });

// ═══════════════════════════════════════════════════════════
//  State Variables
// ═══════════════════════════════════════════════════════════

let currentPath = 'README.md';
let ghBadgeCounter = 0;
let pendingBadges = [];

// ═══════════════════════════════════════════════════════════
//  Path Resolution
// ═══════════════════════════════════════════════════════════

function resolvePath(base, relative) {
  if (relative.startsWith('/')) return relative.slice(1);
  const parts = base.split('/');
  parts.pop();
  relative.split('/').forEach(seg => {
    if (seg === '..') parts.pop();
    else if (seg !== '.') parts.push(seg);
  });
  return parts.join('/');
}

function pathToLabel(path) {
  const parts = path.split('/');
  if (parts.length === 1) return 'Home';
  return parts.slice(0, -1).map(p =>
    p.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  ).join(' › ');
}

// ═══════════════════════════════════════════════════════════
//  Custom Renderers
// ═══════════════════════════════════════════════════════════

// Heading Renderer
renderer.heading = function({ text, depth }) {
  const textOnly = text.replace(/<[^>]+>/g, '').trim();
  if (!textOnly) return '';
  const id = textOnly.toLowerCase().replace(/[^\w]+/g, '-');
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};

// Image Renderer
renderer.image = function({ href, title, text }) {
  if (href && href.includes('img.shields.io')) {
    const id = 'gh-badge-' + (ghBadgeCounter++);
    pendingBadges.push({ id, src: href });
    return `<span class="gh-badge" id="${id}" title="${text}">` +
      `<span class="gh-badge-label">${text}</span>` +
      `<span class="gh-badge-value loading">…</span>` +
      `</span>`;
  }

  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
  const src = isExternal ? href : resolvePath(currentPath, href);
  const titleAttr = title ? ` title="${title}"` : '';
  return `<img src="${src}" alt="${text}"${titleAttr} style="max-width:100%" />`;
};

// Link Renderer
renderer.link = function({ href, title, text }) {
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
  const isPdf = href && href.toLowerCase().endsWith('.pdf') && !isExternal;
  const isMd = href && href.endsWith('.md') && !isExternal;

  if (isPdf) {
    const resolved = resolvePath(currentPath, href);
    const label = text || title || 'View PDF';
    return `<button class="pdf-btn" onclick="openPdf('${resolved}', '${label}')">📄 ${label}</button>`;
  }

  const isMdPopup = !isExternal && (
    href.endsWith('Instructions.md') || href.endsWith('ARCHITECTURE.md')
  );

  if (isMdPopup) {
    const resolved = resolvePath(currentPath, href);
    const label = text || title || href.split('/').pop().replace('.md', '');
    return `<button class="md-link-btn" onclick="openMdModal('${resolved}', '${label}')">${label}</button>`;
  }

  if (isMd) {
    const resolved = resolvePath(currentPath, href);
    return `<a href="#${resolved}" data-path="${resolved}" onclick="navigate('${resolved}'); return false;"${title ? ` title="${title}"` : ''}>${text}</a>`;
  }

  if (isExternal) {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
  }

  return `<a href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;
};

// ═══════════════════════════════════════════════════════════
//  GitHub Badge Resolution
// ═══════════════════════════════════════════════════════════

const GH_REPO = 'Junior-Motsoko/aws-restart-portfolio-';
let ghCache = null;

async function resolveGhBadges(badges) {
  if (!badges.length) return;
  try {
    if (!ghCache) {
      const [repo, contribs] = await Promise.all([
        fetch(`https://api.github.com/repos/${GH_REPO}`).then(r => r.json()),
        fetch(`https://api.github.com/repos/${GH_REPO}/contributors?per_page=100`).then(r => r.json()),
      ]);
      ghCache = { stars: repo.stargazers_count, contributors: Array.isArray(contribs) ? contribs.length : '—' };
    }

    badges.forEach(({ id, src }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const val = el.querySelector('.gh-badge-value');
      if (src.includes('stars')) { val.textContent = '★ ' + ghCache.stars; }
      else if (src.includes('contributors')) { val.textContent = '👥 ' + ghCache.contributors; }
      else { val.textContent = '—'; }
      val.classList.remove('loading');
    });
  } catch { /* fail silently */ }
}

// ═══════════════════════════════════════════════════════════
//  Fetch & Render Helpers
// ═══════════════════════════════════════════════════════════

async function fetchMd(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return await res.text();
}

function renderHtml(markdown) {
  const { meta, body } = parseFrontMatter(markdown);
  return buildMetaCard(meta) + marked.parse(body);
}

// ═══════════════════════════════════════════════════════════
//  Main Navigation Function
// ═══════════════════════════════════════════════════════════

async function navigate(path, appendInstr = false) {
  currentPath = path;
  pendingBadges = [];
  ghBadgeCounter = 0;

  history.replaceState(null, '', '#' + path);

  document.getElementById('breadcrumb-text').textContent = pathToLabel(path);

  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.path === path);
  });

  document.querySelectorAll('.instr-toggle').forEach(btn => btn.classList.remove('active'));

  document.getElementById('content-wrap').scrollTop = 0;

  const contentEl = document.getElementById('content');
  contentEl.innerHTML = `<div class="state-msg"><div class="icon">⏳</div><p>Loading…</p></div>`;

  try {
    const md = await fetchMd(path);
    const { meta, body } = parseFrontMatter(md);
    if (meta.title) {
      document.getElementById('breadcrumb-text').textContent =
        pathToLabel(path) + (pathToLabel(path) !== 'Home' ? ' › ' + meta.title : meta.title);
    }
    contentEl.innerHTML = buildMetaCard(meta) + marked.parse(stripNavigation(body));
    contentEl.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
    resolveGhBadges(pendingBadges);
  } catch (e) {
    contentEl.innerHTML = `
      <div class="state-msg">
      <div class="icon">⚠️</div>
      <p>Could not load <code>${path}</code></p>
      <p style="font-size:12px;color:var(--muted)">${e.message}</p>
      </div>`;
  }
}

// ═══════════════════════════════════════════════════════════
//  Markdown Modal Controls
// ═══════════════════════════════════════════════════════════

async function openMdModal(path, title) {
  const modal = document.getElementById('md-modal');
  const content = document.getElementById('md-modal-content');

  document.getElementById('md-modal-title').textContent = title || 'Preview';
  content.innerHTML = `<div class="state-msg"><div class="icon">⏳</div><p>Loading…</p></div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('md-modal-wrap').scrollTop = 0;

  try {
    const md = await fetchMd(path);
    const { meta, body } = parseFrontMatter(md);
    content.innerHTML = buildMetaCard(meta) + marked.parse(stripNavigation(body));
    content.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));
  } catch (e) {
    content.innerHTML = `
      <div class="state-msg">
      <div class="icon">⚠️</div>
      <p>Could not load <code>${path}</code></p>
      <p style="font-size:12px;color:var(--muted)">${e.message}</p>
      </div>`;
  }
}

function closeMdModal() {
  document.getElementById('md-modal').classList.remove('open');
  document.getElementById('md-modal-content').innerHTML = '';
  document.body.style.overflow = '';
}

document.getElementById('md-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('md-modal')) closeMdModal();
});

// ═══════════════════════════════════════════════════════════
//  PDF Modal Controls
// ═══════════════════════════════════════════════════════════

function openPdf(path, label) {
  document.getElementById('pdf-frame').src = path;
  document.getElementById('pdf-modal-title').textContent = label || 'Certificate Preview';
  document.getElementById('pdf-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePdf() {
  document.getElementById('pdf-modal').classList.remove('open');
  document.getElementById('pdf-frame').src = '';
  document.body.style.overflow = '';
}

document.getElementById('pdf-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('pdf-modal')) closePdf();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closePdf(); closeMdModal(); }
});

// ═══════════════════════════════════════════════════════════
//  Navigation Event Delegation
// ═══════════════════════════════════════════════════════════

document.getElementById('nav').addEventListener('click', e => {
  const item = e.target.closest('a.nav-item[data-path]');
  if (!item) return;
  e.preventDefault();
  navigate(item.dataset.path);

  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
});

// ═══════════════════════════════════════════════════════════
//  Sidebar Builder Functions
// ═══════════════════════════════════════════════════════════

function buildLeaf(entry) {
  const readmePath = `${entry.path}/README.md`;
  const instrPath = `${entry.path}/Instructions.md`;
  const instr = entry.instructions
    ? `<button class="instr-toggle"
    data-readme="${readmePath}"
    data-instr="${instrPath}"
    onclick="openMdModal(this.dataset.instr, 'Instructions')"
    title="Show Instructions">📄</button>`
    : '';
  return `
    <div class="nav-leaf">
    <a class="nav-item" data-path="${readmePath}" href="#${readmePath}">${entry.label}</a>
    ${instr}
    </div>`;
}

function buildSubSection(child) {
  const overviewItem = child.overview
    ? `<a class="nav-item" data-path="${child.overview}" href="#${child.overview}" style="padding-left:40px">
    <span class="icon">📋</span> Overview
    </a>`
    : '';
  const entries = (child.entries || []).map(buildLeaf).join('');
  return `
    <div class="nav-sub-section" id="${child.id}">
    <div class="nav-sub-header" onclick="toggleSection('${child.id}')">
    <span>${child.icon}</span> ${child.label}
    <span class="chevron">▶</span>
    </div>
    <div class="nav-sub-body">
    ${overviewItem}
    ${entries}
    </div>
    </div>`;
}

function buildSection(section) {
  const overviewItem = section.overview
    ? `<a class="nav-item" data-path="${section.overview}" href="#${section.overview}">
    <span class="icon">📋</span> Overview
    </a>`
    : '';

  const body = section.children
    ? (section.children.map(buildSubSection).join(''))
    : (section.entries || []).map(buildLeaf).join('');

  return `
    <div class="nav-section" id="${section.id}">
    <div class="nav-section-header" onclick="toggleSection('${section.id}')">
    <span>${section.icon}</span> ${section.label}
    <span class="chevron">▶</span>
    </div>
    <div class="nav-section-body">
    ${overviewItem}
    ${body}
    </div>
    </div>
    <div class="nav-divider"></div>`;
}

async function buildSidebar(nav) {
  const navEl = document.getElementById('nav');
  let html = `
    <a class="nav-item" data-path="${nav.home}" href="#${nav.home}">
    <span class="icon">🏠</span> Home
    </a>
    <div class="nav-divider"></div>`;

  html += nav.sections.map(buildSection).join('');
  navEl.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════
//  Section Toggle & Parent Auto-Open
// ═══════════════════════════════════════════════════════════

function toggleSection(id) {
  document.getElementById(id).classList.toggle('open');
}

function openParentsForPath(path) {
  document.querySelectorAll('[id^="sec-"]').forEach(el => {
    const match = el.querySelector(`a.nav-item[data-path="${path}"]`);
    if (match) el.classList.add('open');
    el.querySelectorAll('a.nav-item[data-path]').forEach(a => {
      if (path.startsWith(a.dataset.path.split('/').slice(0, -1).join('/'))) {
        el.classList.add('open');
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════
//  Hash Routing
// ═══════════════════════════════════════════════════════════

function loadFromHash() {
  const hash = window.location.hash.slice(1);
  const path = hash || 'README.md';
  openParentsForPath(path);
  navigate(path);
}

window.addEventListener('hashchange', loadFromHash);

// ═══════════════════════════════════════════════════════════
//  Mobile Hamburger Menu
// ═══════════════════════════════════════════════════════════

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ═══════════════════════════════════════════════════════════
//  Initialization
// ═══════════════════════════════════════════════════════════

(async () => {
  try {
    const res = await fetch('nav.json');
    const nav = await res.json();
    await buildSidebar(nav);
  } catch (e) {
    document.getElementById('nav').innerHTML =
      `<div class="state-msg" style="height:auto;padding:1em"><p style="font-size:12px;color:var(--muted)">⚠️ Could not load nav.json</p></div>`;
  }
  loadFromHash();
})();
