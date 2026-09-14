import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "../data/portfolio";
import { CloseIcon } from "./Apply";
import { playViewerOpen } from "./sounds";

function Viewer({
  images,
  index,
  name,
  lang,
  onNav,
  onRequestClose,
}: {
  images: string[];
  index: number;
  name: string;
  lang: Lang;
  onNav: (i: number) => void;
  onRequestClose: () => void;
}) {
  const ZOOM = 2;

  const [visible, setVisible] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.5 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef({ active: false, sx: 0, sy: 0, px: 0, py: 0, moved: false });
  const closeTimer = useRef<number | null>(null);

  const close = () => {
    setVisible(false);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(onRequestClose, 160);
  };

  const resetZoom = () => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  };

  const go = (i: number) => {
    resetZoom();
    onNav(i);
  };

  const zoomIn = (e?: React.MouseEvent<HTMLImageElement>) => {
    if (e) {
      const r = e.currentTarget.getBoundingClientRect();
      setOrigin({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    } else {
      setOrigin({ x: 0.5, y: 0.5 });
    }
    setPan({ x: 0, y: 0 });
    setZoomed(true);
  };

  const clampPan = (x: number, y: number) => {
    const img = imgRef.current;
    if (!img) return { x, y };
    const mx = (img.clientWidth * (ZOOM - 1)) / 2 + 40;
    const my = (img.clientHeight * (ZOOM - 1)) / 2 + 40;
    return {
      x: Math.max(-mx, Math.min(mx, x)),
      y: Math.max(-my, Math.min(my, y)),
    };
  };

  const onImgPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!zoomed) return;
    dragRef.current = { active: true, sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onImgPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (Math.abs(dx) + Math.abs(dy) > 6) d.moved = true;
    if (d.moved) {
      setDragging(true);
      setPan(clampPan(d.px + dx, d.py + dy));
    }
  };

  const endDrag = () => {
    dragRef.current.active = false;
    setDragging(false);
  };

  const onImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    if (zoomed) resetZoom();
    else zoomIn(e);
  };

  useEffect(() => {
    playViewerOpen();
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    const t = window.setTimeout(() => closeRef.current?.focus(), 260);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go((index + 1) % images.length);
      if (e.key === "ArrowLeft") go((index - 1 + images.length) % images.length);
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
  }, [index, images.length]);

  const prevLabel = lang === "es" ? "Anterior" : "Previous";
  const nextLabel = lang === "es" ? "Siguiente" : "Next";
  const closeLabel = lang === "es" ? "Cerrar" : "Close";
  const zoomInLabel = lang === "es" ? "Acercar" : "Zoom in";
  const zoomOutLabel = lang === "es" ? "Alejar" : "Zoom out";

  return createPortal(
    <div
      className={`viewer-overlay${visible ? " is-open" : " is-closing"}`}
      role="presentation"
      onClick={close}
    >
      <div
        className="viewer-shell"
        role="dialog"
        aria-modal="true"
        aria-label={`${name} — ${index + 1} / ${images.length}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="viewer-close" onClick={close} aria-label={closeLabel}>
          <CloseIcon size={14} />
        </button>

        <div className="viewer-stage">
          <img
            ref={imgRef}
            className={`viewer-img${zoomed ? " zoomed" : ""}${dragging ? " dragging" : ""}`}
            src={images[index]}
            alt={`${name} — ${index + 1} / ${images.length}`}
            onClick={onImgClick}
            onPointerDown={onImgPointerDown}
            onPointerMove={onImgPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={
              zoomed
                ? {
                    transformOrigin: `${origin.x * 100}% ${origin.y * 100}%`,
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${ZOOM})`,
                    transition: dragging ? "none" : undefined,
                  }
                : undefined
            }
          />
        </div>

        <div className="viewer-bar" role="group" aria-label={`${index + 1} / ${images.length}`}>
          <button
            type="button"
            className="viewer-btn"
            onClick={() => go((index - 1 + images.length) % images.length)}
            aria-label={prevLabel}
          >
            {"<"}
          </button>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`viewer-btn${i === index ? " active" : ""}`}
              onClick={() => go(i)}
              aria-label={`${i + 1} / ${images.length}`}
              aria-current={i === index ? "true" : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            className="viewer-btn"
            onClick={() => go((index + 1) % images.length)}
            aria-label={nextLabel}
          >
            {">"}
          </button>
          <button
            type="button"
            className="viewer-btn"
            onClick={() => (zoomed ? resetZoom() : zoomIn())}
            aria-label={zoomed ? zoomOutLabel : zoomInLabel}
            aria-pressed={zoomed}
          >
            {zoomed ? "–" : "+"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ProjectGallery({
  shots = [],
  name,
  lang,
}: {
  shots?: string[];
  name: string;
  lang: Lang;
}) {
  const [failed, setFailed] = useState<number[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!shots.length) return null;
  const valid = shots.filter((_, i) => !failed.includes(i));
  if (!valid.length && failed.length >= shots.length && shots.length > 0) return null;

  const openLabel = lang === "es" ? "Abrir imagen" : "Open image";

  return (
    <>
      <div className="shots">
        {shots.map((src, i) => {
          if (failed.includes(i)) return null;
          const validIndex = valid.indexOf(src);
          return (
            <button
              key={src}
              type="button"
              className={`shot-card shot-pos-${i % 3}`}
              onClick={() => setOpenIndex(validIndex)}
              aria-label={`${openLabel} ${validIndex + 1} — ${name}`}
            >
              <img
                src={src}
                alt={`${name} — ${validIndex + 1}`}
                loading="lazy"
                onError={() => setFailed((f) => (f.includes(i) ? f : [...f, i]))}
              />
            </button>
          );
        })}
      </div>

      {openIndex !== null && valid[openIndex] && (
        <Viewer
          images={valid}
          index={openIndex}
          name={name}
          lang={lang}
          onNav={setOpenIndex}
          onRequestClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
