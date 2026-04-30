"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createSupabaseBrowserClient,
  hasSupabaseEnv,
  subscribeToAuthChanges,
} from "@/lib/supabase";

type PrayerRequest = {
  id: string;
  created_at: string;
  display_name: string;
  request_text: string;
  amen_count: number;
  user_id: string | null;
  status: "open" | "answered";
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function PrayerForumBoard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [requestText, setRequestText] = useState("");
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(() => hasSupabaseEnv());
  const [posting, setPosting] = useState(false);
  const [prayingId, setPrayingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultDisplayName = useMemo(() => {
    if (!userEmail) {
      return "";
    }

    return userEmail.split("@")[0] || "";
  }, [userEmail]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    void supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
      const email = data.user?.email ?? null;
      setUserEmail(email);
      setDisplayName((current) => current || (email ? email.split("@")[0] ?? "" : ""));
    });

    return subscribeToAuthChanges((_event, session) => {
      setUserId(session?.user?.id ?? null);
      const email = session?.user?.email ?? null;
      setUserEmail(email);
      setDisplayName((current) => current || (email ? email.split("@")[0] ?? "" : ""));
    });
  }, []);

  const loadRequests = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setMessage("Supabase is not configured yet. Add the prayer_requests table to enable the forum.");
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("prayer_requests")
      .select("id, created_at, display_name, request_text, amen_count, user_id, status")
      .order("created_at", { ascending: false })
      .limit(50);

    if (fetchError) {
      setError(
        "Prayer forum is not connected yet. Create the prayer_requests table and RLS policy in Supabase.",
      );
      setRequests([]);
      setLoading(false);
      return;
    }

    setRequests((data ?? []) as PrayerRequest[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadRequests();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadRequests]);

  async function handleSubmit() {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    if (!userEmail) {
      setError("Sign in first, then post a prayer request.");
      return;
    }

    const trimmed = requestText.trim();

    if (trimmed.length < 10) {
      setError("Write at least a short sentence so other people can pray with clarity.");
      return;
    }

    setPosting(true);
    setError(null);
    setMessage(null);

    const name = displayName.trim() || defaultDisplayName || "Anonymous";
    const { data, error: insertError } = await supabase
      .from("prayer_requests")
      .insert({
        display_name: name,
        request_text: trimmed,
        user_id: userId,
        status: "open",
        amen_count: 0,
      })
      .select("id, created_at, display_name, request_text, amen_count, user_id, status")
      .single();

    setPosting(false);

    if (insertError || !data) {
      setError(insertError?.message ?? "Could not post the request.");
      return;
    }

    setRequests((current) => [data as PrayerRequest, ...current]);
    setRequestText("");
    setMessage("Prayer request posted.");
  }

  async function handlePray(id: string) {
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    if (!userEmail) {
      setError("Sign in first so the forum can track your prayer encouragement.");
      return;
    }

    setPrayingId(id);
    setError(null);

    const { error: rpcError } = await supabase.rpc("increment_prayer_count", {
      target_id: id,
    });

    setPrayingId(null);

    if (rpcError) {
      setError(
        "The prayer-count helper is missing. Run the supplied Supabase SQL to finish the forum setup.",
      );
      return;
    }

    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? { ...request, amen_count: request.amen_count + 1 }
          : request,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-highlight)]">
          Prayer Forum
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
          Post a request, pray for others, and keep the board focused.
        </h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--color-muted)]">
          Keep requests brief and respectful. Avoid private medical details, full names, or anything
          you would not want visible to other users. This is a small prayer board, not a counseling
          service.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.52fr_0.48fr]">
        <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
          <h3 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-highlight)]">
            Submit a request
          </h3>

          <div className="mt-5 rounded-[1.4rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.52)] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-soft)]">Sign in</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Use the email sign-in in the header. Signed-in users can post requests and press Pray.
            </p>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm text-[var(--color-soft)]">Display name</span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder={defaultDisplayName || "Your name"}
              className="w-full rounded-[1.2rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.78)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-soft)]"
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-[var(--color-soft)]">Prayer request</span>
            <textarea
              value={requestText}
              onChange={(event) => setRequestText(event.target.value)}
              rows={6}
              placeholder="Share your prayer request in a few sentences..."
              className="w-full rounded-[1.2rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.78)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-soft)]"
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={posting || !requestText.trim()}
              className="rounded-full bg-[linear-gradient(180deg,#f0cf84,#cba45b)] px-5 py-3 text-sm font-semibold text-[#0a1530] disabled:opacity-60"
            >
              {posting ? "Posting..." : "Post request"}
            </button>
            <button
              type="button"
              onClick={() => {
                setRequestText("");
                setError(null);
                setMessage(null);
              }}
              className="rounded-full border border-[var(--color-border)] px-5 py-3 text-sm text-[var(--color-ink)]"
            >
              Clear
            </button>
          </div>

          {message ? <p className="mt-4 text-sm text-[var(--color-highlight)]">{message}</p> : null}
          {error ? <p className="mt-4 text-sm text-[#e6a5a5]">{error}</p> : null}
          {!hasSupabaseEnv() ? (
            <p className="mt-4 text-sm text-[var(--color-soft)]">
              Supabase environment variables are missing, so the forum cannot save posts yet.
            </p>
          ) : null}
        </article>

        <aside className="space-y-6">
          <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
            <h3 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-highlight)]">
              How it works
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
              <li>- Read requests without logging in.</li>
              <li>- Sign in with email to post or tap Pray.</li>
              <li>- Keep the board focused on encouragement and intercession.</li>
            </ul>
          </article>

          <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
            <h3 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-highlight)]">
              Prayer focus
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              The goal is simple: a small, clean place where people can ask for prayer and respond
              with encouragement. If you want comments or threads later, that can be added as a second
              step.
            </p>
          </article>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-highlight)]">
              Latest Requests
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
              Pray for one another
            </h3>
          </div>
          <button
            type="button"
            onClick={() => void loadRequests()}
            disabled={loading}
            className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-soft)]"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {loading ? (
            <p className="text-sm text-[var(--color-muted)]">Loading prayer requests...</p>
          ) : null}
          {!loading && requests.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)]">
              No prayer requests yet. Be the first to post one.
            </p>
          ) : null}
          {requests.map((request) => (
            <article
              key={request.id}
              className="rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,17,34,0.52)] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-soft)]">
                    {request.display_name}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">
                    {request.request_text}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--color-soft)]">{formatDate(request.created_at)}</p>
                  <p className="mt-2 text-sm text-[var(--color-highlight)]">
                    {request.amen_count} prayed
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void handlePray(request.id)}
                  disabled={prayingId === request.id}
                  className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-highlight)] disabled:opacity-60"
                >
                  {prayingId === request.id ? "Praying..." : "Pray"}
                </button>
                <span className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-soft)]">
                  {request.status === "answered" ? "Answered" : "Open"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
