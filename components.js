// ─── COMPONENTS.JS ─── //
// Shared nav + footer for all inner pages.
// Inner pages start with the pill visible immediately (no expanded state).

(function () {

  // ── NAV HTML ──
  const navHTML = `
  <nav id="nav" class="compact inner-page">
    <div id="nav-expanded">
      <a href="about.html">ABOUT</a>
      <a href="podcast.html">PODCAST</a>
      <a href="thoughts.html">THOUGHTS</a>
      <a href="contact.html">CONTACT</a>
    </div>
    <div id="nav-compact">
      <a href="index.html">NICOLAS VACA</a>
      <a href="about.html">ABOUT</a>
      <a href="podcast.html">PODCAST</a>
      <a href="thoughts.html">THOUGHTS</a>
      <a href="contact.html">CONTACT</a>
    </div>
  </nav>`;

  // ── FOOTER HTML ──
  const footerHTML = `
  <footer id="contact">
    <span id="footer-name">NICOLAS VACA</span>
    <div id="footer-grid">
      <div class="fc-left">
        <div class="footer-col-value">
          <a href="mailto:contact@nicolasvacagr.com">contact@nicolasvacagr.com</a>
          <a href="tel:+34678789532">+34 678 78 95 32</a>
        </div>
      </div>
      <div class="fc-left">
        <div class="footer-col-label">My current time</div>
        <div class="footer-col-value">
          <span class="footer-time-big"><span id="footer-clock">00:00</span><span class="footer-time-loc"> Madrid (CET)</span></span>
        </div>
      </div>
      <div class="fc-left">
        <div class="footer-col-value">Calle de Santo Tomé 6,<br>Madrid, 28004</div>
      </div>
      <div class="fc-right">
        <div class="footer-col-value">
          <a href="https://instagram.com/nicolasvacagr" target="_blank">Instagram</a>
          <a href="https://x.com/nicolasvacagr" target="_blank">X (Twitter)</a>
          <a href="https://youtube.com/@nicolasvacagr" target="_blank">YouTube</a>
          <a href="https://linkedin.com/in/nicolasvacagr" target="_blank">LinkedIn</a>
        </div>
      </div>
    </div>
    <div id="footer-bottom">
      <span>© 2026 Nicolas Vaca</span>
      <div style="display:flex;align-items:center;gap:16px;">
        <a href="#">Privacy Policy</a> | <a href="#">Terms</a>
        <button id="scroll-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">↑</button>
      </div>
    </div>
  </footer>`;

  // ── INJECT ──
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ── NAV SCROLL BEHAVIOUR ──
  const navEl = document.getElementById('nav');
  const lightSections = ['contact']; // footer is always light
  let ticking = false;

  function getNavTheme() {
    const mid = window.scrollY + 30;
    const pageLightSections = (window.PAGE_LIGHT_SECTIONS || []).concat(lightSections);
    for (const id of pageLightSections) {
      const el = document.getElementById(id);
      if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) return 'light';
    }
    const pageDarkSections = window.PAGE_DARK_SECTIONS || [];
    for (const id of pageDarkSections) {
      const el = document.getElementById(id);
      if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) return 'dark-section';
    }
    return 'default';
  }

  function updateNav() {
    const theme = getNavTheme();
    navEl.classList.toggle('light', theme === 'light');
    navEl.classList.toggle('dark-section', theme === 'dark-section');
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
  }, { passive: true });

  updateNav();

  // ── ACTIVE NAV LINK ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#nav-compact a, #nav-expanded a').forEach(a => {
    if (a.getAttribute('href') === currentPage) {
      a.style.fontWeight = '800';
      a.style.opacity = '1';
    }
  });

  // ── CLOCKS ──
  function updateClocks() {
    const t = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', hour12: false
    });
    const c1 = document.getElementById('clock-time');
    const c2 = document.getElementById('footer-clock');
    if (c1) c1.textContent = t;
    if (c2) c2.textContent = t;
  }
  updateClocks();
  setInterval(updateClocks, 60000);

  // ── FOOTER NAME AUTO-FIT ──
  function fitFooterName() {
    const el = document.getElementById('footer-name');
    if (!el) return;
    const avail = el.parentElement.clientWidth - 80;
    let lo = 10, hi = 600, mid;
    while (hi - lo > 1) {
      mid = Math.floor((lo + hi) / 2);
      el.style.fontSize = mid + 'px';
      el.scrollWidth <= avail ? lo = mid : hi = mid;
    }
    el.style.fontSize = lo + 'px';
  }
  window.addEventListener('load', fitFooterName);
  window.addEventListener('resize', fitFooterName);

  // ── NEWSLETTER FORM ──
  window.handleNlSubmit = function (e) {
    e.preventDefault();
    const btn = document.getElementById('nl-btn');
    btn.textContent = '...';
    setTimeout(() => {
      document.getElementById('nl-email').value = '';
      btn.textContent = "You're in ✓";
      setTimeout(() => { btn.textContent = 'Subscribe'; }, 3000);
    }, 1000);
  };

})();
