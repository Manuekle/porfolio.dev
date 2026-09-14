import { useEffect, useId, useRef, useState } from "react";

const SPINS = 2;
const DECAY_MS = 260;

function cssMs(name: string, fallback: number): number {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (v.endsWith("ms")) return parseFloat(v) || fallback;
  if (v.endsWith("s")) return (parseFloat(v) || fallback / 1000) * 1000;
  return fallback;
}

function cssPx(name: string, fallback: number): number {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return parseFloat(v) || fallback;
}

function cellsFor(digit: number): number[] {
  const cells: number[] = [];
  for (let s = 0; s < SPINS; s++) {
    for (let d = 0; d <= 9; d++) cells.push(d);
  }
  for (let d = 0; d <= digit; d++) cells.push(d);
  return cells;
}

function ReelCol({
  digit,
  col,
  spinning,
  animated,
}: {
  digit: number;
  col: number;
  spinning: boolean;
  animated: boolean;
}) {
  const fid = `r${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const [filterOn, setFilterOn] = useState(false);
  const [maskOn, setMaskOn] = useState(false);
  const cells = cellsFor(digit);
  const finalIndex = SPINS * 10 + digit;

  useEffect(() => {
    if (!spinning || !animated) return;
    setFilterOn(true);
    setMaskOn(true);
    const dur = cssMs("--reel-dur", 1400);
    const stagger = cssMs("--reel-stagger", 90);
    const peak = cssPx("--reel-spin-blur", 3);
    let raf = 0;
    const settleAt = col * stagger + dur;
    const timer = window.setTimeout(() => {
      const el = blurRef.current;
      if (!el) {
        setFilterOn(false);
        setMaskOn(false);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / DECAY_MS);
        el.setAttribute("stdDeviation", `0 ${(peak * (1 - k)).toFixed(2)}`);
        if (k < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setFilterOn(false);
          setMaskOn(false);
        }
      };
      raf = requestAnimationFrame(tick);
    }, settleAt);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [spinning, animated, col]);

  return (
    <span
      className={`t-reel-col${maskOn ? " is-spinning" : ""}`}
      aria-hidden="true"
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id={fid} x="-20%" y="0%" width="140%" height="100%">
          <feGaussianBlur ref={blurRef} stdDeviation="0 3" />
        </filter>
      </svg>
      <span
        className="t-reel-strip"
        style={
          spinning
            ? {
                transition: animated
                  ? `transform var(--reel-dur) var(--reel-ease) calc(${col} * var(--reel-stagger))`
                  : "none",
                transform: `translateY(calc(var(--reel-cell) * ${-finalIndex}))`,
                filter: filterOn ? `url(#${fid})` : "none",
              }
            : undefined
        }
      >
        {cells.map((c, i) => (
          <span key={i} className="t-reel-digit">
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Reel({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [animated, setAnimated] = useState(true);
  const digits = String(value)
    .split("")
    .map((d) => parseInt(d, 10));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimated(false);
      setSpinning(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => setSpinning(true));
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="hero-stat">
      <div className="hero-stat-num">
        <div className="t-reel" ref={ref} role="img" aria-label={`${value}${suffix ?? ""}`}>
          {digits.map((d, col) => (
            <ReelCol key={col} digit={d} col={col} spinning={spinning} animated={animated} />
          ))}
        </div>
        {suffix && (
          <span className="hero-stat-suffix" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
      <span className="meta">{label}</span>
    </div>
  );
}
