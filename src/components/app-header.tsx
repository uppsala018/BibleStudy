"use client";

import Image from "next/image";
import Link from "next/link";
import AuthControls from "@/components/auth-controls";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(4,17,38,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/art/Logo.png"
            alt="One In Him — Biblestudy & Church History"
            width={220}
            height={72}
            className="h-14 w-auto [mix-blend-mode:screen]"
            priority
          />
        </Link>
        <nav className="hidden flex-wrap gap-5 text-sm text-[var(--color-soft)] md:flex">
          <Link href="/library">Library</Link>
          <Link href="/library/protestant">Protestant</Link>
          <Link href="/library/kjv">KJV + Strong&apos;s</Link>
          <Link href="/library/catholic">Catholic Bible</Link>
          <Link href="/library/orthodox">Orthodox</Link>
          <Link href="/library/oriental-orthodox">Oriental Orthodox</Link>
          <Link href="/library/catechism">Catechism</Link>
          <Link href="/library/fathers">Fathers</Link>
          <Link href="/library/councils">Councils</Link>
          <Link href="/library/history">History</Link>
          <Link href="/library/prayer-forum">Prayer Forum</Link>
          <Link href="/library/settings">Settings</Link>
          <Link href="/library/notes">Notes</Link>
        </nav>
        <div className="hidden md:block">
          <AuthControls />
        </div>
      </div>
    </header>
  );
}
