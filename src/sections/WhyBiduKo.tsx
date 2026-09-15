import { WHY_ITEMS } from "@/lib/data";

export default function WhyBiduKo() {
  return (
    <section className="why">
      <div className="section-head reveal">
        <p className="eyebrow">Why BiduKo</p>
        <h2 className="section-title">
          Not your typical agency <em>pitch.</em>
        </h2>
      </div>

      <div className="why__grid">
        {WHY_ITEMS.map((item, idx) => (
          <div key={idx} className="why-card reveal">
            <h3 className="why-card__title">
              {item.title}
              {item.subtitle && (
                <>
                  <br />
                  {item.subtitle}
                </>
              )}
            </h3>
            <p className="why-card__desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
