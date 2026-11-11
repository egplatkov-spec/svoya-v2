import { animate, splitText, stagger, utils } from "animejs";
import { type RefObject, useEffect, useRef } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Anime.js: words slide up from a mask, one after another. */
export function useSplitReveal(
  ref: RefObject<HTMLElement | null>,
  { delay = 0 }: { delay?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) {
      return;
    }
    const split = splitText(el, {
      words: { wrap: "clip" },
    });
    const anim = animate(split.words, {
      y: ["110%", "0%"],
      rotate: [6, 0],
      duration: 1100,
      delay: stagger(70, { start: delay }),
      ease: "outExpo",
    });
    return () => {
      anim.revert();
      split.revert();
    };
  }, [ref, delay]);
}

/** Anime.js: number rolls up from 0 when it scrolls into view. */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  to: number,
  { suffix = "", duration = 1600 }: { suffix?: string; duration?: number } = {}
) {
  // Last value shown, so a changed target rolls on from there, not from 0.
  const shown = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const fmt = (n: number) => `${n.toLocaleString("ru-RU")}${suffix}`;
    if (reduced()) {
      el.textContent = fmt(to);
      shown.current = to;
      return;
    }
    const counter = { n: shown.current ?? 0 };
    el.textContent = fmt(counter.n);
    let anim: ReturnType<typeof animate> | null = null;
    const run = () => {
      anim = animate(counter, {
        n: to,
        duration,
        ease: "outExpo",
        modifier: utils.round(0),
        onUpdate: () => {
          el.textContent = fmt(counter.n);
          shown.current = counter.n;
        },
      });
    };
    // Already counted once: animate the change right away.
    if (shown.current !== null) {
      run();
      return () => {
        anim?.pause();
      };
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || anim) {
          return;
        }
        run();
        io.disconnect();
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      anim?.pause();
    };
  }, [ref, to, suffix, duration]);
}

/** Anime.js: a bouncy stagger for a group of children on first view. */
export function useStaggerIn(
  ref: RefObject<HTMLElement | null>,
  selector: string
) {
  useEffect(() => {
    const root = ref.current;
    if (!root || reduced()) {
      return;
    }
    const items = root.querySelectorAll<HTMLElement>(selector);
    utils.set(items, { opacity: 0, y: 28, scale: 0.96 });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        animate(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          delay: stagger(90),
          duration: 900,
          ease: "outElastic(1, .7)",
        });
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [ref, selector]);
}
