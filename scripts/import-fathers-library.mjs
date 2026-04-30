import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "imports", "raw", "fathers");
const outputPath = path.join(root, "src", "content", "fathers-library.json");

const sharedTracks = ["catholic", "orthodox"];

const libraryConfig = [
  {
    slug: "ignatius-antioch",
    name: "Ignatius of Antioch",
    era: "c. 35-108",
    region: "Antioch and Asia Minor",
    tradition: "Apostolic Father",
    stream: "shared",
    studyTracks: sharedTracks,
    summary:
      "Ignatius wrote on church unity, the bishop, the Eucharist, and martyrdom while travelling under guard to Rome.",
    bio:
      "Ignatius stands close to the apostolic age and gives one of the clearest early witnesses to episcopal order, sacramental worship, and the Church's visible unity. His surviving letters were written on the road to martyrdom.",
    themes: ["unity", "bishop", "eucharist", "martyrdom"],
    works: [
      makeSingleWork("letter-to-the-ephesians", "The Epistle of Ignatius to the Ephesians", "ignatius-ephesians.html", "0104", "c. 107", "A sustained appeal to unity, disciplined church life, and perseverance in Christ."),
      makeSingleWork("letter-to-the-magnesians", "The Epistle of Ignatius to the Magnesians", "ignatius-magnesians.html", "0105", "c. 107", "Ignatius urges harmony around the bishop and warns against divided teaching."),
      makeSingleWork("letter-to-the-trallians", "The Epistle of Ignatius to the Trallians", "ignatius-trallians.html", "0106", "c. 107", "A call to stability, humility, and resistance to false doctrine."),
      makeSingleWork("letter-to-the-romans", "The Epistle of Ignatius to the Romans", "ignatius-romans.html", "0107", "c. 107", "Ignatius pleads that his martyrdom not be prevented and describes his longing for Christ."),
      makeSingleWork("letter-to-the-philadelphians", "The Epistle of Ignatius to the Philadelphians", "ignatius-philadelphians.html", "0108", "c. 107", "A warning against schism with a repeated emphasis on unity at the altar."),
      makeSingleWork("letter-to-the-smyrnaeans", "The Epistle of Ignatius to the Smyrnaeans", "ignatius-smyrnaeans.html", "0109", "c. 107", "A major witness to the reality of Christ's flesh and the Eucharist against docetism."),
      makeSingleWork("letter-to-polycarp", "The Epistle of Ignatius to Polycarp", "ignatius-polycarp.html", "0110", "c. 107", "Pastoral counsel for Polycarp on steadfastness, discipline, and endurance."),
    ],
  },
  {
    slug: "clement-rome",
    name: "Clement of Rome",
    era: "late 1st century",
    region: "Rome",
    tradition: "Apostolic Father",
    stream: "shared",
    studyTracks: sharedTracks,
    summary:
      "Clement's letters are among the earliest non-New Testament Christian texts and address order, repentance, and perseverance.",
    bio:
      "Clement's surviving Corinthian correspondence shows the Roman church speaking with moral authority at the end of the first century. The letters are vital for early church order, apostolic continuity, and practical holiness.",
    themes: ["church-order", "repentance", "perseverance", "apostolic-succession"],
    works: [
      makeSingleWork("first-letter-to-the-corinthians", "First Letter to the Corinthians", "clement-1.html", "1010", "late 1st century", "A long appeal for repentance, humility, peace, and rightful ministry in the church."),
      makeSingleWork("second-letter-to-the-corinthians", "Second Letter to the Corinthians", "clement-2.html", "1011", "2nd century", "An early homiletic exhortation on repentance, obedience, and life in Christ."),
    ],
  },
  {
    slug: "polycarp-smyrna",
    name: "Polycarp of Smyrna",
    era: "c. 69-155",
    region: "Smyrna",
    tradition: "Apostolic Father",
    stream: "shared",
    studyTracks: sharedTracks,
    summary:
      "Polycarp links the apostolic age to the mid-second century through pastoral exhortation and martyr testimony.",
    bio:
      "Polycarp was a major bishop of Smyrna, associated with the apostolic generation and remembered both for his letter to the Philippians and for his martyrdom. His witness joins practical holiness to steadfast confession.",
    themes: ["pastoral-care", "martyrdom", "steadfastness", "apostolic-witness"],
    works: [
      makeSingleWork("letter-to-the-philippians", "The Epistle of Polycarp to the Philippians", "polycarp-philippians.html", "0136", "2nd century", "Pastoral exhortation on righteousness, endurance, and fidelity to apostolic teaching."),
      makeSingleWork("martyrdom-of-polycarp", "The Martyrdom of Polycarp", "martyrdom-polycarp.html", "0102", "mid-2nd century", "A classic martyr act describing Polycarp's confession, death, and early Christian remembrance."),
    ],
  },
  {
    slug: "didache",
    name: "The Didache",
    era: "1st-2nd century",
    region: "Eastern Mediterranean",
    tradition: "Apostolic Writings",
    stream: "shared",
    studyTracks: sharedTracks,
    summary:
      "The Didache preserves an early manual of Christian morals, baptism, Eucharist, ministry, and eschatological watchfulness.",
    bio:
      "The Didache is not a personal letter but an early church manual. It is one of the clearest windows into practical Christian catechesis, worship, and church discipline near the apostolic period.",
    themes: ["catechesis", "baptism", "eucharist", "church-order"],
    works: [
      makeSingleWork("didache", "The Didache", "didache.html", "0714", "1st-2nd century", "An early church manual on the two ways, sacramental life, ministry, and readiness for the Lord's coming."),
    ],
  },
  {
    slug: "barnabas",
    name: "The Epistle of Barnabas",
    era: "1st-2nd century",
    region: "Eastern Mediterranean",
    tradition: "Apostolic Writings",
    stream: "shared",
    studyTracks: sharedTracks,
    summary:
      "Barnabas presents a strongly typological reading of Scripture and a moral contrast between the way of light and the way of darkness.",
    bio:
      "The Epistle of Barnabas is an early Christian tract that reads the Old Testament through Christ and develops a practical moral theology of light and darkness. It became an important witness to early Christian exegesis.",
    themes: ["scripture", "typology", "moral-teaching", "covenant"],
    works: [
      makeSingleWork("epistle-of-barnabas", "The Epistle of Barnabas", "barnabas.html", "0124", "1st-2nd century", "An early Christian exposition of Scripture and the way of light."),
    ],
  },
  {
    slug: "mathetes-diognetus",
    name: "Mathetes to Diognetus",
    era: "2nd century",
    region: "Greek-speaking Church",
    tradition: "Early Christian Apology",
    stream: "shared",
    studyTracks: sharedTracks,
    summary:
      "The Letter to Diognetus offers one of the most memorable early descriptions of Christian life in the world.",
    bio:
      "The anonymous author traditionally called Mathetes writes to explain Christian worship, conduct, and hope. The work is especially prized for its concise apologetic portrait of Christians as the soul within the world.",
    themes: ["apologetics", "christian-life", "incarnation", "mission"],
    works: [
      makeSingleWork("letter-to-diognetus", "The Epistle of Mathetes to Diognetus", "diognetus.html", "0101", "2nd century", "A concise apology on Christian life, worship, and the revelation of the Word."),
    ],
  },
  {
    slug: "justin-martyr",
    name: "Justin Martyr",
    era: "c. 100-165",
    region: "Samaria and Rome",
    tradition: "Early Christian Apologist",
    stream: "shared",
    studyTracks: sharedTracks,
    summary:
      "Justin explained Christianity to the Roman world and preserved one of the church's earliest detailed descriptions of Christian worship.",
    bio:
      "Justin's writings connect Christian doctrine with philosophy while grounding the faith in Christ, prophecy, and public worship. His works are especially important for second-century liturgy and apologetics.",
    themes: ["apologetics", "liturgy", "reason", "prophecy"],
    works: [
      makeSingleWork("first-apology", "The First Apology of Justin", "justin-first-apology.html", "0126", "c. 155-157", "A formal defense of Christian worship, doctrine, and moral life addressed to Roman authorities."),
    ],
  },
  {
    slug: "athanasius",
    name: "Athanasius",
    era: "c. 296-373",
    region: "Alexandria",
    tradition: "Nicene Father",
    stream: "shared",
    studyTracks: sharedTracks,
    summary:
      "Athanasius defended the full deity of Christ and wrote one of the church's classic explanations of the Incarnation.",
    bio:
      "As bishop of Alexandria, Athanasius became the defining anti-Arian voice of the fourth century. His writings tie salvation, worship, and Scripture together around the claim that the Son is truly God and truly man.",
    themes: ["incarnation", "nicene-faith", "salvation", "scripture"],
    works: [
      makeSingleWork("on-the-incarnation", "On the Incarnation of the Word", "athanasius-incarnation.html", "2802", "4th century", "A classic account of why the Word became flesh and how Christ restores humanity."),
    ],
  },
  {
    slug: "basil-great",
    name: "Basil the Great",
    era: "c. 329-379",
    region: "Cappadocia",
    tradition: "Cappadocian Father",
    stream: "orthodox",
    studyTracks: ["orthodox", "catholic"],
    summary:
      "Basil is one of the central Cappadocian fathers and a major voice on the Trinity, ascetic life, and the Holy Spirit.",
    bio:
      "Basil the Great is foundational for Eastern Christian theology, liturgical memory, and monastic formation. He is especially important for Orthodox study, but he also stands as a major saint and doctor in the Catholic tradition.",
    themes: ["trinity", "holy-spirit", "asceticism", "cappadocian"],
    works: [
      makeSingleWork("on-the-holy-spirit", "On the Holy Spirit", "basil-holy-spirit.html", "3203", "4th century", "A major defense of the divinity and worship of the Holy Spirit in Trinitarian theology."),
    ],
  },
  {
    slug: "gregory-nazianzen",
    name: "Gregory Nazianzen",
    era: "c. 329-390",
    region: "Cappadocia and Constantinople",
    tradition: "Cappadocian Father",
    stream: "orthodox",
    studyTracks: ["orthodox", "catholic"],
    summary:
      "Gregory Nazianzen is one of the great Cappadocian theologians, especially revered for his Trinitarian preaching.",
    bio:
      "Gregory Nazianzen, often called 'the Theologian' in the East, is central to Orthodox doctrinal study and remains a major patristic authority for Catholic theology as well. His theological orations are among the classic texts on the Trinity.",
    themes: ["trinity", "theology", "orations", "cappadocian"],
    works: [
      makeSeriesWork(
        "theological-orations",
        "Theological Orations",
        [
          "gregory-nazianzen-oration-27.html",
          "gregory-nazianzen-oration-28.html",
          "gregory-nazianzen-oration-29.html",
          "gregory-nazianzen-oration-30.html",
          "gregory-nazianzen-oration-31.html",
        ],
        "310227",
        "4th century",
        "Gregory's classic five orations on the right manner of theology and the Trinitarian mystery.",
      ),
    ],
  },
  {
    slug: "john-chrysostom",
    name: "John Chrysostom",
    era: "c. 347-407",
    region: "Antioch and Constantinople",
    tradition: "Golden-Mouthed Father",
    stream: "orthodox",
    studyTracks: ["orthodox", "catholic"],
    summary:
      "Chrysostom is one of the most influential Greek fathers, known for preaching, pastoral theology, and moral instruction.",
    bio:
      "John Chrysostom is central to Orthodox liturgical and pastoral memory and remains deeply important in Catholic patristic reading. His writings join scriptural preaching with direct pastoral instruction and moral seriousness.",
    themes: ["preaching", "priesthood", "pastoral-care", "scripture"],
    works: [
      makeSeriesWork(
        "on-the-priesthood",
        "On the Priesthood",
        [
          "chrysostom-priesthood-1.html",
          "chrysostom-priesthood-2.html",
          "chrysostom-priesthood-3.html",
          "chrysostom-priesthood-4.html",
          "chrysostom-priesthood-5.html",
          "chrysostom-priesthood-6.html",
        ],
        "19221",
        "4th century",
        "A major pastoral and theological work on ministry, responsibility, and the burden of priestly office.",
      ),
    ],
  },
  {
    slug: "cyril-jerusalem",
    name: "Cyril of Jerusalem",
    era: "c. 313-386",
    region: "Jerusalem",
    tradition: "Catechetical Father",
    stream: "shared",
    studyTracks: sharedTracks,
    summary:
      "Cyril's catechetical lectures are among the church's most important early instructions on baptism, creed, sacrament, and worship.",
    bio:
      "Cyril of Jerusalem is foundational for catechesis, liturgy, and sacramental theology. His lectures are especially valuable for Orthodox and Catholic readers because they show how fourth-century Jerusalem formed converts for baptism and Eucharistic life.",
    themes: ["catechesis", "baptism", "creed", "liturgy"],
    works: [
      makeSeriesWork(
        "catechetical-lectures",
        "Catechetical Lectures",
        [
          "cyril-catechetical-310100.html",
          "cyril-catechetical-310101.html",
          "cyril-catechetical-310102.html",
          "cyril-catechetical-310103.html",
          "cyril-catechetical-310104.html",
          "cyril-catechetical-310105.html",
          "cyril-catechetical-310106.html",
          "cyril-catechetical-310107.html",
          "cyril-catechetical-310108.html",
          "cyril-catechetical-310109.html",
          "cyril-catechetical-310110.html",
          "cyril-catechetical-310111.html",
          "cyril-catechetical-310112.html",
          "cyril-catechetical-310113.html",
          "cyril-catechetical-310114.html",
          "cyril-catechetical-310115.html",
          "cyril-catechetical-310116.html",
          "cyril-catechetical-310117.html",
          "cyril-catechetical-310118.html",
          "cyril-catechetical-310119.html",
          "cyril-catechetical-310120.html",
          "cyril-catechetical-310121.html",
          "cyril-catechetical-310122.html",
          "cyril-catechetical-310123.html",
        ],
        "310100",
        "4th century",
        "A large catechetical corpus on preparation for baptism, the creed, the sacraments, and the Christian life.",
      ),
    ],
  },
  {
    slug: "augustine-hippo",
    name: "Augustine of Hippo",
    era: "354-430",
    region: "North Africa",
    tradition: "Latin Father",
    stream: "catholic",
    studyTracks: ["catholic", "protestant"],
    summary:
      "Augustine shaped Western Christianity through biblical reflection, confession, and theological synthesis.",
    bio:
      "Augustine is one of the most important Western church fathers. His autobiographical, pastoral, and doctrinal works became central to Catholic theology and remained deeply influential for many Protestant readers as well.",
    themes: ["conversion", "grace", "memory", "prayer"],
    works: [
      makeSeriesWork(
        "confessions",
        "The Confessions",
        [
          "augustine-confessions-110101.html",
          "augustine-confessions-110102.html",
          "augustine-confessions-110103.html",
          "augustine-confessions-110104.html",
          "augustine-confessions-110105.html",
          "augustine-confessions-110106.html",
          "augustine-confessions-110107.html",
          "augustine-confessions-110108.html",
          "augustine-confessions-110109.html",
          "augustine-confessions-110110.html",
          "augustine-confessions-110111.html",
          "augustine-confessions-110112.html",
          "augustine-confessions-110113.html",
        ],
        "110101",
        "397-400",
        "Augustine's autobiographical and theological masterwork on memory, conversion, grace, and the restlessness of the heart before God.",
      ),
    ],
  },
];

