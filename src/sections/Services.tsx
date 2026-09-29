"use client";

import { useState, useRef, useEffect } from "react";

const SERVICES = [
  {
    index: "01",
    name: "WEBSITE DESIGN",
    tag: "DIGITAL PRESENCE",
    accent: "#FFD83D",
    rotation: "-2deg",
    accordion: [
      {
        title: "Custom UI/UX Design",
        content:
          "Thoughtful interfaces designed around your business, your audience, and the actions you want visitors to take.",
      },
      {
        title: "Responsive Development",
        content:
          "Fast, responsive websites that look and feel right across phones, tablets, and desktops.",
      },
      {
        title: "Conversion-Focused Builds",
        content:
          "Clear layouts, strong calls-to-action, and intentional user flows designed to turn visitors into customers.",
      },
    ],
  },
  {
    index: "02",
    name: "BRAND STRATEGY",
    tag: "BRAND IDENTITY",
    accent: "#FFD83D",
    rotation: "1.5deg",
    accordion: [
      {
        title: "Brand Positioning",
        content:
          "Define what makes your business different, who you're speaking to, and why people should choose you.",
      },
      {
        title: "Visual Identity",
        content:
          "A distinctive visual system covering logo, typography, color, and design direction built around your brand.",
      },
      {
        title: "Brand Guidelines",
        content:
          "A clear system that keeps your brand consistent across your website, social media, marketing, and future touchpoints.",
      },
    ],
  },
  {
    index: "03",
    name: "AI AUTOMATION",
    tag: "SMART SYSTEMS",
    accent: "#FFD83D",
    rotation: "-1deg",
    accordion: [
      {
        title: "Business Automation",
        content:
          "Automate repetitive tasks and workflows so your team spends less time on manual work and more time growing the business.",
      },
      {
        title: "AI-Powered Workflows",
        content:
          "Connect AI to the tools you already use to handle tasks like lead processing, customer support, content, and data.",
      },
      {
        title: "Custom AI Systems",
        content:
          "Practical AI solutions built around your specific business processes instead of forcing your business into a generic tool.",
      },
    ],
  },
];

