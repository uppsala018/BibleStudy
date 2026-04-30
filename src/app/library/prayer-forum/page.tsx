import AppHeader from "@/components/app-header";
import PrayerForumBoard from "@/components/prayer-forum-board";

export default function PrayerForumPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <PrayerForumBoard />
      </main>
    </>
  );
}
