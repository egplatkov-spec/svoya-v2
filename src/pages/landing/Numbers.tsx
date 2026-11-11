import { Bar } from "@/components/charts/bar";
import { BarChart } from "@/components/charts/bar-chart";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { Grid } from "@/components/charts/grid";
import { Ring } from "@/components/charts/ring";
import { RingCenter } from "@/components/charts/ring-center";
import { RingChart } from "@/components/charts/ring-chart";
import { ChartTooltip } from "@/components/charts/tooltip";
import GlitchText from "@/components/kokonutui/glitch-text";
import { Reveal, SectionTitle } from "@/components/site/Reveal";
import { growth, network } from "@/data";

// Each ring = that plan's contribution to the average check:
// 60% × 3 500 ₽ + 40% × 4 500 ₽ = 2 100 + 1 800 = 3 900 ₽.
const subscriptions = [
  { label: "Годовой: 60% × 3 500 ₽", share: 60, value: 2100, maxValue: 3900, color: "var(--mint)" },
  { label: "Месячный: 40% × 4 500 ₽", share: 40, value: 1800, maxValue: 3900, color: "var(--coral)" },
];

function Card({
  title,
  note,
  children,
  className = "",
}: {
  title: string;
  note: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col rounded-3xl border bg-card p-6 ${className}`}>
      <h3 className="font-semibold font-sans text-lg tracking-normal">{title}</h3>
      <p className="mt-1 text-muted-foreground text-sm">{note}</p>
      <div className="mt-6 flex-1">{children}</div>
    </div>
  );
}

export function Numbers() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6" id="numbers">
      <SectionTitle
        kicker="Цифры проекта"
        lead="Клуб выходит в плюс при ~420 клиентках. Открываемся с 200 проданными абонементами и добавляем по 40 в месяц."
        title={
          <>
            Почему это{" "}
            <GlitchText
              accent="var(--coral)"
              className="text-mint-ink"
              intensity="medium"
              text="работает"
              trigger="hover"
            />
          </>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Card
            note="Клиентки по месяцам после открытия · план"
            title="200 → 550 за 10 месяцев"
          >
            <BarChart
              aspectRatio="2.4 / 1"
              barGap={0.35}
              data={growth}
              xDataKey="month"
            >
              <Grid horizontal />
              <Bar
                dataKey="clients"
                fill="var(--mint)"
                lineCap="round"
                showValue
              />
              <BarXAxis showAllLabels />
              <ChartTooltip />
            </BarChart>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card
            note="Из чего складывается средний чек в месяц. Наведите на кольцо"
            title="Средний чек 3 900 ₽"
          >
            <div className="flex justify-center">
              <RingChart data={subscriptions} size={220} strokeWidth={16}>
                {subscriptions.map((s, i) => (
                  <Ring index={i} key={s.label} />
                ))}
                <RingCenter defaultLabel="средний чек" suffix=" ₽" />
              </RingChart>
            </div>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {subscriptions.map((s) => (
                <li className="flex items-center gap-2" key={s.label}>
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: s.color }}
                  />
                  {s.label}
                  <span className="ml-auto font-medium tabular-nums">
                    {s.value.toLocaleString("ru-RU")} ₽
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.15}>
          <Card
            note="По готовому шаблону: Марьино, Бутово, Митино, Медведково, Новокосино, Ясенево, Отрадное, Солнцево"
            title="Сеть из 8 клубов за 4 года"
          >
            <BarChart aspectRatio="4 / 1" data={network} xDataKey="year">
              <Grid horizontal />
              <Bar dataKey="clubs" fill="var(--ink)" lineCap="round" showValue />
              <BarXAxis showAllLabels />
              <ChartTooltip />
            </BarChart>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
