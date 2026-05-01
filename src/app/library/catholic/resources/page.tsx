import Link from "next/link";
import AppHeader from "@/components/app-header";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import SectionHeading from "@/components/section-heading";

const catholicMobileSections = [
  {
    icon: "1",
    title: "Bible And Canon",
    items: [
      {
        title: "Catholic Bible Reader",
        detail: "Catholic Bible reader with deuterocanonical books.",
        href: "/library/catholic",
      },
      {
        title: "John Prologue Study",
        detail: "Christology and creation through John 1.",
        href: "/library/catholic/john-prologue",
      },
      {
        title: "Annunciation Study",
        detail: "Incarnation, Mary, and obedience in Luke 1.",
        href: "/library/catholic/annunciation-luke-1",
      },
      {
        title: "Peter And The Keys",
        detail: "Matthew 16, authority, and the Church.",
        href: "/library/catholic/matthew-16-keys",
      },
    ],
  },
  {
    icon: "2",
    title: "Catechesis And Doctrine",
    items: [
      {
        title: "Roman Catechism",
        detail: "Catechism of Trent.",
        href: "/library/catechism",
      },
      {
        title: "Catholic Theology",
        detail: "Creed, grace, Mary, saints, authority.",
        href: "/library/catholic/theology",
      },
      {
        title: "Catholic Sacraments",
        detail: "Sacramental life, liturgy, and grace.",
        href: "/library/catholic/sacraments",
      },
      {
        title: "CCC Online",
        detail: "Official Catechism reference text.",
        href: "https://www.vatican.va/archive/ENG0015/_INDEX.HTM",
      },
    ],
  },
  {
    icon: "3",
    title: "Saints & Devotions",
    items: [
      {
        title: "Catholic Saints & Devotions",
        detail: "Saints, feast days, Marian devotion, prayer.",
        href: "/library/catholic/saints-devotions",
      },
      {
        title: "Marian Study",
        detail: "Annunciation, Theotokos, Marian devotion.",
        href: "/library/catholic/annunciation-luke-1",
      },
      {
        title: "Shared Ancient Saints",
        detail: "Pre-schism saints honored across the ancient Church.",
        href: "/library/fathers",
      },
      {
        title: "Church History",
        detail: "Councils, schism, and the larger historical context.",
        href: "/library/history",
      },
    ],
  },
  {
    icon: "4",
    title: "Fathers & Councils",
    items: [
      {
        title: "Church Fathers",
        detail: "Shared patristic library with primary texts.",
        href: "/library/fathers",
      },
      {
        title: "Ignatius of Antioch",
        detail: "Witness to unity, bishop, Eucharist, martyrdom.",
        href: "/library/fathers/ignatius-antioch",
      },
      {
        title: "Council Of Nicaea",
        detail: "Christology and the Nicene faith.",
        href: "/library/councils/nicaea-325",
      },
      {
        title: "Ecumenical Councils",
        detail: "The seven councils in one study path.",
        href: "/library/councils",
      },
    ],
  },
  {
    icon: "5",
    title: "Shared Christian Topics",
    items: [
      {
        title: "Orthodox Resources",
        detail: "Shared fathers, councils, liturgy, saints.",
        href: "/library/orthodox",
      },
      {
        title: "Protestant Resources",
        detail: "Reformers, confessions, Protestant history.",
        href: "/library/protestant",
      },
      {
        title: "Ecumenical Councils",
        detail: "The seven councils shared across the historic Church.",
        href: "/library/councils",
      },
      {
        title: "Church History Timeline",
        detail: "Major splits and continuities.",
        href: "/library/history/timeline",
      },
    ],
  },
];

