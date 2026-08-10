"use client";

import "./TechStack.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function hexToRgba(hex: string, a: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

type Category = "All" | "Languages" | "Libraries" | "ML & Stats" | "Tools";
const CATS: Category[] = ["All", "Languages", "Libraries", "ML & Stats", "Tools"];

type Tech = { name: string; hex: string; category: Category; icon: React.ReactNode };

const techs: Tech[] = [
  { name: "Python", hex: "#3776AB", category: "Languages", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" /></svg> },
  { name: "SQL", hex: "#16A085", category: "Languages", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2C7.58 2 4 3.79 4 6s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 8v4c0 2.21 3.58 4 8 4s8-1.79 8-4V8c0 2.21-3.58 4-8 4S4 10.21 4 8zm0 6v4c0 2.21 3.58 4 8 4s8-1.79 8-4v-4c0 2.21-3.58 4-8 4s-8-1.79-8-4z" /></svg> },
  { name: "NumPy", hex: "#4DABCF", category: "Libraries", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M3 3h18v18H3V3zm2 2v6h6V5H5zm8 0v6h6V5h-6zM5 13v6h6v-6H5zm8 0v6h6v-6h-6z" /></svg> },
  { name: "Pandas", hex: "#150458", category: "Libraries", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M3 3h18v4H3V3zm0 6h18v4H3V9zm0 6h18v4H3v-4z" /></svg> },
  { name: "Matplotlib", hex: "#11557C", category: "Libraries", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6.01 4 4L19.71 7.71 22 10V4h-6z" /></svg> },
  { name: "Seaborn", hex: "#4C72B0", category: "Libraries", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M7 14a2 2 0 100-4 2 2 0 000 4zm5 5a2 2 0 100-4 2 2 0 000 4zm5-9a2 2 0 100-4 2 2 0 000 4zM7 7a2 2 0 100-4 2 2 0 000 4zm10 10a2 2 0 100-4 2 2 0 000 4z" /></svg> },
  { name: "Scikit-learn", hex: "#F7931E", category: "Libraries", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.5.5 0 00.12-.61l-1.92-3.32a.5.5 0 00-.6-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.5.5 0 00-.5-.42h-3.84a.5.5 0 00-.5.42l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.5.5 0 00-.6.22L2.66 8.87a.5.5 0 00.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.5.5 0 00-.12.61l1.92 3.32c.14.24.4.34.65.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.28.27.42.5.42h3.84c.25 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.24.09.51 0 .65-.22l1.92-3.32a.5.5 0 00-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z" /></svg> },
  { name: "Streamlit", hex: "#FF4B4B", category: "Libraries", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M8 5v14l11-7z" /></svg> },
  { name: "Machine Learning", hex: "#7C4DFF", category: "ML & Stats", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.311L18 8v8l-6 3.689L6 16V8l6-3.689z" /></svg> },
  { name: "Classification & Regression", hex: "#43A047", category: "ML & Stats", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg> },
  { name: "Statistical Analysis", hex: "#FBC02D", category: "ML & Stats", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M5 21V9h4v12H5zm6 0V3h4v18h-4zm6 0v-7h4v7h-4z" /></svg> },
  { name: "EDA & Data Cleaning", hex: "#26C6DA", category: "ML & Stats", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 5L20.49 19l-5-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z" /></svg> },
  { name: "Time Series Analysis", hex: "#5C6BC0", category: "ML & Stats", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6.01 4 4L19.71 7.71 22 10V4h-6z" /></svg> },
  { name: "MS Excel", hex: "#217346", category: "Tools", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M3 3h18v18H3V3zm2 2v4h4V5H5zm6 0v4h8V5h-8zM5 11v4h4v-4H5zm6 0v4h8v-4h-8zM5 17v2h4v-2H5zm6 0v2h8v-2h-8z" /></svg> },
  { name: "Jupyter Notebook", hex: "#F37626", category: "Tools", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M4 2h13l3 3v17H4V2zm2 2v16h12V6.83L15.17 4H6zm2 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" /></svg> },
  { name: "VS Code", hex: "#007ACC", category: "Tools", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" /></svg> },
  { name: "Power BI", hex: "#F2C811", category: "Tools", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h8v8H3v-8zm10 3h8v5h-8v-5z" /></svg> },
  { name: "Tableau", hex: "#E97627", category: "Tools", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M11 2.05v2.02c3.95.49 7 3.85 7 7.93 0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93V2.05C5.06 2.56 1 6.81 1 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.19-4.06-9.44-9-9.95z" /></svg> },
  { name: "MySQL", hex: "#4479A1", category: "Tools", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2C7.58 2 4 3.79 4 6s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 8v4c0 2.21 3.58 4 8 4s8-1.79 8-4V8c0 2.21-3.58 4-8 4S4 10.21 4 8zm0 6v4c0 2.21 3.58 4 8 4s8-1.79 8-4v-4c0 2.21-3.58 4-8 4s-8-1.79-8-4z" /></svg> },
];

const cardEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const sectionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  return (
    <motion.div
      layout
      key={tech.name}
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 8 }}
      transition={{ duration: 0.3, delay: index * 0.025, ease: cardEase }}
      className="ts-card flex flex-col items-center justify-center gap-2.5 rounded-2xl cursor-default"
      style={{
        padding: "1.25rem 0.5rem",
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
        "--brand-color": tech.hex,
        "--glow": hexToRgba(tech.hex, 0.45),
        "--glow-border": hexToRgba(tech.hex, 0.35),
      } as React.CSSProperties}
    >
      <span className="ts-icon">{tech.icon}</span>
      <span className="ts-label font-mono text-[10px] text-center leading-tight px-1">
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? techs : techs.filter((t) => t.category === active);
  const counts = Object.fromEntries(
    CATS.map((c) => [c, c === "All" ? techs.length : techs.filter((t) => t.category === c).length])
  );

  return (
    <section id="techstack" className="py-16 sm:py-20 bg-transparent w-full">
      <div className="section-content">

        {/* Header row — stacked on mobile, h2 left + filter right on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: sectionEase }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{ marginBottom: "2.5rem" }}
        >
          {/* Left: label + heading */}
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-[1px] w-8 bg-gray-cool" />
              <span className="text-gray-cool font-mono text-xs tracking-widest uppercase">
                My Toolkit
              </span>
            </div>
            <h2
              className="font-display font-black text-ivory leading-none"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
            >
              TECH
              <br />
              <span className="text-gray-cool opacity-50">STACK</span>
            </h2>
          </div>

          {/* Right: filter buttons */}
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex gap-3 w-max">
              {CATS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="relative outline-none focus:outline-none shrink-0 font-mono text-xs tracking-wider uppercase rounded-full border border-ivory/10"
                  style={{ padding: "0.6rem 1.5rem" }}
                >
                  {active === cat && (
                    <motion.span
                      layoutId="ts-pill"
                      className="absolute inset-0 rounded-full bg-ivory"
                      transition={{ type: "spring", stiffness: 380, damping: 35 }}
                    />
                  )}
                  <span
                    className="relative tabular-nums"
                    style={{ zIndex: 1, color: active === cat ? "#1A1A1D" : "#6E7C7C" }}
                  >
                    {cat}
                    <span style={{ marginLeft: "0.4rem", opacity: 0.4, fontSize: "10px" }}>{counts[cat]}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card grid */}
        <motion.div
          layout
          className="grid gap-3 grid-cols-3 sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Count hint */}
        <motion.p
          layout
          className="font-mono text-[10px] tracking-widest uppercase text-gray-cool/40 mt-6 text-right"
        >
          {filtered.length} technologies
        </motion.p>
      </div>
    </section>
  );
}
