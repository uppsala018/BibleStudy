import { NextRequest, NextResponse } from "next/server";
import { getLexiconEntry, searchBible } from "@/lib/server/full-kjv";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const results = await searchBible(q, 20);
  const upper = q.toUpperCase();

  if (/^[GH]\d+$/.test(upper)) {
    const entry = await getLexiconEntry(upper);

    if (entry) {
      return NextResponse.json({
        results: [
          {
            kind: "strongs",
            id: entry.id,
            title: `${entry.id} ${entry.transliteration}`,
            detail: entry.definition,
            strongsId: entry.id,
          },
          ...results.map((item) => ({
            kind: "kjv-search",
            ...item,
            title: item.reference,
            detail: item.text,
          })),
        ],
      });
    }
  }

  return NextResponse.json({
    results: results.map((item) => ({
      kind: "kjv-search",
      ...item,
      title: item.reference,
      detail: item.text,
    })),
  });
}