const catholicSections = [
  {
    title: "Bible And Canon",
    summary:
      "The Catholic reader already holds the full canonical Bible, including deuterocanonical books, inside the app.",
    links: [
      {
        label: "Catholic Bible Reader",
        href: "/library/catholic",
        detail: "Full Catholic Bible reader with deuterocanonical books.",
      },
      {
        label: "John Prologue Study",
        href: "/library/catholic/john-prologue",
        detail: "Christology and creation through John 1.",
      },
      {
        label: "Annunciation Study",
        href: "/library/catholic/annunciation-luke-1",
        detail: "Incarnation, Mary, and obedience in Luke 1.",
      },
      {
        label: "Peter And The Keys",
        href: "/library/catholic/matthew-16-keys",
        detail: "Matthew 16, authority, and the visible Church.",
      },
    ],
  },
  {
    title: "Catechesis And Doctrine",
    summary:
      "Catholic doctrine should be read through the Catechism, Trent, and the core internal teaching pages built around Scripture.",
    links: [
      {
        label: "Roman Catechism",
        href: "/library/catechism",
        detail: "Catechism of the Council of Trent.",
      },
      {
        label: "Catholic Theology",
        href: "/library/catholic/theology",
        detail: "Creed, grace, Mary, saints, and authority in one study page.",
      },
      {
        label: "Catholic Sacraments",
        href: "/library/catholic/sacraments",
        detail: "Sacramental life, liturgy, and the means of grace.",
      },
      {
        label: "CCC Online",
        href: "https://www.vatican.va/archive/ENG0015/_INDEX.HTM",
        detail: "Official Catechism reference text.",
      },
    ],
  },
  {
    title: "Saints And Devotions",
    summary:
      "Catholic devotional life belongs beside doctrine, not after it. This section keeps saints, feast days, and prayer close to the Bible and catechesis.",
    links: [
      {
        label: "Catholic Saints & Devotions",
        href: "/library/catholic/saints-devotions",
        detail: "Saints, feast days, Marian devotion, and prayer.",
      },
      {
        label: "Marian Study",
        href: "/library/catholic/annunciation-luke-1",
        detail: "Annunciation, Theotokos, and Catholic Marian devotion.",
      },
      {
        label: "Shared Ancient Saints",
        href: "/library/fathers",
        detail: "Pre-schism saints honored across the ancient Church.",
      },
      {
        label: "Church History",
        href: "/library/history",
        detail: "Councils, schism, and the larger historical context.",
      },
    ],
  },
  {
    title: "Fathers And Councils",
    summary:
      "The Catholic path should stay anchored in the ancient Church, its fathers, and the councils that shaped orthodoxy.",
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
        label: "Council Of Nicaea",
        href: "/library/councils/nicaea-325",
        detail: "Christology and the Nicene faith.",
      },
      {
        label: "Ecumenical Councils",
        href: "/library/councils",
        detail: "The seven councils in one study path.",
      },
    ],
  },
  {
    title: "Shared Christian Topics",
    summary:
      "When Catholic study overlaps with Orthodox and Protestant history, the app now points directly to the related study path instead of leaving the user stuck.",
    links: [
      {
        label: "Orthodox Resources",
        href: "/library/orthodox",
        detail: "Shared fathers, councils, liturgy, and saints from the Orthodox side.",
      },
      {
        label: "Protestant Resources",
        href: "/library/protestant",
        detail: "Reformers, confessions, and Protestant history in a parallel study path.",
      },
      {
        label: "Ecumenical Councils",
        href: "/library/councils",
        detail: "The seven councils shared across the historic Church.",
      },
      {
        label: "Church History Timeline",
        href: "/library/history/timeline",
        detail: "The major splits and continuities in one vertical timeline.",
      },
    ],
  },
];

export default function CatholicResourcesPage() {
  return (
    <>
      <div className="hidden lg:block">
        <AppHeader />
      </div>

      <main className="orthodox-mobile mobile-app-shell lg:hidden">
        <header className="orthodox-mobile__topbar">
          <Link href="/" className="orthodox-mobile__back" aria-label="Back home">
            &lt;
          </Link>
          <span className="orthodox-mobile__cross">+</span>
          <h1>Catholic Resources</h1>
        </header>

        <section className="orthodox-mobile__intro">
          <p>Catholic Resources</p>
          <h2>Catholic study hub for Bible, catechesis, saints, liturgy, and tradition.</h2>
          <span>
            Explore Scripture, doctrine, saints, devotion, and the Fathers in one focused study path.
          </span>
        </section>

        <section className="orthodox-mobile__sections" aria-label="Catholic study sections">
          {catholicMobileSections.map((section) => (
            <article key={section.title} className="orthodox-mobile-card">
              <div className="orthodox-mobile-card__head">
                <span className="orthodox-mobile-card__icon">{section.icon}</span>
                <h2>{section.title}</h2>
                <span className="orthodox-mobile-card__chevron">&gt;</span>
              </div>
              <div className="orthodox-mobile-card__items">
                {section.items.map((item) =>
                  item.href.startsWith("https://") ? (
                    <a key={`${section.title}-${item.title}`} href={item.href} target="_blank" rel="noreferrer">
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.detail}</small>
                      </span>
                      <span>&gt;</span>
                    </a>
                  ) : (
                    <Link key={`${section.title}-${item.title}`} href={item.href}>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.detail}</small>
                      </span>
                      <span>&gt;</span>
                    </Link>
                  ),
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="orthodox-mobile__notice">
          <h2>Study note</h2>
          <p>
            Catholic study is organized around Scripture, catechesis, devotion, saints, liturgy, and
            conciliar history so the whole tradition can be read as one integrated path.
          </p>
        </section>

        <MobileBottomNav active="Home" />
      </main>

      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Catholic Resources"
          title="Catholic study hub for Bible, catechesis, saints, liturgy, and tradition"
          body="Catholic Resources now sits at the same depth as the Orthodox and Protestant tracks: numbered mobile sections, internal study pages, and a clear path through Scripture, doctrine, devotion, and history."
        />

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          {catholicSections.map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-highlight)]">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{section.summary}</p>
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
