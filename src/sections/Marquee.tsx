export default function Marquee() {
  const items = [
    "Digital Experiences",
    "Creative Development",
    "Brand Systems",
    "Web Design",
    "Motion & Interaction",
    "AI Automation",
    "Product Design",
  ];

  return (
    <section className="marquee" aria-label="What we work on">
      <div className="marquee__track">
        {items.map((item, idx) => (
          <span key={`first-${idx}`} style={{ display: "contents" }}>
            <span className="marquee__item">{item}</span>
            <span className="marquee__dot">✦</span>
          </span>
        ))}
        {/* Duplicate set for seamless loop */}
        {items.map((item, idx) => (
          <span key={`second-${idx}`} style={{ display: "contents" }} aria-hidden="true">
            <span className="marquee__item">{item}</span>
            <span className="marquee__dot">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
