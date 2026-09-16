"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";

const projects = [
    {
        id: 1,
        title: "Employee Promotion Prediction",
        category: "ML Classification · Python & XGBoost",
        description: "End-to-end Machine Learning classification pipeline evaluating employee KPIs, performance ratings, tenure, and training history to accurately predict promotion likelihood.",
        image: "/projects/employee_promotion.jpg",
        url: "https://github.com/shamila-shirin-mk/Employee-promotion-prediction",
        status: "live" as const,
    },
    {
        id: 2,
        title: "Project Coming Soon",
        category: "Data Science · TBA",
        description: "Reserved space for your next project. Share the details whenever you're ready to add it!",
        image: "",
        url: "",
        status: "soon" as const,
    },
    {
        id: 3,
        title: "Project Coming Soon",
        category: "Data Science · TBA",
        description: "Reserved space for your upcoming project.",
        image: "",
        url: "",
        status: "soon" as const,
    },
    {
        id: 4,
        title: "Project Coming Soon",
        category: "Data Science · TBA",
        description: "Reserved space for your upcoming project.",
        image: "",
        url: "",
        status: "soon" as const,
    },
];

export default function Work() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check window width for responsive behavior
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Hide below viewport before first paint on desktop
    useLayoutEffect(() => {
        if (!isMobile && panelRef.current) {
            panelRef.current.style.transform = `translateY(${window.innerHeight}px)`;
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) return;

        const wrapper = wrapperRef.current;
        const panel = panelRef.current;
        const track = trackRef.current;
        if (!wrapper || !panel || !track) return;

        let maxTranslate = 0;
        let wrapperH = 0;

        const measure = () => {
            track.style.transform = "translateX(0)";
            maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
            wrapperH = window.innerHeight + maxTranslate;
            wrapper.style.height = `${wrapperH}px`;
            update();
        };

        const update = () => {
            const IH = window.innerHeight;
            const scrolled = -wrapper.getBoundingClientRect().top;

            // Entry animation: begins IH/2 before wrapper reaches top
            const PRE = IH / 2;
            const entryP = Math.max(0, Math.min(1, (scrolled + PRE) / PRE));

            if (scrolled < 0) {
                // Entering from top
                panel.style.position = "fixed";
                panel.style.transform = `translateY(${(1 - entryP) * IH}px)`;
                track.style.transform = "translateX(0px)";
                if (barRef.current) barRef.current.style.transform = "scaleX(0)";
                if (counterRef.current) counterRef.current.textContent = `01 / 0${projects.length}`;
            } else if (scrolled <= maxTranslate) {
                // Pinned horizontal scrolling phase
                panel.style.position = "fixed";
                panel.style.transform = "translateY(0px)";
                const hP = maxTranslate > 0 ? scrolled / maxTranslate : 0;
                track.style.transform = `translateX(-${hP * maxTranslate}px)`;
                if (barRef.current) barRef.current.style.transform = `scaleX(${hP})`;
                if (counterRef.current) {
                    const idx = Math.min(projects.length - 1, Math.floor(hP * projects.length));
                    counterRef.current.textContent = `0${idx + 1} / 0${projects.length}`;
                }
            } else {
                // Unpinning phase: scroll past cleanly into Footer
                panel.style.position = "fixed";
                const exitOffset = scrolled - maxTranslate;
                panel.style.transform = `translateY(-${exitOffset}px)`;
                track.style.transform = `translateX(-${maxTranslate}px)`;
                if (barRef.current) barRef.current.style.transform = "scaleX(1)";
                if (counterRef.current) counterRef.current.textContent = `0${projects.length} / 0${projects.length}`;
            }
        };

        measure();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", measure);
        };
    }, [isMobile]);

    return (
        <section id="work" className="bg-charcoal text-ivory relative">
            {isMobile ? (
                /* Mobile Touch Carousel Layout */
                <div className="py-16 px-4 sm:px-8">
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="h-[1px] w-8 bg-gray-cool" />
                            <span className="text-gray-cool font-mono text-xs tracking-widest uppercase">
                                My Portfolio
                            </span>
                        </div>
                        <h2
                            className="font-display font-black text-ivory leading-none"
                            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
                        >
                            FEATURED
                            <br />
                            <span className="text-gray-cool opacity-40">PROJECTS</span>
                        </h2>
                    </div>

                    <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
                        {projects.map((project, index) => (
                            <a
                                key={project.id}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="snap-center shrink-0 group relative overflow-hidden rounded-2xl bg-charcoal-light block text-decoration-none border border-ivory/10"
                                style={{
                                    width: "82vw",
                                    maxWidth: "340px",
                                    aspectRatio: "4 / 5",
                                }}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${project.image})`,
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

                                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                                    <span className="font-mono text-[11px] text-ivory/60 tracking-[0.25em]">
                                        0{index + 1}
                                    </span>
                                    {project.status === "soon" ? (
                                        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-ivory/50 bg-ivory/5 border border-ivory/15 px-3 py-1 rounded-full">
                                            Coming Soon
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-3 py-1 rounded-full">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                            </span>
                                            {project.url.includes("github.com") ? "GitHub Repo" : "Live Demo"}
                                        </span>
                                    )}
                                </div>

                                <div className="absolute bottom-5 left-5 right-5">
                                    <span className="font-mono text-[10px] text-ivory/60 tracking-widest uppercase mb-1.5 block">
                                        {project.category}
                                    </span>
                                    <h3 className="font-display font-bold text-ivory text-lg leading-tight mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-lighter text-xs line-clamp-2 leading-relaxed opacity-80">
                                        {project.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            ) : (
                /* Desktop Pinned Horizontal Scroll Layout */
                <div ref={wrapperRef} style={{ height: "100vh" }}>
                    <div
                        ref={panelRef}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 20,
                            background: "var(--color-charcoal)",
                            overflow: "hidden",
                            willChange: "transform",
                        }}
                    >
                        {/* Section title */}
                        <div
                            className="absolute top-8 left-0 right-0 z-10 pointer-events-none"
                            style={{ paddingLeft: "clamp(1rem, 2.5vw, 2.5rem)" }}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="h-[1px] w-8 bg-gray-cool" />
                                <span className="text-gray-cool font-mono text-xs tracking-widest uppercase">
                                    My Portfolio
                                </span>
                            </div>
                            <h2
                                className="font-display font-black text-ivory leading-none"
                                style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem)" }}
                            >
                                FEATURED
                                <br />
                                <span className="text-gray-cool opacity-40">PROJECTS</span>
                            </h2>
                        </div>

                        {/* Cards track */}
                        <div
                            ref={trackRef}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                                paddingLeft: "clamp(1rem, 2.5vw, 2.5rem)",
                                paddingRight: "clamp(1rem, 2.5vw, 2.5rem)",
                                gap: "32px",
                                willChange: "transform",
                            }}
                        >
                            {/* Left spacer — allows title visibility on start */}
                            <div style={{ flexShrink: 0, width: "clamp(160px, 28vw, 420px)" }} />

                            {projects.map((project, index) => (
                                <a
                                    key={project.id}
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden rounded-3xl bg-charcoal-light cursor-pointer border border-ivory/10 shadow-2xl transition-all duration-500"
                                    style={{
                                        flexShrink: 0,
                                        width: "min(70vw, calc(100vh - 160px))",
                                        aspectRatio: "1 / 1",
                                        display: "block",
                                        textDecoration: "none",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-108"
                                        style={{
                                            backgroundImage: `url(${project.image})`,
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/20 transition-colors duration-500" />

                                    <div className="absolute top-7 left-7 flex items-center gap-3">
                                        <span className="font-mono text-[11px] text-ivory/50 tracking-[0.25em]">
                                            0{index + 1}
                                        </span>
                                        {project.status === "soon" ? (
                                            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ivory/50 bg-ivory/5 border border-ivory/15 px-4 py-1.5 rounded-full backdrop-blur-md">
                                                Coming Soon
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-4 py-1.5 rounded-full backdrop-blur-md">
                                                <span className="relative flex h-2.5 w-2.5">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                                                </span>
                                                {project.url.includes("github.com") ? "GitHub Repo" : "Live Demo"}
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute top-7 right-7 w-12 h-12 rounded-full border border-ivory/20 bg-charcoal/40 backdrop-blur-md flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:bg-ivory group-hover:text-charcoal transition-all duration-500">
                                        <svg
                                            className="w-5 h-5 text-ivory group-hover:text-charcoal transition-colors duration-500 -rotate-45 group-hover:rotate-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>

                                    <div className="absolute bottom-8 left-8 right-8">
                                        <span className="font-mono text-xs text-gray-cool tracking-widest uppercase mb-2 block">
                                            {project.category}
                                        </span>
                                        <h3
                                            className="font-display font-bold text-ivory leading-tight mb-3"
                                            style={{ fontSize: "clamp(1.3rem, 2.2vw, 2.2rem)" }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-lighter text-sm leading-relaxed max-w-lg line-clamp-2 opacity-90 font-sans">
                                            {project.description}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Progress bar */}
                        <div
                            className="absolute bottom-8 left-0 right-0 flex items-center gap-4"
                            style={{
                                paddingLeft: "clamp(1rem, 2.5vw, 2.5rem)",
                                paddingRight: "clamp(1rem, 2.5vw, 2.5rem)",
                            }}
                        >
                            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-cool">
                                Scroll
                            </span>
                            <div className="flex-1 h-[1px] bg-ivory/10 relative overflow-hidden">
                                <div
                                    ref={barRef}
                                    className="absolute inset-0 bg-ivory origin-left"
                                    style={{ transform: "scaleX(0)" }}
                                />
                            </div>
                            <span
                                ref={counterRef}
                                className="font-mono text-[10px] tracking-[0.25em] text-gray-cool tabular-nums"
                            >
                                01 / 0{projects.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
