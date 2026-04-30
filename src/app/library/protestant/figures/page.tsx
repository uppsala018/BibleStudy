import Link from "next/link";
import AppHeader from "@/components/app-header";
import SectionHeading from "@/components/section-heading";
import { protestantFigures } from "@/lib/content";

export default function ProtestantFiguresPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Protestant Figures"
          title="Reformers and Protestant theologians"
          body="Read Protestant figures through internal study profiles and primary texts, not only external links."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {protestantFigures.map((figure) => (
            <Link
              key={figure.slug}
              href={`/library/protestant/figures/${figure.slug}`}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 transition hover:bg-[rgba(8,26,57,0.88)]"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-highlight)]">
                {figure.tradition}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
                {figure.name}
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--color-soft)]">
                {figure.era} · {figure.region}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {figure.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {figure.themes.slice(0, 4).map((theme) => (
                  <span
                    key={`${figure.slug}-${theme}`}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-soft)]"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
