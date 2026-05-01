import Link from "next/link";

const items = [
  { href: "/", icon: "⌂", label: "Home" },
  { href: "/library", icon: "⏕", label: "Search" },
  { href: "/library/notes", icon: "▇", label: "Bookmarks" },
  { href: "/library/settings", icon: "⚙", label: "Settings" },
];

export default function MobileBottomNav({ active = "Home" }: { active?: string }) {
  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`mobile-bottom-nav__item ${
            active === item.label ? "mobile-bottom-nav__item--active" : ""
          }`}
        >
          <span className="mobile-bottom-nav__icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
