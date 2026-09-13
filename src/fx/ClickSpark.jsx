import { useEffect, useRef } from "react";
import "./ClickSpark.css";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutExpo(t) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const EASINGS = {
  linear: (t) => t,
  "ease-out": easeOutCubic,
  "ease-in-out": easeInOutCubic,
  "ease-out-expo": easeOutExpo,
};

function resolveSparkColor(fallback) {
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--accent-soft").trim();
    if (v) return v;
  } catch {
    /* CSS var unreadable — use prop fallback */
  }
  return fallback;
}

/**
 * ClickSpark — ReactBits-style click burst for the cursor.
 * Fixed full-viewport canvas (pointer-events: none) that fires a
 * radial spark burst on every pointerdown. Color follows the live
 * `--accent-soft` theme var, so accent switches re-tint sparks
 * automatically. Skipped under prefers-reduced-motion.
 */
export default function ClickSpark({
  sparkColor = "#2dd4bf",
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 450,
  easing = "ease-out",
  extraScale = 1,
  strokeWidth = 2,
  maxBursts = 25,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const optsRef = useRef({ sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale, strokeWidth, maxBursts });
  optsRef.current = { sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale, strokeWidth, maxBursts };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const easeFn = () => EASINGS[optsRef.current.easing] || easeOutCubic;

    const draw = (now) => {
      const opts = optsRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.lineCap = "round";

      sparksRef.current = sparksRef.current.filter((s) => now - s.born < opts.duration);
      for (const s of sparksRef.current) {
        const t = Math.min((now - s.born) / opts.duration, 1);
        const eased = easeFn()(t);
        const spread = s.radius + eased * s.size * 4 * opts.extraScale;
        const tail = Math.max(spread - s.size * (1 - t), 0);
        const alpha = 1 - t;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = opts.strokeWidth;
        for (let i = 0; i < s.count; i++) {
          const angle = s.rotation + (i / s.count) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(s.x + Math.cos(angle) * tail, s.y + Math.sin(angle) * tail);
          ctx.lineTo(s.x + Math.cos(angle) * spread, s.y + Math.sin(angle) * spread);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      if (sparksRef.current.length > 0) {
        raf = requestAnimationFrame(draw);
      } else {
        raf = 0;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const onPointerDown = (e) => {
      const opts = optsRef.current;
      sparksRef.current.push({
        x: e.clientX,
        y: e.clientY,
        born: performance.now(),
        color: resolveSparkColor(opts.sparkColor),
        size: opts.sparkSize,
        radius: opts.sparkRadius,
        count: Math.max(3, Math.floor(opts.sparkCount)),
        rotation: Math.random() * Math.PI * 2,
      });
      if (sparksRef.current.length > opts.maxBursts) {
        sparksRef.current.splice(0, sparksRef.current.length - opts.maxBursts);
      }
      if (raf === 0) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
      sparksRef.current = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />;
}
