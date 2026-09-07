import type { ReactNode } from "react";

export function SectionHead({ title, sub, idx }: { title: string; sub?: string; idx?: string }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && (
          <div className="meta" style={{ marginTop: 4 }}>
            {sub}
          </div>
        )}
      </div>
      {idx && <span className="idx">{idx}</span>}
    </div>
  );
}

export function Section({
  id,
  title,
  sub,
  idx,
  children,
}: {
  id: string;
  title: string;
  sub?: string;
  idx?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section reveal">
      <SectionHead title={title} sub={sub} idx={idx} />
      {children}
    </section>
  );
}
