import { Fragment } from "react";

/**
 * SplitText
 * Splits text into words and per-character spans, then animates the
 * characters in with a per-character stagger.
 *
 * Deliberately framer-motion-free: the prerendered HTML must contain
 * the h1 as normal, readable text (no inline opacity/transform left
 * over from a motion `initial` state). The animation is pure CSS,
 * gated on the `.js` class set before first paint — no-JS visitors and
 * crawlers get static text, JS visitors get the same staggered fold-in.
 *
 * Words are separated by a real space text node so extracted text
 * reads "Backend engineer who ships systems, not tutorials."
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  staggerChild = 0.022,
  duration = 0.6,
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, wi) => {
        const priorChars = words.slice(0, wi).join(" ").length + (wi > 0 ? 1 : 0);
        return (
          <Fragment key={wi}>
            <span className="split-word">
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="split-char"
                  style={{
                    "--split-delay": `${(delay + (priorChars + ci) * staggerChild).toFixed(3)}s`,
                    "--split-dur": `${duration}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
