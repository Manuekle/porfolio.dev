import { toPng } from "html-to-image";

const btn = document.getElementById("og-download");
const stage = document.querySelector<HTMLElement>(".og-stage");
const hint = document.querySelector(".og-hint");

btn?.addEventListener("click", async () => {
  if (!stage || !(btn instanceof HTMLButtonElement)) return;
  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Generando…";
  try {
    await document.fonts.ready;
    const url = await toPng(stage, {
      pixelRatio: 1,
      canvasWidth: 1200,
      canvasHeight: 630,
    });
    const a = document.createElement("a");
    a.download = "og-banner.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    a.remove();
    if (hint) hint.textContent = "1200 × 630 — PNG descargado";
  } catch (err) {
    console.error(err);
    if (hint) hint.textContent = "Error al generar el PNG — revisa la consola";
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
});
