import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang, ProjectShot } from "../data/portfolio";
import { CloseIcon } from "./Apply";
import { playViewerOpen } from "./sounds";
import { useDialogFocus } from "./useDialogFocus";

function Viewer({
  images,
  captions,
  index,
  name,
  lang,
  onNav,
  onRequestClose,
}: {
  images: string[];
  captions: string[];
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
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogFocus(dialogRef);
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
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (images.length > 1 && e.key === "ArrowRight") go((index + 1) % images.length);
      if (images.length > 1 && e.key === "ArrowLeft") go((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={images.length === 1 ? name : `${name} — ${index + 1} / ${images.length}`}
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
            alt={`${name} — ${captions[index]}`}
            decoding="async"
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

        <div className="viewer-bar" role="group" aria-label={lang === "es" ? "Controles de imagen" : "Image controls"}>
          {images.length > 1 && <>
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
          </>}
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
        <p className="viewer-caption">{captions[index]}</p>
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
  shots?: ProjectShot[];
  name: string;
  lang: Lang;
}) {
  const [failed, setFailed] = useState<string[]>([]);
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  if (!shots.length) return null;
  const valid = shots.filter((shot) => !failed.includes(shot.src));
  const openIndex = valid.findIndex((shot) => shot.src === openSrc);
  if (!valid.length && failed.length >= shots.length && shots.length > 0) return null;

  const openLabel = lang === "es" ? "Abrir imagen" : "Open image";

  return (
    <>
      <div className="shots" data-count={valid.length}>
        {valid.map((shot, i) => {
          return (
            <figure key={shot.src} className="shot">
            <button
              type="button"
              className="shot-card"
              onClick={() => setOpenSrc(shot.src)}
              aria-label={`${openLabel}${valid.length > 1 ? ` ${i + 1}` : ""} — ${name}`}
              title={shot.caption[lang]}
            >
              <img
                src={shot.src}
                alt={`${name} — ${shot.caption[lang]}`}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                decoding="async"
                onError={() => setFailed((f) => (f.includes(shot.src) ? f : [...f, shot.src]))}
              />
            </button>
            <figcaption>{shot.caption[lang]}</figcaption>
            </figure>
          );
        })}
      </div>

      {openIndex >= 0 && valid[openIndex] && (
        <Viewer
          images={valid.map((shot) => shot.fullSrc || shot.src)}
          captions={valid.map((shot) => shot.caption[lang])}
          index={openIndex}
          name={name}
          lang={lang}
          onNav={(index) => setOpenSrc(valid[index].src)}
          onRequestClose={() => setOpenSrc(null)}
        />
      )}
    </>
  );
}
