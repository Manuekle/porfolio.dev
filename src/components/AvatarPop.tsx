import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Confetti from "react-confetti";
import { COPY, PROFILE, type Lang } from "../data/portfolio";
import { CloseIcon } from "./Apply";
import { playAvatarPop } from "./sounds";

export function AvatarPop({ lang }: { lang: Lang }) {
  const t = COPY[lang].avatarPop;
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [burst, setBurst] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [party, setParty] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const partyTimer = useRef<number | null>(null);

  const fire = () => {
    const ok = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setDims({ w: window.innerWidth, h: window.innerHeight });
    setOpen(true);
    setBurst((b) => b + 1);
    if (ok) {
      setParty(true);
      if (partyTimer.current) window.clearTimeout(partyTimer.current);
      partyTimer.current = window.setTimeout(() => setParty(false), 10000);
    }
    playAvatarPop();
  };

  const close = () => {
    setVisible(false);
    setParty(false);
    if (partyTimer.current) window.clearTimeout(partyTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    const t = window.setTimeout(() => closeRef.current?.focus(), 260);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [open ]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open ]);

  return (
    <>
      <button type="button" className="avatar-frame avatar-btn" onClick={fire} aria-label={t.open}>
        <img className="avatar" src="/assets/avatar.png" alt={PROFILE.name} width={104} height={104} />
      </button>

      {open &&
        createPortal(
          <>
            {party && dims.w > 0 && (
              <div
                aria-hidden="true"
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 80,
                  pointerEvents: "none",
                  overflow: "hidden",
                }}
              >
                <Confetti
                  key={burst}
                  width={dims.w}
                  height={dims.h}
                  recycle={false}
                  numberOfPieces={350}
                  initialVelocityY={8}
                  gravity={0.2}
                  ticks={600}
                />
              </div>
            )}
            <div
              className={`viewer-overlay${visible ? " is-open" : " is-closing"}`}
              role="presentation"
              onClick={close}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={PROFILE.name}
                onClick={(e) => e.stopPropagation()}
                style={{ display: "contents" }}
              >
                <button
                  ref={closeRef}
                  type="button"
                  className="viewer-close"
                  onClick={close}
                  aria-label={t.close}
                >
                  <CloseIcon size={14} />
                </button>
                <img
                  className={`avatar-pop t-modal${visible ? " is-open" : " is-closing"}`}
                  src="/assets/avatar.png"
                  alt={PROFILE.name}
                />
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
