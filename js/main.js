/**
 * Portfolio Main Logic - Billy
 * Handles dynamic data rendering, theme switcher, responsive navigation,
 * project filters, and smooth micro-animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderAllData();
  initNavigation();
  initProjectFilters();
  initScrollAnimations();
  initBackToTop();
  initModalSystem();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const htmlEl = document.documentElement;
  const themeToggleBtns = document.querySelectorAll('.btn-theme-toggle');
  const storedTheme = localStorage.getItem('billy_portfolio_theme');
  
  // Determine initial theme: localStorage -> dark mode default
  let activeTheme = storedTheme || 'dark';

  setTheme(activeTheme);

  // Toggle button click listeners
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('billy_portfolio_theme', newTheme);
    });
  });

  // Listen for OS system theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('billy_portfolio_theme')) {
      setTheme(e.matches ? 'light' : 'dark');
    }
  });

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    themeToggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      // Update icon SVG
      btn.innerHTML = theme === 'dark' ? getSunIconSvg() : getMoonIconSvg();
    });
  }
}

function getSunIconSvg() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>`;
}

function getMoonIconSvg() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.3 2a10 10 0 0 0-.19 20 10.04 10.04 0 0 0 9.95-8.23 1 1 0 0 0-1.25-1.15 8 8 0 1 1-9.66-9.66 1 1 0 0 0-1.15-1.25A9.68 9.68 0 0 0 12.3 2z"/></svg>`;
}

/* ==========================================================================
   2. Render Data from js/data.js
   ========================================================================= */
function renderAllData() {
  if (typeof portfolioData === 'undefined') {
    console.error('portfolioData is not defined. Ensure js/data.js is loaded.');
    return;
  }

  renderHeroData();
  renderAboutData();
  renderProjectsData('all');
  renderSkillsData();
  renderExperienceData();
  renderContactData();
}

function renderHeroData() {
  const p = portfolioData.personal;
  
  const heroGreeting = document.getElementById('hero-greeting');
  const heroHeadline = document.getElementById('hero-headline');
  const heroRole = document.getElementById('hero-role');
  const heroPitch = document.getElementById('hero-pitch');
  const heroCvBtn = document.getElementById('hero-cv-btn');
  const heroSocialList = document.getElementById('hero-social-list');

  if (heroGreeting) heroGreeting.textContent = p.bioIntro;
  if (heroHeadline) {
    heroHeadline.innerHTML = `I am <span class="accent-name">${p.name}</span>`;
  }
  if (heroRole) heroRole.textContent = `${p.role} • ${p.tagline}`;
  if (heroPitch) heroPitch.textContent = p.bioPitch;
  if (heroCvBtn) {
    heroCvBtn.setAttribute('href', p.cvUrl);
    heroCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCvModal();
    });
  }

  const heroPortraitImg = document.getElementById('hero-portrait-img');
  if (heroPortraitImg && p.avatarUrl) {
    heroPortraitImg.setAttribute('src', p.avatarUrl);
    heroPortraitImg.setAttribute('alt', `Portrait of ${p.name}, ${p.tagline}`);
  }

  if (heroSocialList) {
    heroSocialList.innerHTML = `
      <a href="${p.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn Profile">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72.78-1.72 1.73s.77 1.73 1.72 1.73a1.73 1.73 0 0 0 1.73-1.73c0-.95-.78-1.73-1.73-1.73m1.4 9.74V9.97H5.06v8.53h2.8z"/></svg>
      </a>
      <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="GitHub Profile">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
      </a>
      <a href="mailto:${p.email}" class="social-icon-btn" aria-label="Send Email">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </a>
      ${p.whatsapp ? `
      <a href="${p.whatsapp}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.97-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.39-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.59-.36.79-.36.2 0 .4.01.57.01.18 0 .43-.07.67.51.24.59.82 2.01.89 2.15.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.17-.2.74-.86.94-1.15.2-.29.39-.24.66-.15.27.1 1.72.81 2.01.96.29.15.49.22.56.34.08.12.08.71-.16 1.39z"/></svg>
      </a>` : ''}
    `;
  }
}

