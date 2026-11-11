import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { href: "#inside", label: "Клуб" },
  { href: "#schedule", label: "Расписание" },
  { href: "#prices", label: "Цены" },
  { href: "#numbers", label: "Цифры" },
  { href: "#faq", label: "Вопросы" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-full bg-ink font-bold font-heading text-mint text-sm">
        С
      </span>
      <span className="font-bold font-heading text-lg tracking-tight">Своя</span>
    </span>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
      initial={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500",
          scrolled
            ? "border-border bg-card/80 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <a className="pl-2" href="#top">
          <Logo />
        </a>
        <ul
          className="hidden items-center md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((l) => (
            <li className="relative" key={l.href}>
              {hovered === l.href && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-mint-soft"
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <a
                className="relative block px-4 py-2 font-medium text-sm"
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Link
          className="rounded-full bg-ink px-4 py-2 font-medium text-paper text-sm transition-transform hover:scale-[1.03] active:scale-95"
          to="/cabinet"
        >
          Кабинет
        </Link>
      </nav>
    </motion.header>
  );
}
