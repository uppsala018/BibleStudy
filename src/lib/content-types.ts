export type StrongWord = {
  label: string;
  strongsId: string;
};

export type Verse = {
  id: string;
  reference: string;
  number: number;
  text: string;
  strongs?: StrongWord[];
};

export type LexiconEntry = {
  id: string;
  lemma: string;
  language: "Hebrew" | "Greek";
  transliteration: string;
  pronunciation: string;
  definition: string;
  root: string;
};

export type CrossReference = {
  reference: string;
  note: string;
};

export type ScriptureChapter = {
  work: string;
  book: string;
  chapter: number;
  verses: Verse[];
};

export type CatholicReading = ScriptureChapter & {
  translation: string;
  catechismTitle: string;
  catechismExcerpt: string;
  catechismReference: string;
  crossReferences: CrossReference[];
};

export type ArticleCard = {
  id: string;
  title: string;
  summary: string;
  era: string;
};

export type SearchResult = {
  id: string;
  title: string;
  detail: string;
  target:
    | { kind: "kjv-verse"; verseId: string }
    | { kind: "catholic-verse"; verseId: string }
    | { kind: "strongs"; strongsId: string }
    | { kind: "father"; cardId: string }
    | { kind: "history"; cardId: string };
};
