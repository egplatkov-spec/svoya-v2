import { motion } from "motion/react";
import { useRef } from "react";
import { SectionTitle } from "@/components/site/Reveal";
import { photos } from "@/data";
import { useStaggerIn } from "@/lib/anime";
import { cn } from "@/lib/utils";

const tiles = [
  {
    img: photos.gym,
    title: "Тренажёрный зал",
    text: "120 м²: силовые тренажёры, свободные веса и кардио",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    img: photos.stretch,
    title: "Групповые",
    text: "60 м²: пилатес, йога, растяжка, функционалка",
    className: "",
  },
  {
    img: photos.hand,
    title: "Свой тренер",
    text: "Тренеры зала и групп — только женщины",
    className: "",
  },
  {
    img: photos.sauna,
    title: "Сауна",
    text: "Добавим на второй год работы клуба",
    className: "md:col-span-2",
    soon: true,
  },
];

export function Inside() {
  const gridRef = useRef<HTMLDivElement>(null);
  useStaggerIn(gridRef, "[data-tile]");

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6" id="inside">
      <SectionTitle
        kicker="Что внутри"
        lead="Студия 250 м² на первом этаже жилого дома. Всё нужное — и ничего лишнего."
        title="Полноценный зал, а не только растяжка"
      />
      <div
        className="grid auto-rows-[220px] gap-3 md:grid-cols-4"
        ref={gridRef}
      >
        {tiles.map((t) => (
          <motion.figure
            className={cn(
              "group relative overflow-hidden rounded-3xl bg-ink",
              t.className
            )}
            data-tile
            key={t.title}
            whileHover="hover"
          >
            <motion.img
              alt=""
              className="absolute inset-0 size-full object-cover opacity-80"
              src={t.img}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              variants={{ hover: { scale: 1.07 } }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-paper">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xl">{t.title}</h3>
                {t.soon && (
                  <span className="rounded-full bg-coral px-2 py-0.5 font-medium text-ink text-xs">
                    скоро
                  </span>
                )}
              </div>
              <motion.p
                className="mt-1 max-w-xs text-paper/80 text-sm"
                initial={{ opacity: 0.75 }}
                variants={{ hover: { opacity: 1, y: -2 } }}
              >
                {t.text}
              </motion.p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
