import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import AttractButton from "@/components/kokonutui/attract-button";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import { heroStats, photos } from "@/data";
import { useCountUp, useSplitReveal } from "@/lib/anime";

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, value, { suffix });
  return (
    <div className="rounded-2xl border bg-card/70 px-5 py-4 backdrop-blur">
      <span
        className="block font-bold font-heading text-3xl tabular-nums sm:text-4xl"
        ref={ref}
      >
        {value}
        {suffix}
      </span>
      <span className="mt-1 block text-muted-foreground text-sm">{label}</span>
    </div>
  );
}

const floating = [
  { text: "0 мужчин в зале", className: "-left-6 top-10", delay: 0 },
  { text: "10 минут пешком", className: "-right-4 top-1/2", delay: 0.6 },
  { text: "QR-пропуск", className: "bottom-10 left-6", delay: 1.2 },
];

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useSplitReveal(titleRef, { delay: 150 });

  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <BackgroundPaths
      angle={-10}
      className="min-h-0 items-stretch bg-transparent text-mint"
      count={36}
      speed={0.6}
    >
      <section
        className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 pt-32 pb-16 text-ink sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-40"
        id="top"
      >
        <div className="flex flex-col justify-center text-ink">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border bg-card/80 px-3 py-1.5 font-medium text-sm backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-mint" />
            </span>
            Женский фитнес-клуб · Марьино
          </motion.p>

          <h1
            className="font-bold text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl"
            ref={titleRef}
          >
            Фитнес у дома. Только для своих.
          </h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            Тренажёрный зал, групповые занятия и душевые — только для женщин и
            в 10 минутах от дома. Тренеры и персонал тоже женщины.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6"
            initial={{ opacity: 0, y: 16 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <AttractButton
              className="h-12 rounded-full bg-ink px-7 text-base text-paper hover:bg-ink/90"
              onClick={() =>
                document
                  .getElementById("trial")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              radius={56}
            >
              Пробное бесплатно
            </AttractButton>
            <Link
              className="group inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
              to="/cabinet"
            >
              Посмотреть кабинет
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
          ref={photoRef}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45)]">
            <motion.img
              alt="Улыбающаяся клиентка клуба тянется к камере"
              className="absolute inset-0 size-full object-cover"
              src={photos.hero}
              style={{ y: photoY, scale: photoScale }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent" />
          </div>
          {floating.map((f) => (
            <motion.span
              animate={{ y: [0, -10, 0] }}
              className={`absolute ${f.className} rounded-full border bg-card px-4 py-2 font-medium text-ink text-sm shadow-lg`}
              key={f.text}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: f.delay,
              }}
            >
              {f.text}
            </motion.span>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-2 lg:grid-cols-4">
          {heroStats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </section>
    </BackgroundPaths>
  );
}
