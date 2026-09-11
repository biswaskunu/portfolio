import { motion } from "framer-motion";

/**
 * AnimatedContent
 * React-Bits-style once-per-view reveal: fades/slides in when it
 * enters the viewport, using whileInView so it never replays on
 * scroll-up (avoids the "scattered fade-up on everything" trap —
 * used deliberately on section-level containers, not every element).
 */
export default function AnimatedContent({
  children,
  className = "",
  distance = 40,
  direction = "up", // up | left | right
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.2,
}) {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "left" || direction === "up" ? 1 : -1;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, [axis]: distance * sign }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerGroup / StaggerItem
 * For grids (project cards, stack cards, log cards): the group
 * triggers once in view, children cascade in with a small delay
 * offset each — the "cards arriving in sequence" moment.
 */
export function StaggerGroup({ children, className = "", stagger = 0.07, once = true, amount = 0.15 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", distance = 24 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
