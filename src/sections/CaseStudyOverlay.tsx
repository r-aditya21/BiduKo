"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface Props {
  item: { id: string; name: string; description?: string; image?: string } | null;
  onClose: () => void;
}

export default function CaseStudyOverlay({ item, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!mounted || !item) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-6 bw-exempt"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" />
      <div
        className="relative bg-surface text-ink rounded-2xl max-w-[720px] w-full max-h-[85vh] overflow-y-auto p-10 animate-riseIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-line flex items-center justify-center hover:bg-black/5"
          aria-label="Close"
        >
          ✕
        </button>
        {item.image && (
          <img src={item.image} alt={item.name} className="w-full rounded-xl mb-6" />
        )}
        <h3 className="font-display text-[clamp(24px,3vw,36px)] font-semibold mb-3">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-ink-soft leading-[1.6]">{item.description}</p>
        )}
      </div>
    </div>,
    document.body
  );
}