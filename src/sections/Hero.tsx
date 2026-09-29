"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import StickerLayer from "./StickerLayer";

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

  // Mouse tracking
  // Coordinate readout still follows the mouse,
  // but NO hover/tracking class is added to the hero.
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

        // Keep coordinates for the readout
        hero.style.setProperty("--mx", `${x}px`);
        hero.style.setProperty("--my", `${y}px`);

        const cx = String(Math.max(0, Math.round(x))).padStart(3, "0");
        const cy = String(Math.max(0, Math.round(y))).padStart(3, "0");

        setCoords(`X ${cx} · Y ${cy}`);
      }

      hero.addEventListener("mousemove", onMouseMove);

      return () => {
        clearTimeout(timer);
        hero.removeEventListener("mousemove", onMouseMove);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  function handleScrollCue() {
    const marquee = document.getElementById("marquee-section");

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
    <section
      id="top"
      ref={heroRef}
      className="hero relative min-h-[100svh] flex flex-col justify-center items-start pt-[140px] max-[860px]:pt-[120px] pb-[100px] px-[clamp(20px,5vw,64px)] overflow-hidden text-left"
    >
      {/* Blueprint grid - ALWAYS VISIBLE */}
      <div
        className="hero__blueprint"
        id="blueprint"
        aria-hidden="true"
      ></div>

      {/* Draggable stickers */}
      <StickerLayer />

      {/* Coordinate readout */}
      <div
        className="hero__coord absolute left-[var(--mx,0)] top-[var(--my,0)] translate-x-4 -translate-y-1/2 font-mono text-[11px] tracking-[0.06em] text-signal bg-surface border border-line py-[3px] px-2 rounded-[4px] opacity-0 transition-opacity duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none whitespace-nowrap"
        id="coordReadout"
        aria-hidden="true"
      >
        {coords}
      </div>

      {/* Main Content */}
      <div className="relative z-[2] max-w-[1040px] w-full flex flex-col items-start text-left pl-[15px]">
        {/* Eyebrow */}
        <p className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-signal mb-3.5 reveal">
          Digital studio &nbsp;·&nbsp; Design &nbsp;·&nbsp; Development
          &nbsp;·&nbsp; Creative
        </p>

        {/* Heading */}
        <h1 className="font-display text-[clamp(40px,8.6vw,108px)] font-bold leading-[0.98] tracking-[-0.02em] mt-1.5 mb-10 uppercase text-left w-full">
          {/* First line */}
          <span className="reveal-line flex justify-start whitespace-nowrap">
            <span className="reveal-line__inner whitespace-nowrap">
              GOOD IDEAS DESERVE
            </span>
          </span>

          {/* Animated second line */}
          <span className="reveal-line flex justify-start">
            <span className="reveal-line__inner">
              <span className="inline-flex items-baseline relative w-[9.5em] h-[1.1em] whitespace-nowrap justify-start">
                <em
                  ref={textRef}
                  className="inline-block not-italic text-signal"
                >
                  EXECUTION.
                </em>

                {/* Cursor */}
                <span
                  className="inline-block w-[0.055em] h-[0.82em] bg-signal ml-[0.08em] align-baseline animate-cursor-blink motion-reduce:animate-none motion-reduce:opacity-100"
                  aria-hidden="true"
                ></span>
              </span>
            </span>
          </span>
        </h1>

        {/* Description + Buttons */}
        <div className="max-w-[640px] flex flex-col items-start text-left reveal">
          <p className="text-[18px] text-ink-soft mb-8 leading-[1.6]">
            BiduKo is a digital studio for founders, brands and teams
            who&apos;d rather ship something great than talk about it.
            We design it, build it, and wire it up to run itself.
          </p>

          <div className="flex justify-start gap-3.5 flex-wrap max-[560px]:flex-col max-[560px]:items-stretch w-full">
            {/* Start Project */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 font-body font-semibold text-[15px] px-[26px] py-[13px] rounded-full border-[1.5px] border-transparent whitespace-nowrap transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-panel text-panel-text hover:bg-signal hover:-translate-y-0.5 group"
              onClick={handleLink}
            >
              Start a Project
            </a>

            {/* View Work */}
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 font-body font-semibold text-[15px] px-[26px] py-[13px] rounded-full border-[1.5px] border-line whitespace-nowrap transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-transparent text-ink hover:border-ink hover:-translate-y-0.5 group"
              onClick={handleLink}
            >
              View Our Work{" "}
              <span className="inline-block transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mascot slot */}
      {/* 
      <div
        className="mascot-slot absolute right-[clamp(16px,6vw,90px)] bottom-[8%] w-[260px] h-[260px] max-[1100px]:hidden"
        aria-hidden="true"
      ></div>
      */}

      {/* Scroll cue */}
      <button
        className="absolute bottom-9 left-[clamp(20px,5vw,64px)] bg-transparent border-0 flex flex-col items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-ink-soft cursor-pointer p-0"
        id="scrollCue"
        aria-label="Scroll to marquee"
        onClick={handleScrollCue}
      >
        <span>Scroll</span>

        <span className="w-[1px] h-[34px] bg-line relative overflow-hidden after:content-[''] after:absolute after:top-[-100%] after:left-0 after:right-0 after:h-full after:bg-signal after:animate-scroll-line"></span>
      </button>
    </section>
  );
}