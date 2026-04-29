import Link from "next/link";
import AppHeader from "@/components/app-header";
import SectionHeading from "@/components/section-heading";
import { historyLibrary } from "@/lib/content";

export default function HistoryPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Church History"
          title="History is now organized as a readable topic library."
          body="The history section now has structured topics, timeline-style sections, and dedicated pages for major turning points in Christian history. This is the base for future expansion into councils, controversies, saints, and source documents."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {historyLibrary.map((topic) => (
            <article
              key={topic.slug}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-highlight)]">
                    History Topic
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
                    {topic.title}
                  </h2>
                </div>
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-soft)]">
                  {topic.era}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {topic.summary}
              </p>

              <div className="mt-6 rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.52)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-highlight)]">
                  Included Sections
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                  {topic.sections.map((section) => (
                    <li key={section.id}>{section.title}</li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/library/history/${topic.slug}`}
                className="mt-6 inline-flex rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-highlight)]"
              >
                Open topic
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
