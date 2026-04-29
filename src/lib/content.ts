import catholicReadingJson from "@/content/catholic/john-1.json";
import fathersLibraryJson from "@/content/fathers-library.json";
import historyLibraryJson from "@/content/history-library.json";
import kjvChapterJson from "@/content/kjv/genesis-1.json";
import strongsJson from "@/content/strongs.json";
import type {
  ArticleCard,
  CatholicReading,
  FatherProfile,
  HistoryTopic,
  LexiconEntry,
  ScriptureChapter,
  SearchResult,
} from "@/lib/content-types";

export const kjvChapter = kjvChapterJson as ScriptureChapter;
export const catholicReading = catholicReadingJson as CatholicReading;
export const fathersLibrary = fathersLibraryJson as FatherProfile[];
export const fathers: ArticleCard[] = fathersLibrary.map((father) => ({
  id: father.slug,
  title: father.name,
  summary: father.summary,
  era: father.era,
}));
export const historyLibrary = historyLibraryJson as HistoryTopic[];
export const historyTopics: ArticleCard[] = historyLibrary.map((topic) => ({
  id: topic.slug,
  title: topic.title,
  summary: topic.summary,
  era: topic.era,
}));
export const strongsLexicon = strongsJson as Record<string, LexiconEntry>;

export function getKjvVerse(verseId: string) {
  return kjvChapter.verses.find((verse) => verse.id === verseId) ?? kjvChapter.verses[0];
}

export function getCatholicVerse(verseId: string) {
  return (
    catholicReading.verses.find((verse) => verse.id === verseId) ??
    catholicReading.verses[0]
  );
}

export function getFatherProfile(slug: string) {
  return fathersLibrary.find((father) => father.slug === slug) ?? null;
}

export function getHistoryTopic(slug: string) {
  return historyLibrary.find((topic) => topic.slug === slug) ?? null;
}

export const searchIndex: SearchResult[] = [
  ...kjvChapter.verses.map((verse) => ({
    id: verse.id,
    title: verse.reference,
    detail: verse.text,
    target: { kind: "kjv-verse", verseId: verse.id } as const,
  })),
  ...Object.values(strongsLexicon).map((entry) => ({
    id: entry.id,
    title: `${entry.id} ${entry.transliteration}`,
    detail: entry.definition,
    target: { kind: "strongs", strongsId: entry.id } as const,
  })),
  ...catholicReading.verses.map((verse) => ({
    id: verse.id,
    title: verse.reference,
    detail: verse.text,
    target: { kind: "catholic-verse", verseId: verse.id } as const,
  })),
  ...fathers.map((card) => ({
    id: card.id,
    title: card.title,
    detail: card.summary,
    target: { kind: "father", cardId: card.id } as const,
  })),
  ...historyTopics.map((card) => ({
    id: card.id,
    title: card.title,
    detail: card.summary,
    target: { kind: "history", cardId: card.id } as const,
  })),
];
