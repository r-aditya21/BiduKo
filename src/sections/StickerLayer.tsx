"use client";

import { useRef, useState, useCallback } from "react";

type StickerId = "loading" | "asterisk" | "smiley";

type Pos = { x: number; y: number };

const INITIAL_POS: Record<StickerId, Pos> = {
  loading: { x: 510.8, y: 600 },
  asterisk: { x: 700, y: 190 },
  smiley: { x: 40, y: 360 },
};

export default function StickerLayer() {
  const [positions, setPositions] = useState<Record<StickerId, Pos>>(INITIAL_POS);
  const [dragging, setDragging] = useState<StickerId | null>(null);
  const dragOffset = useRef<Pos>({ x: 0, y: 0 });

  const onPointerDown = useCallback(
    (id: StickerId) => (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const current = positions[id];
      dragOffset.current = {
        x: e.clientX - current.x,
        y: e.clientY - current.y,
      };
      setDragging(id);
    },
    [positions]
  );

  const onPointerMove = useCallback(
    (id: StickerId) => (e: React.PointerEvent) => {
      if (dragging !== id) return;
      setPositions((prev) => ({
        ...prev,
        [id]: {
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        },
      }));
    },
    [dragging]
  );

  const onPointerUp = useCallback((id: StickerId) => (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging((cur) => (cur === id ? null : cur));
  }, []);

  const stickerProps = (id: StickerId) => ({
    style: {
      transform: `translate(${positions[id].x}px, ${positions[id].y}px)`,
    } as React.CSSProperties,
    onPointerDown: onPointerDown(id),
    onPointerMove: onPointerMove(id),
    onPointerUp: onPointerUp(id),
    "data-dragging": dragging === id,
  });

  return (
    <div className="gs-layer" aria-hidden="false">
      {/* STICKER 1 — loading */}
      <div className="gs-sticker gs-float-a gs-loading" {...stickerProps("loading")}>
        <div className="gs-loading__label">LOADING...</div>
        <div className="gs-loading__bar">
          <div className="gs-loading__fill" />
        </div>
      </div>

      {/* STICKER 2 — asterisk */}
      <div className="gs-sticker gs-float-b gs-diecut gs-asterisk" {...stickerProps("asterisk")}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="92" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
          <g transform="translate(100,100)">
            <path
              d="M0,-78 L14,-26 L60,-60 L26,-14 L78,0 L26,14 L60,60 L14,26 L0,78 L-14,26 L-60,60 L-26,14 L-78,0 L-26,-14 L-60,-60 L-14,-26 Z"
              fill="#111111"
              stroke="#ffffff"
              strokeWidth="14"
              strokeLinejoin="round"
            />
            <path
              d="M0,-78 L14,-26 L60,-60 L26,-14 L78,0 L26,14 L60,60 L14,26 L0,78 L-14,26 L-60,60 L-26,14 L-78,0 L-26,-14 L-60,-60 L-14,-26 Z"
              fill="#111111"
            />
          </g>
        </svg>
      </div>

      {/* STICKER 3 — smiley */}
      <div className="gs-sticker gs-float-c gs-diecut gs-smiley" {...stickerProps("smiley")}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="92" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
          <circle cx="100" cy="100" r="80" fill="#111111" />
          <circle cx="100" cy="100" r="72" fill="#FFC72C" />
          <circle cx="72" cy="88" r="9" fill="#111111" />
          <circle cx="128" cy="88" r="9" fill="#111111" />
          <path d="M62,112 Q100,148 138,112" fill="none" stroke="#111111" strokeWidth="9" strokeLinecap="round" />
        </svg>
      </div>

      <style>{`
        .gs-layer {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
        }

        .gs-sticker {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: auto;
          touch-action: none;
          cursor: grab;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), filter 0.25s ease;
          will-change: transform;
        }
        .gs-sticker:active,
        .gs-sticker[data-dragging="true"] {
          cursor: grabbing;
          transition: none;
        }

        /* soft hover lift */
        .gs-sticker:hover {
          filter: drop-shadow(0 10px 16px rgba(0,0,0,.28));
        }
        .gs-sticker:hover .gs-loading,
        .gs-sticker.gs-loading:hover {
          box-shadow: 4px 5px 0 #111, 0 12px 20px rgba(0,0,0,.3);
        }

        /* idle floating — paused while dragging */
        .gs-float-a { animation: gs-bob-a 4.5s ease-in-out infinite; }
        .gs-float-b { animation: gs-bob-b 5.2s ease-in-out infinite; }
        .gs-float-c { animation: gs-bob-c 4.8s ease-in-out infinite; }
        .gs-sticker[data-dragging="true"] { animation-play-state: paused; }

        @keyframes gs-bob-a {
          0%, 100% { rotate: -4deg; translate: 0 0; }
          50%      { rotate: -2deg; translate: 0 -8px; }
        }
        @keyframes gs-bob-b {
          0%, 100% { rotate: -8deg; translate: 0 0; }
          50%      { rotate: -6deg; translate: 0 10px; }
        }
        @keyframes gs-bob-c {
          0%, 100% { rotate: 6deg; translate: 0 0; }
          50%      { rotate: 8deg; translate: 0 -10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gs-float-a, .gs-float-b, .gs-float-c { animation: none; }
        }

        /* ---- sticker 1: loading ---- */
        .gs-loading {
          --border:#111;
          --bg:#4d74ff;
          --bg2:#2F5BFF;
          --bar-empty:#dbe3ff;
          --bar-fill:#1c3fd1;
          --bar-stripe:#2F5BFF;
          width: 180px;
          padding: 10px 12px 12px;
          background: repeating-linear-gradient(45deg, var(--bg) 0 6px, var(--bg2) 6px 12px);
          border: 4px solid var(--border);
          border-radius: 2px;
          box-shadow: 3px 3px 0 var(--border), 0 8px 18px rgba(0,0,0,.25);
        }
        .gs-loading__label {
          font-family: monospace;
          font-size: 24px;
          letter-spacing: 2px;
          color: var(--border);
          text-align: center;
          margin-bottom: 8px;
        }
        .gs-loading__bar {
          position: relative;
          height: 18px;
          background: var(--bar-empty);
          border: 3px solid var(--border);
          overflow: hidden;
          padding: 2px;
          box-sizing: border-box;
        }
        .gs-loading__bar::before {
          content: "";
          position: absolute;
          inset: 2px;
          background: repeating-linear-gradient(90deg, transparent 0 14px, var(--bar-empty) 14px 16px);
          z-index: 2;
        }
        .gs-loading__fill {
          position: absolute;
          top: 2px; left: 2px; bottom: 2px;
          width: 20%;
          background: repeating-linear-gradient(45deg, var(--bar-fill) 0 6px, var(--bar-stripe) 6px 12px);
          background-size: 200% 200%;
          animation: gs-fill-loop 2.4s steps(6) infinite, gs-stripe-move 1s linear infinite;
        }
        @keyframes gs-fill-loop { 0%{width:6%;} 70%{width:92%;} 85%{width:92%;} 100%{width:6%;} }
        @keyframes gs-stripe-move { from{background-position:0 0;} to{background-position:24px 0;} }

        /* ---- sticker 2 & 3: die-cut shell ---- */
        .gs-diecut {
          width: 130px;
          height: 130px;
        }
        .gs-diecut svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 6px 10px rgba(0,0,0,.25));
        }
      `}</style>
    </div>
  );
}