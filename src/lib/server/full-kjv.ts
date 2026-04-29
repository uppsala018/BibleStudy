import fs from "node:fs/promises";
import path from "node:path";
import type { LexiconEntry, Verse } from "@/lib/content-types";

type BookMeta = {
  code: string;
  name: string;
  chapterCount: number;
};

type ChapterData = {
  work: string;
  code: string;
  book: string;
  chapterCount: number;
  chapter: number;
  verses: Verse[];
};

type BookData = {
  work: string;
  code: string;
  book: string;
  chapterCount: number;
  chapters: Array<{
    number: number;
    verses: Verse[];
  }>;
};

type SearchHit = {
  id: string;
  reference: string;
  bookCode: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
};

const dataRoot = path.join(process.cwd(), "data");
let booksPromise: Promise<BookMeta[]> | null = null;
let searchPromise: Promise<SearchHit[]> | null = null;
let lexiconPromise: Promise<Record<string, LexiconEntry>> | null = null;
const bookCache = new Map<string, Promise<BookData>>();

function decodeEntities(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&#8212;/g, " - ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"');
}

function stripMarkup(value: string) {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function maybeRepairEncoding(value: string) {
  if (!/[ÃÂÎá×]/.test(value)) {
    return value;
  }

  try {
    const repaired = Buffer.from(value, "latin1").toString("utf8");

    if (repaired.includes("�")) {
      return value;
    }

    if (/[\u0370-\u03ff\u0590-\u05ff]/.test(repaired) || /[āēīōū]/i.test(repaired)) {
      return repaired;
    }
  } catch {
    return value;
  }

  return value;
}

function sanitizeText(value: string) {
  return maybeRepairEncoding(stripMarkup(value));
}

function sanitizeVerse(verse: Verse): Verse {
  return {
    ...verse,
    text: stripMarkup(verse.text),
    strongs: verse.strongs?.map((word) => ({
      ...word,
      label: stripMarkup(word.label),
    })),
  };
}

function sanitizeLexiconEntry(entry: LexiconEntry): LexiconEntry {
  return {
    ...entry,
    lemma: sanitizeText(entry.lemma),
    transliteration: sanitizeText(entry.transliteration),
    pronunciation: sanitizeText(entry.pronunciation),
    definition: sanitizeText(entry.definition),
    root: sanitizeText(entry.root),
  };
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  return JSON.parse(await fs.readFile(filePath, "utf8")) as T;
}

export async function getBookCatalog() {
  if (!booksPromise) {
    booksPromise = readJsonFile<BookMeta[]>(path.join(dataRoot, "kjv", "books.json"));
  }

  return booksPromise;
}

export async function getBookData(bookCode: string) {
  if (!bookCache.has(bookCode)) {
    bookCache.set(
      bookCode,
      readJsonFile<BookData>(path.join(dataRoot, "kjv", "books", `${bookCode}.json`)),
    );
  }

  return bookCache.get(bookCode)!;
}

export async function getChapterData(bookCode: string, chapterNumber: number) {
  const book = await getBookData(bookCode);
  const chapter = book.chapters.find((item) => item.number === chapterNumber);

  if (!chapter) {
    return null;
  }

  return {
    work: book.work,
    code: book.code,
    book: book.book,
    chapterCount: book.chapterCount,
    chapter: chapter.number,
    verses: chapter.verses.map(sanitizeVerse),
  } satisfies ChapterData;
}

export async function searchBible(query: string, limit = 20) {
  if (!searchPromise) {
    searchPromise = readJsonFile<SearchHit[]>(
      path.join(dataRoot, "kjv", "search-index.json"),
    );
  }

  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  const searchIndex = await searchPromise;
  return searchIndex
    .filter((item) => {
      const haystack = `${item.reference} ${item.text}`.toLowerCase();
      return haystack.includes(normalized);
    })
    .map((item) => ({
      ...item,
      text: stripMarkup(item.text),
    }))
    .slice(0, limit);
}

export async function getLexiconEntry(id: string) {
  if (!lexiconPromise) {
    lexiconPromise = readJsonFile<Record<string, LexiconEntry>>(
      path.join(dataRoot, "strongs", "lexicon.json"),
    );
  }

  const lexicon = await lexiconPromise;
  const entry = lexicon[id];

  if (!entry) {
    return null;
  }

  return sanitizeLexiconEntry(entry);
}
