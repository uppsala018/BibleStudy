import Image from "next/image";
import Link from "next/link";
import AppHeader from "@/components/app-header";
import SectionHeading from "@/components/section-heading";

const pillars = [
  {
    title: "KJV + Strong's",
    href: "/library/kjv",
    summary:
      "Verse reading, lexicon lookup, browser notes, and bookmark persistence are now wired in.",
    status: "Working route",
  },
  {
    title: "Protestant Study",
    href: "/library/protestant",
    summary:
      "A Protestant study track now groups the KJV reader, Strong's tools, and Reformation-oriented history into one hub.",
    status: "Track hub",
  },
  {
    title: "Catholic Bible",
    href: "/library/catholic",
    summary:
      "The Catholic section now includes the full Douay-Rheims canon plus companion catechism-linked study pages.",
    status: "Full reader",
  },
  {
    title: "Roman Catechism",
    href: "/library/catechism",
    summary:
      "The full Catechism of Trent is now available as a route-based study library inside the app.",
    status: "Full library",
  },
  {
    title: "Church Fathers",
    href: "/library/fathers",
    summary:
      "Browse full public-domain patristic works, including all seven letters of Ignatius and expanded apostolic fathers.",
    status: "Full-text library",
  },
  {
    title: "Orthodox Study",
    href: "/library/orthodox",
    summary:
      "An Orthodox hub now pulls together shared fathers, Orthodox-oriented patristic reading, and curated external free resources.",
    status: "Track hub",
  },
  {
    title: "Church History",
    href: "/library/history",
    summary:
      "History topics now have structured pages, sectioned reading, and linked follow-up topics.",
    status: "Working library",
  },
];

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-ink)]">
      <AppHeader />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,197,120,0.18),_transparent_35%),linear-gradient(180deg,_rgba(4,19,45,0.2),_rgba(4,19,45,0.95))]" />
        <div className="absolute inset-x-0 top-0 h-80 bg-[url('/assets/art/hero-banner.png')] bg-cover bg-center opacity-18 mix-blend-screen" />
        <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
          <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.06fr_0.94fr] lg:py-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-2 text-sm text-[var(--color-soft)] shadow-[0_0_0_1px_rgba(234,197,120,0.08)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-highlight)]" />
                Route-based sections, importable content files, and Supabase-ready persistence
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-none text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
                  The concept is now a real app foundation, not just a mockup shell.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
                  The app now includes dedicated library routes, structured content
                  files, a working reader workspace, and a persistence layer that can
                  stay local or sync to Supabase when configured.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link className="cta-primary" href="/library">
                  Open the library
                </Link>
                <a className="cta-secondary" href="#next-steps">
                  Review the next build step
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {pillars.map((pillar) => (
                  <Link
                    key={pillar.title}
                    href={pillar.href}
                    className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
                        {pillar.title}
                      </h2>
                      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--color-soft)]">
                        {pillar.status}
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-[var(--color-muted)]">
                      {pillar.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl">
              <div className="absolute -left-4 top-10 hidden h-52 w-52 rounded-full bg-[radial-gradient(circle,_rgba(234,197,120,0.22),_transparent_65%)] blur-2xl md:block" />
              <div className="grid grid-cols-2 gap-4">
                <div className="translate-y-10 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/assets/mockups/home-dark.png"
                    alt="Recovered home mockup for Logos and Legacy"
                    width={864}
                    height={1536}
                    className="rounded-[1.5rem] object-cover"
                    priority
                  />
                </div>
                <div className="space-y-4">
                  <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                    <Image
                      src="/assets/mockups/kjv-reader.png"
                      alt="Recovered KJV Strong's reader mockup"
                      width={864}
                      height={1536}
                      className="rounded-[1.5rem] object-cover"
                    />
                  </div>
                  <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                    <Image
                      src="/assets/mockups/catholic-study.png"
                      alt="Recovered Catholic study mockup"
                      width={864}
                      height={1536}
                      className="rounded-[1.5rem] object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="next-steps"
        className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(4,15,32,1),rgba(7,21,43,0.94))]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Next Step"
            title="The remaining work is data ingestion and syncing, not another redesign."
            body="The interface and route structure now prove the product model. The next implementation step is to import larger public-domain texts into this content layer and then add authenticated Supabase sync for notes, bookmarks, and reading progress."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              "Import larger KJV and Strong's datasets into structured content files or Supabase tables.",
              "Add authentication and remote sync for notes, bookmarks, and reading progress.",
              "Expand the route structure with dedicated scripture, catechism, fathers, and timeline detail pages."
            ].map((item) => (
              <article
                key={item}
                className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
              >
                <p className="text-sm leading-7 text-[var(--color-muted)]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
