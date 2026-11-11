import { AnimatePresence, motion } from "motion/react";
import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "@/pages/Landing";

const Cabinet = lazy(() => import("@/pages/Cabinet"));

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        key={location.pathname}
        transition={{ duration: 0.35 }}
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route element={<Landing />} path="/" />
            <Route element={<Cabinet />} path="/cabinet" />
            <Route element={<Landing />} path="*" />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

// HashRouter: works on GitHub Pages and when opened as a plain file.
export default function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <AnimatedRoutes />
    </HashRouter>
  );
}
