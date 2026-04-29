"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppHeader from "@/components/app-header";
import {
  catholicReading,
  fathers,
  getCatholicVerse,
  getKjvVerse,
  historyTopics,
  kjvChapter,
  searchIndex,
  strongsLexicon,
} from "@/lib/content";
import type { ArticleCard } from "@/lib/content-types";
import { createStudyPersistence } from "@/lib/persistence";
import { hasSupabaseEnv, subscribeToAuthChanges } from "@/lib/supabase";

export type WorkspaceTab = "reader" | "catholic" | "fathers" | "history" | "notes";

function CardShelf({
  title,
  cards,
}: {
  title: string;
  cards: ArticleCard[];
}) {
  return (
    <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
      <h3 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
        {title}
      </h3>
      <div className="mt-6 grid gap-4">
        {cards.map((card) => (
          <article
            key={card.id}
            className="rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.5)] p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-highlight)]">
                {card.title}
              </h4>
              <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--color-soft)]">
                {card.era}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {card.summary}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function StudyWorkspace({
  initialTab = "reader",
}: {
  initialTab?: WorkspaceTab;
}) {
  const persistence = useMemo(() => createStudyPersistence(), []);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>(initialTab);
  const [selectedVerseId, setSelectedVerseId] = useState(kjvChapter.verses[0].id);
  const [selectedStrongsId, setSelectedStrongsId] = useState("H430");
  const [selectedCatholicVerseId, setSelectedCatholicVerseId] = useState(
    catholicReading.verses[0].id,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    void persistence.load().then((state) => {
      setBookmarks(state.bookmarks);
      setNotes(state.notes);
      setHydrated(true);
    });
  }, [persistence]);

  useEffect(() => {
    if (!hasSupabaseEnv()) {
      return;
    }

    return subscribeToAuthChanges(() => {
      void persistence.load().then((state) => {
        setBookmarks(state.bookmarks);
        setNotes(state.notes);
        setHydrated(true);
      });
    });
  }, [persistence]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    void persistence.save({ bookmarks, notes });
  }, [bookmarks, hydrated, notes, persistence]);

  const selectedVerse = getKjvVerse(selectedVerseId);
  const selectedEntry = strongsLexicon[selectedStrongsId];
  const selectedCatholicVerse = getCatholicVerse(selectedCatholicVerseId);
  const selectedNoteKey =
    activeTab === "reader"
      ? selectedVerse.reference
      : activeTab === "catholic"
        ? selectedCatholicVerse.reference
        : "general";

  const filteredResults = searchTerm
    ? searchIndex.filter((item) => {
        const haystack = `${item.title} ${item.detail}`.toLowerCase();
        return haystack.includes(searchTerm.toLowerCase());
      })
    : [];

  const bookmarkSet = new Set(bookmarks);

  function toggleBookmark(reference: string) {
    setBookmarks((current) =>
      current.includes(reference)
        ? current.filter((item) => item !== reference)
        : [...current, reference],
    );
  }

  function handleSearchSelection(result: (typeof searchIndex)[number]) {
    setSearchTerm("");

    switch (result.target.kind) {
      case "kjv-verse":
        setActiveTab("reader");
        setSelectedVerseId(result.target.verseId);
        break;
      case "catholic-verse":
        setActiveTab("catholic");
        setSelectedCatholicVerseId(result.target.verseId);
        break;
      case "strongs":
        setActiveTab("reader");
        setSelectedStrongsId(result.target.strongsId);
        break;
      case "father":
        setActiveTab("fathers");
        break;
      case "history":
        setActiveTab("history");
        break;
    }
  }

  return (
    <>
      <AppHeader />
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-[var(--color-soft)]">
          <Link
            href="/library"
            className="rounded-full border border-[var(--color-border)] px-4 py-2"
          >
            Library Home
          </Link>
          <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-2">
            Persistence:{" "}
            {persistence.syncStatus === "supabase-ready"
              ? "Supabase ready"
              : "Local only"}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                Study Workspace
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
                Reader, search, bookmarks, and notes.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                The app now runs on structured content files and a persistence
                adapter. You can keep working locally now and switch to
                Supabase-backed sync once project keys and tables are configured.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
              <label
                htmlFor="search"
                className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]"
              >
                Search
              </label>
              <input
                id="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search verses, Strong's, fathers, history"
                className="mt-4 w-full rounded-2xl border border-[var(--color-border)] bg-[rgba(5,17,34,0.78)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-soft)]"
              />

              {filteredResults.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {filteredResults.slice(0, 6).map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => handleSearchSelection(result)}
                      className="w-full rounded-2xl border border-[var(--color-border)] bg-[rgba(5,17,34,0.58)] px-4 py-3 text-left transition hover:bg-[rgba(7,22,44,0.92)]"
                    >
                      <p className="font-semibold text-[var(--color-highlight)]">
                        {result.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                        {result.detail}
                      </p>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                Saved
              </p>
              <div className="mt-4 space-y-3">
                {bookmarks.length === 0 ? (
                  <p className="text-sm leading-7 text-[var(--color-muted)]">
                    No bookmarks yet. Save key passages as you study.
                  </p>
                ) : (
                  bookmarks.map((reference) => (
                    <div
                      key={reference}
                      className="rounded-2xl border border-[var(--color-border)] bg-[rgba(5,17,34,0.58)] px-4 py-3 text-sm text-[var(--color-ink)]"
                    >
                      {reference}
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {[
                ["reader", "KJV + Strong's", "/library/kjv"],
                ["catholic", "Catholic Study", "/library/catholic"],
                ["fathers", "Church Fathers", "/library/fathers"],
                ["history", "Church History", "/library/history"],
                ["notes", "Notes", "/library/notes"],
              ].map(([id, label, href]) => (
                <Link
                  key={id}
                  href={href}
                  onClick={() => setActiveTab(id as WorkspaceTab)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    activeTab === id
                      ? "border-transparent bg-[linear-gradient(180deg,#f0cf84,#cba45b)] text-[#0a1530]"
                      : "border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-soft)]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {activeTab === "reader" ? (
              <div className="grid gap-6 xl:grid-cols-[0.58fr_0.42fr]">
                <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                        {kjvChapter.work}
                      </p>
                      <h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
                        {kjvChapter.book} {kjvChapter.chapter}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(selectedVerse.reference)}
                      className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-soft)]"
                    >
                      {bookmarkSet.has(selectedVerse.reference)
                        ? "Bookmarked"
                        : "Bookmark"}
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    {kjvChapter.verses.map((verse) => (
                      <button
                        key={verse.id}
                        type="button"
                        onClick={() => setSelectedVerseId(verse.id)}
                        className={`w-full rounded-[1.5rem] border p-5 text-left transition ${
                          selectedVerseId === verse.id
                            ? "border-[var(--color-highlight)] bg-[rgba(10,28,55,0.96)]"
                            : "border-[var(--color-border)] bg-[rgba(5,17,34,0.5)]"
                        }`}
                      >
                        <p className="text-sm leading-8 text-[var(--color-ink)]">
                          <span className="mr-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-highlight)]">
                            {verse.number}
                          </span>
                          {verse.text}
                        </p>
                        {verse.strongs ? (
                          <span className="mt-4 flex flex-wrap gap-2">
                            {verse.strongs.map((word) => (
                              <span
                                key={`${verse.id}-${word.strongsId}`}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setSelectedStrongsId(word.strongsId);
                                }}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                  ) {
                                    event.preventDefault();
                                    setSelectedStrongsId(word.strongsId);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-highlight)]"
                              >
                                {word.label} {word.strongsId}
                              </span>
                            ))}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                      Strong&apos;s Concordance
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
                      {selectedEntry.id} {selectedEntry.transliteration}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--color-soft)]">
                      {selectedEntry.language} - {selectedEntry.pronunciation}
                    </p>
                    <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
                      {selectedEntry.definition}
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.56)] p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-soft)]">
                          Lemma
                        </p>
                        <p className="mt-2 text-2xl text-[var(--color-highlight)]">
                          {selectedEntry.lemma}
                        </p>
                      </div>
                      <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.56)] p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-soft)]">
                          Root Note
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                          {selectedEntry.root}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                      Study Notes
                    </p>
                    <textarea
                      value={notes[selectedNoteKey] ?? ""}
                      onChange={(event) =>
                        setNotes((current) => ({
                          ...current,
                          [selectedNoteKey]: event.target.value,
                        }))
                      }
                      placeholder={`Write notes for ${selectedNoteKey}`}
                      className="mt-4 min-h-44 w-full rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.68)] px-4 py-4 text-sm leading-7 text-[var(--color-ink)] outline-none placeholder:text-[var(--color-soft)]"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === "catholic" ? (
              <div className="grid gap-6 xl:grid-cols-[0.58fr_0.42fr]">
                <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                        {catholicReading.translation}
                      </p>
                      <h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
                        {catholicReading.book} {catholicReading.chapter}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        toggleBookmark(selectedCatholicVerse.reference)
                      }
                      className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-soft)]"
                    >
                      {bookmarkSet.has(selectedCatholicVerse.reference)
                        ? "Bookmarked"
                        : "Bookmark"}
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    {catholicReading.verses.map((verse) => (
                      <button
                        key={verse.id}
                        type="button"
                        onClick={() => setSelectedCatholicVerseId(verse.id)}
                        className={`w-full rounded-[1.5rem] border p-5 text-left transition ${
                          selectedCatholicVerseId === verse.id
                            ? "border-[var(--color-highlight)] bg-[rgba(10,28,55,0.96)]"
                            : "border-[var(--color-border)] bg-[rgba(5,17,34,0.5)]"
                        }`}
                      >
                        <p className="text-sm leading-8 text-[var(--color-ink)]">
                          <span className="mr-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-highlight)]">
                            {verse.number}
                          </span>
                          {verse.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(75,38,40,0.98),rgba(17,21,40,0.94))] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                      {catholicReading.catechismTitle}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
                      {catholicReading.catechismReference}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                      {catholicReading.catechismExcerpt}
                    </p>
                  </div>

                  <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                      Cross References
                    </p>
                    <div className="mt-5 space-y-4">
                      {catholicReading.crossReferences.map((item) => (
                        <div
                          key={item.reference}
                          className="rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.56)] p-4"
                        >
                          <p className="font-semibold text-[var(--color-highlight)]">
                            {item.reference}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                            {item.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                      Study Notes
                    </p>
                    <textarea
                      value={notes[selectedNoteKey] ?? ""}
                      onChange={(event) =>
                        setNotes((current) => ({
                          ...current,
                          [selectedNoteKey]: event.target.value,
                        }))
                      }
                      placeholder={`Write notes for ${selectedNoteKey}`}
                      className="mt-4 min-h-36 w-full rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.68)] px-4 py-4 text-sm leading-7 text-[var(--color-ink)] outline-none placeholder:text-[var(--color-soft)]"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === "fathers" ? (
              <CardShelf title="Early Church Fathers" cards={fathers} />
            ) : null}
            {activeTab === "history" ? (
              <CardShelf title="Church History Guides" cards={historyTopics} />
            ) : null}

            {activeTab === "notes" ? (
              <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-highlight)]">
                  Notes Archive
                </p>
                <div className="mt-6 space-y-4">
                  {Object.entries(notes).length === 0 ? (
                    <p className="text-sm leading-7 text-[var(--color-muted)]">
                      No notes saved yet. Add notes from the KJV or Catholic
                      study tabs.
                    </p>
                  ) : (
                    Object.entries(notes).map(([reference, note]) => (
                      <article
                        key={reference}
                        className="rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.56)] p-5"
                      >
                        <h3 className="font-semibold text-[var(--color-highlight)]">
                          {reference}
                        </h3>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[var(--color-muted)]">
                          {note}
                        </p>
                      </article>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
