import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/site/Nav";
import { photos } from "@/data";
import { DEMO_PASSWORD, DEMO_PHONE } from "./demo";

export function Login({ onLogin }: { onLogin: () => void }) {
  const [phone, setPhone] = useState(DEMO_PHONE);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <motion.img
          alt=""
          animate={{ scale: 1 }}
          className="absolute inset-0 size-full object-cover opacity-70"
          initial={{ scale: 1.15 }}
          src={photos.member}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-paper">
          <p className="max-w-sm font-bold font-heading text-4xl leading-tight">
            Абонемент, запись и пропуск — в одном месте
          </p>
        </div>
      </div>

      <div className="paper-grid flex flex-col px-6 py-8 sm:px-12">
        <Link className="w-fit" to="/">
          <Logo />
        </Link>
        <motion.form
          animate={{ opacity: 1, y: 0 }}
          className="m-auto flex w-full max-w-sm flex-col gap-5"
          initial={{ opacity: 0, y: 24 }}
          onSubmit={(e) => {
            e.preventDefault();
            if (phone.replace(/\D/g, "") !== DEMO_PHONE.replace(/\D/g, "") || password !== DEMO_PASSWORD) {
              setError(true);
              return;
            }
            setError(false);
            setLoading(true);
            setTimeout(onLogin, 700);
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h1 className="font-bold text-3xl">Вход в кабинет</h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Это демо: данные демо-клиентки уже подставлены, просто нажмите
              «Войти».
            </p>
          </div>
          <label className="flex flex-col gap-2 font-medium text-sm">
            Телефон
            <input
              className="rounded-2xl border bg-card px-4 py-3.5 font-normal text-base outline-none transition focus:border-mint focus:ring-4 focus:ring-mint/20"
              inputMode="tel"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </label>
          <label className="flex flex-col gap-2 font-medium text-sm">
            Пароль
            <input
              className="rounded-2xl border bg-card px-4 py-3.5 font-normal text-base outline-none transition focus:border-mint focus:ring-4 focus:ring-mint/20"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
            />
          </label>
          {error && (
            <motion.p
              animate={{ x: [0, -8, 8, -5, 5, 0] }}
              className="rounded-xl bg-coral/15 px-4 py-3 text-sm"
              transition={{ duration: 0.4 }}
            >
              Неверный телефон или пароль. Демо-вход: {DEMO_PHONE}, {DEMO_PASSWORD}
            </motion.p>
          )}
          <motion.button
            className="relative mt-2 flex h-13 items-center justify-center overflow-hidden rounded-full bg-ink font-semibold text-paper"
            disabled={loading}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                className="size-5 rounded-full border-2 border-paper/30 border-t-paper"
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            ) : (
              "Войти"
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
