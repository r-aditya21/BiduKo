"use client";

import { useEffect, useRef, useState } from "react";
import { STATS, StatItem } from "@/lib/data";

/* =========================================================
   STAT COUNTER
========================================================= */

function StatCounter({ stat }: { stat: StatItem }) {
  const [displayValue, setDisplayValue] = useState(
    "0" + stat.suffix
  );

  const statRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const element = statRef.current;

    if (!element) return;

    const animate = () => {
      if (animatedRef.current) return;

      animatedRef.current = true;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        setDisplayValue(stat.target + stat.suffix);
        return;
      }

      const duration = 1000;
      const startTime = performance.now();

      const update = (currentTime: number) => {
        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(
          eased * stat.target
        );

        setDisplayValue(
          currentValue + stat.suffix
        );

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        },
        {
          threshold: 0.3,
        }
      );

      observer.observe(element);

      return () => observer.disconnect();
    }

    animate();
  }, [stat.target, stat.suffix]);

  return (
    <div
      ref={statRef}
      className="
        relative
        px-5
        py-5
        max-[560px]:px-4
        max-[560px]:py-4
        text-center

        border-l
        border-white/20

        first:border-l-0

        max-[1024px]:nth-child(3)
        max-[1024px]:nth-child(3)
        max-[1024px]:nth-child(4)

        max-[1024px]:first:border-l-0

        max-[600px]:nth-child(3)
        max-[600px]:border-l
        max-[600px]:nth-child(odd):border-l-0
      "
    >
      {/* Number */}
      <span
        className="
          block
          font-display
          text-[clamp(28px,4vw,42px)]
          font-bold
          leading-none
          tracking-[-0.03em]
          text-[#FFD42A]
        "
      >
        {displayValue}
      </span>

      {/* Label */}
      <span
        className="
          block
          mt-2
          font-mono
          text-[9px]
          uppercase
          tracking-[0.1em]
          text-white/60
        "
      >
        {stat.label}
      </span>
    </div>
  );
}

/* =========================================================
   STATS SECTION
========================================================= */

export default function Stats() {
  return (
    <section
      id="stats"
      className="
      px-40
        relative
        overflow-hidden
        bg-[#151BE8]
        text-white
      "
    >
      {/* =====================================================
          GRID BACKGROUND
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.12) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-[1]">

        {/* Small top border */}
        <div className="border-t border-white/20" />

        {/* Stats */}
        <div
          className="
            grid
            grid-cols-4

            max-[1024px]:grid-cols-2

            max-[600px]:grid-cols-2

            border-b
            border-white/20
          "
        >
          {STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              stat={stat}
            />
          ))}
        </div>

      </div>
    </section>
  );
}