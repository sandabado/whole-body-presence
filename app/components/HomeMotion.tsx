"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home-experience");
    if (!root) return;

    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>("[data-home-reveal]"),
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    root.classList.add("home-motion-ready");

    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return () => root.classList.remove("home-motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.15 },
    );

    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const updateHero = () => {
      frame = 0;
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      root.style.setProperty("--home-hero-shift", `${progress * 110}px`);
      root.style.setProperty(
        "--home-hero-veil-opacity",
        `${0.6 + progress * 0.35}`,
      );
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHero);
    };

    if (!isMobile) {
      updateHero();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("home-motion-ready");
    };
  }, []);

  return null;
}
