import Link from "next/link";
import AppHeader from "@/components/app-header";

const catholicSections = [
  {
    title: "Bible And Canon",
    summary:
      "Study the full Catholic canon through the app's Douay-Rheims reader, with deuterocanonical books clearly available.",
    links: [
      {
        label: "Douay-Rheims Catholic Bible",
        href: "/library/catholic",
        detail: "Full Catholic Bible reader with chapter navigation.",
      },
      {
        label: "Wisdom",
        href: "/library/catholic?book=wisdom&chapter=1",
        detail: "Deuterocanonical wisdom text in the Catholic canon.",
      },
      {
        label: "Ecclesiasticus / Sirach",
        href: "/library/catholic?book=ecclesiasticus&chapter=1",
        detail: "Major Catholic wisdom book, useful for virtue and moral theology.",
      },
      {
        label: "2 Machabees",
        href: "/library/catholic?book=2-machabees&chapter=12",
        detail: "Important for Catholic study of prayer for the departed.",
      },
    ],
  },
  {
    title: "Catechesis And Doctrine",
    summary:
      "Use Roman Catechism material inside the app and official resources externally.",
    links: [
      {
        label: "Roman Catechism",
        href: "/library/catechism",
        detail: "Catechism of the Council of Trent, organized by doctrine.",
      },
      {
        label: "John Prologue Study",
        href: "/library/catholic/john-prologue",
        detail: "Catholic reading of John 1 with Roman Catechism notes.",
      },
      {
        label: "Peter And The Keys",
        href: "/library/catholic/matthew-16-keys",
        detail: "Catholic study path on Matthew 16 and ecclesial authority.",
      },
      {
        label: "Vatican: Catechism of the Catholic Church",
        href: "https://www.vatican.va/archive/ENG0015/_INDEX.HTM",
        detail: "Official online CCC text; link only, not bundled as app content.",
      },
    ],
  },
  {
    title: "Liturgy, Saints, And Devotion",
    summary:
      "Catholic resources should connect Scripture, catechesis, liturgical life, saints, and prayer without mixing copyrighted modern texts into the app.",
    links: [
      {
        label: "Annunciation Study",
        href: "/library/catholic/annunciation-luke-1",
        detail: "Incarnation, Mary, and obedience through Luke 1.",
      },
      {
        label: "Catholic Saints & Devotions",
        href: "/library/catholic/saints-devotions",
        detail: "Catholic devotional study path connected to catechesis, prayer, canonized saints, and the life of holiness.",
      },
      {
        label: "USCCB Daily Readings",
        href: "https://bible.usccb.org/",
        detail: "Official U.S. Catholic daily readings site.",
      },
      {
        label: "USCCB: Understanding the Bible",
        href: "https://www.usccb.org/bible/understanding-the-bible",
        detail: "Free Catholic Bible background and study articles.",
      },
      {
        label: "Church History",
        href: "/library/history",
        detail: "Councils, schism, reformation, and historical context.",
      },
    ],
  },
  {
    title: "Catholic Fathers And Councils",
    summary:
      "This section prepares the Catholic path for the Church Fathers work we will build next.",
    links: [
      {
        label: "Church Fathers",
        href: "/library/fathers",
        detail: "Shared patristic library with full primary texts.",
      },
      {
        label: "Ignatius of Antioch",
        href: "/library/fathers/ignatius-antioch",
        detail: "Early witness to unity, bishop, Eucharist, and martyrdom.",
      },
      {
        label: "Cyril of Jerusalem",
        href: "/library/fathers/cyril-jerusalem",
        detail: "Catechetical lectures on baptism, creed, and Eucharistic formation.",
      },
      {
        label: "Council of Nicaea",
        href: "/library/councils/nicaea-325",
        detail: "Christology and the Nicene faith.",
      },
    ],
  },
];

export default function CatholicResourcesPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <section className="rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-highlight)]">
            Catholic Resources
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--color-ink)]">
            Catholic study hub for Bible, catechesis, liturgy, and tradition.
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            This hub keeps the Catholic reader separate from the broader Catholic study resources.
            The app keeps core study material inside the reader, while official modern resources
            are linked externally instead of copied into the app.
          </p>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          {catholicSections.map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-highlight)]">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {section.summary}
              </p>
              <div className="mt-5 grid gap-3">
                {section.links.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-[1.4rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.52)] p-4"
                    >
                      <p className="font-semibold text-[var(--color-ink)]">{link.label}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                        {link.detail}
                      </p>
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.4rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.52)] p-4"
                    >
                      <p className="font-semibold text-[var(--color-ink)]">{link.label}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                        {link.detail}
                      </p>
                    </a>
                  ),
                )}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
