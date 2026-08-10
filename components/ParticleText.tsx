"use client";

import { useRef, useEffect, useCallback, useState, useMemo } from "react";
import { createPortal } from "react-dom";

interface P {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  group: number;
}

const STEP           = 3;
const R              = 0.9;
const SCATTER_MIN    = 2;
const SCATTER_MAX    = 9;
const REPEL_R        = 90;
const REPEL_F        = 4;
const SPRING         = 0.05;
const DAMP           = 0.86;
const RETURN_STAGGER = 90; // ms between each letter's return (reverse order)

export default function ParticleText({
  lines,
  className = "",
  style,
  heroRef,
}: {
  lines: string[];
  className?: string;
  style?: React.CSSProperties;
  heroRef?: React.RefObject<HTMLElement | null>;
}) {
  const h1Ref          = useRef<HTMLHeadingElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const letterRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const pts            = useRef<P[]>([]);
  const groupCenters   = useRef<{ x: number; y: number }[]>([]);
  const numGroups      = useRef(0);
  const rafId          = useRef(0);
  const running        = useRef(false);
  const hovered        = useRef(false);
  const mouse          = useRef({ x: -9999, y: -9999 });
  const activeGroup    = useRef(-1);
  const scatterOrder   = useRef<number[]>([]);
  const scatteredSet   = useRef<Set<number>>(new Set());
  const groupReturnAt  = useRef<number[]>([]);
  const heroMM         = useRef<((e: MouseEvent) => void) | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* stable char → group index map so render is deterministic */
  const charGroupMap = useMemo(() => {
    const map = new Map<string, number>();
    let g = 0;
    for (let li = 0; li < lines.length; li++)
      for (let ci = 0; ci < lines[li].length; ci++)
        if (lines[li][ci] !== " ") map.set(`${li}_${ci}`, g++);
    return map;
  }, [lines]);

  /* ── draw only scattered-group particles; canvas transparent elsewhere ── */
  const draw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cv.width / dpr, cv.height / dpr);
    const sc = scatteredSet.current;
    if (!sc.size) return;
    ctx.beginPath();
    for (const p of pts.current) {
      if (!sc.has(p.group)) continue;
      ctx.moveTo(p.x + R, p.y);
      ctx.arc(p.x, p.y, R, 0, 6.2832);
    }
    ctx.fillStyle = "#1A1A1D";
    ctx.fill();
  }, []);

  /* ── physics tick ── */
  const tick = useCallback(() => {
    const mx    = mouse.current.x;
    const my    = mouse.current.y;
    const isHov = hovered.current;
    const now   = performance.now();
    let live    = false;

    /* per-group settled tracker */
    const settled = new Array(numGroups.current).fill(true);

    for (const p of pts.current) {
      if (!scatteredSet.current.has(p.group)) continue;

      if (isHov) {
        /* repel ALL scattered particles from cursor, regardless of which letter */
        const dx = p.x - mx, dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R * REPEL_R) {
          const d = Math.sqrt(d2) || 1;
          const f = ((REPEL_R - d) / REPEL_R) * REPEL_F;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.92; p.vy *= 0.92;
        settled[p.group] = false;
        live = true;
      } else if (now < (groupReturnAt.current[p.group] ?? 0)) {
        /* cursor left — waiting for this letter's stagger delay */
        p.vx *= 0.88; p.vy *= 0.88;
        settled[p.group] = false;
        live = true;
      } else {
        /* spring back to origin */
        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;
        p.vx *= DAMP; p.vy *= DAMP;
        if (
          Math.abs(p.vx) + Math.abs(p.vy) > 0.04 ||
          Math.abs(p.x - p.ox) + Math.abs(p.y - p.oy) > 0.15
        ) { settled[p.group] = false; live = true; }
      }
      p.x += p.vx; p.y += p.vy;
    }

    /* restore span when its particles have fully settled */
    for (let g = 0; g < numGroups.current; g++) {
      if (scatteredSet.current.has(g) && settled[g] && g !== activeGroup.current) {
        scatteredSet.current.delete(g);
        const sp = letterRefs.current[g];
        if (sp) sp.style.opacity = "1";
      }
    }

    draw();

    if (live || isHov) {
      rafId.current = requestAnimationFrame(tick);
    } else {
      running.current = false;
      if (canvasRef.current) canvasRef.current.style.opacity = "0";
    }
  }, [draw]);

  const startLoop = useCallback(() => {
    if (!running.current) {
      running.current = true;
      rafId.current   = requestAnimationFrame(tick);
    }
  }, [tick]);

  /* ── hide span + burst particles for one letter ── */
  const scatterGroup = useCallback((g: number) => {
    if (scatteredSet.current.has(g)) return;
    scatteredSet.current.add(g);
    scatterOrder.current.push(g);
    const sp = letterRefs.current[g];
    if (sp) sp.style.opacity = "0";
    for (const p of pts.current) {
      if (p.group !== g) continue;
      const a = Math.random() * 6.2832;
      const s = SCATTER_MIN + Math.random() * (SCATTER_MAX - SCATTER_MIN);
      p.vx += Math.cos(a) * s;
      p.vy += Math.sin(a) * s;
    }
  }, []);

  /* ── find letter group whose center is closest to cursor ── */
  const closestGroup = useCallback((mx: number, my: number) => {
    const cs = groupCenters.current;
    let best = -1, min = Infinity;
    for (let i = 0; i < cs.length; i++) {
      const d2 = (mx - cs[i].x) ** 2 + (my - cs[i].y) ** 2;
      if (d2 < min) { min = d2; best = i; }
    }
    return best;
  }, []);

  /* ── sample pixels per character into per-group particle arrays ── */
  const sample = useCallback(async () => {
    const cv   = canvasRef.current;
    const h1   = h1Ref.current;
    const hero = heroRef?.current;
    if (!cv || !h1) return;

    await document.fonts.ready;

    const heroRect = hero?.getBoundingClientRect() ?? h1.getBoundingClientRect();
    const h1Rect   = h1.getBoundingClientRect();
    const dpr      = window.devicePixelRatio || 1;

    cv.width        = heroRect.width  * dpr;
    cv.height       = heroRect.height * dpr;
    cv.style.width  = `${heroRect.width}px`;
    cv.style.height = `${heroRect.height}px`;

    const offX = h1Rect.left - heroRect.left;
    const offY = h1Rect.top  - heroRect.top;
    const cs   = window.getComputedStyle(h1);
    const fs   = parseFloat(cs.fontSize);
    const lh   = fs * 0.88;

    /* measure context for accurate char x-positions with letter-spacing */
    const mCv  = document.createElement("canvas");
    const mCtx = mCv.getContext("2d")!;
    mCtx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
    if ("letterSpacing" in mCtx) (mCtx as any).letterSpacing = cs.letterSpacing;

    const allPts: P[]                      = [];
    const centers: { x: number; y: number }[] = [];
    const step = Math.round(STEP * dpr);
    let g = 0;

    for (let li = 0; li < lines.length; li++) {
      const line  = lines[li];
      const lineY = li * lh;

      for (let ci = 0; ci < line.length; ci++) {
        const char = line[ci];
        if (char === " ") continue;

        const charX = mCtx.measureText(line.substring(0, ci)).width;
        const cW    = Math.ceil(mCtx.measureText(char).width * dpr) + 6;
        const cH    = Math.ceil(fs * 1.5 * dpr);

        const cCv  = document.createElement("canvas");
        cCv.width  = cW; cCv.height = cH;
        const cCtx = cCv.getContext("2d")!;
        cCtx.scale(dpr, dpr);
        cCtx.font         = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
        cCtx.textBaseline = "top";
        cCtx.fillStyle    = "#1A1A1D";
        cCtx.fillText(char, 0, 0);

        const img  = cCtx.getImageData(0, 0, cW, cH).data;
        const gPts: P[] = [];

        for (let py = 0; py < cH; py += step)
          for (let px = 0; px < cW; px += step)
            if (img[(py * cW + px) * 4 + 3] > 100) {
              const ox = px / dpr + charX + offX;
              const oy = py / dpr + lineY + offY;
              gPts.push({ x: ox, y: oy, ox, oy, vx: 0, vy: 0, group: g });
            }

        if (gPts.length) {
          centers.push({
            x: gPts.reduce((s, p) => s + p.ox, 0) / gPts.length,
            y: gPts.reduce((s, p) => s + p.oy, 0) / gPts.length,
          });
          allPts.push(...gPts);
          g++;
        }
      }
    }

    pts.current          = allPts;
    groupCenters.current = centers;
    numGroups.current    = g;
    groupReturnAt.current = new Array(g).fill(0);
    scatterOrder.current  = [];
    scatteredSet.current.clear();
    activeGroup.current   = -1;
  }, [lines, heroRef]);

  /* ── mouse handlers ── */
  const onEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    hovered.current = true;
    if (canvasRef.current) canvasRef.current.style.opacity = "1";

    const hero = heroRef?.current;
    if (!hero) return;

    const r  = hero.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    mouse.current = { x: mx, y: my };

    /* scatter first letter under cursor immediately */
    const g = closestGroup(mx, my);
    if (g >= 0) { activeGroup.current = g; scatterGroup(g); }

    heroMM.current = (ev: MouseEvent) => {
      const r2  = hero.getBoundingClientRect();
      const mx2 = ev.clientX - r2.left;
      const my2 = ev.clientY - r2.top;
      mouse.current = { x: mx2, y: my2 };
      const g2 = closestGroup(mx2, my2);
      if (g2 !== activeGroup.current) {
        activeGroup.current = g2;
        if (g2 >= 0) scatterGroup(g2);
      }
    };
    hero.addEventListener("mousemove", heroMM.current);
    startLoop();
  }, [heroRef, startLoop, closestGroup, scatterGroup]);

  const onLeave = useCallback(() => {
    hovered.current   = false;
    activeGroup.current = -1;
    mouse.current     = { x: -9999, y: -9999 };

    /* reverse stagger: last scattered returns first */
    const order = [...scatterOrder.current];
    const now   = performance.now();
    const times = new Array(numGroups.current).fill(0);
    for (let i = 0; i < order.length; i++)
      times[order[order.length - 1 - i]] = now + i * RETURN_STAGGER;
    groupReturnAt.current = times;
    scatterOrder.current  = [];

    const hero = heroRef?.current;
    if (hero && heroMM.current) {
      hero.removeEventListener("mousemove", heroMM.current);
      heroMM.current = null;
    }
    startLoop();
  }, [heroRef, startLoop]);

  /* ── lifecycle ── */
  useEffect(() => {
    if (!mounted) return;
    sample();
    const onResize = () => {
      cancelAnimationFrame(rafId.current);
      running.current = false;
      hovered.current = false;
      activeGroup.current = -1;
      scatterOrder.current = [];
      scatteredSet.current.clear();
      letterRefs.current.forEach(sp => { if (sp) sp.style.opacity = "1"; });
      if (canvasRef.current) canvasRef.current.style.opacity = "0";
      sample();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId.current);
      const hero = heroRef?.current;
      if (hero && heroMM.current) hero.removeEventListener("mousemove", heroMM.current);
    };
  }, [sample, heroRef, mounted]);

  const canvas = (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", top: 0, left: 0,
        pointerEvents: "none",
        zIndex: 20,  /* above h1 so particles render over transparent letter spans */
        opacity: 0,
      }}
    />
  );

  return (
    <>
      <div
        className={className}
        style={{ position: "relative", ...style }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <h1
          ref={h1Ref}
          className="font-display font-black leading-[0.88] text-[#1A1A1D] select-none"
          style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)", cursor: "default", margin: 0, letterSpacing: "0.02em" }}
          aria-label={lines.join(" ")}
        >
          {lines.map((ln, li) => (
            <span key={li} style={{ display: "block" }}>
              {ln.split("").map((char, ci) => {
                if (char === " ") return <span key={ci}>&nbsp;</span>;
                const g = charGroupMap.get(`${li}_${ci}`) ?? 0;
                return (
                  <span
                    key={ci}
                    ref={(el) => { letterRefs.current[g] = el; }}
                    style={{ display: "inline", transition: "opacity 0.08s ease" }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
      </div>

      {mounted && heroRef?.current
        ? createPortal(canvas, heroRef.current)
        : null}
    </>
  );
}
