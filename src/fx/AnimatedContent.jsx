import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, useState } from "react";

/**
 * useReveal — scroll-triggered reveal state without hiding content in
 * the prerendered HTML.
 *
 * States: 0 = idle (fully visible, this is what ships in dist/index.html)
 *         1 = armed  (about to enter the viewport, hidden pre-emptively
 *                     so there's no flash when it scrolls in)
 *         2 = revealed (CSS animation plays from the armed state)
 *
 * Content is only ever hidden while its animation is queued or running,
 * never permanently — so a crawler that renders JS but doesn't scroll
 * still reads every section as visible, and a crawler with no JS reads
 * the raw HTML exactly as a user would see it.
 */
function useReveal(amount = 0.2) {
  const ref = useRef(null);
  const [state, setState] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || state === 2) return undefined;

    // Already in the first viewport (above the fold / anchor jump):
    // start the reveal before the first paint, so nothing flashes.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    if (rect.top < vh && rect.bottom > 0) {
      setState(2);
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") return undefined;

    // Arm when the element is still ~half a viewport below the fold…
    const ioArm = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setState((s) => Math.max(s, 1));
      },
      { rootMargin: "0px 0px 50% 0px" }
    );
    // …then reveal it once it actually enters the viewport.
    const ioReveal = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setState(2);
      },
      { threshold: amount }
    );
    ioArm.observe(el);
    ioReveal.observe(el);
    return () => {
      ioArm.disconnect();
      ioReveal.disconnect();
    };
  }, [state, amount]);

  const classNames = state >= 1 ? "is-armed" : "";
  return [ref, state === 2 ? "is-armed is-in" : classNames];
}

/**
 * AnimatedContent
 * Once-per-view section reveal: fades/slides in when it enters the
 * viewport, never replays on scroll-up. Animation is CSS-driven (see
 * `.reveal-anim` in index.css) so the prerendered markup carries no
 * hidden `opacity: 0` styles.
 */
export default function AnimatedContent({
  children,
  className = "",
  distance = 40,
  direction = "up", // up | left | right
  delay = 0,
  duration = 0.7,
  once: _once = true, // kept for API compatibility — revealed state never resets
  amount = 0.2,
}) {
  const [ref, revealClass] = useReveal(amount);
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "left" || direction === "up" ? 1 : -1;

  const style = {
    "--rv-x": axis === "x" ? `${distance * sign}px` : "0px",
    "--rv-y": axis === "y" ? `${distance * sign}px` : "0px",
    "--rv-delay": `${delay}s`,
    "--rv-dur": `${duration}s`,
  };

  return (
    <div ref={ref} className={`reveal-anim ${revealClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

/**
 * StaggerGroup / StaggerItem
 * For grids (project cards, stack cards, log cards): the group
 * reveals once in view, children cascade in with a per-index delay
 * (`calc(var(--stagger) * var(--i))` in CSS).
 */
export function StaggerGroup({ children, className = "", stagger = 0.07, once: _once = true, amount = 0.15 }) {
  const [ref, revealClass] = useReveal(amount);

  const indexed = Children.map(children, (child, i) =>
    isValidElement(child) ? cloneElement(child, { index: i }) : child
  );

  return (
    <div
      ref={ref}
      className={`stagger-group ${revealClass} ${className}`.trim()}
      style={{ "--stagger": `${stagger}s` }}
    >
      {indexed}
    </div>
  );
}

export function StaggerItem({ children, className = "", distance = 24, index = 0 }) {
  return (
    <div className={`stagger-item ${className}`.trim()} style={{ "--i": index, "--rv-y": `${distance}px` }}>
      {children}
    </div>
  );
}
