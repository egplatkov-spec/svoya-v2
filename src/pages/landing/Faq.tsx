import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal, SectionTitle } from "@/components/site/Reveal";
import { faq } from "@/data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6" id="faq">
      <SectionTitle kicker="Вопросы" title="Частые вопросы" />
      <Reveal className="flex flex-col gap-3">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              className="overflow-hidden rounded-2xl border bg-card"
              key={item.q}
              layout
            >
              <button
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium"
                onClick={() => setOpen(isOpen ? null : i)}
                type="button"
              >
                {item.q}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-mint-soft text-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-6 text-muted-foreground leading-relaxed"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="block pb-5">{item.a}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </Reveal>
    </section>
  );
}
