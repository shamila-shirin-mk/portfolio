"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        id: 1,
        role: "Data Science Trainee",
        company: "Techolas Technology, India",
        period: "Oct 2025 – Present",
        type: "Training",
        description:
            "Performed data analysis on real-world datasets using Python and SQL, covering data cleaning, preprocessing, and exploratory data analysis. Applied machine learning techniques for classification and predictive modelling, built and evaluated models using appropriate performance metrics, and created visualizations with Matplotlib and Seaborn to identify patterns and trends.",
        skills: ["Python", "SQL", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Machine Learning"],
    },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];


export default function Experience() {
    return (
        <section
            id="experience"
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
                                Career
                            </span>
                        </div>
                        <h2
                            className="font-display font-black text-ivory leading-none"
                            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
                        >
                            MY
                            <br />
                            <span className="text-gray-cool opacity-50">EXPERIENCE</span>
                        </h2>
                    </div>
                </motion.div>

                {/* Entries */}
                <div className="flex flex-col">
                    {experiences.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.6, ease, delay: i * 0.12 }}
                            className="group grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-20"
                            style={{ padding: "3rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                        >
                            {/* Left — period + type badge */}
                            <div className="flex lg:flex-col gap-3 lg:gap-4 lg:pt-1 flex-wrap">
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
                                    {item.role}
                                </h3>
                                <p className="font-mono text-xs tracking-wider text-gray-cool uppercase mb-7">
                                    {item.company}
                                </p>
                                <div
                                    className="w-8 mb-7"
                                    style={{ height: "1px", background: "rgba(255,255,255,0.12)" }}
                                />
                                <p className="text-gray-lighter text-sm leading-relaxed mb-8 max-w-xl">
                                    {item.description}
                                </p>

                                {/* Skill pills */}
                                <div className="flex flex-wrap gap-2">
                                    {item.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="font-mono text-[10px] tracking-wider uppercase text-ivory/40 border px-4 py-1.5 rounded-full"
                                            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
