"use client";

import { useEffect, useRef, useState } from "react";
import { STATS, StatItem } from "@/lib/data";

const TEAM = [
  {
    number: "01",
    name: "Aditya",
    role: "Design · Development",
    image: "/images/team/member-1.png",
    instagram: "https://instagram.com/username1",
    handle: "@username1",
  },
  {
    number: "02",
    name: "Member Two",
    role: "Brand · Strategy",
    image: "/team/member-2.jpg",
    instagram: "https://instagram.com/username2",
    handle: "@username2",
  },
  {
    number: "03",
    name: "Member Three",
    role: "Development · AI",
    image: "/team/member-3.jpg",
    instagram: "https://instagram.com/username3",
    handle: "@username3",
  },
  {
    number: "04",
    name: "Member Four",
    role: "Creative · Content",
    image: "/team/member-4.jpg",
    instagram: "https://instagram.com/username4",
    handle: "@username4",
  },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function StatCounter({
  stat,
  isThird,
}: {
  stat: StatItem;
  isThird?: boolean;
}) {
  const [displayValue, setDisplayValue] = useState("0" + stat.suffix);
  const elRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    function animate() {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        setDisplayValue(stat.target + stat.suffix);
        return;
      }

      const duration = 1200;
      const start = 0;
      let startTime: number | null = null;

      function step(timestamp: number) {
        if (startTime === null) startTime = timestamp;

        const progress = Math.min(
          (timestamp - startTime) / duration,
          1
        );

        const eased = 1 - Math.pow(1 - progress, 3);

        const value = Math.floor(
          eased * (stat.target - start) + start
        );

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
          if (entries.some((entry) => entry.isIntersecting)) {
            animate();
            observer.disconnect();
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(el);

      return () => observer.disconnect();
    }

    animate();
  }, [stat.target, stat.suffix]);

  return (
    <div
      ref={elRef}
      className={`py-10 max-[560px]:py-7 px-6 max-[560px]:px-4 text-center border-l-[1.5px] border-line first:border-l-0 ${
        isThird ? "max-[1024px]:border-l-0" : ""
      } reveal`}
    >
      <span className="block font-display text-[clamp(36px,5vw,56px)] font-bold text-signal">
        {displayValue}
      </span>

      <span className="block font-mono text-[12px] uppercase tracking-[0.06em] text-ink-soft mt-2">
        {stat.label}
      </span>
    </div>
  );
}

function TeamCard({
  member,
}: {
  member: (typeof TEAM)[number];
}) {
  return (
    <a
      href={member.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex
        items-center
        gap-3
        border
        border-line
        bg-base
        px-3
        py-3
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* Photo */}
      <div className="w-18 h-26 shrink-0 overflow-hidden bg-surface">
        <img
          src={member.image}
          alt={member.name}
          className="
            w-full
            h-full
            object-cover
            grayscale
            transition-all
            duration-300
            group-hover:grayscale-0
            group-hover:scale-105
          "
        />
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] text-ink-soft">
            {member.number}
          </span>

          <span className="w-3 h-px bg-line" />
        </div>

        <h3 className="font-display text-[13px] font-semibold uppercase truncate">
          {member.name}
        </h3>

        <p className="font-mono text-[8px] uppercase tracking-[0.05em] text-ink-soft truncate mt-0.5">
          {member.role}
        </p>
      </div>

      {/* Instagram */}
      <div className="flex flex-col items-end justify-between self-stretch shrink-0">
        <InstagramIcon />

        <span
          className="
            font-mono
            text-[8px]
            text-ink-soft
            opacity-0
            translate-x-1
            transition-all
            duration-300
            group-hover:opacity-100
            group-hover:translate-x-0
          "
        >
          ↗
        </span>
      </div>
    </a>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="
        pt-[clamp(64px,10vw,140px)]
        pb-[clamp(60px,8vw,100px)]
        bg-base
      "
    >
      <div
        className="
          max-w-[1360px]
          mx-auto
          px-[clamp(20px,5vw,64px)]
          grid
          grid-cols-[1.1fr_0.9fr]
          max-[1024px]:grid-cols-1
          gap-[60px]
          items-center
          mb-[clamp(56px,8vw,100px)]
        "
      >
        {/* ABOUT COPY */}
        <div className="reveal">
          <p className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-signal mb-3.5">
            About BiduKo
          </p>

          <h2 className="font-display text-[clamp(32px,4.4vw,54px)] font-semibold leading-[1.08] tracking-[-0.01em]">
            We turn ideas into{" "}
            <em className="not-italic text-ink-soft">
              things people use.
            </em>
          </h2>

          <p className="text-[17px] text-ink-soft max-w-[52ch] mt-5">
            BiduKo combines design, engineering, strategy and a genuine
            curiosity about how things work. We&apos;re not interested in
            decks that only exist to win the pitch — we build the version
            that ships, gets used, and gets better.
          </p>

          <p className="text-[17px] text-ink-soft max-w-[52ch] mt-3.5">
            Small studio, direct access to the people doing the work, no
            account managers relaying messages between you and us.
          </p>
        </div>

        {/* TEAM */}
        <div className="max-[1024px]:-order-1">
          <div className="max-w-[500px] ml-auto max-[1024px]:mx-auto w-full">
            {/* Small heading */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                The people behind it
              </span>

              <span className="font-mono text-[10px] text-ink-soft">
                04 MEMBERS
              </span>
            </div>

            {/* Profile cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {TEAM.map((member) => (
                <TeamCard key={member.number} member={member} />
              ))}
            </div>

            {/* Instagram note */}
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-signal" />

              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-soft">
                Follow the people behind BiduKo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      {/*
      <div
        id="stats"
        className="
          border-y-[1.5px]
          border-line
          grid
          grid-cols-4
          max-[1024px]:grid-cols-2
        "
      >
        {STATS.map((stat, idx) => (
          <StatCounter
            key={idx}
            stat={stat}
            isThird={idx === 2}
          />
        ))}
      </div>
      */}
    </section>
  );
}