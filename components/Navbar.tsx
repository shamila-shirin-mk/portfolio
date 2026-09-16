
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Tech Stack", href: "#techstack" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
];

const socials = [
    { name: "LinkedIn", href: "https://linkedin.com/in/shamila-shirin-m-k-91508a323" },
    { name: "GitHub", href: "https://github.com/shamilashirin32" },
    { name: "Email", href: "mailto:shamilashirin32@gmail.com" },
];

interface NavbarProps {
    onReturnToHero?: () => void;
}

export default function Navbar({ onReturnToHero }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    // Hide on scroll down, show on scroll up
    useEffect(() => {
        const onScroll = () => {
            const current = window.scrollY;
            if (current <= 10) {
                setVisible(true);
            } else if (current < lastScrollY.current - 3) {
                setVisible(true);
            } else if (current > lastScrollY.current + 8) {
                setVisible(false);
                setIsOpen(false);
            }
            lastScrollY.current = current;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    return (
        <>
            {/* Wrapper — slides up/down as one unit */}
            <motion.div
                className="fixed top-0 inset-x-0 z-[60]"
                animate={{ y: visible ? 0 : "-100%" }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* Blur background */}
                <div className="absolute inset-0 h-20 bg-charcoal/30 backdrop-blur-md border-b border-ivory/5" />

                {/* Nav content */}
                <nav className="relative mix-blend-difference text-ivory">
                    <div className="w-full max-w-[100rem] mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
                        <div className="flex justify-between items-center h-20">

                            <button
                                type="button"
                                onClick={onReturnToHero}
                                className="cursor-target font-display font-black text-2xl sm:text-3xl tracking-tighter hover:opacity-80 transition-opacity z-[60] bg-transparent border-none text-left cursor-pointer p-0"
                            >
                                SHIRIN<span className="text-gray-cool">.</span>
                            </button>

                            {/* Desktop links */}
                            <div className="hidden lg:flex gap-x-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="cursor-target font-sans text-xs font-medium tracking-widest uppercase hover:text-gray-cool transition-colors relative group"
                                    >
                                        {item.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gray-cool transition-all group-hover:w-full" />
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden text-ivory hover:text-gray-cool focus:outline-none z-[60] p-2"
                                aria-label="Toggle menu"
                            >
                                <div className="flex flex-col gap-1.5 items-end">
                                    <motion.span
                                        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                        className="w-7 h-0.5 bg-ivory block origin-center"
                                    />
                                    <motion.span
                                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                        className="w-5 h-0.5 bg-ivory block"
                                    />
                                    <motion.span
                                        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                        className="w-7 h-0.5 bg-ivory block origin-center"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
            </motion.div>

            {/* Mobile full-screen menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-50 bg-charcoal flex flex-col justify-center items-center lg:hidden"
                    >
                        <div className="flex flex-col space-y-6 text-center">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.08 * index + 0.2 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="font-display font-black text-3xl sm:text-4xl tracking-tight text-ivory hover:text-gray-cool transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="absolute bottom-8 flex flex-wrap justify-center gap-6 px-8">
                            {socials.map((s, i) => (
                                <motion.a
                                    key={s.name}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="text-gray-cool font-mono text-xs uppercase tracking-widest hover:text-ivory transition-colors"
                                >
                                    {s.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
