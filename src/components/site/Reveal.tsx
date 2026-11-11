import { motion, type HTMLMotionProps } from "motion/react";

/** Motion: fade-and-rise when the block scrolls into view. */
export function Reveal({
  delay = 0,
  y = 32,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
      {...props}
    />
  );
}

export function SectionTitle({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <p className="mb-3 font-medium text-mint-ink text-sm uppercase tracking-[0.18em]">
        {kicker}
      </p>
      <h2 className="font-bold text-3xl leading-[1.1] sm:text-5xl">{title}</h2>
      {lead && (
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
