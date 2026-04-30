import Link from "next/link";
import AppHeader from "@/components/app-header";
import MobileBottomNav from "@/components/mobile-bottom-nav";

const sacraments = [
  {
    title: "Baptism",
    summary:
      "The sacrament of initiation and new birth, tied to cleansing, incorporation into Christ, and entry into the Church.",
    links: ["/library/catholic/john-prologue", "/library/catechism"],
  },
  {
    title: "Confirmation",
    summary:
      "Strengthening by the Holy Spirit, often studied together with Christian maturity and mission.",
    links: ["/library/catechism", "/library/councils/constantinople-381"],
  },
  {
    title: "Eucharist",
    summary:
      "The central sacramental act of Catholic worship, connected to sacrifice, communion, thanksgiving, and real participation in Christ.",
    links: ["/library/catholic/matthew-16-keys", "/library/councils/nicaea-325"],
  },
  {
    title: "Penance And Reconciliation",
    summary:
      "Confession, repentance, and restoration after sin, understood as real ecclesial and spiritual healing.",
    links: ["/library/catechism", "/library/fathers"],
  },
  {
    title: "Anointing, Orders, And Matrimony",
    summary:
      "The remaining sacraments of healing and vocation: sickness, ordained ministry, and covenant marriage.",
    links: ["/library/catechism", "/library/history/timeline"],
  },
  {
    title: "Liturgical Life",
    summary:
      "Sacraments belong to the Church's worship, calendar, prayer, and public confession of faith.",
    links: ["/library/catholic/saints-devotions", "/library/history"],
  },
];

export default function CatholicSacramentsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/library/catholic/resources"
            className="inline-flex rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-soft)]"
          >
            Back to Catholic Resources
          </Link>
        </div>

        <section className="mt-8 rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-highlight)]">
            Catholic Sacraments
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--color-ink)]">
            Baptism, Eucharist, penance, and sacramental life
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-[var(--color-muted)]">
            This page organizes the sacramental life of the Church into a study route that stays close
            to doctrine, liturgy, and the Catholic understanding of grace.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {sacraments.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6"
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-highlight)]">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{item.summary}</p>
              <div className="mt-5 grid gap-3">
                {item.links.map((href) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-[1.4rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.52)] p-4 text-sm text-[var(--color-ink)]"
                  >
                    {href}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
      <MobileBottomNav active="Home" />
    </>
  );
}
