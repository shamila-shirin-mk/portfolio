"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const exitEase = [0.76, 0, 0.24, 1] as [number, number, number, number];

function LetterReveal({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
    return (
        <>
            {text.split("").map((ch, i) => (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
                    <motion.span
                        initial={{ y: "105%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.65, delay: baseDelay + i * 0.04, ease }}
                        style={{ display: "inline-block" }}
                    >
                        {ch}
                    </motion.span>
                </span>
            ))}
        </>
    );
}

export default function Loader({ visible, onDone }: { visible: boolean; onDone: () => void }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!visible) { setCount(0); return; }

        const DURATION = 1900;
        const start = performance.now();
        let raf: number;

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / DURATION);
            const v = Math.round((1 - Math.pow(1 - t, 3)) * 100);
            setCount(v);
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setTimeout(onDone, 380);
            }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [visible, onDone]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 flex flex-col justify-between overflow-hidden select-none"
                    style={{ background: "var(--color-charcoal)", zIndex: 70 }}
                    initial={{ y: 0 }}
                    exit={{ y: "-100%", transition: { duration: 0.9, ease: exitEase } }}
                >
                    {/* Top label */}
                    <div className="px-8 sm:px-14 pt-8 sm:pt-12">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="font-mono text-[10px] tracking-[0.28em] uppercase text-gray-cool"
                        >
                            Portfolio — 2025
                        </motion.span>
                    </div>

                    {/* Name */}
                    <div className="px-8 sm:px-14">
                        <h1
                            className="font-display font-black leading-[0.88] tracking-tighter text-ivory"
                            style={{ fontSize: "clamp(3.2rem, 10.5vw, 9.5rem)" }}
                        >
                            <div><LetterReveal text="SHAMILA" baseDelay={0.12} /></div>
                            <div className="text-gray-cool opacity-50">
                                <LetterReveal text="SHIRIN" baseDelay={0.18} />
                            </div>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="font-mono text-[10px] tracking-[0.28em] uppercase text-gray-cool mt-5"
                        >
                            Data Scientist
                        </motion.p>
                    </div>

                    {/* Counter + progress bar */}
                    <div className="px-8 sm:px-14 pb-8 sm:pb-12">
                        <div className="flex items-end justify-between mb-3">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.25, duration: 0.5 }}
                                className="font-mono text-[10px] tracking-[0.28em] uppercase text-gray-cool"
                            >
                                Loading
                            </motion.span>
                            <span
                                className="font-mono font-bold text-ivory tabular-nums"
                                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                            >
                                {String(count).padStart(3, "0")}
                            </span>
                        </div>
                        <div className="h-[1px] w-full bg-ivory/10 overflow-hidden">
                            <div
                                className="h-full bg-ivory"
                                style={{
                                    transform: `scaleX(${count / 100})`,
                                    transformOrigin: "left",
                                    transition: "transform 0.05s linear",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
