import { motion } from "framer-motion";

/**
 * SplitText
 * React-Bits-style component: splits text into words (and each word
 * into characters) and animates them in with a per-character stagger.
 * Runs once, on mount — the single orchestrated hero moment.
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
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => {
        const priorChars = words.slice(0, wi).join(" ").length + (wi > 0 ? 1 : 0);
        return (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }} aria-hidden="true">
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                style={{ display: "inline-block" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration,
                  delay: delay + (priorChars + ci) * staggerChild,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
            {wi < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}
