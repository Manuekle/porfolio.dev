import { useState } from "react";
import { ADDONS, COPY, PACKAGES, PROFILE, SPEEDS, type Lang } from "../data/portfolio";

const round50 = (n: number) => Math.round(n / 50) * 50;
const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export function QuoteWizard({ lang }: { lang: Lang }) {
  const t = COPY[lang].quote;
  const [pkgId, setPkgId] = useState("mvp");
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [speedId, setSpeedId] = useState("std");

  const pkg = PACKAGES.find((p) => p.id === pkgId) ?? PACKAGES[0];
  const speed = SPEEDS.find((s) => s.id === speedId) ?? SPEEDS[0];
  const base = parseInt(pkg.from.replace(/,/g, ""), 10);
  const picked = ADDONS.filter((a) => addonIds.includes(a.id));
  const addonsSum = picked.reduce((s, a) => s + a.usd, 0);
  const total = round50((base + addonsSum) * speed.mult);
  const fee = total - base - addonsSum;

  const rows = [
    { id: "base", label: `${t.base} — ${pkg.name[lang]}`, amount: base },
    ...picked.map((a) => ({ id: a.id, label: a.label[lang], amount: a.usd })),
    ...(fee > 0
      ? [{ id: "fee", label: `${t.priorityFee} (+${Math.round((speed.mult - 1) * 100)}%)`, amount: fee }]
      : []),
  ];

  const toggleAddon = (id: string) =>
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const restart = () => {
    setPkgId("mvp");
    setAddonIds([]);
    setSpeedId("std");
  };

  const lines = [
    `${t.step1}: ${pkg.name[lang]}`,
    ...(picked.length ? picked.map((a) => `+ ${a.label[lang]} (${fmt(a.usd)})`) : []),
    `${t.step3}: ${speed.label[lang]}`,
    `${t.time}: ${pkg.time[lang]}`,
    `${t.total}: ${fmt(total)} USD${pkg.cadence ? ` ${pkg.cadence[lang]}` : ""}`,
  ];
  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `${t.total} — ${pkg.name[lang]}`,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;

  return (
    <div>
      <div className="meta" style={{ marginBottom: 8 }}>
        {t.step1}
      </div>
      <div className="quote-grid">
        {PACKAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`quote-opt${p.id === pkgId ? " active" : ""}`}
            onClick={() => setPkgId(p.id)}
            aria-pressed={p.id === pkgId}
          >
            <span className="quote-opt-name">{p.name[lang]}</span>
            <span className="meta">
              {lang === "es" ? "Desde" : "From"} ${p.from}
              {p.cadence ? ` ${p.cadence[lang]}` : ""}
            </span>
          </button>
        ))}
      </div>

      <div className="meta" style={{ margin: "18px 0 8px" }}>
        {t.step2}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {ADDONS.map((a) => {
          const on = addonIds.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              className={`chip quote-chip${on ? " active" : ""}`}
              onClick={() => toggleAddon(a.id)}
              aria-pressed={on}
            >
              {a.label[lang]} · +${a.usd.toLocaleString("en-US")}
            </button>
          );
        })}
      </div>

      <div className="meta" style={{ margin: "18px 0 8px" }}>
        {t.step3}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {SPEEDS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`chip quote-chip${s.id === speedId ? " active" : ""}`}
            onClick={() => setSpeedId(s.id)}
            aria-pressed={s.id === speedId}
          >
            {s.label[lang]} · {s.note[lang]}
          </button>
        ))}
      </div>

      <div className="quote-report" aria-live="polite">
        <div className="quote-total">
          <div>
            <div className="meta">{t.total}</div>
            <div className="quote-usd">
              {fmt(total)}
              {pkg.cadence ? <span className="price-cadence">{pkg.cadence[lang]}</span> : null}
            </div>
          </div>
          <div className="quote-time">
            <span className="meta">{t.time}</span>
            <span className="sans" style={{ fontSize: 13 }}>
              {pkg.time[lang]}
            </span>
          </div>
        </div>

        <div className="quote-rows">
          {rows.map((r) => (
            <div key={r.id} className="quote-row">
              <span className="quote-dot" aria-hidden="true" />
              <span className="quote-row-label">{r.label}</span>
              <span className="quote-row-amount">{fmt(r.amount)}</span>
              <span
                className="quote-bar"
                style={{ width: `${Math.max(4, Math.round((r.amount / total) * 100))}%` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <p className="meta" style={{ margin: "14px 0 0" }}>
          {t.note}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          <a className="btn" href={mailto}>
            {t.send}
          </a>
          <button type="button" className="btn btn-ghost" onClick={restart}>
            {t.restart}
          </button>
        </div>
      </div>
    </div>
  );
}
