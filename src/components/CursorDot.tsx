"use client";
import { useEffect, useRef } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) return;

    const dot = dotRef.current;
    if (!dot) return;

    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    let rafId = 0;

    function onMove(e: MouseEvent) {
      cursorX = e.clientX;
      cursorY = e.clientY;
      dot!.classList.add("is-active");
    }
    function onLeave() {
      dot!.classList.remove("is-active");
    }
    function animate() {
      dotX += (cursorX - dotX) * 0.22;
      dotY += (cursorY - dotY) * 0.22;
      dot!.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(animate);

    function onEnterInteractive() {
      dot!.style.width = "28px";
      dot!.style.height = "28px";
      dot!.style.background = "rgba(47,91,255,0.35)";
    }
    function onLeaveInteractive() {
      dot!.style.width = "10px";
      dot!.style.height = "10px";
      dot!.style.background = "var(--c-signal)";
    }
    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return <div className="cursor-dot" aria-hidden="true" ref={dotRef}></div>;
}
