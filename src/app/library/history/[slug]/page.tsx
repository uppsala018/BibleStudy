import Link from "next/link";
import { notFound } from "next/navigation";
import AppHeader from "@/components/app-header";
import { getHistoryTopic, historyLibrary } from "@/lib/content";

export function generateStaticParams() {
  return historyLibrary.map((topic) => ({
    slug: topic.slug,
  }));
}

export default async function HistoryTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getHistoryTopic(slug);

  if (!topic) {
    notFound();
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-12">
        <Link
          href="/library/history"
          className="inline-flex rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-soft)]"
        >
          Back to History
        </Link>

        <section className="mt-8 rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-highlight)]">
            Church History Topic
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-5xl text-[var(--color-ink)]">
                {topic.title}
              </h1>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[var(--color-soft)]">
                {topic.era}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            {topic.overview}
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.52)] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-highlight)]">
              Why it matters
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {topic.significance}
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-5">
          {topic.sections.map((section) => (
            <article
              key={section.id}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-highlight)]">
                    Section
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
                    {section.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-soft)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--color-highlight)]">
                {section.summary}
              </p>
              <p className="mt-4 text-sm leading-8 text-[var(--color-muted)]">
                {section.detail}
              </p>
            </article>
          ))}
        </section>

        {topic.relatedTopics.length ? (
          <section className="mt-10 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-highlight)]">
              Related Topics
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {topic.relatedTopics.map((relatedSlug) => {
                const relatedTopic = getHistoryTopic(relatedSlug);

                if (!relatedTopic) {
                  return null;
                }

                return (
                  <Link
                    key={relatedTopic.slug}
                    href={`/library/history/${relatedTopic.slug}`}
                    className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-soft)]"
                  >
                    {relatedTopic.title}
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
