export type StrongWord = {
  label: string;
  strongsId: string;
};

export type VerseNote = {
  label?: string;
  text: string;
};

export type VerseCrossReference = {
  text: string;
};

export type Verse = {
  id: string;
  reference: string;
  number: number;
  text: string;
  strongs?: StrongWord[];
  notes?: VerseNote[];
  crossRefs?: VerseCrossReference[];
  summary?: string | null;
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

export type CatholicStudyEntry = CatholicReading & {
  slug: string;
  title: string;
  focus: string;
  source: string;
  summary: string;
};

export type CatechismSection = {
  id: string;
  title?: string;
  paragraphs: string[];
};

export type CatechismEntry = {
  slug: string;
  part: string;
  order: number;
  title: string;
  source: string;
  summary: string;
  sections: CatechismSection[];
};

export type ArticleCard = {
  id: string;
  title: string;
  summary: string;
  era: string;
};

export type FatherSection = {
  id: string;
  title: string;
  citation: string;
  excerpt: string;
  themes: string[];
};

export type FatherWork = {
  slug: string;
  title: string;
  source: string;
  yearLabel: string;
  summary: string;
  sections: FatherSection[];
};

export type FatherProfile = {
  slug: string;
  name: string;
  era: string;
  region: string;
  tradition: string;
  summary: string;
  bio: string;
  themes: string[];
  works: FatherWork[];
};

export type HistorySection = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
};

export type HistoryTopic = {
  slug: string;
  title: string;
  era: string;
  summary: string;
  overview: string;
  significance: string;
  sections: HistorySection[];
  relatedTopics: string[];
};

export type SearchResult = {
  id: string;
  title: string;
  detail: string;
  target:
    | { kind: "kjv-verse"; verseId: string }
    | { kind: "catholic-verse"; verseId: string }
    | { kind: "catechism"; slug: string }
    | { kind: "strongs"; strongsId: string }
    | { kind: "father"; cardId: string }
    | { kind: "history"; cardId: string };
};
