import { Link } from "react-router-dom";
import { Logo, Nav } from "@/components/site/Nav";
import { club } from "@/data";
import { Faq } from "./landing/Faq";
import { Hero } from "./landing/Hero";
import { Inside } from "./landing/Inside";
import { Numbers } from "./landing/Numbers";
import { Personas } from "./landing/Personas";
import { Pricing } from "./landing/Pricing";
import { Schedule } from "./landing/Schedule";
import { Trial } from "./landing/Trial";

export default function Landing() {
  return (
    <div className="paper-grid min-h-screen overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <Personas />
        <Inside />
        <Schedule />
        <Pricing />
        <Numbers />
        <Faq />
        <Trial />
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-6 pb-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Logo />
          <p className="mt-2 text-muted-foreground text-sm">{club.tagline}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm sm:items-end">
          <span>Москва, {club.district}</span>
          <span>{club.phone}</span>
          <Link className="text-mint-ink underline underline-offset-4" to="/cabinet">
            Демо-кабинет
          </Link>
        </div>
      </footer>
    </div>
  );
}
