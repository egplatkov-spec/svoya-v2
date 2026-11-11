import { motion } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionTitle } from "@/components/site/Reveal";
import { plans } from "@/data";
import { useCountUp } from "@/lib/anime";
import { cn } from "@/lib/utils";

function Price({ value, dark }: { value: number; dark?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, value, { duration: 1300 });
  return (
    <span
      className={cn(
        "font-bold font-heading text-5xl tabular-nums",
        dark ? "text-paper" : "text-ink"
      )}
      ref={ref}
    >
      {value.toLocaleString("ru-RU")}
    </span>
  );
}

export function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6" id="prices">
      <SectionTitle
        kicker="Цены"
        lead="По цене среднего клуба в Москве — но зал и группы в одном абонементе, а клуб у дома."
        title="Один абонемент — и зал, и все группы"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal delay={i * 0.1} key={p.id}>
            <motion.article
              className={cn(
                "relative flex h-full flex-col rounded-3xl border p-7",
                p.featured ? "border-ink bg-ink text-paper" : "bg-card"
              )}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              whileHover={{ y: -8, rotate: p.featured ? 0 : i === 0 ? -1 : 1 }}
            >
              {p.featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-mint px-3 py-1 font-medium text-ink text-xs">
                  Выгоднее всего
                </span>
              )}
              <h3 className="font-bold text-xl">{p.title}</h3>
              <p
                className={cn(
                  "mt-1 text-sm",
                  p.featured ? "text-paper/70" : "text-muted-foreground"
                )}
              >
                {p.note}
              </p>
              <div className="mt-8 flex items-baseline gap-2">
                <Price dark={p.featured} value={p.price} />
                <span className={p.featured ? "text-paper/70" : "text-muted-foreground"}>
                  {p.per}
                </span>
              </div>
              <ul className="mt-8 flex flex-col gap-3 text-[15px]">
                {p.features.map((f) => (
                  <li className="flex items-center gap-3" key={f}>
                    <span
                      className={cn(
                        "grid size-5 place-items-center rounded-full text-[11px]",
                        p.featured ? "bg-mint text-ink" : "bg-mint-soft"
                      )}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
