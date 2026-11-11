import { AnimatePresence, motion } from "motion/react";
import { CLASS_CAPACITY, type ClassKind, type ClassSlot, kindLabel } from "@/data";
import { cn } from "@/lib/utils";

const kindColor: Record<ClassKind, string> = {
  soft: "bg-mint-soft text-ink",
  power: "bg-coral/20 text-ink",
  start: "bg-ink/8 text-ink",
};

export function KindFilter({
  value,
  onChange,
}: {
  value: ClassKind | "all";
  onChange: (v: ClassKind | "all") => void;
}) {
  const options: (ClassKind | "all")[] = ["all", "soft", "power", "start"];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          className="relative rounded-full border px-4 py-1.5 font-medium text-sm"
          key={o}
          onClick={() => onChange(o)}
          type="button"
        >
          {value === o && (
            <motion.span
              className="absolute inset-0 rounded-full bg-ink"
              layoutId="kind-filter"
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          )}
          <span
            className={cn(
              "relative transition-colors",
              value === o ? "text-paper" : "text-ink"
            )}
          >
            {o === "all" ? "Все" : kindLabel[o]}
          </span>
        </button>
      ))}
    </div>
  );
}

export function ClassList({
  slots,
  filter = "all",
  booked,
  onToggle,
}: {
  slots: ClassSlot[];
  filter?: ClassKind | "all";
  /** Keys of classes the member has booked (cabinet only). */
  booked?: Set<string>;
  onToggle?: (key: string) => void;
}) {
  const visible = slots.filter((s) => filter === "all" || s.kind === filter);
  return (
    <ul className="flex flex-col">
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((s) => {
          const key = `${s.time}-${s.title}`;
          const mine = booked?.has(key) ?? false;
          const taken = s.booked + (mine ? 1 : 0);
          const full = taken >= CLASS_CAPACITY;
          return (
            <motion.li
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 border-b py-3.5 last:border-b-0"
              exit={{ opacity: 0, x: -16 }}
              initial={{ opacity: 0, y: 8 }}
              key={key}
              layout
              transition={{ duration: 0.3 }}
            >
              <span className="w-14 shrink-0 font-heading font-semibold text-lg tabular-nums">
                {s.time}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{s.title}</p>
                <div className="mt-1 flex items-center gap-2 text-muted-foreground text-xs">
                  <span className={cn("rounded-full px-2 py-0.5", kindColor[s.kind])}>
                    {kindLabel[s.kind]}
                  </span>
                  <span>{s.coach}</span>
                </div>
              </div>
              <div className="hidden w-28 shrink-0 sm:block">
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    animate={{ width: `${(taken / CLASS_CAPACITY) * 100}%` }}
                    className={cn("h-full rounded-full", full ? "bg-coral" : "bg-mint")}
                    initial={false}
                    transition={{ type: "spring", stiffness: 200, damping: 26 }}
                  />
                </div>
                <p className="mt-1 text-right text-muted-foreground text-xs tabular-nums">
                  {full ? "мест нет" : `${CLASS_CAPACITY - taken} из ${CLASS_CAPACITY} свободно`}
                </p>
              </div>
              {onToggle && (
                <motion.button
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 font-medium text-sm",
                    mine ? "bg-mint text-ink" : "border",
                    full && !mine && "pointer-events-none opacity-40"
                  )}
                  disabled={full && !mine}
                  onClick={() => onToggle(key)}
                  type="button"
                  whileTap={{ scale: 0.92 }}
                >
                  {mine ? "Вы записаны ✓" : "Записаться"}
                </motion.button>
              )}
            </motion.li>
          );
        })}
      </AnimatePresence>
      {visible.length === 0 && (
        <li className="py-8 text-center text-muted-foreground text-sm">
          В этот день таких занятий нет
        </li>
      )}
    </ul>
  );
}