function makeSingleWork(slug, title, fileName, sourceId, yearLabel, summary) {
  return {
    slug,
    title,
    sourceId,
    yearLabel,
    summary,
    fileNames: [fileName],
  };
}

function makeSeriesWork(slug, title, fileNames, sourceId, yearLabel, summary) {
  return {
    slug,
    title,
    sourceId,
    yearLabel,
    summary,
    fileNames,
  };
}

function decodeEntities(value) {
  return value
    .replace(/&#160;|&nbsp;/g, " ")
    .replace(/&#151;|&mdash;/g, " - ")
    .replace(/&#150;|&ndash;/g, " - ")
    .replace(/&hellip;/g, "...")
    .replace(/&lsquo;|&#8216;/g, "'")
    .replace(/&rsquo;|&#8217;/g, "'")
    .replace(/&ldquo;|&#8220;/g, '"')
    .replace(/&rdquo;|&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&ouml;/g, "o")
    .replace(/&aelig;/g, "ae")
    .replace(/&AElig;/g, "AE")
    .replace(/&oelig;/g, "oe")
    .replace(/&OElig;/g, "OE")
    .replace(/&eacute;/g, "e")
    .replace(/&uuml;/g, "u")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripTags(value) {
  return decodeEntities(
    value
      .replace(/<sup[^>]*>.*?<\/sup>/gis, "")
      .replace(/<span class="stiki"[^>]*>.*?<\/span>/gis, " ")
      .replace(/<span class="fisk"[^>]*>.*?<\/span>/gis, " ")
      .replace(/<span class="prefisk"[^>]*>.*?<\/span>/gis, "$&")
      .replace(/<span[^>]*>.*?<\/span>/gis, (match) => {
        if (/<a [^>]*>(.*?)<\/a>/i.test(match)) {
          return match.replace(/<a [^>]*>(.*?)<\/a>/gi, "$1");
        }

        return " ";
      })
      .replace(/<a [^>]*>(.*?)<\/a>/gis, "$1")
      .replace(/<quote>/gi, '"')
      .replace(/<\/quote>/gi, '"')
      .replace(/<q>/gi, '"')
      .replace(/<\/q>/gi, '"')
      .replace(/<em>|<\/em>|<strong>|<\/strong>|<b>|<\/b>|<i>|<\/i>/gi, "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .replace(/ +([,.;:!?])/g, "$1")
      .replace(/\( /g, "(")
      .replace(/ \)/g, ")")
      .trim(),
  );
}

function extractBody(html) {
  const start = html.search(/<h1>/i);
  const endCandidates = [
    html.search(/<div class="pub">/i),
    html.search(/<div id="footer">/i),
    html.search(/<\/article>/i),
  ].filter((value) => value > start);
  const end = endCandidates.length ? Math.min(...endCandidates) : html.length;
  return start >= 0 ? html.slice(start, end) : html;
}

function parseSectionsFromHtml(html, sectionOffset) {
  const body = extractBody(html);
  const sections = [];
  const tokenRegex = /<(h2|p)(?: [^>]*)?>([\s\S]*?)<\/\1>/gi;
  let currentSection = null;
  let match;

  while ((match = tokenRegex.exec(body)) !== null) {
    const [, tag, rawInner] = match;
    const text = stripTags(rawInner);

    if (!text) {
      continue;
    }

    if (
      text.startsWith("Please help support the mission of New Advent") ||
      text === "About this page" ||
      text === "(To the Reader.)" ||
      text.includes("Translated by") ||
      text.includes("Revised and edited for New Advent") ||
      text.includes("Contact information.")
    ) {
      continue;
    }

    if (tag.toLowerCase() === "h2") {
      currentSection = {
        id: `section-${sectionOffset + sections.length + 1}`,
        title: text,
        citation: text,
        paragraphs: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection) {
      currentSection = {
        id: `section-${sectionOffset + 1}`,
        title: "Full Text",
        citation: null,
        paragraphs: [],
      };
      sections.push(currentSection);
    }

    currentSection.paragraphs.push(text);
  }

  return sections.filter((section) => section.paragraphs.length > 0);
}

function buildStats(sections) {
  return {
    sectionCount: sections.length,
    paragraphCount: sections.reduce((total, section) => total + section.paragraphs.length, 0),
  };
}

async function readSource(fileName) {
  return fs.readFile(path.join(sourceRoot, fileName), "utf8");
}

async function buildWork(workConfig) {
  const sections = [];

  for (const fileName of workConfig.fileNames) {
    const html = await readSource(fileName);
    sections.push(...parseSectionsFromHtml(html, sections.length));
  }

  return {
    slug: workConfig.slug,
    title: workConfig.title,
    source: "New Advent / public-domain patristic transcription",
    sourceUrl: `https://www.newadvent.org/fathers/${workConfig.sourceId}.htm`,
    yearLabel: workConfig.yearLabel,
    summary: workConfig.summary,
    sections,
    stats: buildStats(sections),
  };
}

async function main() {
  const library = [];

  for (const profileConfig of libraryConfig) {
    const works = [];

    for (const workConfig of profileConfig.works) {
      works.push(await buildWork(workConfig));
    }

    library.push({
      slug: profileConfig.slug,
      name: profileConfig.name,
      era: profileConfig.era,
      region: profileConfig.region,
      tradition: profileConfig.tradition,
      stream: profileConfig.stream,
      studyTracks: profileConfig.studyTracks,
      summary: profileConfig.summary,
      bio: profileConfig.bio,
      themes: profileConfig.themes,
      works,
    });
  }

  await fs.writeFile(outputPath, `${JSON.stringify(library, null, 2)}\n`, "utf8");
  console.log(`Wrote ${library.length} fathers to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
