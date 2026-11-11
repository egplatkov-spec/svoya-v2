import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import TypewriterTitle from "@/components/kokonutui/type-writer";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const times = ["Утро", "День", "Вечер", "Выходные"];

export function Trial() {
  const [time, setTime] = useState("Вечер");
  const [sent, setSent] = useState<string | null>(null);

  return (
    <section className="px-4 py-24 sm:px-6" id="trial">
      <Reveal className="mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-[2.5rem] bg-ink p-8 text-paper sm:p-14 lg:grid-cols-2">
        <div>
          <p className="font-medium text-mint text-sm uppercase tracking-[0.18em]">
            Пробное занятие
          </p>
          <h2 className="mt-4 font-bold text-3xl leading-tight sm:text-5xl">
            Первая тренировка — бесплатно
          </h2>
          <div className="mt-6 flex items-baseline gap-2 text-lg text-paper/70">
            <span>Приходите</span>
            <TypewriterTitle
              as="span"
              className="inline-flex w-auto justify-start font-medium font-sans text-mint tracking-normal"
              textClassName="text-lg @lg:text-lg @2xl:text-lg leading-normal"
              sequences={[
                { text: "после работы" },
                { text: "пока ребёнок в саду" },
                { text: "в выходные" },
                { text: "без стеснения" },
              ]}
              typingSpeed={55}
            />
          </div>
          <p className="mt-8 max-w-md text-paper/60 text-sm leading-relaxed">
            Это демо: заявка никуда не отправляется. В рабочей версии её получит
            администратор клуба, а вам перезвонят в течение дня.
          </p>
        </div>

        <div className="relative min-h-[360px]">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center gap-4 text-center"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0, scale: 0.9 }}
                key="done"
              >
                <motion.span
                  animate={{ scale: [0, 1.2, 1], rotate: [0, 10, 0] }}
                  className="grid size-20 place-items-center rounded-full bg-mint text-4xl text-ink"
                  transition={{ duration: 0.6 }}
                >
                  ✓
                </motion.span>
                <p className="font-bold font-heading text-2xl">
                  {sent}, вы записаны!
                </p>
                <p className="text-paper/60">Ждём вас — время: {time.toLowerCase()}.</p>
                <button
                  className="mt-2 text-mint text-sm underline underline-offset-4"
                  onClick={() => setSent(null)}
                  type="button"
                >
                  Отправить ещё одну
                </button>
              </motion.div>
            ) : (
              <motion.form
                animate={{ opacity: 1 }}
                className="flex flex-col gap-4"
                exit={{ opacity: 0, y: -12 }}
                initial={{ opacity: 0 }}
                key="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  setSent(String(data.get("name") || "Готово"));
                }}
              >
                <label className="flex flex-col gap-2 text-sm">
                  Как вас зовут
                  <input
                    className="rounded-2xl border border-paper/15 bg-paper/5 px-4 py-3.5 text-base outline-none transition focus:border-mint"
                    name="name"
                    placeholder="Анна"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  Телефон
                  <input
                    className="rounded-2xl border border-paper/15 bg-paper/5 px-4 py-3.5 text-base outline-none transition focus:border-mint"
                    inputMode="tel"
                    name="phone"
                    placeholder="+7 900 000-00-00"
                    required
                  />
                </label>
                <fieldset className="flex flex-col gap-2 text-sm">
                  <legend className="mb-2">Когда удобно</legend>
                  <div className="flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        className={cn(
                          "rounded-full border px-4 py-2 transition",
                          time === t
                            ? "border-mint bg-mint text-ink"
                            : "border-paper/20 hover:border-paper/50"
                        )}
                        key={t}
                        onClick={() => setTime(t)}
                        type="button"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <motion.button
                  className="mt-4 rounded-full bg-mint py-4 font-semibold text-ink"
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Записаться на пробное
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