export default function Services() {
  const [openItems, setOpenItems] = useState<{
    [key: string]: boolean;
  }>({});

  const wrapperRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (cardIndex: number, itemIndex: number) => {
    const key = `${cardIndex}-${itemIndex}`;

    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* =====================================================
     SCROLL-DRIVEN CARD REVEAL (desktop only)
  ====================================================== */

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    let raf = 0;

    const START = 0.05; // scroll progress where the first card starts
    const GAP = 0.27; // delay between cards
    const LEN = 0.45; // how long each card takes to slide in
    const DIRS = [1, 1, 1]; // right, 

    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const update = () => {
      const el = wrapperRef.current;
      if (!el) return;

      // Mobile: no pinning, clear inline styles so cards render normally
      if (!mq.matches) {
        cardRefs.current.forEach((c) => {
          if (c) {
            c.style.transform = "";
            c.style.opacity = "";
          }
        });
        return;
      }

      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = clamp(-rect.top / total);

      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        const t = clamp((p - (START + i * GAP)) / LEN);
        const e = easeOut(t);
        c.style.transform = `translate3d(${DIRS[i] * (1 - e) * 110}vw, 0, 0)`;
        c.style.opacity = String(clamp(t * 3));
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", update);
    };
  }, []);

  return (
    <section
      id="services"
      ref={wrapperRef}
      className="relative md:h-[300vh]"
    >
      {/* Sticky pinned layer */}
      <div
        className="
          relative
          overflow-hidden
          bg-[#1018E8]
          text-white
          py-20
          md:py-10
          min-h-screen
          md:h-screen
          md:sticky
          md:top-0
          flex
          flex-col
          md:justify-center
        "
      >
        {/* =====================================================
            BACKGROUND GRID
        ====================================================== */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            opacity-[0.55]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.32) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.32) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          }}
        />

        {/* =====================================================
            BACKGROUND DECORATION
        ====================================================== */}

        <div
          className="
            absolute
            top-[8%]
            left-[5%]
            w-3
            h-3
            rounded-full
            bg-[#FFD83D]
            shadow-[0_0_0_7px_rgba(255,216,61,0.15)]
          "
        />

        <div
          className="
            absolute
            top-[16%]
            right-[9%]
            text-[#FFD83D]
            text-5xl
            font-light
            rotate-12
            pointer-events-none
          "
        >
          +
        </div>

        <div
          className="
            absolute
            bottom-[12%]
            left-[7%]
            text-white/60
            text-4xl
            rotate-[-18deg]
            pointer-events-none
          "
        >
          *
        </div>

        {/* Curved doodle */}
        <div
          className="
            absolute
            bottom-[8%]
            right-[6%]
            w-20
            h-10
            border-b-2
            border-white/40
            rounded-[50%]
            rotate-[-15deg]
            pointer-events-none
          "
        />

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-[1100px]
            mx-auto
            px-5
            sm:px-8
            mb-16
            md:mb-4
          "
        >
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-[720px]">
              {/* Small label */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    w-7
                    h-7
                    rounded-full
                    bg-[#FFD83D]
                    text-[#1018E8]
                    font-bold
                    text-xs
                  "
                >
                  +
                </span>

                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/70">
                  What We Do
                </span>
              </div>

              <h2
                className="
                  font-display
                  font-bold
                  text-[clamp(20px,7vw,40px)]
                  leading-[0.9]
                  tracking-[-0.055em]
                "
              >
                BUILD.
                <br />
                <span className="text-[#FFD83D]">DEFINE.</span>
                <br />
                AUTOMATE.
              </h2>
            </div>

            {/* Small side text */}
            <div className="hidden md:block pt-3">
              <p
                className="
                  font-mono
                  text-[10px]
                  leading-relaxed
                  tracking-[0.12em]
                  uppercase
                  text-white/50
                  max-w-[130px]
                  text-right
                "
              >
                Three disciplines.
                <br />
                One team.
                <br />
                One direction.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            SERVICES
        ====================================================== */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-[1200px]
            mx-auto
            px-5
            sm:px-8
            grid
            grid-cols-1
            md:grid-cols-3
            gap-7
            items-start
          "
        >
          {SERVICES.map((service, cardIndex) => (
            <div
              key={service.index}
              ref={(el) => {
                cardRefs.current[cardIndex] = el;
              }}
              className="relative group"
              style={{ willChange: "transform, opacity" }}
            >
              {/* =================================================
                  BACK PAPER
              ================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  bg-white
                  opacity-80
                  shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                "
                style={{
                  transform: `translate(10px, 12px) rotate(${service.rotation})`,
                }}
              />

              {/* =================================================
                  SECOND PAPER
              ================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[#E9ECFF]
                  shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                "
                style={{
                  transform: `translate(-5px, 6px) rotate(calc(${service.rotation} * -1))`,
                }}
              />

              {/* =================================================
                  MAIN PAPER
              ================================================== */}

              <div
                className="
                  relative
                  bg-white
                  text-[#1118A8]
                  min-h-[540px]
                  md:min-h-[470px]
                  p-7
                  sm:p-9
                  shadow-[0_18px_50px_rgba(0,0,0,0.18)]
                  transition-all
                  duration-500
                  group-hover:-translate-y-2
                "
              >
                {/* =================================================
                    CARD HEADER
                ================================================== */}

                <div className="pt-0">
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="
                        font-mono
                        text-[11px]
                        tracking-[0.15em]
                        font-bold
                        text-[#1118A8]
                      "
                    >
                      {service.index}
                    </span>

                    <span
                      className="
                        font-mono
                        text-[9px]
                        tracking-[0.15em]
                        uppercase
                        text-[#1118A8]/45
                      "
                    >
                      BIDUKO
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span
                      className="
                        mt-2
                        w-3
                        h-3
                        shrink-0
                        bg-[#FFD83D]
                        rotate-45
                      "
                    />

                    <h3
                      className="
                        font-display
                        font-bold
                        text-[clamp(31px,3vw,43px)]
                        leading-[0.92]
                        tracking-[-0.05em]
                        text-[#1018E8]
                      "
                    >
                      {service.name}
                    </h3>
                  </div>

                  {/* Tag */}
                  <div className="mt-6">
                    <span
                      className="
                        inline-block
                        border
                        border-[#1018E8]/20
                        rounded-full
                        px-3
                        py-1.5
                        font-mono
                        text-[9px]
                        tracking-[0.13em]
                        uppercase
                        text-[#1018E8]/60
                      "
                    >
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    ACCORDION
                ================================================== */}

                <div className="mt-6">
                  {service.accordion.map((item, itemIndex) => {
                    const key = `${cardIndex}-${itemIndex}`;
                    const isOpen = !!openItems[key];
                    const panelId = `service-${cardIndex}-panel-${itemIndex}`;

                    return (
                      <div
                        key={key}
                        className="
                          border-t
                          border-[#1018E8]/15
                          last:border-b
                        "
                      >
                        <button
                          type="button"
                          className="
                            w-full
                            flex
                            items-center
                            justify-between
                            gap-4
                            py-4
                            text-left
                            font-display
                            text-sm
                            font-bold
                            text-[#1018E8]
                            hover:text-[#071080]
                            transition-colors
                            duration-200
                            cursor-pointer
                          "
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() =>
                            toggleAccordion(cardIndex, itemIndex)
                          }
                        >
                          <span>{item.title}</span>

                          <span
                            className="
                              flex
                              items-center
                              justify-center
                              w-6
                              h-6
                              rounded-full
                              bg-[#1018E8]
                              text-white
                              font-mono
                              text-sm
                              font-normal
                              shrink-0
                            "
                            aria-hidden="true"
                          >
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        <div
                          id={panelId}
                          className={`
                            grid
                            transition-[grid-template-rows]
                            duration-300
                            ease-in-out
                            ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                          `}
                        >
                          <div className="overflow-hidden">
                            <p
                              className={`
                                font-body
                                text-xs
                                leading-relaxed
                                text-[#1018E8]/65
                                pr-8
                                transition-all
                                duration-300
                                ${
                                  isOpen
                                    ? "pb-4 opacity-100"
                                    : "pb-0 opacity-0"
                                }
                              `}
                            >
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* =================================================
                    BOTTOM LABEL
                ================================================== */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    flex
                    items-center
                    justify-between
                    px-7
                    sm:px-9
                    py-4
                    border-t
                    border-[#1018E8]/10
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.15em]
                      uppercase
                      text-[#1018E8]/40
                    "
                  >
                    BIDUKO / 2026
                  </span>

                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.15em]
                      uppercase
                      text-[#1018E8]/40
                    "
                  >
                    {service.index}
                  </span>
                </div>

                {/* Small yellow corner accent */}
                <div
                  className="
                    absolute
                    bottom-[15px]
                    left-[18px]
                    w-2
                    h-2
                    bg-[#FFD83D]
                    rounded-full
                  "
                />
              </div>
            </div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM NOTE
        ====================================================== */}

        <div
          className="
            relative
            z-10
            max-w-[1200px]
            mx-auto
            px-5
            sm:px-8
            mt-14
            md:mt-8
            w-full
          "
        >
          <div className="flex items-center justify-between gap-6">
            <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/45">
              From idea → identity → implementation
            </p>

            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD83D]" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>
      {/* end sticky */}
    </section>
  );
}