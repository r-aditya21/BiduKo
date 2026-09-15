"use client";
import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const { theme, toggle } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleLink(e: React.MouseEvent<HTMLAnchorElement>) {
    onClose();
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      setTimeout(() => {
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target) {
          const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        }
      }, 350);
    }
  }

  return (
    <div
      className={`mobile-menu${open ? " is-open" : ""}`}
      id="mobileMenu"
      aria-hidden={!open}
    >
      <nav aria-label="Mobile">
        <a href="#work" className="mobile-menu__link" onClick={handleLink}>Work</a>
        <a href="#services" className="mobile-menu__link" onClick={handleLink}>Services</a>
        <a href="#about" className="mobile-menu__link" onClick={handleLink}>About</a>
        <a href="#process" className="mobile-menu__link" onClick={handleLink}>Process</a>
        <a href="#contact" className="mobile-menu__link" onClick={handleLink}>Contact</a>
        <a href="#contact" className="btn btn--primary mobile-menu__cta" onClick={handleLink}>Let&apos;s Talk</a>

        <button
          className="theme-toggle theme-toggle--mobile"
          id="themeToggleMobile"
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
          <span className="theme-toggle__label">Day / Night</span>
        </button>
      </nav>
    </div>
  );
}
