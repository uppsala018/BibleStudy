import Link from "next/link";
import AppHeader from "@/components/app-header";
import SectionHeading from "@/components/section-heading";
import { protestantWorks } from "@/lib/content";

export default function ProtestantTextsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Protestant Texts"
          title="Confessions, catechisms, and doctrinal standards"
          body="This section organizes major Protestant standards into route-backed study pages so the Protestant track has internal doctrinal depth instead of only movement summaries."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {protestantWorks.map((work) => (
            <Link
              key={work.slug}
              href={`/library/protestant/texts/${work.slug}`}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 transition hover:bg-[rgba(8,26,57,0.88)]"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-highlight)]">
                {work.category}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
                {work.title}
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--color-soft)]">
                {work.tradition} · {work.yearLabel}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {work.summary}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
