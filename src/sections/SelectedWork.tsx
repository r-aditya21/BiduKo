"use client";
import { WORK_ITEMS } from "@/lib/data";

export default function SelectedWork() {
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
    <section className="work" id="work">
      <div className="section-head reveal">
        <p className="eyebrow">Selected Work</p>
        <h2 className="section-title">
          Featured <em>Works</em>
        </h2>
      </div>

      <div className="work__grid">
        {WORK_ITEMS.map((item) => (
          <article key={item.id} className="folder-card reveal">
            <a href="#contact" className="folder-card__link" onClick={handleLink}>
              <div className="folder">
                {/* Folder Back with Tab */}
                <div className="folder__back">
                  <div className="folder__tab">
                    <span className="folder__tag">■ {item.index} / {item.category}</span>
                  </div>
                </div>

                {/* Content/Media that rises up on hover */}
                <div className="folder__content">
                  <div className="folder__media">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="folder__img" />
                    ) : (
                      <div
                        className="folder__placeholder"
                        style={{ background: item.gradient }}
                      />
                    )}
                  </div>
                </div>

                {/* Folder Front Cover Flap */}
                <div className="folder__front" />
              </div>

              {/* Title & Subtitle Meta */}
              <div className="folder-card__meta">
                <h3 className="folder-card__name">{item.name}</h3>
                <p className="folder-card__desc">{item.description}</p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}