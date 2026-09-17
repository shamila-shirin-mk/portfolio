"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const P1 = "Aspiring Data Scientist with a strong foundation in Python, SQL, and Machine Learning, skilled in data cleaning, exploratory data analysis, and statistical analysis to uncover meaningful patterns in data.";
const P2 = "Builds interactive dashboards using Power BI and Tableau, and applies classification, regression, and model evaluation techniques to solve real-world problems. Passionate about turning complex data into clear, actionable insights.";

/* Each character is its own component so useTransform is called at component level */
function Char({
    char,
    progress,
    start,
    end,
}: {
    char: string;
    progress: MotionValue<number>;
    start: number;
    end: number;
}) {
    const opacity = useTransform(progress, [start, end], [0.38, 1]);
    return (
        <motion.span style={{ opacity, display: "inline-block" }}>
            {char}
        </motion.span>
    );
}

/*
 * Renders multiple paragraphs as one continuous letter-by-letter reveal.
 * Words are wrapped in nowrap spans so lines never break mid-word.
 */
function RevealParagraphs({
    texts,
    progress,
    rangeStart,
    rangeEnd,
}: {
    texts: string[];
    progress: MotionValue<number>;
    rangeStart: number;
    rangeEnd: number;
}) {
    const total = texts.reduce((sum, t) => sum + t.length, 0);
    const gap   = (rangeEnd - rangeStart) / total;

    let globalIdx = 0;

    return (
        <>
            {texts.map((text, ti) => {
                const words = text.split(" ");
                return (
                    <span key={ti} style={{ display: "block", marginBottom: ti < texts.length - 1 ? "1.5rem" : "0" }}>
                        {words.map((word, wi) => {
                            const letters = word.split("").map((char) => {
                                const i     = globalIdx++;
                                const start = rangeStart + i * gap;
                                const end   = Math.min(start + gap * 4, rangeEnd);
                                return (
                                    <Char key={i} char={char} progress={progress} start={start} end={end} />
                                );
                            });
                            const hasSpace = wi < words.length - 1;
                            if (hasSpace) globalIdx++; // advance past the space in the timeline
                            return (
                                <Fragment key={wi}>
                                    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                                        {letters}
                                    </span>
                                    {hasSpace && " "}
                                </Fragment>
                            );
                        })}
                    </span>
                );
            })}
        </>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "0.75 start"],
    });

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative flex flex-col justify-center items-center min-h-screen w-full bg-transparent overflow-hidden"
        >
            {/* Decorative background text */}
            <div className="absolute top-20 lg:top-32 left-0 w-full overflow-hidden leading-none opacity-[0.04] select-none pointer-events-none z-0">
                <div className="font-display font-black text-[18vw] whitespace-nowrap text-ivory">
                    ABOUT ME ABOUT ME
                </div>
            </div>

            {/* Text content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="section-content w-full max-w-4xl flex flex-col justify-center relative z-10 py-16 sm:py-24"
            >
                <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-10 bg-gray-cool" />
                        <span className="text-gray-cool font-mono text-xs sm:text-sm tracking-widest uppercase">
                            Who I Am
                        </span>
                    </div>

                    <h2
                        className="font-display font-bold leading-tight mb-8 sm:mb-10 text-ivory"
                        style={{ fontSize: "clamp(2.2rem, 4.2vw, 4.2rem)" }}
                    >
                        Insight-Driven <br />
                        <span className="text-gray-cool italic font-serif">Data Scientist</span>
                    </h2>

                    <div
                        className="text-gray-lighter leading-relaxed font-sans"
                        style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)" }}
                    >
                        <RevealParagraphs
                            texts={[P1, P2]}
                            progress={scrollYProgress}
                            rangeStart={0}
                            rangeEnd={1}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
