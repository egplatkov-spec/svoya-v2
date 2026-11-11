import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeatmapCells,
  HeatmapChart,
  HeatmapInteractionBoundary,
  HeatmapInteractionProvider,
  HeatmapLegend,
  HeatmapTooltip,
  HeatmapXAxis,
  HeatmapYAxis,
} from "@/components/charts/heatmap";
import AppleActivityCard from "@/components/kokonutui/apple-activity-card";
import WidgetGrid, { type WidgetGridItem } from "@/components/kokonutui/bento-grid";
import SlideToConfirm from "@/components/kokonutui/slide-to-confirm";
import SmoothTab from "@/components/kokonutui/smooth-tab";
import { ClassList, KindFilter } from "@/components/site/ClassList";
import { Logo } from "@/components/site/Nav";
import { type ClassKind, schedule } from "@/data";
import { member, visitHeatmap } from "./cabinet/demo";
import { Login } from "./cabinet/Login";
import { MembershipWidget, NextClassWidget, PassWidget } from "./cabinet/Widgets";

const dayNames: Record<string, string> = {
  mon: "Понедельник",
  tue: "Вторник",
  wed: "Среда",
  thu: "Четверг",
  fri: "Пятница",
  sat: "Суббота",
};

const SESSION_KEY = "svoya-demo-session";

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function writeSession(on: boolean) {
  try {
    if (on) {
      sessionStorage.setItem(SESSION_KEY, "1");
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // storage unavailable — the demo still works for this visit
  }
}

function Panel({
  title,
  note,
  children,
  delay = 0,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border bg-card p-6"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="font-semibold font-sans text-lg tracking-normal">{title}</h2>
      {note && <p className="mt-1 text-muted-foreground text-sm">{note}</p>}
      <div className="mt-5">{children}</div>
    </motion.section>
  );
}

export default function Cabinet() {
  const [authed, setAuthed] = useState(readSession);
  const [booked, setBooked] = useState<Set<string>>(
    () => new Set(["Пн:19:00-Функциональная"])
  );
  const [filter, setFilter] = useState<ClassKind | "all">("all");
  const [frozenDays, setFrozenDays] = useState(0);
  const heatmap = useMemo(() => visitHeatmap(), []);

  const toggle = (day: string) => (key: string) =>
    setBooked((prev) => {
      const next = new Set(prev);
      const full = `${day}:${key}`;
      if (next.has(full)) {
        next.delete(full);
      } else {
        next.add(full);
      }
      return next;
    });

  const nextClass = useMemo(() => {
    for (const d of schedule) {
      for (const s of d.slots) {
        if (booked.has(`${d.title}:${s.time}-${s.title}`)) {
          return { day: dayNames[d.id], time: s.time, title: s.title };
        }
      }
    }
    return null;
  }, [booked]);

  if (!authed) {
    return (
      <Login
        onLogin={() => {
          writeSession(true);
          setAuthed(true);
        }}
      />
    );
  }

  const widgets: WidgetGridItem[] = [
    {
      id: "membership",
      title: "Абонемент",
      defaultSpan: 2,
      render: (size) => <MembershipWidget frozenDays={frozenDays} size={size} />,
    },
    {
      id: "pass",
      title: "QR-пропуск",
      defaultSpan: 2,
      render: (size) => <PassWidget size={size} />,
    },
    {
      id: "next",
      title: "Ближайшее занятие",
      defaultSpan: 2,
      render: () => <NextClassWidget next={nextClass} />,
    },
  ];

  return (
    <div className="paper-grid min-h-screen pb-20">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link className="hidden underline-offset-4 hover:underline sm:inline" to="/">
            На сайт
          </Link>
          <button
            className="rounded-full border px-4 py-2 font-medium transition hover:bg-card"
            onClick={() => {
              writeSession(false);
              setAuthed(false);
            }}
            type="button"
          >
            Выйти
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-bold text-3xl sm:text-5xl">Привет, {member.name}!</h1>
          <p className="mt-2 text-muted-foreground">
            Виджеты можно перетаскивать и растягивать за правый нижний угол.
          </p>
        </motion.div>

        <WidgetGrid items={widgets} rowHeight={190} />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Panel delay={0.1} note="Наведите на кольцо, чтобы увидеть цель" title="Неделя">
            <AppleActivityCard
              activities={[
                { label: "ТРЕНИРОВКИ", color: "#2fbf9b", colorEnd: "#6fe0c5", size: 200, current: 2, target: 3, unit: "РАЗ" },
                { label: "МИНУТЫ", color: "#ff7a45", colorEnd: "#ffab85", size: 160, current: 140, target: 180, unit: "МИН" },
                { label: "ГРУППЫ", color: "#5b6bd6", colorEnd: "#8e9af0", size: 120, current: 1, target: 2, unit: "ШТ" },
              ]}
              className="max-w-none bg-transparent p-0 shadow-none"
              title="Цели этой недели"
              titleAs="h3"
            />
          </Panel>

          <Panel
            delay={0.2}
            note="Каждый квадрат — день. Чем темнее, тем больше тренировок"
            title="Посещения за 16 недель"
          >
            <HeatmapInteractionProvider>
              <HeatmapInteractionBoundary>
                <HeatmapChart data={heatmap} layout="fluid" weekStartDay={1}>
                  <HeatmapCells />
                  <HeatmapXAxis />
                  <HeatmapYAxis />
                  <HeatmapTooltip />
                </HeatmapChart>
                <div className="mt-3">
                  <HeatmapLegend lessLabel="Меньше" moreLabel="Больше" />
                </div>
              </HeatmapInteractionBoundary>
            </HeatmapInteractionProvider>
          </Panel>
        </div>

        <Panel delay={0.3} note="Не больше 14 человек в группе. Отмена — не позже чем за час" title="Запись на занятия">
          <div className="flex flex-col gap-5">
            <KindFilter onChange={setFilter} value={filter} />
            <SmoothTab
              activeColor="bg-ink"
              activeTextColor="text-paper"
              className="max-w-none"
              defaultTabId="mon"
              items={schedule.map((d) => ({
                id: d.id,
                title: d.title,
                content: (
                  <ClassList
                    booked={
                      new Set(
                        [...booked]
                          .filter((k) => k.startsWith(`${d.title}:`))
                          .map((k) => k.slice(d.title.length + 1))
                      )
                    }
                    filter={filter}
                    onToggle={toggle(d.title)}
                    slots={d.slots}
                  />
                ),
              }))}
              label="Дни недели"
            />
          </div>
        </Panel>

        <Panel
          delay={0.4}
          note="Годовой абонемент можно заморозить до 30 дней — например, на отпуск"
          title="Заморозка"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              {frozenDays > 0
                ? `Абонемент заморожен на ${frozenDays} дней — срок продлён.`
                : "Сдвиньте ползунок, чтобы заморозить абонемент на 14 дней."}
            </p>
            <SlideToConfirm
              className="w-full sm:w-80"
              key={frozenDays > 0 ? "frozen" : "active"}
              confirmingLabel="Замораживаем"
              disabled={frozenDays > 0}
              doneLabel="Заморожено"
              label="Заморозить на 14 дней"
              onConfirm={() =>
                new Promise((resolve) =>
                  setTimeout(() => {
                    setFrozenDays(14);
                    resolve(true);
                  }, 900)
                )
              }
              resetAfter={null}
            />
          </div>
          {frozenDays > 0 && (
            <button
              className="mt-4 text-mint-ink text-sm underline underline-offset-4"
              onClick={() => setFrozenDays(0)}
              type="button"
            >
              Отменить заморозку
            </button>
          )}
        </Panel>
      </main>
    </div>
  );
}
