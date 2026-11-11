import { AnimatePresence, motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { WidgetSize } from "@/components/kokonutui/bento-grid";
import { useCountUp } from "@/lib/anime";
import { member } from "./demo";

export function MembershipWidget({
  size,
  frozenDays,
}: {
  size: WidgetSize;
  frozenDays: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const left = member.daysLeft + frozenDays;
  useCountUp(ref, left);
  const used = 1 - member.daysLeft / member.totalDays;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline gap-2">
        <span className="font-bold font-heading text-4xl tabular-nums" ref={ref}>
          {left}
        </span>
        <span className="text-muted-foreground text-sm">дней осталось</span>
      </div>
      <p className="mt-1 text-muted-foreground text-sm">
        Абонемент «{member.plan}»
        {frozenDays > 0 && ` · заморожен на ${frozenDays} дн.`}
      </p>
      <div className="mt-auto">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            animate={{ width: `${used * 100}%` }}
            className="h-full rounded-full bg-mint"
            initial={{ width: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </div>
        {size !== "s" && (
          <p className="mt-2 text-muted-foreground text-xs">
            Персональных тренировок в пакете: {member.personalLeft}
          </p>
        )}
      </div>
    </div>
  );
}

export function PassWidget({ size }: { size: WidgetSize }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex h-full items-center gap-4">
        <motion.button
          aria-label="Открыть QR-пропуск на весь экран"
          className="shrink-0 rounded-xl bg-white p-2 shadow-sm"
          layoutId="qr-pass"
          onClick={() => setOpen(true)}
          type="button"
          whileHover={{ scale: 1.05 }}
        >
          <QRCodeSVG bgColor="#ffffff" fgColor="#16181d" size={size === "s" ? 84 : 100} value={member.passCode} />
        </motion.button>
        <div className="min-w-0">
          <p className="font-medium">Покажите на ресепшене</p>
          <p className="mt-1 text-muted-foreground text-xs">
            Нажмите на код, чтобы открыть на весь экран
          </p>
        </div>
      </div>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-6 backdrop-blur"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className="flex flex-col items-center gap-5 rounded-[2rem] bg-white p-8"
                layoutId="qr-pass"
              >
                <QRCodeSVG bgColor="#ffffff" fgColor="#16181d" size={260} value={member.passCode} />
                <p className="font-heading font-semibold text-ink text-lg">{member.name} · «Своя»</p>
                <p className="text-ink/60 text-sm">Нажмите в любом месте, чтобы закрыть</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export function NextClassWidget({ next }: { next: { day: string; time: string; title: string } | null }) {
  return (
    <AnimatePresence mode="wait">
      {next ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex h-full flex-col"
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: 8 }}
          key={`${next.day}-${next.time}`}
        >
          <p className="text-muted-foreground text-sm">{next.day}</p>
          <p className="mt-1 font-bold font-heading text-3xl tabular-nums">{next.time}</p>
          <p className="mt-auto font-medium">{next.title}</p>
        </motion.div>
      ) : (
        <motion.p
          animate={{ opacity: 1 }}
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          key="none"
        >
          Вы пока никуда не записаны — выберите занятие в расписании ниже.
        </motion.p>
      )}
    </AnimatePresence>
  );
}
