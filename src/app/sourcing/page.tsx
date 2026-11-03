"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Search,
  Check,
  Phone,
  MapPin,
  Star,
  Globe,
  Download,
  Copy,
  Eye,
  ArrowRight,
  X,
  FileJson,
  Radar,
  Loader2,
  Plus,
  Key,
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

  // Scanner Google Maps live state
  const [isScanning, setIsScanning] = useState(false);
  const [scanCity, setScanCity] = useState("Cotonou");
  const [scanSector, setScanSector] = useState("Restaurants");
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [scanSuccessMessage, setScanSuccessMessage] = useState<string | null>(null);

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
    const savedKey = localStorage.getItem("agency_os_gplaces_key") || "";
    setGoogleApiKey(savedKey);

    const onDataChange = () => setBusinesses(loadStoredBusinesses());
    window.addEventListener("agency-os-data-change", onDataChange);
    return () => window.removeEventListener("agency-os-data-change", onDataChange);
  }, []);

  const handleSaveApiKey = (key: string) => {
    setGoogleApiKey(key);
    localStorage.setItem("agency_os_gplaces_key", key);
  };

  // Launch Live Google Maps Scan
  const handleLaunchGoogleMapsScan = async () => {
    setIsScanning(true);
    setScanSuccessMessage(null);

    try {
      const res = await fetch("/api/scan-places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: scanCity === "Toutes les villes" ? "Cotonou" : scanCity,
          sector: scanSector === "Tous" ? "Restaurants" : scanSector,
          apiKey: googleApiKey || undefined,
        }),
      });

      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        // Merge without duplicates by slug
        const current = loadStoredBusinesses();
        const existingSlugs = new Set(current.map((b) => b.slug));
        const newItems: BusinessItem[] = [];

        data.results.forEach((item: BusinessItem) => {
          if (!existingSlugs.has(item.slug)) {
            newItems.push(item);
            existingSlugs.add(item.slug);
          }
        });

        const updated = [...newItems, ...current];
        saveBusinesses(updated);
        setBusinesses(updated);

        setScanSuccessMessage(
          `${newItems.length} nouveaux commerces sans site web détectés et importés depuis Google Maps (${data.source === "google_places_live_api" ? "API Live" : "Moteur Local"}).`
        );
        setTimeout(() => setScanSuccessMessage(null), 5000);
      }
    } catch (e: any) {
      console.error("Erreur scan", e);
    } finally {
      setIsScanning(false);
    }
  };

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
    <div className="space-y-6 pb-16">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-primary tracking-tight">
            Scanner Sourcing Local
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Détection des commerces Google Maps sans site web.
          </p>
        </div>

        <Link
          href="/crm"
          className="flex items-center gap-2 bg-white hover:bg-sand-100 border border-sand-300 text-forest-900 px-4 py-2 rounded-xl text-xs font-bold transition-colors self-start md:self-auto"
        >
          <span>Pipeline CRM</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* SCANNER GOOGLE MAPS ACTIF EN DIRECT */}
      <div className="bg-white rounded-2xl p-5 border border-sand-300 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sand-200">
          <div className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-forest-800" />
            <h2 className="font-display font-bold text-sm text-ink-primary">
              Scanner Google Maps en Direct
            </h2>
          </div>
          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="text-[11px] font-semibold text-ink-muted hover:text-ink-primary flex items-center gap-1 self-start sm:self-auto"
          >
            <Key className="w-3 h-3" />
            <span>{googleApiKey ? "Clé API Google Places active" : "Configurer clé API (optionnel)"}</span>
          </button>
        </div>

        {showApiKeyInput && (
          <div className="p-3 bg-sand-50 rounded-xl border border-sand-200 space-y-2">
            <label className="block text-[11px] font-bold text-ink-muted uppercase">
              Clé Google Places API (Laisse vide pour utiliser le scanner intelligent) :
            </label>
            <input
              type="text"
              placeholder="AIzaSy..."
              value={googleApiKey}
              onChange={(e) => handleSaveApiKey(e.target.value)}
              className="w-full bg-white border border-sand-300 rounded-lg px-3 py-1.5 text-xs text-ink-primary font-mono"
            />
          </div>
        )}

        {/* SCANNER CONTROLS */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-4">
            <label className="block text-[10px] font-bold text-ink-muted uppercase mb-1">
              Ville Cible
            </label>
            <select
              value={scanCity}
              onChange={(e) => setScanCity(e.target.value)}
              className="w-full bg-sand-50 border border-sand-300 rounded-lg px-3 py-2 text-xs font-medium text-ink-primary"
            >
              <option value="Cotonou">Cotonou (Bénin)</option>
              <option value="Abidjan">Abidjan (Côte d'Ivoire)</option>
              <option value="Douala">Douala (Cameroun)</option>
              <option value="Dakar">Dakar (Sénégal)</option>
              <option value="Lomé">Lomé (Togo)</option>
            </select>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[10px] font-bold text-ink-muted uppercase mb-1">
              Secteur d'Activité
            </label>
            <select
              value={scanSector}
              onChange={(e) => setScanSector(e.target.value)}
              className="w-full bg-sand-50 border border-sand-300 rounded-lg px-3 py-2 text-xs font-medium text-ink-primary"
            >
              <option value="Restaurants">Restaurants & Grillades</option>
              <option value="Salons de coiffure">Salons de coiffure & Beauté</option>
              <option value="Instituts">Instituts & Spas</option>
              <option value="Cliniques">Cliniques Dentaires & Médicales</option>
              <option value="Boutiques">Boutiques & Mode</option>
            </select>
          </div>

          <div className="sm:col-span-4 pt-1 sm:pt-5">
            <button
              onClick={handleLaunchGoogleMapsScan}
              disabled={isScanning}
              className="w-full py-2 px-4 rounded-lg bg-forest-900 hover:bg-forest-800 disabled:bg-sand-300 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Scan en cours...</span>
                </>
              ) : (
                <>
                  <Radar className="w-3.5 h-3.5 text-lime-400" />
                  <span>Lancer le scan Google Maps</span>
                </>
              )}
            </button>
          </div>
        </div>

        {scanSuccessMessage && (
          <div className="p-2.5 rounded-lg bg-sand-100 border border-sand-300 text-xs font-semibold text-forest-900 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-forest-700" />
            <span>{scanSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-2xl p-5 border border-sand-300 space-y-4">
        
        {/* SECTORS */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-ink-muted uppercase mr-1">
            Secteur :
          </span>
          {SECTORS.map((sector) => {
            const isSelected = selectedSector === sector;
            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                  isSelected
                    ? "bg-forest-900 text-lime-300"
                    : "bg-sand-100 hover:bg-sand-200 text-ink-secondary"
                )}
              >
                {sector}
              </button>
            );
          })}
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-3 border-t border-sand-200">
          
          <div className="md:col-span-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-sand-50 border border-sand-300 rounded-lg px-3 py-1.5 text-xs font-medium text-ink-primary"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-5 relative">
            <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrer par nom ou quartier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-sand-50 border border-sand-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-ink-primary"
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-start md:justify-end">
            <label className="flex items-center gap-2 cursor-pointer bg-sand-50 px-3 py-1.5 rounded-lg border border-sand-300">
              <input
                type="checkbox"
                checked={onlyWithoutWebsite}
                onChange={(e) => setOnlyWithoutWebsite(e.target.checked)}
                className="w-3.5 h-3.5 text-forest-700 rounded"
              />
              <span className="text-xs font-bold text-forest-900 select-none">
                Sans site web uniquement
              </span>
            </label>
          </div>

        </div>

        <div className="flex items-center justify-between text-xs text-ink-muted pt-2 border-t border-sand-200">
          <span>{filtered.length} opportunités identifiées</span>
          <span className="font-semibold text-forest-800">Offre standard : 30 000 FCFA</span>
        </div>

      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((biz) => {
          const isInitialized = biz.crmStatus !== "prospect_detecte";

          return (
            <div
              key={biz.id}
              className="bg-white rounded-2xl border border-sand-300 overflow-hidden flex flex-col justify-between"
            >
              
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-sand-100 font-semibold text-ink-secondary text-[11px]">
                    {biz.sector}
                  </span>
                  
                  <span className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{biz.googleRating}</span>
                    <span className="font-normal text-ink-muted">({biz.reviewCount})</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-ink-primary">
                    {biz.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-ink-muted mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span>{biz.neighborhood}, {biz.city}</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-ink-secondary">
                  <p className="line-clamp-1">{biz.address}</p>
                  <p className="font-mono font-medium text-forest-900">{biz.phone}</p>
                </div>

                {/* 4 PHOTOS THUMBNAILS */}
                <div>
                  <div className="grid grid-cols-4 gap-1.5 mt-2">
                    {biz.photos.map((photo, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          setActivePhotoModal({
                            businessName: biz.name,
                            photoUrl: photo,
                          })
                        }
                        className="h-12 rounded-lg overflow-hidden cursor-pointer border border-sand-200"
                      >
                        <img
                          src={photo}
                          alt={`${biz.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* CARD FOOTER */}
              <div className="p-3 bg-sand-50 border-t border-sand-200 space-y-2">
                <button
                  onClick={() => handleCreateAntigravityProject(biz)}
                  className={cn(
                    "w-full py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors",
                    isInitialized
                      ? "bg-forest-100 hover:bg-forest-200 text-forest-900 border border-forest-300"
                      : "bg-forest-900 hover:bg-forest-800 text-white"
                  )}
                >
                  <Plus className="w-3.5 h-3.5 text-lime-400" />
                  <span>
                    {isInitialized
                      ? "Projet initialisé (Exporter JSON)"
                      : "Créer le projet Antigravity"}
                  </span>
                </button>

                <div className="flex items-center justify-between text-[11px] pt-0.5">
                  <a
                    href={`${biz.demoUrl}?demo=true`}
                    target="_blank"
                    className="text-forest-800 font-bold hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Aperçu démo</span>
                  </a>

                  <Link
                    href={`/crm/${biz.id}`}
                    className="text-ink-secondary hover:text-ink-primary font-medium flex items-center gap-0.5"
                  >
                    <span>Fiche</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* MODAL EXPORT JSON */}
      {activeJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-sand-300 space-y-4 max-h-[85vh] flex flex-col relative">
            <button
              onClick={() => setActiveJsonModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-ink-muted hover:text-ink-primary"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="font-display text-lg font-bold text-ink-primary">
                data-{activeJsonModal.business.slug}.json
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Données prêtes pour génération de vitrine Antigravity.
              </p>
            </div>

            <div className="flex-1 overflow-auto bg-slate-950 text-slate-200 rounded-xl p-3 font-mono text-xs border border-slate-800">
              <pre>{JSON.stringify(activeJsonModal.json, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sand-300 text-xs font-semibold text-ink-primary"
              >
                {activeJsonModal.copied ? (
                  <>
                    <Check className="w-3 h-3 text-forest-700" />
                    <span>Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copier JSON</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleDownloadJson(activeJsonModal.business, activeJsonModal.json)
                  }
                  className="bg-forest-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3 text-lime-400" />
                  <span>Télécharger</span>
                </button>

                <Link
                  href="/crm"
                  className="bg-lime-300 text-forest-950 px-3.5 py-1.5 rounded-lg text-xs font-bold"
                >
                  Aller au CRM
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black rounded-2xl overflow-hidden max-w-2xl w-full border border-white/20 relative"
          >
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={activePhotoModal.photoUrl}
              alt={activePhotoModal.businessName}
              className="w-full max-h-[70vh] object-cover"
            />
          </div>
        </div>
      )}

    </div>
  );
}