function renderAboutData() {
  const p = portfolioData.personal;
  const aboutTextContainer = document.getElementById('about-text-content');
  if (aboutTextContainer && p.aboutParagraphs) {
    aboutTextContainer.innerHTML = p.aboutParagraphs.map(para => `<p>${escapeHTML(para)}</p>`).join('');
  }
}

function getDemoBtnMeta(url = '') {
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    return {
      label: 'Watch Demo',
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`
    };
  }
  if (lower.includes('drive.google.com')) {
    return {
      label: 'Drive / APK',
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`
    };
  }
  return {
    label: 'Live Web',
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>`
  };
}

function getRepoBtnMeta(url = '') {
  const lower = url.toLowerCase();
  if (lower.includes('drive.google.com')) {
    return {
      label: 'Project Files',
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`
    };
  }
  return {
    label: 'GitHub',
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`
  };
}

function renderProjectsData(category = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = category === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(proj => proj.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty-state">No projects found in this category.</p>`;
    return;
  }

  container.innerHTML = filtered.map(proj => {
    const stackPills = proj.stack.map(tech => `<span class="stack-tag">${escapeHTML(tech)}</span>`).join('');
    const highlightsList = Array.isArray(proj.highlights) && proj.highlights.length > 0
      ? `<ul class="project-highlights">
           ${proj.highlights.map(h => `<li><span>${escapeHTML(h)}</span></li>`).join('')}
         </ul>`
      : '';
    const demoMeta = getDemoBtnMeta(proj.demoUrl);
    const repoMeta = getRepoBtnMeta(proj.githubUrl);

    return `
      <article class="project-card reveal-on-scroll" data-category="${escapeHTML(proj.category)}">
        <div class="project-image-wrap" data-project-id="${escapeHTML(proj.id)}" role="button" tabindex="0" aria-label="View details for ${escapeHTML(proj.title)}">
          <img src="${escapeHTML(proj.image)}" alt="Preview thumbnail of ${escapeHTML(proj.title)}" loading="lazy" width="600" height="360" />
          <span class="project-badge">${escapeHTML(proj.categoryLabel)}</span>
          <span class="project-preview-hint">🔍 Click for Details</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${escapeHTML(proj.title)}</h3>
          ${proj.subtitle ? `<div class="project-subtitle">${escapeHTML(proj.subtitle)}</div>` : ''}
          <div class="project-role">${escapeHTML(proj.role)}</div>
          <p class="project-desc">${escapeHTML(proj.description)}</p>
          ${highlightsList}
          <div class="project-stack">
            ${stackPills}
          </div>
          <div class="project-actions">
            <a href="${escapeHTML(proj.demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-primary" aria-label="${demoMeta.label} for ${escapeHTML(proj.title)}">
              ${demoMeta.icon}
              <span>${demoMeta.label}</span>
            </a>
            <a href="${escapeHTML(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary" aria-label="${repoMeta.label} for ${escapeHTML(proj.title)}">
              ${repoMeta.icon}
              <span>${repoMeta.label}</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Bind click events on project thumbnails to open detail modal
  container.querySelectorAll('.project-image-wrap[data-project-id]').forEach(wrap => {
    const openProj = () => {
      const pid = wrap.getAttribute('data-project-id');
      const projectObj = portfolioData.projects.find(p => p.id === pid);
      if (projectObj) openProjectModal(projectObj);
    };
    wrap.addEventListener('click', openProj);
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProj();
      }
    });
  });

  // Re-observe newly created elements for smooth reveal
  reobserveRevealElements();
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'all';
      renderProjectsData(cat);
    });
  });
}

function renderSkillsData() {
  const container = document.getElementById('skills-grid');
  if (!container || !portfolioData.skills) return;

  container.innerHTML = portfolioData.skills.map(skillGroup => {
    const pills = skillGroup.items.map(item => `<span class="skill-pill">${escapeHTML(item)}</span>`).join('');
    return `
      <div class="skill-category-card reveal-on-scroll">
        <div class="skill-card-header">
          <div class="skill-icon-bubble" aria-hidden="true">
            ${getSkillIconSvg(skillGroup.icon)}
          </div>
          <h3 class="skill-category-title">${escapeHTML(skillGroup.category)}</h3>
        </div>
        <div class="skill-badges-wrap">
          ${pills}
        </div>
      </div>
    `;
  }).join('');
}

function getSkillIconSvg(iconType) {
  switch (iconType) {
    case 'code':
      return `<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`;
    case 'layout':
      return `<svg viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 4v12h16V7H4zm2 2h4v8H6V9zm6 0h6v3h-6V9zm0 5h6v3h-6v-3z"/></svg>`;
    case 'server':
      return `<svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 9h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm2-7v1h2V6H6zm0 9v1h2v-1H6z"/></svg>`;
    case 'database':
      return `<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4zm0 6c-3.87 0-7-1.12-7-2s3.13-2 7-2 7 1.12 7 2-3.13 2-7 2zm7 3.29c-.77.58-1.89 1.05-3.21 1.35-.91.21-1.93.36-3.79.36s-2.88-.15-3.79-.36c-1.32-.3-2.44-.77-3.21-1.35V11c0 2.21 4.03 4 9 4s9-1.79 9-4v-1.71zm0 4.5c-.77.58-1.89 1.05-3.21 1.35-.91.21-1.93.36-3.79.36s-2.88-.15-3.79-.36c-1.32-.3-2.44-.77-3.21-1.35V15.5c0 2.21 4.03 4 9 4s9-1.79 9-4v-1.71z"/></svg>`;
    case 'tool':
      return `<svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.5 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>`;
    case 'figma':
      return `<svg viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4zm-4 4a4 4 0 0 0-4 4 4 4 0 0 0 4 4h4V6H8zm4 8a4 4 0 0 0 4-4 4 4 0 0 0-4-4v8zm-4 0a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H8zm4 0v4a4 4 0 0 0 4-4h-4z"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2z"/></svg>`;
  }
}

