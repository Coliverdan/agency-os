"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  KanbanSquare, 
  Coins, 
  Globe2, 
  Sparkles,
  Layers,
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
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-sand-300/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO & BRANDING */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-2xl bg-forest-900 border border-forest-700/60 flex items-center justify-center text-lime-400 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg
              className="w-6 h-6 fill-none stroke-current"
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
              <span className="font-display font-extrabold text-xl text-ink-primary tracking-tight">
                Agency <span className="text-forest-700">OS</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-lime-200 text-forest-900 border border-lime-400">
                PRO
              </span>
            </div>
            <span className="text-xs text-ink-muted hidden sm:block">
              Machine de Vente & Démos 30 000 FCFA
            </span>
          </div>
        </Link>

        {/* NAVIGATION PILLS */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-sand-300/70 shadow-sm">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200",
                  isActive
                    ? "bg-forest-900 text-lime-300 shadow-sm"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-forest-50"
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
          {/* Telemetry pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200/80 text-[11px] font-medium text-forest-900">
            <span className="w-2 h-2 rounded-full bg-lime-500 animate-live-pulse"></span>
            <span>Télémétrie Démo active</span>
          </div>

          <Link
            href="/sourcing"
            className="flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-white px-4 py-2.5 rounded-full text-xs font-bold tracking-tight shadow-sm hover:shadow transition-all duration-200 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span className="hidden sm:inline">Scanner Commerces</span>
            <span className="sm:hidden">Sourcing</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-lime-400" />
          </Link>
        </div>

      </div>

      {/* MOBILE NAV BOTTOM STRIP */}
      <div className="md:hidden flex items-center justify-around border-t border-sand-300/60 bg-white/95 px-2 py-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-semibold transition-all",
                isActive ? "text-forest-900 font-bold" : "text-ink-muted hover:text-ink-primary"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-forest-700" : "text-ink-muted")} />
              <span>{link.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
