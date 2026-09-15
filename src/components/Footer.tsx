export default function Footer() {
  function handleLink(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      }
    }
  }

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <a href="#top" className="navbar__logo footer__logo" onClick={handleLink}>
            <span className="navbar__logo-mark">Bi</span>
            <span className="navbar__logo-text">duKo</span>
          </a>
          <p className="footer__tag">Digital experiences for ambitious ideas.</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <a href="#work" onClick={handleLink}>Work</a>
          <a href="#services" onClick={handleLink}>Services</a>
          <a href="#about" onClick={handleLink}>About</a>
          <a href="#contact" onClick={handleLink}>Contact</a>
        </nav>

        <div className="footer__contact">
          <p className="footer__label">Find us here</p>
          <a href="https://instagram.com" className="footer__social" target="_blank" rel="noopener">Instagram</a>
          <a href="https://linkedin.com" className="footer__social" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://github.com" className="footer__social" target="_blank" rel="noopener">GitHub</a>
          <a href="mailto:hello@biduko.studio" className="footer__email">hello@biduko.studio</a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>&copy; 2026 BiduKo Studio</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
