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
    <section
      id="marquee-section"
      className="border-y-[1.5px] border-line bg-panel text-panel-text overflow-hidden py-0.5 marquee"
      aria-label="What we work on"
    >
      <div className="flex w-max animate-marquee">
        {items.map((item, idx) => (
          <span key={`first-${idx}`} style={{ display: "contents" }}>
            <span className="font-display text-[clamp(20px,3vw,32px)] font-semibold uppercase px-5 whitespace-nowrap">
              {item}
            </span>
            <span className="text-signal text-[16px] flex items-center">
              ✦
            </span>
          </span>
        ))}
        {/* Duplicate set for seamless loop */}
        {items.map((item, idx) => (
          <span key={`second-${idx}`} style={{ display: "contents" }} aria-hidden="true">
            <span className="font-display text-[clamp(20px,3vw,32px)] font-semibold uppercase px-5 whitespace-nowrap">
              {item}
            </span>
            <span className="text-signal text-[16px] flex items-center">
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
