import Link from "next/link";
import { NAV_LINKS } from "@/data/nav";

export function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-[rgba(239,230,210,0.08)] bg-bg/35 px-9 py-5 text-ink backdrop-blur-[18px] backdrop-saturate-150"
    >
      <Link href="#hero" className="font-display text-[22px] tracking-[0.04em]">
        NOVA
        <span className="text-accent">◉</span>
      </Link>

      <ul className="hidden gap-9 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="nova-nav-link font-display text-[12px] uppercase tracking-[0.1em]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="font-display cursor-pointer rounded-full border border-current bg-transparent px-5 py-2.5 text-[12px] uppercase tracking-[0.1em] transition-colors duration-300 hover:bg-ink hover:text-bg"
      >
        Shop — 0
      </button>

      <style>{`
        .nova-nav-link {
          position: relative;
          padding: 6px 0;
        }
        .nova-nav-link::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .nova-nav-link:hover::after { transform: scaleX(1); }
      `}</style>
    </nav>
  );
}
