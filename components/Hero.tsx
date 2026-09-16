"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ParticleText from "./ParticleText";


interface HeroProps {
    onEnter?: () => void;
}

export default function Hero({ onEnter }: HeroProps) {
    const heroRef = useRef<HTMLElement | null>(null);

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden cursor-pointer select-none"
            style={{ background: "#F5F5F0" }}
            onClick={onEnter}
        >
            {/* Name & Designation — shifted up on mobile */}
            <div className="section-content flex-1 flex flex-col justify-start lg:justify-center pr-4 z-10">
                {/* Mobile-only spacer — pushes text down on mobile, invisible on desktop */}
                <div className="lg:hidden" style={{ height: "72px" }} />
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-gray-400 uppercase mb-5 block"
                >
                    Aspiring Data Scientist.
                </motion.span>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.1 }}
                >
                    <ParticleText
                        lines={["SHAMILA", "SHIRIN"]}
                        heroRef={heroRef}
                    />
                </motion.div>
            </div>

            {/* Mobile photo — static image, no hover effect, hidden on desktop */}
            <div
                className="lg:hidden absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
            >
                <Image
                    src="/me%20cartoon%203.webp"
                    alt=""
                    fill
                    className="object-contain object-bottom"
                    priority
                />
            </div>

            {/* Desktop spacer — photo lives in fixed layer in page.tsx */}
            <div className="hidden lg:flex flex-1" />

            {/* Click-to-explore hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
                style={{ zIndex: 10 }}
            >
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gray-400">
                    Click to explore
                </span>
                <div className="relative w-10 h-10 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 rounded-full border border-gray-300"
                        animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full border border-gray-300"
                        animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut", delay: 0.5 }}
                    />
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                </div>
            </motion.div>
        </section>
    );
}
