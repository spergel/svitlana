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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { injectHeader(); injectFooter(); });
  } else {
    injectHeader();
    injectFooter();
  }
})();
