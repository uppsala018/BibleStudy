import Link from "next/link";
import MobileBottomNav from "@/components/mobile-bottom-nav";

const homeCards = [
  {
    title: "KJV Bible + Strong's",
    href: "/library/kjv",
    icon: "▰⌕",
  },
  {
    title: "Catholic Bible + Catechism",
    href: "/library/catholic",
    icon: "☩",
  },
  {
    title: "Catholic Resources",
    href: "/library/catholic/resources",
    icon: "✦",
  },
  {
    title: "Orthodox Resources",
    href: "/library/orthodox",
    icon: "IC XC",
  },
  {
    title: "Protestant Resources",
    href: "/library/protestant/resources",
    icon: "✤",
  },
  {
    title: "Church Fathers",
    href: "/library/fathers",
    icon: "✒",
  },
  {
    title: "Church Councils",
    href: "/library/councils",
    icon: "◉",
  },
  {
    title: "Church History",
    href: "/library/history",
    icon: "⌂",
  },
  {
    title: "Prayer Forum",
    href: "/library/prayer-forum",
    icon: "🙏",
  },
  {
    title: "Donate",
    href: "https://www.paypal.com/ncp/payment/CCWF6ADJJK5CL",
    icon: "☩",
  },
];

export default function Home() {
  return (
    <main className="mobile-app-shell mobile-home">
      <section className="mobile-home__hero">
        <div className="mobile-home__cross">✝</div>
        <h1>Logos &amp; Legacy</h1>
        <div className="mobile-home__book">⌁ ▱ ▱ ⌁</div>
        <p>Bible Study &amp; Church History</p>
      </section>

      <section className="mobile-home__grid" aria-label="Study sections">
        {homeCards.map((card) =>
          card.href.startsWith("https://") ? (
            <a key={card.title} href={card.href} className="mobile-home-card">
              <span className="mobile-home-card__icon">{card.icon}</span>
              <span className="mobile-home-card__title">{card.title}</span>
            </a>
          ) : (
            <Link key={card.title} href={card.href} className="mobile-home-card">
              <span className="mobile-home-card__icon">{card.icon}</span>
              <span className="mobile-home-card__title">{card.title}</span>
            </Link>
          ),
        )}
      </section>

      <MobileBottomNav active="Home" />
    </main>
  );
}
