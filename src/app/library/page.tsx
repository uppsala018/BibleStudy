import Link from "next/link";
import AppHeader from "@/components/app-header";

const modules = [
  {
    title: "KJV + Strong's",
    href: "/library/kjv",
    summary:
      "Read a structured KJV chapter and inspect linked Strong's entries with notes and bookmarks.",
  },
  {
    title: "Catholic Study",
    href: "/library/catholic",
    summary:
      "Read Douay-Rheims sample content with Roman Catechism references and cross-links.",
  },
  {
    title: "Church Fathers",
    href: "/library/fathers",
    summary:
      "Starter patristic library structure ready for larger public-domain text imports.",
  },
  {
    title: "Church History",
    href: "/library/history",
    summary:
      "Structured history guides for councils, schism, and reform movements.",
  },
  {
    title: "Notes Archive",
    href: "/library/notes",
    summary:
      "See your locally saved study notes with a Supabase-ready persistence path.",
  },
];

export default function LibraryPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
            Library
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--color-ink)]">
            Route-based study sections are now in place.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
            The app is no longer a single landing page with embedded demo content. Each major
            study area now has a dedicated route, which is the right base for importing larger
            public-domain datasets and shipping a real installable app.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6 transition hover:bg-[rgba(8,26,57,0.88)]"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-highlight)]">
                {module.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {module.summary}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
