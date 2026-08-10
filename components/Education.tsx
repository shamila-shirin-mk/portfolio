"use client";

import { motion } from "framer-motion";

const education = [
    {
        id: 1,
        degree: "Master of Computer Applications (MCA)",
        institution: "Indira Gandhi National Open University, India",
        period: "2025 – Present",
        description:
            "Postgraduate degree covering advanced programming, data structures, and analytical problem solving.",
    },
    {
        id: 2,
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "University of Calicut, India",
        period: "2022 – 2025",
        description:
            "Degree covering programming fundamentals, database management, and core computer science principles.",
    },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Education() {
    return (
        <section
            id="education"
            className="w-full bg-transparent"
            style={{ padding: "clamp(3rem, 6vw, 6rem) 0" }}
        >
            <div className="section-content">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65, ease }}
                    className="flex items-end justify-between mb-16"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "3rem" }}
                >
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[1px] w-10 bg-gray-cool" />
                            <span className="text-gray-cool font-mono text-xs tracking-widest uppercase">
                                Academic Background
                            </span>
                        </div>
                        <h2
                            className="font-display font-black text-ivory leading-none"
                            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
                        >
                            MY
                            <br />
                            <span className="text-gray-cool opacity-50">EDUCATION</span>
                        </h2>
                    </div>
                </motion.div>

                {/* Entries */}
                <div className="flex flex-col">
                    {education.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.6, ease, delay: i * 0.12 }}
                            className="group grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-20"
                            style={{ padding: "3rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                        >
                            {/* Left — period */}
                            <div className="flex lg:flex-col gap-3 lg:gap-4 lg:pt-1">
                                <span className="font-mono text-[11px] tracking-widest text-ivory/40 uppercase whitespace-nowrap">
                                    {item.period}
                                </span>
                            </div>

                            {/* Right — content */}
                            <div>
                                <h3
                                    className="font-display font-bold text-ivory mb-2 group-hover:text-gray-cool transition-colors duration-300"
                                    style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
                                >
                                    {item.degree}
                                </h3>
                                <p className="font-mono text-xs tracking-wider text-gray-cool uppercase mb-7">
                                    {item.institution}
                                </p>
                                <div
                                    className="w-8 mb-7"
                                    style={{ height: "1px", background: "rgba(255,255,255,0.12)" }}
                                />
                                <p className="text-gray-lighter text-sm leading-relaxed max-w-xl">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
