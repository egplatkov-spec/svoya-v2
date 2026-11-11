import { useState } from "react";
import SmoothTab from "@/components/kokonutui/smooth-tab";
import { ClassList, KindFilter } from "@/components/site/ClassList";
import { Reveal, SectionTitle } from "@/components/site/Reveal";
import { type ClassKind, schedule } from "@/data";

export function Schedule() {
  const [filter, setFilter] = useState<ClassKind | "all">("all");
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6" id="schedule">
      <SectionTitle
        kicker="Расписание"
        lead="Дневные группы — пока дети в саду, вечерние — после работы. В каждой группе не больше 14 человек."
        title="Занятия, под которые не нужно подстраиваться"
      />
      <Reveal className="flex flex-col gap-6">
        <KindFilter onChange={setFilter} value={filter} />
        <SmoothTab
          activeColor="bg-ink"
          activeTextColor="text-paper"
          className="max-w-3xl"
          defaultTabId="mon"
          items={schedule.map((d) => ({
            id: d.id,
            title: d.title,
            content: <ClassList filter={filter} slots={d.slots} />,
          }))}
          label="Дни недели"
        />
        <p className="text-muted-foreground text-sm">
          Листайте дни свайпом или кнопками. Записаться можно в личном кабинете.
        </p>
      </Reveal>
    </section>
  );
}
