"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP TextPlugin
gsap.registerPlugin(TextPlugin);

const WORDS = ["EXECUTION.", "PLANNING.", "DESIGNING.", "DEVELOPMENT."];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const [coords, setCoords] = useState("X 000 · Y 000");

  // GSAP Typewriter & Backspacing Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return;

      const tl = gsap.timeline({ repeat: -1 });

      WORDS.forEach((word) => {
        // Type word
        tl.to(textRef.current, {
          duration: word.length * 0.09,
          text: word,
          ease: "none",
        })
          // Pause at full word
          .to({}, { duration: 1.8 })
          // Backspace word
          .to(textRef.current, {
            duration: word.length * 0.04,
            text: "",
            ease: "none",
          });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse tracking & hero entrance effects
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const timer = setTimeout(() => {
      hero.classList.add("is-loaded");
    }, 60);

    const isTouch = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isTouch && !prefersReduced) {
      function onMouseMove(e: MouseEvent) {
        if (!hero) return;

        const rect = hero.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        hero.style.setProperty("--mx", `${x}px`);
        hero.style.setProperty("--my", `${y}px`);

        hero.classList.add("is-tracking");

        const cx = String(Math.max(0, Math.round(x))).padStart(3, "0");
        const cy = String(Math.max(0, Math.round(y))).padStart(3, "0");

        setCoords(`X ${cx} · Y ${cy}`);
      }

      function onMouseLeave() {
        if (!hero) return;

        hero.classList.remove("is-tracking");
      }

      hero.addEventListener("mousemove", onMouseMove);
      hero.addEventListener("mouseleave", onMouseLeave);

      return () => {
        clearTimeout(timer);

        hero.removeEventListener("mousemove", onMouseMove);
        hero.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  function handleScrollCue() {
    const marquee = document.querySelector(".marquee");

    if (marquee) {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      marquee.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
      });
    }
  }

  function handleLink(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();

      const id = href.slice(1);
      const target = document.getElementById(id);

      if (target) {
        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        target.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start",
        });
      }
    }
  }

  return (
    <section className="hero" id="top" ref={heroRef}>
      {/* Blueprint grid reveal layer */}
      <div
        className="hero__blueprint"
        id="blueprint"
        aria-hidden="true"
      ></div>

      {/* Coordinate readout */}
      <div
        className="hero__coord"
        id="coordReadout"
        aria-hidden="true"
      >
        {coords}
      </div>

      <div className="hero__inner">
        <p className="eyebrow reveal">
          Digital studio &nbsp;·&nbsp; Design &nbsp;·&nbsp; Development
          &nbsp;·&nbsp; Creative
        </p>

        <h1 className="hero__headline">
          <span className="reveal-line">
            <span className="reveal-line__inner">
              GOOD IDEAS
            </span>
          </span>

          <span className="reveal-line">
            <span className="reveal-line__inner">
              DESERVE BETTER
            </span>
          </span>

          <span className="reveal-line">
            <span className="reveal-line__inner">
              {/* Fixed-size animated word container */}
              <span className="hero__word-slot">
                <em ref={textRef}>EXECUTION.</em>

                {/* Blinking cursor */}
                <span
                  className="hero__cursor"
                  aria-hidden="true"
                ></span>
              </span>
            </span>
          </span>
        </h1>

        <div className="hero__foot reveal">
          <p className="hero__sub">
            BiduKo is a digital studio for founders, brands and teams
            who&apos;d rather ship something great than talk about it.
            We design it, build it, and wire it up to run itself.
          </p>

          <div className="hero__ctas">
            <a
              href="#contact"
              className="btn btn--primary"
              onClick={handleLink}
            >
              Start a Project
            </a>

            <a
              href="#work"
              className="btn btn--ghost"
              onClick={handleLink}
            >
              View Our Work <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mascot slot */}
      <div
        className="mascot-slot mascot-slot--hero"
        aria-hidden="true"
      ></div>

      {/* Scroll cue */}
      <button
        className="hero__scroll-cue"
        id="scrollCue"
        aria-label="Scroll to marquee"
        onClick={handleScrollCue}
      >
        <span>Scroll</span>
        <span className="hero__scroll-line"></span>
      </button>
    </section>
  );
}
