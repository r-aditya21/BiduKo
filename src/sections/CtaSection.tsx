export default function CtaSection() {
  return (
    <section
      id="contact"
      className="relative min-h-[70vh] max-[560px]:min-h-[56vh] flex items-center justify-center text-center bg-panel text-panel-text rounded-[28px] max-[560px]:rounded-[14px] mx-[clamp(20px,5vw,64px)] max-[560px]:mx-3 overflow-hidden before:content-[''] before:absolute before:inset-0 cta-matrix-bg before:pointer-events-none"
    > 

      <div className="relative z-[1] py-10 px-[clamp(20px,5vw,64px)] reveal">
        <h2 className="font-display text-[clamp(32px,6.4vw,76px)] font-bold leading-[1.06] tracking-[-0.01em] uppercase mb-10">
          LET&apos;S MAKE SOMETHING
          <br />
          <em className="not-italic text-signal">WORTH REMEMBERING.</em>
        </h2>
        <a
          href="mailto:hello@biduko.studio"
          className="inline-flex items-center justify-center gap-2 font-body font-semibold text-[17px] px-[34px] py-[18px] rounded-full border-[1.5px] border-transparent whitespace-nowrap transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-signal text-panel-text hover:bg-panel-text hover:text-panel hover:-translate-y-0.5 group"
        >
          Start a Project{" "}
          <span className="inline-block transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
