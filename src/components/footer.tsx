import Link from "next/link";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-sand-300/80 bg-white/70 py-10 mt-16 text-xs text-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-forest-900 flex items-center justify-center text-lime-400 font-bold text-xs">
            OS
          </div>
          <div>
            <p className="font-semibold text-ink-primary">Agency OS — Google AntiGravity Edition</p>
            <p className="text-[11px]">Conçu pour le closing de vitrines locales en Afrique francophone (30 000 FCFA & 5 000 FCFA/mois).</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px]">
          <span className="flex items-center gap-1.5 text-forest-800 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-600" />
            100% Anti-Slop Certifié
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Télémétrie Démo temps réel
          </span>
          <span>Prêt pour Vercel 1-Clic</span>
        </div>
      </div>
    </footer>
  );
}

