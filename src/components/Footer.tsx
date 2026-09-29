"use client";

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
    <footer className="max-w-[1360px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(60px,8vw,100px)] pb-[30px]">
      <div className="grid grid-cols-1 min-[861px]:grid-cols-[1.2fr_1fr_1fr] gap-7 min-[861px]:gap-10 pb-10 border-b-[1.5px] border-line">
        <div>
          <a
            href="#top"
            className="font-display font-bold text-[22px] tracking-[-0.02em] flex items-center mb-3.5"
            onClick={handleLink}
          >
            <span className="bg-panel text-panel-text px-1.5 py-0.5 rounded-[5px] mr-[1px]">
              Bi
            </span>
            <span>duKo</span>
          </a>
          <p className="text-ink-soft text-[15px] max-w-[30ch]">
            Digital experiences for ambitious ideas.
          </p>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Footer">
          {["work", "services", "about", "contact"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={handleLink}
              className="text-[15px] font-medium w-fit hover:text-signal transition-colors capitalize"
            >
              {section === "work" ? "Work" : section === "services" ? "Services" : section === "about" ? "About" : "Contact"}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 items-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft mb-3">
            Find us here
          </p>
          <a
            href="https://instagram.com"
            className="text-[15px] font-medium hover:text-signal transition-colors"
            target="_blank"
            rel="noopener"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            className="text-[15px] font-medium hover:text-signal transition-colors"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            className="text-[15px] font-medium hover:text-signal transition-colors"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          <a
            href="mailto:hello@biduko.studio"
            className="text-[15px] font-medium hover:text-signal transition-colors"
          >
            hello@biduko.studio
          </a>
        </div>
      </div>

      <div className="flex flex-col min-[861px]:flex-row justify-between pt-6 font-mono text-[12px] text-ink-soft gap-1.5 min-[861px]:gap-0">
        <span>&copy; 2026 BiduKo Studio</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
