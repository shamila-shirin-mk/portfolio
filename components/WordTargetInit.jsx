"use client";
import { useEffect } from "react";

/**
 * Wraps every word inside headings with a .cursor-target span so
 * TargetCursor snaps to individual words instead of full containers.
 *
 * Skips:
 *  - elements already processed
 *  - anything inside a `.pointer-events-none` ancestor (decorative text)
 *  - anything inside a `[data-no-cursor]` ancestor
 */
export default function WordTargetInit() {
    useEffect(() => {
        const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

        elements.forEach((el) => {
            // Skip decorative / excluded ancestors
            if (
                el.closest(".pointer-events-none") ||
                el.closest("[data-no-cursor]")
            ) return;

            // Skip if already split
            if (el.getAttribute("data-words-split")) return;
            el.setAttribute("data-words-split", "true");

            // Only touch direct text nodes — leave child elements untouched
            const textNodes = Array.from(el.childNodes).filter(
                (n) => n.nodeType === Node.TEXT_NODE
            );

            textNodes.forEach((textNode) => {
                const raw = textNode.textContent || "";
                if (!raw.trim()) return;

                const fragment = document.createDocumentFragment();

                // Split preserving whitespace runs
                raw.split(/(\s+)/).forEach((part) => {
                    if (/^\s+$/.test(part)) {
                        fragment.appendChild(document.createTextNode(part));
                    } else if (part) {
                        const span = document.createElement("span");
                        span.className = "cursor-target";
                        span.style.display = "inline-block";
                        span.textContent = part;
                        fragment.appendChild(span);
                    }
                });

                el.replaceChild(fragment, textNode);
            });
        });
    }, []);

    return null;
}
