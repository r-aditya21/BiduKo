"use client";

import { WORK_ITEMS } from "@/lib/data";

export default function SelectedWork() {
  return (
    <>
      <section
        id="work"
        className="
          work-grid-bg
          relative
          overflow-hidden
          py-[clamp(48px,6vw,80px)]
          px-5
          sm:px-8
          min-h-screen
        "
      >
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div
          className="
            relative
            z-10
            max-w-[1200px]
            mx-auto
            mb-[clamp(28px,4vw,48px)]
            reveal
          "
        >
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-signal mb-2.5">
                Selected Work
              </p>

              <h2
                className="
                  font-display
                  text-[clamp(34px,4vw,52px)]
                  font-semibold
                  leading-[0.98]
                  tracking-[-0.035em]
                "
              >
                Featured{" "}
                <em className="not-italic text-ink-soft">
                  Works
                </em>
              </h2>
            </div>

            <p
              className="
                hidden
                md:block
                max-w-[190px]
                pb-1
                font-mono
                text-[9px]
                leading-[1.6]
                tracking-[0.12em]
                uppercase
                text-ink-soft
                text-right
              "
            >
              A selection of identities,
              <br />
              digital experiences
              <br />
              and experiments.
            </p>
          </div>
        </div>

        {/* =====================================================
            PROJECT GRID
        ====================================================== */}

        <div
          className="
            relative
            z-10
            max-w-[900px]
            mx-auto
            grid
            grid-cols-1
            md:grid-cols-2
            gap-x-[clamp(18px,2.5vw,32px)]
            gap-y-[clamp(24px,3vw,38px)]
          "
        >
          {WORK_ITEMS.slice(0, 4).map((item, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <article
                key={item.id}
                className="
                  reveal
                  group
                  min-w-0
                "
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    block
                    text-inherit
                    no-underline
                  "
                >
                  {/* =================================================
                      PROJECT CARD
                  ================================================== */}

                  <div
                    className="
                      relative
                      [perspective:1200px]
                    "
                  >
                    {/* Back sheet */}
                    <div
                      className={`
                        absolute
                        inset-0
                        border
                        border-line
                        transition-transform
                        duration-500
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${
                          isEven
                            ? "rotate-[1.2deg]"
                            : "rotate-[-1.2deg]"
                        }
                      `}
                      style={{
                        background: isEven
                          ? "#E9EBEE"
                          : "#E3E6EA",
                      }}
                    />

                    {/* =================================================
                        MAIN CARD
                    ================================================== */}

                    <div
                      className="
                        relative
                        bg-surface
                        border
                        border-line
                        p-[10px]
                        transition-all
                        duration-500
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:-translate-y-2
                        group-hover:shadow-[0_18px_38px_rgba(0,0,0,0.12)]
                      "
                    >
                      {/* ===============================================
                          CARD TOP BAR
                      ================================================ */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          px-2
                          py-2
                        "
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="
                              w-2
                              h-2
                              rounded-full
                              bg-signal
                            "
                          />

                          <span
                            className="
                              font-mono
                              text-[9px]
                              tracking-[0.13em]
                              uppercase
                              font-semibold
                              text-ink
                            "
                          >
                            {item.index}
                          </span>
                        </div>

                        <span
                          className="
                            font-mono
                            text-[8px]
                            tracking-[0.14em]
                            uppercase
                            text-ink-soft
                          "
                        >
                          BIDUKO / WORK
                        </span>
                      </div>

                      {/* ===============================================
                          IMAGE
                      ================================================ */}

                      <div
                        className="
                          relative
                          w-full
                          aspect-[1.75/1]
                          overflow-hidden
                          bg-base-alt
                        "
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="
                              block
                              w-full
                              h-full
                              object-cover
                              transition-transform
                              duration-700
                              ease-[cubic-bezier(0.22,1,0.36,1)]
                              group-hover:scale-[1.035]
                            "
                          />
                        ) : (
                          <div
                            className="w-full h-full"
                            style={{
                              background:
                                item.gradient,
                            }}
                          />
                        )}

                        {/* Subtle image overlay */}
                        <div
                          className="
                            absolute
                            inset-0
                            bg-black
                            opacity-0
                            group-hover:opacity-[0.035]
                            transition-opacity
                            duration-300
                          "
                        />

                        {/* Project number */}
                        <div
                          className="
                            absolute
                            top-3
                            left-3
                            px-2
                            py-1
                            bg-surface/90
                            backdrop-blur-sm
                            border
                            border-line
                          "
                        >
                          <span
                            className="
                              font-mono
                              text-[8px]
                              tracking-[0.12em]
                              text-ink
                            "
                          >
                            {item.index}
                          </span>
                        </div>

                        {/* Open indicator */}
                        <div
                          className="
                            absolute
                            bottom-3
                            right-3
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            bg-surface
                            text-ink
                            border
                            border-line
                            transition-all
                            duration-300
                            group-hover:bg-signal
                            group-hover:text-white
                            group-hover:border-signal
                          "
                        >
                          <span
                            className="
                              text-sm
                              transition-transform
                              duration-300
                              group-hover:rotate-[-45deg]
                            "
                          >
                            ↗
                          </span>
                        </div>
                      </div>

                      {/* ===============================================
                          PROJECT INFO
                      ================================================ */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                          px-2
                          pt-4
                          pb-2
                        "
                      >
                        <div className="min-w-0">
                          <h3
                            className="
                              font-display
                              text-[clamp(20px,2.2vw,28px)]
                              font-semibold
                              leading-none
                              tracking-[-0.025em]
                              truncate
                              transition-colors
                              duration-200
                              group-hover:text-signal
                            "
                          >
                            {item.name}
                          </h3>

                          <p
                            className="
                              mt-1.5
                              font-mono
                              text-[8px]
                              tracking-[0.13em]
                              uppercase
                              text-ink-soft
                            "
                          >
                            View project
                          </p>
                        </div>

                        {/* Yellow accent */}
                        <div
                          className="
                            shrink-0
                            w-3
                            h-3
                            bg-signal
                            rotate-45
                            transition-transform
                            duration-500
                            group-hover:rotate-[135deg]
                          "
                        />
                      </div>

                      {/* Bottom accent */}
                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-[2px]
                          w-full
                          bg-signal
                          origin-left
                          scale-x-0
                          group-hover:scale-x-100
                          transition-transform
                          duration-500
                          ease-[cubic-bezier(0.22,1,0.36,1)]
                        "
                      />
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>

        {/* =====================================================
            FOOTER LINE
        ====================================================== */}

        <div
          className="
            relative
            z-10
            max-w-[1200px]
            mx-auto
            mt-[clamp(28px,4vw,45px)]
            pt-4
            border-t
            border-line
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.14em]
              uppercase
              text-ink-soft
            "
          >
            04 / Selected Projects
          </span>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            <span className="w-1.5 h-1.5 rounded-full bg-line" />
            <span className="w-1.5 h-1.5 rounded-full bg-line" />
          </div>
        </div>

        {/* VIEW ALL BUTTON */}
<div className="relative z-10 max-w-[920px] mx-auto flex justify-center">
  <a
    href="/work"
    className="
      group/btn
      inline-flex items-center gap-3
      px-6 py-3
      bg-ink text-white
      border border-ink
      font-mono text-[10px] tracking-[0.14em] uppercase
      transition-all duration-300
      hover:bg-signal hover:border-signal
    "
  >
    View all our work
    <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
      →
    </span>
  </a>
</div>
      </section>
    </>
  );
}