import StudyWorkspace from "@/components/study-workspace";

export default async function KJVPage({
  searchParams,
}: {
  searchParams: Promise<{
    book?: string;
    chapter?: string;
    verse?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <StudyWorkspace
      initialTab="reader"
      initialReference={{
        book: params.book,
        chapter: params.chapter,
        verse: params.verse,
      }}
    />
  );
}
