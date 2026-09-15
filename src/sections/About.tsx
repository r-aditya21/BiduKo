"use client";
import { useEffect, useRef, useState } from "react";
import { STATS, StatItem } from "@/lib/data";

function StatCounter({ stat }: { stat: StatItem }) {
  const [displayValue, setDisplayValue] = useState("0" + stat.suffix);
  const elRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    function animate() {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setDisplayValue(stat.target + stat.suffix);
        return;
      }

      const start = 0;
      const duration = 1200;
      let startTime: number | null = null;

      function step(timestamp: number) {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * (stat.target - start) + start);
        setDisplayValue(value + stat.suffix);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    } else {
      animate();
    }
  }, [stat.target, stat.suffix]);

  return (
    <div className="stat reveal" ref={elRef}>
      <span className="stat__num" data-count={stat.target} data-suffix={stat.suffix}>
        {displayValue}
      </span>
      <span className="stat__label">{stat.label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__grid">
        <div className="about__copy reveal">
          <p className="eyebrow">About BiduKo</p>
          <h2 className="section-title">
            We turn ideas into <em>things people use.</em>
          </h2>
          <p className="about__text">
            BiduKo combines design, engineering, strategy and a genuine curiosity about how
            things work. We&apos;re not interested in decks that only exist to win the pitch — we
            build the version that ships, gets used, and gets better.
          </p>
          <p className="about__text">
            Small studio, direct access to the people doing the work, no account managers
            relaying messages between you and us.
          </p>
        </div>

        <div className="about__mascot">
          {/* MASCOT IMAGE HERE */}
          <div className="mascot-slot mascot-slot--about" aria-hidden="true"></div>
        </div>
      </div>

      <div className="stats" id="stats">
        {STATS.map((stat, idx) => (
          <StatCounter key={idx} stat={stat} />
        ))}
      </div>
    </section>
  );
}
