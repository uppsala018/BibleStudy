import { createSupabaseBrowserClient, hasSupabaseEnv } from "@/lib/supabase";

export type StudyState = {
  bookmarks: string[];
  notes: Record<string, string>;
};

export type StudyPersistence = {
  load(): Promise<StudyState>;
  save(state: StudyState): Promise<void>;
  syncStatus: "local-only" | "supabase-ready";
};

const bookmarkStorageKey = "logos-legacy-bookmarks";
const noteStorageKey = "logos-legacy-notes";

function loadLocalState(): StudyState {
  if (typeof window === "undefined") {
    return { bookmarks: [], notes: {} };
  }

  const storedBookmarks = window.localStorage.getItem(bookmarkStorageKey);
  const storedNotes = window.localStorage.getItem(noteStorageKey);

  return {
    bookmarks: storedBookmarks ? (JSON.parse(storedBookmarks) as string[]) : [],
    notes: storedNotes ? (JSON.parse(storedNotes) as Record<string, string>) : {},
  };
}

function saveLocalState(state: StudyState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(bookmarkStorageKey, JSON.stringify(state.bookmarks));
  window.localStorage.setItem(noteStorageKey, JSON.stringify(state.notes));
}

export function createStudyPersistence(): StudyPersistence {
  return {
    async load() {
      const localState = loadLocalState();

      if (!hasSupabaseEnv()) {
        return localState;
      }

      const supabase = createSupabaseBrowserClient();

      if (!supabase) {
        return localState;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return localState;
      }

      const { data, error } = await supabase
        .from("study_state")
        .select("bookmarks, notes")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error || !data) {
        return localState;
      }

      const remoteState: StudyState = {
        bookmarks: Array.isArray(data.bookmarks)
          ? (data.bookmarks as string[])
          : localState.bookmarks,
        notes:
          data.notes && typeof data.notes === "object"
            ? (data.notes as Record<string, string>)
            : localState.notes,
      };

      saveLocalState(remoteState);
      return remoteState;
    },
    async save(state) {
      saveLocalState(state);

      if (!hasSupabaseEnv()) {
        return;
      }

      const supabase = createSupabaseBrowserClient();

      if (!supabase) {
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      await supabase.from("study_state").upsert({
        user_id: user.id,
        bookmarks: state.bookmarks,
        notes: state.notes,
        updated_at: new Date().toISOString(),
      });
    },
    syncStatus: hasSupabaseEnv() ? "supabase-ready" : "local-only",
  };
}
