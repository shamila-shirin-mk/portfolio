"use client";

import { useRef, useEffect, useLayoutEffect } from "react";

const projects = [
    {
        id: 1,
        title: "Employee Promotion Prediction",
        category: "ML Classification · Streamlit",
        image: "",
        url: "",
        status: "soon" as const,
    },
    {
        id: 2,
        title: "Project Coming Soon",
        category: "Data Science · TBA",
        image: "",
        url: "",
        status: "soon" as const,
    },
    {
        id: 3,
        title: "Project Coming Soon",
        category: "Data Science · TBA",
        image: "",
        url: "",
        status: "soon" as const,
    },
    {
        id: 4,
        title: "Project Coming Soon",
        category: "Data Science · TBA",
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

    // Hide below viewport before first paint
    useLayoutEffect(() => {
        if (panelRef.current) {
            panelRef.current.style.transform = `translateY(${window.innerHeight}px)`;
        }
    }, []);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const panel = panelRef.current;
        const track = trackRef.current;
        if (!wrapper || !panel || !track) return;

        let maxTranslate = 0;
        let wrapperH = 0;

        const measure = () => {
            track.style.transform = "translateX(0)";
            maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
            /*
             * Wrapper height = IH + maxTranslate
             *
             * Entry starts 1 full screen (IH) before the wrapper reaches
             * the viewport top — the panel rises over TechStack with zero gap.
             * Horizontal scroll uses exactly maxTranslate px.
             * When horizontal ends, the wrapper bottom is exactly at the
             * viewport bottom so the footer (z-index:25) slides in immediately.
             */
            wrapperH = window.innerHeight + maxTranslate;
            wrapper.style.height = `${wrapperH}px`;
            update();
        };

        const update = () => {
            const IH = window.innerHeight;
            // scrolled < 0 means wrapper hasn't reached viewport top yet
            const scrolled = -wrapper.getBoundingClientRect().top;

            // Entry: begins IH/2 before wrapper reaches top, matching ScrollStack pinEnd
            const PRE = IH / 2;
            const entryP = Math.max(0, Math.min(1, (scrolled + PRE) / PRE));
            panel.style.transform = `translateY(${(1 - entryP) * IH}px)`;

            // Horizontal: scrolled 0 → maxTranslate (after entry finishes)
            const hP = maxTranslate > 0
                ? Math.max(0, Math.min(1, scrolled / maxTranslate))
                : 0;
            track.style.transform = `translateX(-${hP * maxTranslate}px)`;

            if (barRef.current) barRef.current.style.transform = `scaleX(${hP})`;
            if (counterRef.current) {
                const idx = Math.min(projects.length - 1, Math.floor(hP * projects.length));
                counterRef.current.textContent = `0${idx + 1} / 0${projects.length}`;
            }
        };

        measure();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", measure);
        };
    }, []);

    return (
        <section id="work">
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
                        style={{ paddingLeft: "clamp(0.75rem, 2.5vw, 2.5rem)" }}
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
                            paddingLeft: "clamp(0.75rem, 2.5vw, 2.5rem)",
                            paddingRight: "clamp(0.75rem, 2.5vw, 2.5rem)",
                            gap: "28px",
                            willChange: "transform",
                        }}
                    >
                        {/* Left spacer — card-width on desktop, smaller on mobile */}
                        <div style={{ flexShrink: 0, width: "clamp(120px, 38vw, 680px)" }} />

                        {projects.map((project, index) => (
                            <a
                                key={project.id}
                                href={project.url || "#"}
                                target={project.url ? "_blank" : undefined}
                                rel={project.url ? "noopener noreferrer" : undefined}
                                onClick={project.url ? undefined : (e) => e.preventDefault()}
                                className="group relative overflow-hidden rounded-3xl bg-charcoal-light cursor-pointer"
                                style={{
                                    flexShrink: 0,
                                    width: "min(80vw, calc(100vh - 130px))",
                                    aspectRatio: "1 / 1",
                                    display: "block",
                                    textDecoration: "none",
                                }}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-105"
                                    style={{
                                        backgroundImage: project.image
                                            ? `url(${project.image})`
                                            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/30 transition-colors duration-500" />

                                <div className="absolute top-7 left-7 flex items-center gap-3">
                                    <span className="font-mono text-[11px] text-ivory/40 tracking-[0.25em]">
                                        0{index + 1}
                                    </span>
                                    {project.status === "soon" ? (
                                        <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ivory/50 bg-ivory/5 border border-ivory/15 px-5 py-2 rounded-full">
                                            Coming Soon
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-5 py-2 rounded-full">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                                            </span>
                                            Live
                                        </span>
                                    )}
                                </div>

                                <div className="absolute top-7 right-7 w-11 h-11 rounded-full border border-ivory/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-500">
                                    <svg
                                        className="w-4 h-4 text-ivory"
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

                                <div className="absolute bottom-7 left-7 right-7">
                                    <span className="font-mono text-[11px] sm:text-xs text-ivory/50 tracking-widest uppercase mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3
                                        className="font-display font-bold text-ivory leading-tight"
                                        style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)" }}
                                    >
                                        {project.title}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div
                        className="absolute bottom-8 left-0 right-0 flex items-center gap-4"
                        style={{
                            paddingLeft: "clamp(0.75rem, 2.5vw, 2.5rem)",
                            paddingRight: "clamp(0.75rem, 2.5vw, 2.5rem)",
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
        </section>
    );
}
