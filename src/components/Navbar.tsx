"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar({
  onMenuToggle,
  menuOpen,
}: {
  onMenuToggle: () => void;
  menuOpen: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setIsScrolled(y > 12);
      if (y > lastScrollY.current && y > 160) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
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
        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        target.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start",
        });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }
  }

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[500] px-[clamp(20px,5vw,64px)] transition-all duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled
          ? "navbar-scrolled"
          : "py-[18px] bg-transparent"
      } ${isHidden ? "-translate-y-[110%]" : "translate-y-0"}`}
    >
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-6">
        <a
          href="#top"
          className="font-display font-bold text-[22px] tracking-[-0.02em] flex items-center"
          aria-label="BiduKo home"
          onClick={handleNavLink}
        >
          <span className="bg-panel text-panel-text px-1.5 py-0.5 rounded-[5px] mr-[1px]">
            Bi
          </span>
          <span>duKo</span>
        </a>

        <nav
          id="primary-nav"
          className="hidden min-[861px]:flex items-center gap-8 mx-auto"
          aria-label="Primary"
        >
          {["work", "services", "about", "process", "contact"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="text-[14.5px] font-medium relative py-1 capitalize after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:w-full after:h-[1.5px] after:bg-ink after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-[220ms] after:ease-[cubic-bezier(0.22,1,0.36,1)]"
              onClick={handleNavLink}
            >
              {section === "work" ? "Work" : section === "services" ? "Services" : section === "about" ? "About" : section === "process" ? "Process" : "Contact"}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            id="themeToggle"
            type="button"
            className="relative w-10 h-10 rounded-full bg-surface border-[1.5px] border-line shrink-0 flex items-center justify-center transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-signal hover:-translate-y-0.5"
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
            onClick={toggle}
          >
            {/* Sun Icon */}
            <svg
              className={`absolute w-[19px] h-[19px] fill-none stroke-ink stroke-[1.6] stroke-linecap-round stroke-linejoin-round transition-all duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                theme === "dark"
                  ? "opacity-0 -rotate-90 scale-50"
                  : "opacity-100 rotate-0 scale-100"
              }`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4.5"></circle>
              <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"></path>
            </svg>
            {/* Moon Icon */}
            <svg
              className={`absolute w-[19px] h-[19px] fill-none stroke-ink stroke-[1.6] stroke-linecap-round stroke-linejoin-round transition-all duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                theme === "dark"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-50"
              }`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"></path>
            </svg>
          </button>

          <a
            href="#contact"
            className="hidden min-[861px]:inline-flex items-center gap-2 font-body font-semibold text-[15px] px-[26px] py-[13px] rounded-full border-[1.5px] border-transparent whitespace-nowrap transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-panel text-panel-text hover:bg-signal hover:-translate-y-0.5 shrink-0"
            onClick={handleNavLink}
          >
            Let&apos;s Talk
          </a>

          <button
            id="navToggle"
            className="flex min-[861px]:hidden flex-col justify-center gap-[5px] w-10 h-10 bg-transparent border-0 shrink-0 p-2 cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={onMenuToggle}
          >
            <span
              className={`block w-[22px] h-[2px] bg-ink transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            ></span>
            <span
              className={`block w-[22px] h-[2px] bg-ink transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-[22px] h-[2px] bg-ink transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>
    </header>
  );
}
