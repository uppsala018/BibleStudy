import Link from "next/link";
import { notFound } from "next/navigation";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { getHistoryTopic, historyLibrary } from "@/lib/content";

const tabs = [
  { slug: "great-schism", label: "East-West Schism", icon: "♜" },
  { slug: "reformation", label: "Reformation", icon: "▰" },
  { slug: "charismatic-movement", label: "Charismatic", icon: "♨" },
  { slug: "timeline", label: "Timeline", icon: "✦" },
];

const reformers = [
  {
    name: "Martin Luther",
    years: "1483-1546",
    note: "German monk whose protest against indulgences became a wider reform movement.",
    doctrine: "Justification, Scripture, reform of abuses",
  },
  {
    name: "John Calvin",
    years: "1509-1564",
    note: "French theologian whose work shaped Reformed theology and church order.",
    doctrine: "Sovereignty of God, covenant, disciplined church life",
  },
  {
    name: "Huldrych Zwingli",
    years: "1484-1531",
    note: "Swiss reformer in Zurich who emphasized biblical reform of worship.",
    doctrine: "Scripture, preaching, reform of worship",
  },
  {
    name: "John Knox",
    years: "1513-1572",
    note: "Scottish reformer and major voice behind Presbyterian Christianity.",
    doctrine: "Reformed preaching and Presbyterian order",
  },
];

const charismaticFigures = [
  ["Charles Parham", "1873-1929", "Pioneer of early Pentecostal teaching"],
  ["William J. Seymour", "1870-1922", "Led the Azusa Street Revival"],
  ["Aimee Semple McPherson", "1890-1944", "Founded Foursquare Church"],
  ["Oral Roberts", "1918-2009", "Healing evangelist and media preacher"],
];

const charismaticDenominations = [
  {
    name: "Assemblies of God",
    href: "/library/protestant/assemblies-of-god",
    note: "Largest classical Pentecostal fellowship.",
  },
  {
    name: "Church of God in Christ",
    href: "/library/protestant/church-of-god-in-christ",
    note: "Major Holiness-Pentecostal body.",
  },
  {
    name: "Foursquare Church",
    href: "/library/protestant/foursquare-church",
    note: "Aimee Semple McPherson's denomination.",
  },
  {
    name: "Vineyard Movement",
    href: "/library/protestant/vineyard-movement",
    note: "Later charismatic network and church-planting stream.",
  },
];

const protestantBranches = [
  "Lutheran",
  "Reformed",
  "Anglican",
  "Anabaptist",
  "Baptist",
  "Methodist",
  "Pentecostal",
  "Charismatic",
  "Non-denominational",
];

export function generateStaticParams() {
  return [...historyLibrary.map((topic) => ({ slug: topic.slug })), { slug: "timeline" }];
}

