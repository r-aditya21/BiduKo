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
    <section className="process" id="process">
      <div className="section-head reveal">
        <p className="eyebrow">How It Works</p>
        <h2 className="section-title">
          Five steps. <em>No surprises.</em>
        </h2>
      </div>

      <div className="process__list" ref={listRef}>
        <div className="process__line" aria-hidden="true">
          <div className="process__line-fill" id="processFill" ref={fillRef}></div>
        </div>

        {PROCESS_STEPS.map((step) => (
          <div key={step.index} className="process-step reveal">
            <span className="process-step__num">{step.index}</span>
            <div>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
