import Link from "next/link";
import AppHeader from "@/components/app-header";
import SectionHeading from "@/components/section-heading";
import { catholicLibrary } from "@/lib/content";

export default function CatholicPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Catholic Study"
          title="Catholic study is now a structured library, not one sample reading."
          body="This section now organizes public-domain scripture study entries around doctrine, catechism references, and cross-references. It is the foundation for larger Catholic text imports later."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {catholicLibrary.map((entry) => (
            <article
              key={entry.slug}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-highlight)]">
                    {entry.translation}
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
                    {entry.title}
                  </h2>
                </div>
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-soft)]">
                  {entry.focus}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {entry.summary}
              </p>

              <div className="mt-6 rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.52)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-highlight)]">
                  Study Anchor
                </p>
                <p className="mt-3 text-sm text-[var(--color-ink)]">
                  {entry.book} {entry.chapter}
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  {entry.catechismReference}
                </p>
              </div>

              <Link
                href={`/library/catholic/${entry.slug}`}
                className="mt-6 inline-flex rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-highlight)]"
              >
                Open study
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
