import Link from "next/link";
import AppHeader from "@/components/app-header";

const protestantSections = [
  {
    title: "Bible And Word Study",
    summary:
      "Protestant resources begin with direct Scripture reading, word study, and comparison with historical doctrine.",
    links: [
      {
        label: "KJV Bible + Strong's",
        href: "/library/kjv",
        detail: "Full KJV reader with Strong's lexicon integration.",
      },
      {
        label: "Genesis 1 With Strong's",
        href: "/library/kjv?book=Gen&chapter=1",
        detail: "Start with the current KJV + Strong's reading experience.",
      },
      {
        label: "John 1",
        href: "/library/kjv?book=Jhn&chapter=1",
        detail: "Core text for Christology and Word theology.",
      },
      {
        label: "Romans",
        href: "/library/kjv?book=Rom&chapter=1",
        detail: "Key Protestant study book for sin, grace, faith, and righteousness.",
      },
    ],
  },
  {
    title: "Reformers And Primary Texts",
    summary:
      "The Protestant path should not be only links. It should lead into internal pages for figures, writings, confessions, and theological themes.",
    links: [
      {
        label: "Protestant Figures",
        href: "/library/protestant/figures",
        detail: "Luther, Calvin, Wesley, and figure-based study paths.",
      },
      {
        label: "Martin Luther",
        href: "/library/protestant/figures/martin-luther",
        detail: "Reformation preaching, catechesis, and justification debates.",
      },
      {
        label: "John Calvin",
        href: "/library/protestant/figures/john-calvin",
        detail: "Institutes, doctrine of God, Scripture, and church order.",
      },
      {
        label: "John Wesley",
        href: "/library/protestant/figures/john-wesley",
        detail: "Methodist theology, holiness, grace, and preaching.",
      },
    ],
  },
  {
    title: "Confessions And Catechisms",
    summary:
      "Confessional documents give the Protestant section depth beyond biography by showing how doctrine was organized and taught.",
    links: [
      {
        label: "Protestant Text Library",
        href: "/library/protestant/texts",
        detail: "Internal confessions, catechisms, and doctrinal standards.",
      },
      {
        label: "Augsburg Confession",
        href: "/library/protestant/texts/augsburg-confession",
        detail: "Foundational Lutheran confession.",
      },
      {
        label: "Heidelberg Catechism",
        href: "/library/protestant/texts/heidelberg-catechism",
        detail: "Reformed catechesis organized around comfort, guilt, grace, and gratitude.",
      },
      {
        label: "Westminster Shorter Catechism",
        href: "/library/protestant/texts/westminster-shorter-catechism",
        detail: "Major English Reformed catechetical standard.",
      },
    ],
  },
  {
    title: "History And Controversies",
    summary:
      "This track should help users understand Protestantism historically and theologically, without reducing it to modern denominational labels.",
    links: [
      {
        label: "Reformation History",
        href: "/library/history/reformation",
        detail: "Historical context for reform, confessional conflict, and church renewal.",
      },
      {
        label: "Reformation Era Study",
        href: "/library/protestant/reformation-era",
        detail: "Internal analysis page on the Reformation movement.",
      },
      {
        label: "Post-Reformation Movements",
        href: "/library/protestant/post-reformation-movements",
        detail: "Later Protestant development and theological streams.",
      },
      {
        label: "Book of Concord",
        href: "https://bookofconcord.org/",
        detail: "Free Lutheran confessional resource.",
      },
    ],
  },
  {
    title: "Shared Fathers And Ancient Sources",
    summary:
      "Protestant readers historically appealed to Scripture and the early Church. This prepares the next Church Fathers phase.",
    links: [
      {
        label: "Early Church Fathers",
        href: "/library/fathers",
        detail: "Shared public-domain fathers library.",
      },
      {
        label: "Augustine: Confessions",
        href: "/library/fathers/augustine-hippo/confessions",
        detail: "Major text for grace, conversion, memory, and prayer.",
      },
      {
        label: "Athanasius",
        href: "/library/fathers/athanasius",
        detail: "Christology, incarnation, and Nicene theology.",
      },
      {
        label: "CCEL",
        href: "https://www.ccel.org/",
        detail: "Free Christian classics and public-domain theological texts.",
      },
    ],
  },
];

export default function ProtestantResourcesPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <section className="rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-highlight)]">
            Protestant Resources
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--color-ink)]">
            Protestant study hub for Scripture, reformers, confessions, and history.
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            This hub gives Protestant study the same navigable resource structure as the Orthodox
            path: Bible tools, primary texts, confessions, movement history, and ancient sources.
          </p>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          {protestantSections.map((section) => (
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
