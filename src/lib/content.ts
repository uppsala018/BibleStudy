import catholicReadingJson from "@/content/catholic/john-1.json";
import fathersJson from "@/content/fathers.json";
import historyJson from "@/content/history.json";
import kjvChapterJson from "@/content/kjv/genesis-1.json";
import strongsJson from "@/content/strongs.json";
import type {
  ArticleCard,
  CatholicReading,
  LexiconEntry,
  ScriptureChapter,
  SearchResult,
} from "@/lib/content-types";

export const kjvChapter = kjvChapterJson as ScriptureChapter;
export const catholicReading = catholicReadingJson as CatholicReading;
export const fathers = fathersJson as ArticleCard[];
export const historyTopics = historyJson as ArticleCard[];
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
