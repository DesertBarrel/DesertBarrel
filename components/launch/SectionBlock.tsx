export default function SectionBlock({
  id,
  eyebrow,
  title,
  children
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-space border-t border-line">
      <div className="container-shell">
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        <div className="mt-6 text-slate">{children}</div>
      </div>
    </section>
  );
}
