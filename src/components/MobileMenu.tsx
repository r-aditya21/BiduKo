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
      id="mobileMenu"
      aria-hidden={!open}
      className={`fixed inset-0 z-[400] bg-base flex items-center px-[clamp(20px,5vw,64px)] transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "translate-y-0 visible" : "-translate-y-full invisible"
      }`}
    >
      <nav aria-label="Mobile" className="flex flex-col gap-[22px] w-full">
        <a
          href="#work"
          className="font-display text-[38px] font-semibold text-ink hover:text-signal transition-colors"
          onClick={handleLink}
        >
          Work
        </a>
        <a
          href="#services"
          className="font-display text-[38px] font-semibold text-ink hover:text-signal transition-colors"
          onClick={handleLink}
        >
          Services
        </a>
        <a
          href="#about"
          className="font-display text-[38px] font-semibold text-ink hover:text-signal transition-colors"
          onClick={handleLink}
        >
          About
        </a>
        <a
          href="#process"
          className="font-display text-[38px] font-semibold text-ink hover:text-signal transition-colors"
          onClick={handleLink}
        >
          Process
        </a>
        <a
          href="#contact"
          className="font-display text-[38px] font-semibold text-ink hover:text-signal transition-colors"
          onClick={handleLink}
        >
          Contact
        </a>

        <a
          href="#contact"
          className="mt-4 self-start inline-flex items-center gap-2 font-body font-semibold text-[15px] px-[26px] py-[13px] rounded-full border-[1.5px] border-transparent whitespace-nowrap transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-panel text-panel-text hover:bg-signal hover:-translate-y-0.5"
          onClick={handleLink}
        >
          Let&apos;s Talk
        </a>

        <button
          id="themeToggleMobile"
          type="button"
          aria-pressed={theme === "dark"}
          aria-label={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}
          onClick={toggle}
          className="w-auto h-auto rounded-full py-2.5 px-[18px] gap-2.5 justify-start mt-1 bg-surface border-[1.5px] border-line flex items-center transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-signal self-start cursor-pointer"
        >
          {theme === "dark" ? (
            <svg
              className="w-[19px] h-[19px] fill-none stroke-ink stroke-[1.6] stroke-linecap-round stroke-linejoin-round mr-0.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"></path>
            </svg>
          ) : (
            <svg
              className="w-[19px] h-[19px] fill-none stroke-ink stroke-[1.6] stroke-linecap-round stroke-linejoin-round mr-0.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4.5"></circle>
              <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"></path>
            </svg>
          )}
          <span className="font-mono text-[14px] tracking-[0.04em] text-ink">
            Day / Night
          </span>
        </button>
      </nav>
    </div>
  );
}
