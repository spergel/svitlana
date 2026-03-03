(function () {
  const NAV_LINKS = [
    { href: 'index.html',        label: 'Home' },
    { href: 'publications.html', label: 'Publications' },
    { href: 'organized.html',    label: 'Conferences' },
    { href: 'Vitae.pdf',         label: 'CV', attrs: 'target="_blank" rel="noopener noreferrer"' },
    { href: 'teaching.html', label: 'Students &amp; Teaching' },
  ];

  function buildNav() {
    const current = location.pathname.split('/').pop() || 'index.html';
    return NAV_LINKS.map(({ href, label, attrs = '' }) => {
      const active = href === current ? ' aria-current="page"' : '';
      return `<a href="${href}" ${attrs}${active}>${label}</a>`;
    }).join('\n        ');
  }

  function injectHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    el.innerHTML = `
<header class="site-header">
  <div class="site-header-identity">
    <a href="index.html" class="site-photo-link">
      <img src="image.png" alt="Svitlana Mayboroda" class="site-photo">
    </a>
    <div class="site-title-block">
      <h1 class="site-title">
        <a href="index.html">Svitlana Mayboroda</a>
      </h1>
      <p class="site-subtitle">McKnight Presidential Professor &middot; University of Minnesota</p>
    </div>
  </div>
  <nav class="site-nav" aria-label="Main navigation">
    ${buildNav()}
  </nav>
</header>`;
  }

  function injectFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <span>&copy; <span class="footer-year"></span> Svitlana Mayboroda</span>
    <span class="footer-sep">&middot;</span>
    <a href="mailto:svitlana@math.umn.edu">svitlana@math.umn.edu</a>
    <span class="footer-sep">&middot;</span>
    <a href="Vitae.pdf" target="_blank" rel="noopener noreferrer">Curriculum Vitae</a>
  </div>
</footer>`;
    el.querySelectorAll('.footer-year').forEach(
      (s) => (s.textContent = new Date().getFullYear())
    );
  }

  function applyTheme(theme) {
    const body = document.body;
    const isDark = theme === 'dark';
    body.classList.toggle('dark', isDark);

    const btn = document.querySelector('.theme-toggle-fab');
    if (!btn) return;

    const icon = btn.querySelector('.theme-toggle-icon');
    if (icon) {
      icon.textContent = isDark ? '☀' : '☾';
    }

    btn.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  function initThemeToggle() {
    const STORAGE_KEY = 'site-theme';
    let saved = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {}

    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = saved || (prefersDark ? 'dark' : 'light');

    let btn = document.querySelector('.theme-toggle-fab');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'theme-toggle-fab';
      btn.innerHTML =
        '<span class="theme-toggle-icon" aria-hidden="true">☾</span>';
      document.body.appendChild(btn);
    }

    applyTheme(initialTheme);

    btn.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark')
        ? 'light'
        : 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch (e) {}
      applyTheme(nextTheme);
    });
  }

  function init() {
    injectHeader();
    injectFooter();
    initThemeToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
