"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import WordTargetInit from "@/components/WordTargetInit";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import ProfilePhoto from "@/components/ProfilePhoto";

const TargetCursor = dynamic(() => import("@/components/TargetCursor"), { ssr: false });

export default function Home() {
  const [entered, setEntered] = useState(false);
  const hasLeftHero = useRef(false);

  const enter = () => {
    hasLeftHero.current = true;
    setEntered(true);
  };

  const returnToHero = () => {
    window.scrollTo(0, 0);
    setEntered(false);
  };

  useEffect(() => {
    if (!entered) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < -30 && window.scrollY < 10) returnToHero();
    };
    let ty = 0;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches[0].clientY - ty > 40 && window.scrollY < 10) returnToHero();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [entered]);

  return (
    <main className="min-h-screen selection:bg-gray-cool selection:text-ivory relative overflow-x-hidden">

      {/* Desktop photo — fixed outside hero so it stays in place while hero slides up */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="fixed-photo"
            className="fixed top-0 right-0 h-screen hidden lg:block cursor-pointer select-none"
            style={{ width: "50%", zIndex: 55 }}
            onClick={enter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.6 } }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <ProfilePhoto objectPosition="bottom" priority />
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <>
          <WordTargetInit />
          <TargetCursor
            targetSelector=".cursor-target, a, button"
            spinDuration={2}
            hideDefaultCursor={true}
            parallaxOn={true}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Navbar />
          </motion.div>
          <div className="text-ivory" style={{ background: "var(--color-charcoal)" }}>
            <About />
            <Education />
            <Experience />
            <TechStack />
            <Work />
            <Footer />
          </div>
        </>
      )}

      <AnimatePresence>
        {!entered && (
          <motion.div
            key="hero-overlay"
            className="fixed inset-0 z-50"
            initial={hasLeftHero.current ? { y: "-100%" } : false}
            animate={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <Hero onEnter={enter} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
