import CardFlip from "@/components/kokonutui/card-flip";
import { Reveal, SectionTitle } from "@/components/site/Reveal";
import { personas, photos } from "@/data";

const faces = [photos.member, photos.gym, photos.stretch];

export function Personas() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6" id="for-whom">
      <SectionTitle
        kicker="Для кого"
        lead="Три типичные клиентки. Переверните карточку — там то, что мы для неё сделали."
        title="Каждой — то, чего нет в обычном клубе у дома"
      />
      <div className="grid justify-items-center gap-14 sm:grid-cols-2 lg:grid-cols-3">
        {personas.map((p, i) => (
          <Reveal delay={i * 0.12} key={p.id}>
            <CardFlip
              back={
                <div className="flex h-full flex-col bg-ink p-6 text-paper">
                  <p className="font-medium text-mint text-xs uppercase tracking-[0.18em]">
                    Что даём
                  </p>
                  <ul className="mt-5 flex flex-col gap-4">
                    {p.value.map((v) => (
                      <li className="flex gap-3 text-[15px] leading-snug" key={v}>
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-mint" />
                        {v}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto text-paper/60 text-sm">
                    Боль: {p.pain.toLowerCase()}
                  </p>
                </div>
              }
              className="w-[290px]"
              front={
                <div className="relative flex h-full flex-col justify-end overflow-hidden bg-ink p-6 text-paper">
                  <img
                    alt=""
                    className="absolute inset-0 size-full object-cover opacity-70"
                    src={faces[i]}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  <div className="relative">
                    <span className="rounded-full bg-mint px-3 py-1 font-medium text-ink text-xs">
                      {p.segment}
                    </span>
                    <p className="mt-4 font-bold font-heading text-2xl">
                      {p.name}
                    </p>
                    <p className="mt-1 text-paper/75 text-sm">{p.about}</p>
                    <p className="mt-5 border-paper/20 border-t pt-4 text-[15px] italic">
                      «{p.quote}»
                    </p>
                  </div>
                </div>
              }
              label={`Карточка: ${p.name}`}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
