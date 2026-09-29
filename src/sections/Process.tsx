"use client";
import { useEffect, useRef } from "react";
import { PROCESS_STEPS } from "@/lib/data";

export default function Process() {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateFill() {
      const processSection = listRef.current;
      const processFill = fillRef.current;
      if (!processSection || !processFill) return;

      const rect = processSection.getBoundingClientRect();
      const vh = window.innerHeight;

      const total = rect.height + vh * 0.5;
      const scrolled = vh - rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / total));

      processFill.style.height = `${pct * 100}%`;
    }

    window.addEventListener("scroll", updateFill, { passive: true });
    window.addEventListener("resize", updateFill);
    updateFill();

    return () => {
      window.removeEventListener("scroll", updateFill);
      window.removeEventListener("resize", updateFill);
    };
  }, []);

  return (
    <section id="process" className="py-[clamp(64px,10vw,140px)]">
      <div className="max-w-[720px] px-[clamp(20px,5vw,64px)] mx-auto mb-[clamp(40px,6vw,72px)] reveal">
        <p className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-signal mb-3.5">
          How It Works
        </p>
        <h2 className="font-display text-[clamp(32px,4.4vw,54px)] font-semibold leading-[1.08] tracking-[-0.01em]">
          Five steps. <em className="not-italic text-ink-soft">No surprises.</em>
        </h2>
      </div>

      <div className="max-w-[760px] mx-auto px-[clamp(20px,5vw,64px)] relative" ref={listRef}>
        {/* Vertical timeline line */}
        <div
          className="absolute left-[calc(clamp(20px,5vw,64px)+27px)] top-3 bottom-3 w-[2px] bg-line"
          aria-hidden="true"
        >
          <div
            id="processFill"
            ref={fillRef}
            className="w-full h-0 bg-signal transition-[height] duration-200 ease-linear"
          ></div>
        </div>

        {PROCESS_STEPS.map((step) => (
          <div key={step.index} className="flex gap-7 items-start py-[26px] relative reveal">
            <span className="font-mono text-[15px] text-panel-text bg-panel w-14 h-14 min-w-14 rounded-full flex items-center justify-center z-[1] shrink-0">
              {step.index}
            </span>
            <div>
              <h3 className="font-display text-[24px] font-semibold mb-1.5">{step.title}</h3>
              <p className="text-[15px] text-ink-soft max-w-[48ch]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
