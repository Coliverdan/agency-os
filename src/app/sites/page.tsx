"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe2,
  Smartphone,
  Monitor,
  ExternalLink,
  ShieldCheck,
  Eye,
  Sparkles,
  ArrowRight,
  Code2,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_SITES = [
  {
    slug: "le-chablis",
    name: "Le Châblis",
    sector: "Table Française & Bar à Vins",
    location: "Cadjèhoun / Patte d'Oie, Cotonou (Bénin)",
    font: "Cormorant Garamond + Plus Jakarta Sans",
    palette: "Noir Sombre #0B0F17 + Laiton Or #D4AF37",
    url: "/sites/le-chablis/index.html",
  },
  {
    slug: "le-braise-d-or",
    name: "Le Braisé d'Or",
    sector: "Restaurant Gastronomique",
    location: "Haie Vive, Cotonou (Bénin)",
    font: "Playfair Display + Plus Jakarta Sans",
    palette: "Sombre Feutré #0F1319 + Or Foncé",
    url: "/sites/le-braise-d-or/index.html",
  },
  {
    slug: "institut-ebene-prestige",
    name: "Institut Ébène Prestige",
    sector: "Salon de Coiffure & Spa",
    location: "Cocody Ambassades, Abidjan (Côte d'Ivoire)",
    font: "Cormorant Garamond + DM Sans",
    palette: "Noir Luxueux #0D0E12 + Champagne",
    url: "/sites/institut-ebene-prestige/index.html",
  },
  {
    slug: "clinique-sourire-plus",
    name: "Clinique Sourire Plus",
    sector: "Clinique Dentaire & Esthétique",
    location: "Bonanjo, Douala (Cameroun)",
    font: "Outfit + Plus Jakarta Sans",
    palette: "Bleu Médical Nuit #0B131F + Cyan Laser",
    url: "/sites/clinique-sourire-plus/index.html",
  },
];

export default function SitesHubPage() {
  const [selectedSite, setSelectedSite] = useState(DEMO_SITES[0]);
  const [deviceMode, setDeviceMode] = useState<"mobile" | "desktop">("mobile");
  const [isDemoMode, setIsDemoMode] = useState(true);

  const currentIframeSrc = `${selectedSite.url}?demo=${isDemoMode ? "true" : "false"}`;

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 border border-forest-200 text-forest-800 text-xs font-semibold mb-2">
            <Globe2 className="w-3.5 h-3.5 text-forest-700" />
            <span>Serveur de Démos Statiques Anti-Slop (/public/sites/[slug])</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
            Simulateur & Prévisualisation des Démos
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1 max-w-2xl">
            Testez l'expérience exacte vue par le client. Activez ou désactivez le mode <code>?demo=true</code> pour basculer instantanément entre la maquette avec décompte d'urgence et le site officiel de production.
          </p>
        </div>

        <a
          href={currentIframeSrc}
          target="_blank"
          className="flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all self-start sm:self-auto"
        >
          <span>Ouvrir dans un nouvel onglet</span>
          <ExternalLink className="w-3.5 h-3.5 text-lime-400" />
        </a>
      </div>

      {/* SITES SELECTOR TABS & DEVICE TOGGLE */}
      <div className="bg-white rounded-3xl p-6 border border-sand-300/80 shadow-soft space-y-4">
        
        {/* Row 1: Site Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-ink-muted uppercase mr-1">
              Sélectionnez une démo :
            </span>
            {DEMO_SITES.map((site) => {
              const isSelected = selectedSite.slug === site.slug;
              return (
                <button
                  key={site.slug}
                  onClick={() => setSelectedSite(site)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                    isSelected
                      ? "bg-forest-900 text-lime-300 shadow-sm"
                      : "bg-sand-100 hover:bg-sand-200 text-ink-secondary"
                  )}
                >
                  <span>{site.name}</span>
                  <span className="text-[10px] font-normal opacity-75 hidden sm:inline">
                    ({site.sector.split(" ")[0]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Device and Demo toggles */}
          <div className="flex items-center gap-3">
            
            {/* Demo Mode Toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-forest-50 px-3 py-1.5 rounded-xl border border-forest-200">
              <input
                type="checkbox"
                checked={isDemoMode}
                onChange={(e) => setIsDemoMode(e.target.checked)}
                className="w-4 h-4 text-forest-700 rounded focus:ring-forest-500"
              />
              <span className="text-xs font-bold text-forest-900 select-none">
                {isDemoMode ? "Mode Démo (?demo=true)" : "Mode Prod officiel"}
              </span>
            </label>

            {/* Device Switcher */}
            <div className="flex items-center bg-sand-100 p-1 rounded-xl border border-sand-300">
              <button
                onClick={() => setDeviceMode("mobile")}
                className={cn(
                  "p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all",
                  deviceMode === "mobile"
                    ? "bg-white text-forest-900 shadow-sm"
                    : "text-ink-muted hover:text-ink-primary"
                )}
                title="Format Smartphone (390px)"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>

              <button
                onClick={() => setDeviceMode("desktop")}
                className={cn(
                  "p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all",
                  deviceMode === "desktop"
                    ? "bg-white text-forest-900 shadow-sm"
                    : "text-ink-muted hover:text-ink-primary"
                )}
                title="Format Écran Large (100%)"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
            </div>

          </div>
        </div>

        {/* Selected site meta pill */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted pt-2 border-t border-sand-200">
          <span><strong>Localisation :</strong> {selectedSite.location}</span>
          <span>•</span>
          <span><strong>Typographie Anti-Slop :</strong> {selectedSite.font}</span>
          <span>•</span>
          <span><strong>Palette 60-30-10 :</strong> {selectedSite.palette}</span>
        </div>

      </div>

      {/* IFRAME DEVICE PREVIEW CONTAINER */}
      <div className="flex justify-center items-center py-6">
        
        {deviceMode === "mobile" ? (
          // Mobile Frame Wrapper
          <div className="w-[390px] h-[780px] bg-slate-900 rounded-[50px] p-3.5 shadow-2xl border-[6px] border-slate-800 relative flex flex-col">
            
            {/* Notch / Speaker pill */}
            <div className="w-32 h-5 bg-slate-800 rounded-full mx-auto mb-2 shrink-0"></div>

            {/* Screen */}
            <div className="w-full flex-1 rounded-[38px] overflow-hidden bg-black relative">
              <iframe
                key={currentIframeSrc}
                src={currentIframeSrc}
                title={selectedSite.name}
                className="w-full h-full border-0"
              />
            </div>

            {/* Home indicator bar */}
            <div className="w-28 h-1 bg-slate-600 rounded-full mx-auto mt-2 shrink-0"></div>
          </div>
        ) : (
          // Desktop Frame Wrapper
          <div className="w-full h-[760px] bg-slate-900 rounded-3xl p-3 shadow-2xl border border-slate-800 flex flex-col">
            {/* Browser top chrome */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-950 rounded-t-2xl border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              </div>
              <div className="flex-1 bg-slate-900 rounded-lg px-3 py-1 font-mono text-[11px] text-slate-300 ml-4 border border-slate-800">
                https://agency-os-production.vercel.app{currentIframeSrc}
              </div>
            </div>

            {/* Screen */}
            <div className="w-full flex-1 rounded-b-2xl overflow-hidden bg-black">
              <iframe
                key={currentIframeSrc}
                src={currentIframeSrc}
                title={selectedSite.name}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

