"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Filter,
  Search,
  CheckCircle2,
  Sparkles,
  Phone,
  MapPin,
  Star,
  Globe,
  Download,
  Copy,
  Check,
  Eye,
  ExternalLink,
  Layers,
  ArrowRight,
  X,
  FileJson,
} from "lucide-react";
import { SectorType, BusinessItem } from "@/types";
import { loadStoredBusinesses, saveBusinesses, generateAntigravityJson } from "@/lib/crm-store";
import { cn } from "@/lib/utils";

const SECTORS: (SectorType | "Tous")[] = [
  "Tous",
  "Restaurants",
  "Salons de coiffure",
  "Instituts",
  "Cliniques",
  "Boutiques",
];

const CITIES = [
  "Toutes les villes",
  "Cotonou",
  "Abidjan",
  "Douala",
  "Dakar",
  "Lomé",
];

export default function SourcingPage() {
  const [businesses, setBusinesses] = useState<BusinessItem[]>([]);
  const [selectedSector, setSelectedSector] = useState<SectorType | "Tous">("Tous");
  const [selectedCity, setSelectedCity] = useState("Toutes les villes");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyWithoutWebsite, setOnlyWithoutWebsite] = useState(true);

  // Modal JSON generated
  const [activeJsonModal, setActiveJsonModal] = useState<{
    business: BusinessItem;
    json: any;
    copied: boolean;
  } | null>(null);

  // Lightbox modal for photos
  const [activePhotoModal, setActivePhotoModal] = useState<{
    businessName: string;
    photoUrl: string;
  } | null>(null);

  useEffect(() => {
    setBusinesses(loadStoredBusinesses());
    const onDataChange = () => setBusinesses(loadStoredBusinesses());
    window.addEventListener("agency-os-data-change", onDataChange);
    return () => window.removeEventListener("agency-os-data-change", onDataChange);
  }, []);

  // Filter logic
  const filtered = businesses.filter((biz) => {
    if (onlyWithoutWebsite && biz.website !== null) return false;
    if (selectedSector !== "Tous" && biz.sector !== selectedSector) return false;
    if (selectedCity !== "Toutes les villes" && biz.city !== selectedCity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = biz.name.toLowerCase().includes(q);
      const matchAddress = biz.address.toLowerCase().includes(q);
      const matchCity = biz.city.toLowerCase().includes(q);
      const matchNeighborhood = biz.neighborhood.toLowerCase().includes(q);
      if (!matchName && !matchAddress && !matchCity && !matchNeighborhood) return false;
    }
    return true;
  });

  const handleCreateAntigravityProject = (biz: BusinessItem) => {
    const updated = businesses.map((b) => {
      if (b.id === biz.id) {
        return {
          ...b,
          crmStatus:
            b.crmStatus === "prospect_detecte"
              ? ("projet_initialise" as const)
              : b.crmStatus,
          lastInteraction: new Date().toISOString(),
        };
      }
      return b;
    });

    saveBusinesses(updated);
    setBusinesses(updated);

    const json = generateAntigravityJson(biz);
    setActiveJsonModal({
      business: biz,
      json,
      copied: false,
    });
  };

  const handleDownloadJson = (biz: BusinessItem, json: any) => {
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-${biz.slug}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 border border-forest-200 text-forest-800 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-forest-700" />
            <span>Module Sourcing Local & Détection d'Opportunités</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
            Scanner de Commerces Locaux
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1 max-w-2xl">
            Ciblez les commerces francophones à fort pouvoir d'achat (Google ≥ 4.5) n'ayant <strong>aucun site internet</strong>. Cliquez sur "Créer le projet Antigravity" pour initialiser le projet et exporter le JSON prêt à coder.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/crm"
            className="flex items-center gap-2 bg-white hover:bg-forest-50 border border-sand-300 text-forest-900 px-4 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all"
          >
            <span>Voir le Pipeline CRM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white rounded-3xl p-6 border border-sand-300/80 shadow-soft space-y-5">
        
        {/* TOP ROW: SECTOR TABS */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-ink-muted uppercase tracking-wider mr-2">
            Secteur :
          </span>
          {SECTORS.map((sector) => {
            const isSelected = selectedSector === sector;
            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
                  isSelected
                    ? "bg-forest-900 text-lime-400 shadow-sm"
                    : "bg-sand-100 hover:bg-sand-200 text-ink-secondary"
                )}
              >
                {sector}
              </button>
            );
          })}
        </div>

        {/* BOTTOM ROW: CITY, SEARCH, AND MANDATORY NO-WEBSITE TOGGLE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-3 border-t border-sand-200">
          
          {/* City select */}
          <div className="md:col-span-3">
            <label className="block text-[11px] font-bold text-ink-muted uppercase mb-1">
              Ville & Quartier
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs font-medium text-ink-primary focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Text Search */}
          <div className="md:col-span-5 relative">
            <label className="block text-[11px] font-bold text-ink-muted uppercase mb-1">
              Rechercher par nom ou adresse
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ex: Le Braisé, Cocody, Haie Vive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-sand-50 border border-sand-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-ink-primary focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>

          {/* Mandatory Toggle: Without website */}
          <div className="md:col-span-4 flex items-center justify-start md:justify-end pt-2 md:pt-4">
            <label className="flex items-center gap-2.5 cursor-pointer bg-forest-50 px-3.5 py-2 rounded-2xl border border-forest-200">
              <input
                type="checkbox"
                checked={onlyWithoutWebsite}
                onChange={(e) => setOnlyWithoutWebsite(e.target.checked)}
                className="w-4 h-4 text-forest-700 rounded focus:ring-forest-500"
              />
              <span className="text-xs font-bold text-forest-900 select-none">
                🔒 Sans site web uniquement (100% Opportunités)
              </span>
            </label>
          </div>

        </div>

        {/* RESULTS STATS BAR */}
        <div className="flex items-center justify-between text-xs text-ink-muted pt-2 border-t border-sand-200">
          <span>
            <strong>{filtered.length}</strong> commerces trouvés répondant aux critères d'or (Note ≥ 4.5, sans site web)
          </span>
          <span className="text-forest-700 font-semibold">
            Panier moyen par closing : 30 000 FCFA
          </span>
        </div>

      </div>

      {/* BUSINESSES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((biz) => {
          const isInitialized = biz.crmStatus !== "prospect_detecte";

          return (
            <div
              key={biz.id}
              className="bg-white rounded-3xl border border-sand-300/80 shadow-soft hover:shadow-float transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              
              {/* CARD TOP INFO */}
              <div className="p-6 space-y-4">
                
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sand-100 text-ink-secondary">
                    {biz.sector}
                  </span>
                  
                  <span className="flex items-center gap-1 text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{biz.googleRating}</span>
                    <span className="text-[10px] font-medium text-ink-muted">({biz.reviewCount})</span>
                  </span>
                </div>

                {/* Name & City */}
                <div>
                  <h3 className="font-display font-bold text-xl text-ink-primary group-hover:text-forest-800 transition-colors">
                    {biz.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-ink-muted mt-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                    <span>{biz.neighborhood}, {biz.city}</span>
                  </div>
                </div>

                {/* Status Pill: Website status */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-800 text-[11px] font-semibold">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                  <span>Site web inexistant — Opportunité Maximale</span>
                </div>

                {/* Address & Phone */}
                <div className="text-xs space-y-1.5 text-ink-secondary pt-1">
                  <p className="line-clamp-1">📍 {biz.address}</p>
                  <p className="font-mono font-medium text-forest-800">📞 {biz.phone}</p>
                </div>

                {/* 4 PHOTOS GALLERY THUMBNAILS */}
                <div>
                  <span className="block text-[10px] uppercase font-bold text-ink-muted mb-2 tracking-wider">
                    Galerie 4 Photos de Référence :
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {biz.photos.map((photo, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          setActivePhotoModal({
                            businessName: biz.name,
                            photoUrl: photo,
                          })
                        }
                        className="h-14 rounded-xl overflow-hidden cursor-pointer border border-sand-200 hover:border-forest-500 hover:scale-105 transition-all relative"
                      >
                        <img
                          src={photo}
                          alt={`${biz.name} photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* CARD BOTTOM ACTION FOOTER */}
              <div className="p-4 bg-sand-50/70 border-t border-sand-200 space-y-2">
                
                <button
                  onClick={() => handleCreateAntigravityProject(biz)}
                  className={cn(
                    "w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm",
                    isInitialized
                      ? "bg-forest-100 hover:bg-forest-200 text-forest-900 border border-forest-300"
                      : "bg-forest-900 hover:bg-forest-800 text-white hover:scale-[1.02] active:scale-95"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                  <span>
                    {isInitialized
                      ? "✅ Projet Antigravity Initialisé (Exporter JSON)"
                      : "Créer le projet Antigravity"}
                  </span>
                </button>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <a
                    href={`${biz.demoUrl}?demo=true`}
                    target="_blank"
                    className="text-forest-700 hover:text-forest-900 font-bold flex items-center gap-1 underline"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Aperçu Démo</span>
                  </a>

                  <Link
                    href={`/crm/${biz.id}`}
                    className="text-ink-secondary hover:text-ink-primary font-medium flex items-center gap-0.5"
                  >
                    <span>Fiche Prospection</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL EXPORT JSON ANTIGRAVITY PRÊT À L'EMPLOI */}
      {activeJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-sand-300 relative space-y-6 max-h-[90vh] flex flex-col">
            
            <button
              onClick={() => setActiveJsonModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-sand-100 text-ink-muted hover:text-ink-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold mb-2">
                <FileJson className="w-3.5 h-3.5 text-forest-700" />
                <span>Projet Antigravity Généré avec Succès !</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink-primary">
                data-{activeJsonModal.business.slug}.json
              </h3>
              <p className="text-xs text-ink-secondary mt-1">
                Ce fichier JSON structuré contient l'intégralité des données du commerce ({activeJsonModal.business.name}) pour générer la vitrine ultra-haute conversion en quelques secondes.
              </p>
            </div>

            {/* Code preview */}
            <div className="flex-1 overflow-auto bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-xs border border-slate-800">
              <pre>{JSON.stringify(activeJsonModal.json, null, 2)}</pre>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(activeJsonModal.json, null, 2)
                  );
                  setActiveJsonModal({ ...activeJsonModal, copied: true });
                  setTimeout(() => {
                    setActiveJsonModal((prev) => (prev ? { ...prev, copied: false } : null));
                  }, 2500);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-sand-300 hover:bg-sand-50 text-ink-primary text-xs font-semibold transition-all"
              >
                {activeJsonModal.copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-forest-600" />
                    <span>JSON Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier le JSON</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleDownloadJson(activeJsonModal.business, activeJsonModal.json)
                  }
                  className="bg-forest-900 hover:bg-forest-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-lime-400" />
                  <span>Télécharger data-{activeJsonModal.business.slug}.json</span>
                </button>

                <Link
                  href="/crm"
                  className="bg-lime-300 hover:bg-lime-400 text-forest-950 px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  Accéder au Kanban CRM
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR PHOTOS */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black rounded-3xl overflow-hidden max-w-3xl w-full border border-white/20 shadow-2xl relative"
          >
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhotoModal.photoUrl}
              alt={activePhotoModal.businessName}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="p-4 bg-zinc-900 text-white text-xs flex justify-between items-center">
              <span className="font-bold">{activePhotoModal.businessName}</span>
              <span className="text-zinc-400">Photo d'illustration certifiée Google Local</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

