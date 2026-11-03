"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  KanbanSquare, 
  Coins, 
  Globe2, 
  Plus,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/sourcing", label: "Sourcing Local", icon: Compass },
    { href: "/crm", label: "Pipeline CRM", icon: KanbanSquare },
    { href: "/finances", label: "Finances & MRR", icon: Coins },
    { href: "/sites", label: "Démos en Ligne", icon: Globe2 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8F9F5] border-b border-sand-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-forest-900 flex items-center justify-center text-lime-400">
            <svg
              className="w-5 h-5 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeOpacity="0.9" />
              <circle cx="15" cy="9" r="6" stroke="currentColor" strokeOpacity="0.9" />
              <circle cx="12" cy="15" r="6" stroke="currentColor" strokeOpacity="0.9" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-ink-primary tracking-tight">
                Agency <span className="text-forest-700">OS</span>
              </span>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-lime-200 text-forest-900 border border-lime-400">
                PRO
              </span>
            </div>
          </div>
        </Link>

        {/* NAVIGATION PILLS */}
        <nav className="hidden md:flex items-center gap-1 bg-white p-1 rounded-full border border-sand-300">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-forest-900 text-lime-300"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-sand-100"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-lime-400" : "text-ink-muted")} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* RIGHT WIDGETS */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sand-300 text-[11px] font-medium text-forest-900">
            <span className="w-2 h-2 rounded-full bg-forest-600"></span>
            <span>Télémétrie active</span>
          </div>

          <Link
            href="/sourcing"
            className="flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-white px-3.5 py-2 rounded-full text-xs font-bold transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-lime-400" />
            <span className="hidden sm:inline">Scanner Commerces</span>
            <span className="sm:hidden">Sourcing</span>
          </Link>
        </div>

      </div>

      {/* MOBILE NAV BOTTOM STRIP */}
      <div className="md:hidden flex items-center justify-around border-t border-sand-300 bg-white px-2 py-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold",
                isActive ? "text-forest-900 font-bold" : "text-ink-muted"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