function renderExperienceData() {
  const container = document.getElementById('timeline-container');
  if (!container || !portfolioData.experience) return;

  container.innerHTML = portfolioData.experience.map((item, idx) => {
    const badges = item.badges ? item.badges.map(b => `<span class="timeline-badge">${escapeHTML(b)}</span>`).join('') : '';
    const certBtn = item.certificateUrl
      ? `<div style="margin-top: 1rem; display: flex; gap: 0.65rem; flex-wrap: wrap;">
           <button type="button" class="btn-card-primary btn-preview-cert" data-exp-idx="${idx}" style="display: inline-flex; flex: initial; width: auto; padding: 0.45rem 0.95rem; font-size: 0.82rem;">
             <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 15px; height: 15px;"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
             <span>Preview Certificate</span>
           </button>
           <a href="${escapeHTML(item.certificateUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary" style="display: inline-flex; flex: initial; width: auto; padding: 0.45rem 0.9rem; font-size: 0.82rem;">
             <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 15px; height: 15px;"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
             <span>Open File</span>
           </a>
         </div>`
      : '';
    return `
      <div class="timeline-item reveal-on-scroll">
        <div class="timeline-marker" aria-hidden="true"></div>
        <div class="timeline-card">
          <div class="timeline-meta">
            <span class="timeline-period">${escapeHTML(item.period)}</span>
            <span class="timeline-type">${escapeHTML(item.type)}</span>
          </div>
          <h3 class="timeline-role">${escapeHTML(item.role)}</h3>
          <div class="timeline-org">${escapeHTML(item.organization)}</div>
          <p class="timeline-desc">${escapeHTML(item.description)}</p>
          <div class="timeline-badges">
            ${badges}
          </div>
          ${certBtn}
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-preview-cert').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-exp-idx'), 10);
      const expItem = portfolioData.experience[idx];
      if (expItem && expItem.certificateUrl) {
        openCertificateModal(expItem);
      }
    });
  });
}

function renderContactData() {
  const p = portfolioData.personal;
  const emailEl = document.getElementById('contact-email-btn');
  const copyEmailBtn = document.getElementById('contact-copy-email-btn');
  const copyEmailLabel = document.getElementById('copy-email-label');
  const whatsappEl = document.getElementById('contact-whatsapp-btn');
  const linkedinEl = document.getElementById('contact-linkedin-btn');
  const githubEl = document.getElementById('contact-github-btn');
  const cvEl = document.getElementById('contact-cv-btn');
  const displayEmail = document.getElementById('contact-display-email');

  if (emailEl) emailEl.setAttribute('href', `mailto:${p.email}`);
  if (displayEmail) displayEmail.textContent = p.email;
  if (whatsappEl && p.whatsapp) whatsappEl.setAttribute('href', p.whatsapp);
  if (linkedinEl) linkedinEl.setAttribute('href', p.linkedin);
  if (githubEl) githubEl.setAttribute('href', p.github);
  if (cvEl) {
    cvEl.setAttribute('href', p.cvUrl);
    cvEl.addEventListener('click', (e) => {
      e.preventDefault();
      openCvModal();
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(p.email);
        if (copyEmailLabel) copyEmailLabel.textContent = 'Copied!';
        showToast(`Email copied: ${p.email}`);
        setTimeout(() => {
          if (copyEmailLabel) copyEmailLabel.textContent = 'Copy Email';
        }, 2200);
      } catch (err) {
        // Fallback copy
        const tempInput = document.createElement('input');
        tempInput.value = p.email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Email copied: ${p.email}`);
      }
    });
  }
}

