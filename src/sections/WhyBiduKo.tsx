import { WHY_ITEMS } from "@/lib/data";

export default function WhyBiduKo() {
  return (
    <section className="py-[clamp(64px,10vw,140px)] bg-base-alt">
      <div className="max-w-[720px] px-[clamp(20px,5vw,64px)] mx-auto mb-[clamp(40px,6vw,72px)] reveal">
        <p className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-signal mb-3.5">
          Why BiduKo
        </p>
        <h2 className="font-display text-[clamp(32px,4.4vw,54px)] font-semibold leading-[1.08] tracking-[-0.01em]">
          Not your typical agency <em className="not-italic text-ink-soft">pitch.</em>
        </h2>
      </div>

      <div className="max-w-[1360px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="grid grid-cols-4 max-[1024px]:grid-cols-2 max-[560px]:grid-cols-1 gap-[1.5px] bg-line border-[1.5px] border-line rounded-[14px] overflow-hidden">
          {WHY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-base-alt p-[34px_26px] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface reveal"
            >
              <h3 className="font-display text-[21px] font-semibold leading-[1.2] mb-3.5">
                {item.title}
                {item.subtitle && (
                  <>
                    <br />
                    {item.subtitle}
                  </>
                )}
              </h3>
              <p className="text-[14.5px] text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
