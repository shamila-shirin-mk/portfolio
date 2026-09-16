"use client";

import { motion } from "framer-motion";

const socials = [
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/shamila-shirin-m-k-91508a323",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: "GitHub",
        href: "https://github.com/shamilashirin32",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
    {
        name: "Email",
        href: "mailto:shamilashirin32@gmail.com",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer
            id="contact"
            className="bg-charcoal w-full relative overflow-hidden"
            style={{ zIndex: 25, paddingTop: "clamp(3rem, 6vw, 6rem)" }}
        >
            <div className="section-content">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-14 sm:mb-20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-10 bg-gray-cool" />
                        <span className="font-mono text-[10px] tracking-widest uppercase text-gray-cool">
                            Contact
                        </span>
                    </div>
                    <h2
                        className="font-display font-black text-ivory leading-none"
                        style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)" }}
                    >
                        LET&apos;S WORK
                        <br />
                        <span className="text-gray-cool opacity-50">TOGETHER</span>
                    </h2>
                </motion.div>

                {/* ── Contact info ── */}
                <div className="pb-16 sm:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-8 max-w-md"
                    >
                        {/* Email */}
                        <div>
                            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-cool mb-2">
                                Email
                            </p>
                            <a
                                href="mailto:shamilashirin32@gmail.com"
                                className="group inline-flex items-center gap-2 text-ivory font-medium text-sm sm:text-base hover:text-gray-cool transition-colors duration-300 break-all"
                            >
                                shamilashirin32@gmail.com
                                <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-y-0.5 transition-all duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>

                        {/* Phone */}
                        <div>
                            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-cool mb-2">
                                Phone
                            </p>
                            <a
                                href="tel:+919544253514"
                                className="text-ivory font-medium text-sm sm:text-base hover:text-gray-cool transition-colors duration-300"
                            >
                                +91 95442 53514
                            </a>
                        </div>

                        {/* Location */}
                        <div>
                            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-cool mb-2">
                                Based In
                            </p>
                            <p className="text-ivory font-medium text-sm sm:text-base">
                                Malappuram, Kerala, India
                            </p>
                        </div>

                        {/* Social icons */}
                        <div>
                            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-cool mb-4">
                                Find me on
                            </p>
                            <div className="flex items-center gap-3">
                                {socials.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.name}
                                        className="w-9 h-9 rounded-full border border-ivory/15 flex items-center justify-center text-ivory/60 hover:text-ivory hover:border-ivory/50 hover:bg-ivory/8 transition-all duration-300"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="border-t border-ivory/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-gray-cool/50">
                        © {new Date().getFullYear()} Shamila Shirin M K. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                        </span>
                        <span className="font-mono text-[10px] tracking-widest uppercase text-green-400/80">
                            Available for work
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