/* ==========================================================================
   2B. Interactive Lightbox Modal (Certificates & Project Details) & Toast
   ========================================================================== */
function initModalSystem() {
  const modal = document.getElementById('portfolio-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener('click', closePortfolioModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePortfolioModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closePortfolioModal();
    }
  });
}

function openCertificateModal(expItem) {
  const modal = document.getElementById('portfolio-modal');
  const badge = document.getElementById('modal-badge');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const extBtn = document.getElementById('modal-external-btn');
  if (!modal || !body) return;

  badge.textContent = expItem.type || 'Certificate';
  title.textContent = expItem.role;
  extBtn.style.display = 'inline-flex';
  extBtn.removeAttribute('download');
  extBtn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
    <span>Open Full File</span>
  `;
  extBtn.setAttribute('href', expItem.certificateUrl);

  const isPdf = expItem.certificateUrl.toLowerCase().endsWith('.pdf');
  if (isPdf) {
    body.innerHTML = `
      <iframe src="${escapeHTML(expItem.certificateUrl)}" class="modal-cert-preview-iframe" title="${escapeHTML(expItem.role)}"></iframe>
    `;
  } else {
    body.innerHTML = `
      <img src="${escapeHTML(expItem.certificateUrl)}" alt="${escapeHTML(expItem.role)}" class="modal-cert-preview-img" />
    `;
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openCvModal(defaultLang = 'en') {
  const p = portfolioData.personal;
  const modal = document.getElementById('portfolio-modal');
  const badge = document.getElementById('modal-badge');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const extBtn = document.getElementById('modal-external-btn');
  if (!modal || !body || !p) return;

  const renderCvView = (lang) => {
    const activeUrl = lang === 'id' ? (p.cvUrlId || p.cvUrl) : (p.cvUrlEn || p.cvUrl);
    const downloadName = lang === 'id'
      ? 'CV-Billy-Nathaniel-Halim-ID.pdf'
      : 'CV-Billy-Nathaniel-Halim-EN.pdf';

    badge.textContent = lang === 'id' ? 'Curriculum Vitae (ID)' : 'Curriculum Vitae (EN)';
    title.textContent = `${p.fullName || p.name} — Resume / CV`;
    extBtn.style.display = 'inline-flex';
    extBtn.setAttribute('href', activeUrl);
    extBtn.setAttribute('download', downloadName);
    extBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
      <span>Download (${lang.toUpperCase()})</span>
    `;

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Select CV Language Version:</span>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="filter-btn ${lang === 'en' ? 'active' : ''}" data-cv-lang="en" style="padding: 0.35rem 0.9rem; font-size: 0.8rem;">
              🇬🇧 English CV
            </button>
            <button type="button" class="filter-btn ${lang === 'id' ? 'active' : ''}" data-cv-lang="id" style="padding: 0.35rem 0.9rem; font-size: 0.8rem;">
              🇮🇩 Bahasa Indonesia CV
            </button>
          </div>
        </div>
        <iframe src="${escapeHTML(activeUrl)}" class="modal-cert-preview-iframe" title="Curriculum Vitae (${lang.toUpperCase()}) of ${escapeHTML(p.fullName || p.name)}"></iframe>
        <div class="project-actions" style="padding-top: 0.25rem; border-top: none;">
          <a href="${escapeHTML(activeUrl)}" download="${downloadName}" class="btn-card-primary">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>Download ${lang === 'id' ? 'Indonesian' : 'English'} CV (.pdf)</span>
          </a>
          <a href="${escapeHTML(activeUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
            <span>Open in New Tab</span>
          </a>
        </div>
      </div>
    `;

    body.querySelectorAll('[data-cv-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-cv-lang');
        renderCvView(selectedLang);
      });
    });
  };

  renderCvView(defaultLang);
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openProjectModal(proj) {
  const modal = document.getElementById('portfolio-modal');
  const badge = document.getElementById('modal-badge');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const extBtn = document.getElementById('modal-external-btn');
  if (!modal || !body) return;

  badge.textContent = proj.categoryLabel || 'Project';
  title.textContent = proj.title;
  extBtn.style.display = 'none';

  const demoMeta = getDemoBtnMeta(proj.demoUrl);
  const repoMeta = getRepoBtnMeta(proj.githubUrl);
  const stackPills = proj.stack.map(tech => `<span class="stack-tag">${escapeHTML(tech)}</span>`).join('');
  const highlightsList = Array.isArray(proj.highlights) && proj.highlights.length > 0
    ? `<ul class="project-highlights" style="margin-top: 1rem;">
         ${proj.highlights.map(h => `<li><span>${escapeHTML(h)}</span></li>`).join('')}
       </ul>`
    : '';

  body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.1rem;">
      <img src="${escapeHTML(proj.image)}" alt="${escapeHTML(proj.title)}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; border: 1px solid var(--border-subtle);" />
      <div>
        ${proj.subtitle ? `<div class="project-subtitle" style="font-size: 0.95rem;">${escapeHTML(proj.subtitle)}</div>` : ''}
        <div class="project-role" style="margin-top: 0.25rem;">${escapeHTML(proj.role)}</div>
        <p class="project-desc" style="margin-bottom: 0.75rem;">${escapeHTML(proj.description)}</p>
        ${highlightsList}
        <div class="project-stack" style="margin-bottom: 1rem;">
          ${stackPills}
        </div>
        <div class="project-actions">
          <a href="${escapeHTML(proj.demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">
            ${demoMeta.icon}
            <span>${demoMeta.label}</span>
          </a>
          <a href="${escapeHTML(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary">
            ${repoMeta.icon}
            <span>${repoMeta.label}</span>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  const body = document.getElementById('modal-body');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (body) body.innerHTML = '';
}

let toastTimeout = null;
function showToast(msg) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   3. Navigation, Hamburger Drawer, and Active Section Highlighting
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburgerBtn = document.querySelector('.btn-hamburger');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Hamburger Menu Toggle
  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.toggle('open');
      mobileDrawer.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile drawer when clicking a navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        mobileDrawer.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Active section indicator using IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }
}

/* ==========================================================================
   4. Scroll Animations & Reveal
   ========================================================================== */
let globalScrollObserver = null;

function initScrollAnimations() {
  // Respect prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
    return;
  }

  if ('IntersectionObserver' in window) {
    globalScrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => globalScrollObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
  }
}

function reobserveRevealElements() {
  if (!globalScrollObserver) return;
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
    return;
  }

  document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach(el => {
    globalScrollObserver.observe(el);
  });
}

/* ==========================================================================
   5. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.querySelector('.btn-back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Helper: XSS Protection / HTML Escape
   ========================================================================== */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
