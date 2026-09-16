"use client";

import Image from "next/image";
import { useRef, useCallback } from "react";

const CARTOON  = "/me%20cartoon%203.webp";
const REAL     = "/me%203.webp";
const RADIUS   = 85; // px — size of the reveal circle

export default function ProfilePhoto({
  objectPosition = "bottom",
  priority = false,
}: {
  objectPosition?: string;
  priority?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef    = useRef<HTMLDivElement>(null);

  const setClip = useCallback((x: number, y: number, r: number, animated: boolean) => {
    const el = revealRef.current;
    if (!el) return;
    el.style.transition = animated ? "clip-path 0.35s ease" : "none";
    el.style.clipPath    = `circle(${r}px at ${x}px ${y}px)`;
  }, []);

  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setClip(e.clientX - rect.left, e.clientY - rect.top, RADIUS, true);
  }, [setClip]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setClip(e.clientX - rect.left, e.clientY - rect.top, RADIUS, false);
  }, [setClip]);

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // collapse back to cursor position so it shrinks in place
    setClip(e.clientX - rect.left, e.clientY - rect.top, 0, true);
  }, [setClip]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Cartoon — always visible underneath */}
      <Image
        src={CARTOON}
        alt="Shamila Shirin"
        fill
        className="object-contain"
        style={{ objectPosition }}
        priority={priority}
      />

      {/* Real photo — clipped to follow the cursor */}
      <div
        ref={revealRef}
        className="absolute inset-0"
        style={{ clipPath: "circle(0px at 50% 50%)" }}
      >
        <Image
          src={REAL}
          alt=""
          fill
          className="object-contain"
          style={{ objectPosition }}
          priority={false}
        />
      </div>
    </div>
  );
}
