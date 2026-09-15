"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar({ onMenuToggle, menuOpen }: { onMenuToggle: () => void; menuOpen: boolean }) {
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    function onScroll() {
      const y = window.scrollY;
      nav!.classList.toggle("is-scrolled", y > 12);
      if (y > lastScrollY.current && y > 160) {
        nav!.classList.add("is-hidden");
      } else {
        nav!.classList.remove("is-hidden");
      }
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavLink(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }
  }

  return (
    <header className="navbar" id="navbar" ref={navRef}>
      <div className="navbar__inner">
        <a href="#top" className="navbar__logo" aria-label="BiduKo home" onClick={handleNavLink}>
          <span className="navbar__logo-mark">Bi</span>
          <span className="navbar__logo-text">duKo</span>
        </a>

        <nav className="navbar__nav" id="primary-nav" aria-label="Primary">
          <a href="#work" className="navbar__link" onClick={handleNavLink}>Work</a>
          <a href="#services" className="navbar__link" onClick={handleNavLink}>Services</a>
          <a href="#about" className="navbar__link" onClick={handleNavLink}>About</a>
          <a href="#process" className="navbar__link" onClick={handleNavLink}>Process</a>
          <a href="#contact" className="navbar__link" onClick={handleNavLink}>Contact</a>
        </nav>

        <button
          className="theme-toggle"
          id="themeToggle"
          type="button"
          aria-pressed={theme === "dark"}
          aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
          onClick={toggle}
        >
          <svg className="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5"></circle>
            <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"></path>
          </svg>
          <svg className="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"></path>
          </svg>
        </button>

        <a href="#contact" className="btn btn--primary navbar__cta" onClick={handleNavLink}>Let&apos;s Talk</a>

        <button
          className="navbar__toggle"
          id="navToggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobileMenu"
          onClick={onMenuToggle}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
