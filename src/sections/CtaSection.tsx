export default function CtaSection() {
  return (
    <section className="cta" id="contact">
      {/* MASCOT IMAGE HERE */}
      <div className="mascot-slot mascot-slot--cta" aria-hidden="true"></div>

      <div className="cta__inner reveal">
        <h2 className="cta__headline">
          LET&apos;S MAKE SOMETHING
          <br />
          <em>WORTH REMEMBERING.</em>
        </h2>
        <a href="mailto:hello@biduko.studio" className="btn btn--primary btn--lg">
          Start a Project <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
