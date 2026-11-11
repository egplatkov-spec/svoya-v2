import gym from "@/assets/photos/gym.jpg";
import hand from "@/assets/photos/hand.jpg";
import hero from "@/assets/photos/hero.jpg";
import member from "@/assets/photos/member.jpg";
import sauna from "@/assets/photos/sauna.jpg";
import stretch from "@/assets/photos/stretch.jpg";

export const photos = { gym, hand, hero, member, sauna, stretch };

export const club = {
  name: "Своя",
  tagline: "Клуб, где не нужно ни перед кем стесняться",
  district: "Марьино",
  phone: "+7 916 616 52 36",
};

export const heroStats = [
  { value: 10, suffix: " мин", label: "пешком от дома" },
  { value: 120, suffix: " м²", label: "тренажёрный зал" },
  { value: 14, suffix: "", label: "мест в каждой группе" },
  { value: 0, suffix: "", label: "мужчин в зале" },
];

export const personas = [
  {
    id: "anna",
    segment: "Новички",
    name: "Анна, 34",
    about: "Вышла из декрета, хочет вернуть форму",
    pain: "Стыдно ошибаться и непонятно, с чего начать",
    quote: "Мне нужен зал, где никто не смотрит",
    value: [
      "Бесплатная вводная программа с тренером",
      "Дневные группы, пока дети в саду",
      "Вокруг только женщины — никто не оценивает",
    ],
  },
  {
    id: "maria",
    segment: "Работающие",
    name: "Мария, 28",
    about: "Менеджер, тренируется после работы",
    pain: "Вечером очереди к тренажёрам и «советчики»",
    quote: "В общем зале у тренажёров вечно очередь из мужчин",
    value: [
      "10 минут пешком — без поездок через город",
      "Зал и группы в одном абонементе",
      "Чистые душевые, фен и косметика",
    ],
  },
  {
    id: "zarina",
    segment: "Особые условия",
    name: "Зарина, 41",
    about: "Не занимается при мужчинах по вере",
    pain: "Тренироваться просто негде, кроме дома",
    quote: "Мне просто некуда пойти — кроме дома",
    value: [
      "Закрытые окна, без камер в зонах",
      "Тренеры и персонал — только женщины",
      "Удобная одежда без требований",
    ],
  },
];

export type ClassKind = "soft" | "power" | "start";

export interface ClassSlot {
  time: string;
  title: string;
  coach: string;
  kind: ClassKind;
  booked: number;
}

export const kindLabel: Record<ClassKind, string> = {
  soft: "Мягкие",
  power: "Силовые",
  start: "Для новичков",
};

export const CLASS_CAPACITY = 14;

export const schedule: { id: string; title: string; slots: ClassSlot[] }[] = [
  {
    id: "mon",
    title: "Пн",
    slots: [
      { time: "09:30", title: "Пилатес", coach: "Ольга", kind: "soft", booked: 9 },
      { time: "11:00", title: "Старт: техника в зале", coach: "Ирина", kind: "start", booked: 6 },
      { time: "19:00", title: "Функциональная", coach: "Дарья", kind: "power", booked: 13 },
      { time: "20:15", title: "Растяжка", coach: "Ольга", kind: "soft", booked: 11 },
    ],
  },
  {
    id: "tue",
    title: "Вт",
    slots: [
      { time: "10:00", title: "Йога", coach: "Алина", kind: "soft", booked: 7 },
      { time: "18:30", title: "Ягодицы и спина", coach: "Дарья", kind: "power", booked: 14 },
      { time: "19:45", title: "Пилатес", coach: "Ольга", kind: "soft", booked: 10 },
    ],
  },
  {
    id: "wed",
    title: "Ср",
    slots: [
      { time: "09:30", title: "Мама + фитнес", coach: "Ирина", kind: "start", booked: 8 },
      { time: "12:00", title: "Растяжка", coach: "Алина", kind: "soft", booked: 5 },
      { time: "19:00", title: "Силовая круговая", coach: "Дарья", kind: "power", booked: 12 },
    ],
  },
  {
    id: "thu",
    title: "Чт",
    slots: [
      { time: "10:00", title: "Пилатес", coach: "Ольга", kind: "soft", booked: 9 },
      { time: "18:30", title: "Старт: первые 4 недели", coach: "Ирина", kind: "start", booked: 7 },
      { time: "20:00", title: "Функциональная", coach: "Дарья", kind: "power", booked: 13 },
    ],
  },
  {
    id: "fri",
    title: "Пт",
    slots: [
      { time: "09:30", title: "Йога", coach: "Алина", kind: "soft", booked: 6 },
      { time: "19:00", title: "Ягодицы и спина", coach: "Дарья", kind: "power", booked: 11 },
    ],
  },
  {
    id: "sat",
    title: "Сб",
    slots: [
      { time: "11:00", title: "Растяжка + сауна", coach: "Ольга", kind: "soft", booked: 12 },
      { time: "12:30", title: "Силовая круговая", coach: "Дарья", kind: "power", booked: 10 },
    ],
  },
];

export const plans = [
  {
    id: "month",
    title: "Месяц",
    price: 4500,
    per: "₽ / мес",
    note: "Безлимит в зал и на все группы",
    features: ["Зал и все групповые", "Вводная программа", "Заморозка до 7 дней"],
  },
  {
    id: "year",
    title: "Год",
    price: 3500,
    per: "₽ / мес",
    note: "42 000 ₽ одним платежом",
    features: ["Всё из «Месяца»", "Экономия 12 000 ₽", "Заморозка до 30 дней"],
    featured: true,
  },
  {
    id: "personal",
    title: "Персональная",
    price: 2500,
    per: "₽ / тренировка",
    note: "С тренером-женщиной, один на один",
    features: ["Программа под вашу цель", "Пакет из 8 — дешевле", "Запись в кабинете"],
  },
];

/** Planned client growth after opening: 200 sold, +40 a month. */
export const growth = Array.from({ length: 10 }, (_, i) => ({
  month: `${i + 1}`,
  clients: Math.min(200 + i * 40, 550),
}));

export const network = [
  { year: "1-й год", clubs: 1 },
  { year: "2-й год", clubs: 3 },
  { year: "3-й год", clubs: 5 },
  { year: "4-й год", clubs: 8 },
];

export const faq = [
  {
    q: "Правда ли, что мужчин не будет совсем?",
    a: "Да. Клиентки, тренеры, администраторы и уборщицы — только женщины. Окна закрыты, в зонах тренировок нет камер.",
  },
  {
    q: "Я никогда не занималась. С чего начать?",
    a: "С бесплатного пробного и вводной программы: тренер покажет технику на каждом тренажёре и соберёт план на первые 4 недели.",
  },
  {
    q: "Можно заморозить абонемент?",
    a: "Да, прямо в личном кабинете: месячный — до 7 дней, годовой — до 30 дней.",
  },
  {
    q: "Как пройти в клуб?",
    a: "По QR-пропуску из личного кабинета — показываете телефон на ресепшене, и всё.",
  },
];
