import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { COPY, type Lang } from "../data/portfolio";
import { CloseIcon } from "./Apply";

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

function CvViewer({ file, lang, onRequestClose }: { file: string; lang: Lang; onRequestClose: () => void }) {
  const c = COPY[lang];
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [zoom, setZoom] = useState(1.25);
  const [failure, setFailure] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<{
    numPages: number;
    getPage: (n: number) => Promise<unknown>;
    destroy?: () => void;
  } | null>(null);
  const closeTimer = useRef<number | null>(null);
  const renderSeq = useRef(0);

  const close = () => {
    setVisible(false);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(onRequestClose, 160);
  };

  const go = (n: number) => {
    if (!pages) return;
    setPage(Math.max(1, Math.min(pages, n)));
  };

  // Load document (retryable)
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setFailure(null);
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(workerUrl, document.baseURI).href;
        const task = pdfjs.getDocument({ url: file });
        const doc = await task.promise;
        if (cancelled) return;
        docRef.current = doc as unknown as typeof docRef.current;
        setPages(doc.numPages);
        // Fit first page to the stage width, never upscale past the default.
        try {
          const first = await doc.getPage(1);
          const w = first.getViewport({ scale: 1 }).width;
          const avail = scrollRef.current?.clientWidth || w * 1.5;
          const fit = avail / w;
          setZoom(Math.max(MIN_ZOOM, Math.min(2, +(fit + ZOOM_STEP).toFixed(2))));
        } catch {
          /* keep default zoom */
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setFailure(err instanceof Error ? err.message : String(err));
      }
    };
    run();
    return () => {
      cancelled = true;
      docRef.current?.destroy?.();
      docRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, retryKey]);

  // Render current page + zoom
  useEffect(() => {
    const canvas = canvasRef.current;
    const doc = docRef.current;
    if (!canvas || !doc) return;
    const seq = ++renderSeq.current;
    let task: { cancel: () => void } | null = null;
    (async () => {
      try {
        const pdfPage = (await doc.getPage(page)) as {
          getViewport: (o: { scale: number }) => { width: number; height: number };
          render: (o: unknown) => { promise: Promise<void>; cancel: () => void };
        };
        if (seq !== renderSeq.current) return;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const viewport = pdfPage.getViewport({ scale: zoom * dpr });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${Math.floor(viewport.width / dpr)}px`;
        canvas.style.height = "auto";
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        task = pdfPage.render({ canvasContext: ctx, viewport });
        await task.promise;
      } catch (err) {
        if ((err as Error)?.name !== "RenderingCancelledException") console.error(err);
      }
    })();
    return () => {
      task?.cancel();
    };
  }, [page, zoom, pages]);

  useEffect(() => {
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
      if (e.key === "ArrowRight") setPage((p) => Math.max(1, Math.min(pages || 1, p + 1)));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(1, p - 1));
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
  }, [pages]);

  const closeLabel = lang === "es" ? "Cerrar" : "Close";
  const prevLabel = lang === "es" ? "Anterior" : "Previous";
  const nextLabel = lang === "es" ? "Siguiente" : "Next";
  const zoomInLabel = lang === "es" ? "Acercar" : "Zoom in";
  const zoomOutLabel = lang === "es" ? "Alejar" : "Zoom out";
  const loadingLabel = lang === "es" ? "Cargando…" : "Loading…";
  const errorLabel =
    lang === "es" ? "No se pudo mostrar — descárgalo" : "Couldn't render — download it";

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
        aria-label={c.viewCv}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="viewer-close" onClick={close} aria-label={closeLabel}>
          <CloseIcon size={14} />
        </button>

        <div className="viewer-stage viewer-stage-pdf">
          {failure ? (
            <div className="viewer-pdf-error">
              <p className="meta" style={{ color: "#fff", margin: 0 }}>
                {errorLabel}
              </p>
              <p className="viewer-pdf-error-detail">{failure}</p>
              <button
                type="button"
                className="viewer-btn"
                onClick={() => setRetryKey((k) => k + 1)}
              >
                {lang === "es" ? "Reintentar" : "Retry"}
              </button>
            </div>
          ) : (
            <div ref={scrollRef} className="viewer-pdf-scroll">
              <canvas ref={canvasRef} className="viewer-pdf-canvas" role="img" aria-label={`${c.viewCv} — ${page} / ${pages || "…"}`} />
              {!pages && (
                <span className="meta viewer-pdf-loading" aria-live="polite">
                  {loadingLabel}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="viewer-bar" role="group" aria-label={c.viewCv}>
          <button
            type="button"
            className="viewer-btn"
            onClick={() => go(page - 1)}
            disabled={!pages || page <= 1}
            aria-label={prevLabel}
          >
            {"<"}
          </button>
          <span className="viewer-btn viewer-btn-static" aria-live="polite">
            {pages ? `${page} / ${pages}` : "…"}
          </span>
          <button
            type="button"
            className="viewer-btn"
            onClick={() => go(page + 1)}
            disabled={!pages || page >= pages}
            aria-label={nextLabel}
          >
            {">"}
          </button>
          <button
            type="button"
            className="viewer-btn"
            onClick={() => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))}
            disabled={zoom <= MIN_ZOOM}
            aria-label={zoomOutLabel}
          >
            {"–"}
          </button>
          <button
            type="button"
            className="viewer-btn"
            onClick={() => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))}
            disabled={zoom >= MAX_ZOOM}
            aria-label={zoomInLabel}
          >
            {"+"}
          </button>
          <a className="viewer-btn" href={file} download>
            {c.downloadCv}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Button that previews the CV in a custom fullscreen viewer, with download inside. */
export function CvButton({
  lang,
  className = "btn",
  style,
}: {
  lang: Lang;
  className?: string;
  style?: React.CSSProperties;
}) {
  const c = COPY[lang];
  const [open, setOpen] = useState(false);
  const file = `/assets/CV_Manuel_Erazo_${lang.toUpperCase()}.pdf`;

  return (
    <>
      <button type="button" className={className} style={style} onClick={() => setOpen(true)}>
        {c.viewCv}
      </button>
      {open && <CvViewer file={file} lang={lang} onRequestClose={() => setOpen(false)} />}
    </>
  );
}