function HistoryTabs({ activeSlug }: { activeSlug: string }) {
  return (
    <nav className="history-tabs" aria-label="Church history sections">
      {tabs.map((tab) => (
        <Link
          key={tab.slug}
          href={`/library/history/${tab.slug}`}
          className={activeSlug === tab.slug ? "history-tabs__item history-tabs__item--active" : "history-tabs__item"}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

function TraditionTimelinePanel() {
  return (
    <section className="history-tradition-tree" aria-label="Christian tradition timeline from 33 AD to 2026">
      <div className="history-tradition-tree__head">
        <p>33 AD - 2026</p>
        <h2>Christian Traditions Timeline</h2>
        <span>One apostolic root, visible historical branches</span>
      </div>

      <div className="history-tradition-tree__trunk">
        <article className="history-tradition-event history-tradition-event--root">
          <strong>33 AD</strong>
          <h3>Apostolic Catholic Church</h3>
          <p>The Church begins from the apostolic witness to Christ&apos;s death and resurrection: one ancient, episcopal, sacramental Church spread across East and West.</p>
        </article>

        <article className="history-tradition-event">
          <strong>c. 107-110</strong>
          <h3>Catholic means universal</h3>
          <p>Ignatius of Antioch uses the phrase Catholic Church very early, meaning the universal Church gathered around Christ, bishops, Eucharist, and apostolic faith.</p>
        </article>

        <article className="history-tradition-event">
          <strong>325-787</strong>
          <h3>Ecumenical councils</h3>
          <p>Core doctrine on Trinity, Christ, worship, and icons is clarified through the great councils.</p>
          <Link href="/library/councils">Study councils</Link>
        </article>

        <article className="history-tradition-split history-tradition-split--oriental">
          <strong>451</strong>
          <h3>Oriental Orthodox churches</h3>
          <p>After Chalcedon, the Armenian, Coptic, Syriac, Ethiopian, Eritrean, and Malankara traditions continue as ancient churches.</p>
          <Link href="/library/history/chalcedon-451">Study Chalcedon</Link>
        </article>

        <article className="history-tradition-split">
          <strong>1054</strong>
          <h3>East-West Schism</h3>
          <p>The one ancient catholic Church in East and West suffers a lasting rupture. The Latin West continues in communion with Rome; the Greek East continues as the Eastern Orthodox communion.</p>
        </article>

        <div className="history-tradition-lines history-tradition-lines--traditional">
          <article>
            <span>☩</span>
            <h3>Roman Catholic Church</h3>
            <p>Western catholic line centered on Rome</p>
            <strong>ancient root, continues to 2026</strong>
          </article>
          <article>
            <span>♜</span>
            <h3>Eastern Orthodox Church</h3>
            <p>Eastern catholic/orthodox line through the patriarchates</p>
            <strong>ancient root, continues to 2026</strong>
          </article>
        </div>

        <article className="history-tradition-split history-tradition-split--reformation">
          <strong>1517</strong>
          <h3>Protestant Reformation</h3>
          <p>Western Christianity divides further through disputes about authority, justification, Scripture, sacraments, and reform.</p>
        </article>

        <div className="history-protestant-branching">
          <div>
            <h3>Protestant families</h3>
            <p>Not 30,000 lines drawn literally, but a visual picture of repeated branching.</p>
          </div>
          <div className="history-protestant-branching__grid">
            {protestantBranches.map((branch) => (
              <span key={branch}>{branch}</span>
            ))}
          </div>
        </div>

        <article className="history-tradition-event history-tradition-event--today">
          <strong>2026</strong>
          <h3>Christianity today</h3>
          <p>Catholic, Eastern Orthodox, Oriental Orthodox, Protestant, Pentecostal, and Charismatic communities all continue, with very different structures and histories.</p>
        </article>
      </div>
    </section>
  );
}

function SchismPanel() {
  return (
    <>
      <section className="history-schism-map">
        <div className="history-schism-map__top">
          <span>♜</span>
          <h2>The Great Schism of 1054</h2>
        </div>
        <div className="history-schism-map__split" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="history-schism-map__churches">
          <article>
            <div>☩</div>
            <h3>Roman Catholic Church</h3>
            <p>Rome</p>
          </article>
          <article>
            <div>♜</div>
            <h3>Eastern Orthodox Church</h3>
            <p>Constantinople</p>
          </article>
        </div>
      </section>

      <section className="history-card-grid">
        <article className="history-mini-card">
          <span>▤</span>
          <h3>Key Causes</h3>
          <ul>
            <li>Filioque controversy</li>
            <li>Papal authority disputes</li>
            <li>Latin and Greek cultural distance</li>
            <li>Political rivalry between Rome and Constantinople</li>
          </ul>
        </article>
        <article className="history-mini-card">
          <span>♟</span>
          <h3>Key Figures</h3>
          <ul>
            <li>Pope Leo IX</li>
            <li>Cardinal Humbert</li>
            <li>Patriarch Michael Cerularius</li>
            <li>Later crusader and imperial actors</li>
          </ul>
        </article>
        <article className="history-mini-card">
          <span>☍</span>
          <h3>Current Status</h3>
          <p>
            Catholic and Orthodox churches remain distinct, but modern dialogue has continued,
            especially after the lifting of mutual excommunications in 1965.
          </p>
        </article>
      </section>
    </>
  );
}

function ChalcedonPanel() {
  return (
    <>
      <section className="history-schism-map">
        <div className="history-schism-map__top">
          <span>✦</span>
          <h2>The Council of Chalcedon (451)</h2>
        </div>
        <div className="history-schism-map__split" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="history-schism-map__churches">
          <article>
            <div>☩</div>
            <h3>Chalcedonian Churches</h3>
            <p>Byzantine, Latin, and later Western traditions</p>
          </article>
          <article>
            <div>☦</div>
            <h3>Oriental Orthodox Churches</h3>
            <p>Coptic, Syriac, Armenian, Ethiopian, Eritrean, and Malankara traditions</p>
          </article>
        </div>
      </section>

      <section className="history-card-grid">
        <article className="history-mini-card">
          <span>✦</span>
          <h3>Key Question</h3>
          <p>
            How should the one incarnate Christ be confessed so that both His full divinity and
            full humanity are protected?
          </p>
        </article>
        <article className="history-mini-card">
          <span>☩</span>
          <h3>Chalcedonian Definition</h3>
          <p>
            One and the same Christ, Son, Lord, and only-begotten, acknowledged in two natures,
            without confusion, change, division, or separation.
          </p>
        </article>
        <article className="history-mini-card">
          <span>☦</span>
          <h3>Oriental Orthodox Continuity</h3>
          <p>
            The non-Chalcedonian churches remained ancient apostolic communities with their own
            liturgical, linguistic, and theological traditions.
          </p>
        </article>
      </section>
    </>
  );
}

function ReformationPanel() {
  return (
    <>
      <section className="history-reformation-hero">
        <p>1517 - Present</p>
        <h2>The Protestant Reformation</h2>
        <div className="history-reformation-hero__image" aria-hidden="true">
          <span>95 Theses</span>
        </div>
      </section>

      <section className="history-reformer-strip" aria-label="Major reformers">
        {reformers.map((reformer) => (
          <article key={reformer.name}>
            <div>{reformer.name.charAt(0)}</div>
            <h3>{reformer.name}</h3>
            <p>({reformer.years})</p>
            <p>{reformer.note}</p>
            <strong>{reformer.doctrine}</strong>
          </article>
        ))}
      </section>

      <section className="history-wide-card">
        <span>▤</span>
        <h3>Key Causes of the Reformation</h3>
        <ul>
          <li>Sale of indulgences and disputes over penance</li>
          <li>Criticism of clerical corruption and weak pastoral care</li>
          <li>Desire for Scripture in vernacular languages</li>
          <li>Humanist scholarship and printing press expansion</li>
          <li>Political tensions between local rulers and Rome</li>
        </ul>
      </section>
    </>
  );
}

function CharismaticPanel() {
  return (
    <section className="history-charismatic-timeline">
      <article className="history-charismatic-step history-charismatic-step--origin">
        <span>1</span>
        <div>
          <h2>Origins - Azusa Street Revival (1906)</h2>
          <div className="history-azusa-card">
            <strong>Apostolic Faith Mission</strong>
          </div>
          <p>
            Led by William J. Seymour in Los Angeles, with emphasis on baptism in the
            Holy Spirit, tongues, divine healing, prayer, and mission.
          </p>
        </div>
      </article>

      <article className="history-charismatic-step">
        <span>2</span>
        <div>
          <h2>Key Leaders and Figures</h2>
          <div className="history-charismatic-figures">
            {charismaticFigures.map(([name, years, note]) => (
              <article key={name}>
                <div>{name.charAt(0)}</div>
                <h3>{name}</h3>
                <p>({years})</p>
                <small>{note}</small>
              </article>
            ))}
          </div>
        </div>
      </article>

      <article className="history-charismatic-step">
        <span>3</span>
        <div>
          <h2>Major Denominations</h2>
          <div className="history-denomination-list">
            {charismaticDenominations.map((denomination) => (
              <Link key={denomination.name} href={denomination.href}>
                <strong>{denomination.name}</strong>
                <span>{denomination.note}</span>
                <b>›</b>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <article className="history-charismatic-step">
        <span>4</span>
        <div>
          <h2>Renewal in Traditional Churches</h2>
          <p>
            From the 1960s, charismatic renewal influenced Catholic and mainline churches
            through prayer groups, healing prayer, praise music, and renewed teaching on
            spiritual gifts.
          </p>
        </div>
      </article>
    </section>
  );
}

function TopicPanel({ slug }: { slug: string }) {
  if (slug === "timeline") return <TraditionTimelinePanel />;
  if (slug === "chalcedon-451") return <ChalcedonPanel />;
  if (slug === "great-schism") return <SchismPanel />;
  if (slug === "reformation") return <ReformationPanel />;
  if (slug === "charismatic-movement") return <CharismaticPanel />;

  return null;
}

export default async function HistoryTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic =
    slug === "timeline"
      ? {
          slug: "timeline",
          title: "Christian Traditions Timeline",
          era: "33 AD - 2026",
          summary:
            "A vertical overview of the ancient catholic apostolic Church, the major East-West and Reformation divisions, and the continuing Catholic, Orthodox, Oriental Orthodox, Protestant, Pentecostal, and Charismatic communities today.",
          sections: [],
        }
      : getHistoryTopic(slug);

  if (!topic) {
    notFound();
  }

  return (
    <main className="church-history-mobile mobile-app-shell">
      <header className="mobile-section-header">
        <Link href="/" aria-label="Back home" className="mobile-section-header__back">
          ‹
        </Link>
        <div>
          <h1>Church History</h1>
          <span>✦</span>
        </div>
      </header>

      <HistoryTabs activeSlug={topic.slug} />

      <section className="history-topic-title">
        <p>{topic.era}</p>
        <h2>{topic.title === "Great Schism" ? "The Great Schism of 1054" : topic.title}</h2>
          <p>{topic.summary}</p>
      </section>

      <TopicPanel slug={topic.slug} />

      {topic.sections.length ? (
        <section className="history-study-sections">
          {topic.sections.map((section, index) => (
            <article key={section.id}>
              <span>{index + 1}</span>
              <div>
                <h3>{section.title}</h3>
                <p>{section.summary}</p>
                <p>{section.detail}</p>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      <MobileBottomNav active="Home" />
    </main>
  );
}
