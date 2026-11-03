"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  KanbanSquare,
  Search,
  Filter,
  Eye,
  Send,
  PhoneCall,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MoreVertical,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Coins,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { BusinessItem, PipelineStage } from "@/types";
import { PIPELINE_COLUMNS } from "@/lib/mock-data";
import {
  loadStoredBusinesses,
  saveBusinesses,
  buildWhatsAppPitch,
} from "@/lib/crm-store";
import { cn, formatFCFA, formatTimeAgo } from "@/lib/utils";

export default function CrmKanbanPage() {
  const [businesses, setBusinesses] = useState<BusinessItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("Tous");
  const [draggedBizId, setDraggedBizId] = useState<string | null>(null);
  const [telemetryAlert, setTelemetryAlert] = useState<string | null>(null);

  useEffect(() => {
    setBusinesses(loadStoredBusinesses());
    const onDataChange = () => setBusinesses(loadStoredBusinesses());
    window.addEventListener("agency-os-data-change", onDataChange);

    // Polling interval to refresh relative times and server telemetry events
    const timer = setInterval(() => {
      setBusinesses(loadStoredBusinesses());
    }, 15000);

    return () => {
      window.removeEventListener("agency-os-data-change", onDataChange);
      clearInterval(timer);
    };
  }, []);

  const handleStageChange = (bizId: string, newStage: PipelineStage) => {
    const updated = businesses.map((b) => {
      if (b.id === bizId) {
        return {
          ...b,
          crmStatus: newStage,
          lastInteraction: new Date().toISOString(),
        };
      }
      return b;
    });

    saveBusinesses(updated);
    setBusinesses(updated);

    if (newStage === "vente_validee") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#BEFA3C", "#08291A", "#D4AF37", "#25D366"],
      });
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedBizId(id);
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    const id = draggedBizId || e.dataTransfer.getData("text/plain");
    if (id) {
      handleStageChange(id, targetStage);
      setDraggedBizId(null);
    }
  };

  // Test Simulation helper: simulate a prospect opening the demo right now
  const handleSimulateTelemetry = (slug: string) => {
    const target = businesses.find((b) => b.slug === slug) || businesses[0];
    if (!target) return;

    const now = new Date().toISOString();
    const updated = businesses.map((b) => {
      if (b.id === target.id) {
        return {
          ...b,
          demoLastViewed: now,
          demoViewCount: (b.demoViewCount || 0) + 1,
          crmStatus:
            b.crmStatus === "prospect_detecte"
              ? ("demo_en_ligne" as const)
              : b.crmStatus,
        };
      }
      return b;
    });

    saveBusinesses(updated);
    setBusinesses(updated);
    setTelemetryAlert(
      `Le prospect "${target.name}" vient d'ouvrir sa démo (${target.slug}) !`
    );
    setTimeout(() => setTelemetryAlert(null), 6000);
  };

  // Filter list
  const filtered = businesses.filter((b) => {
    if (sectorFilter !== "Tous" && b.sector !== sectorFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.neighborhood.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const wonCount = businesses.filter((b) => b.crmStatus === "vente_validee").length;
  const inPipelineCount = businesses.filter(
    (b) => b.crmStatus !== "vente_validee" && b.crmStatus !== "perdu_refuse"
  ).length;

  return (
    <div className="space-y-6 pb-16">
      
      {/* BANNER NOTIFICATION SI TÉLÉMÉTRIE REÇUE */}
      {telemetryAlert && (
        <div className="bg-forest-900 text-white border-2 border-lime-400 p-4 rounded-2xl flex items-center justify-between shadow-glow animate-bounce">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-lime-400 animate-ping"></span>
            <span className="font-bold text-sm text-lime-300">
              👁️ Télémétrie Démo Détectée en Temps Réel :
            </span>
            <span className="text-xs text-white">{telemetryAlert}</span>
          </div>
          <button
            onClick={() => setTelemetryAlert(null)}
            className="text-xs text-forest-300 hover:text-white"
          >
            Fermer
          </button>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 border border-forest-200 text-forest-800 text-xs font-semibold mb-2">
            <KanbanSquare className="w-3.5 h-3.5 text-forest-700" />
            <span>Module CRM & Pipeline Commercial (7 Étapes)</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
            Pipeline des Ventes Locales
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1 max-w-2xl">
            Glissez-déposez les cartes d'une colonne à l'autre. Dès qu'un prospect clique sur le lien avec <code>?demo=true</code>, le badge <strong>"👁️ Consulté"</strong> s'allume instantanément.
          </p>
        </div>

        {/* METRICS & SIMULATION BUTTONS */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-2xl border border-sand-300 shadow-sm text-xs">
            <span className="text-ink-muted block text-[10px] uppercase font-bold">
              Cash Ventes Validées
            </span>
            <span className="font-display font-bold text-base text-forest-800">
              {formatFCFA(wonCount * 30000)}
            </span>
          </div>

          <div className="bg-white px-4 py-2 rounded-2xl border border-sand-300 shadow-sm text-xs">
            <span className="text-ink-muted block text-[10px] uppercase font-bold">
              En cours de closing
            </span>
            <span className="font-display font-bold text-base text-ink-primary">
              {inPipelineCount} deals
            </span>
          </div>

          {/* Simulate Telemetry Button for Live Testing */}
          <button
            onClick={() => handleSimulateTelemetry("le-braise-d-or")}
            className="flex items-center gap-2 bg-lime-300 hover:bg-lime-400 text-forest-950 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition-all active:scale-95"
            title="Simule la visite d'un gérant qui clique sur son lien démo ?demo=true"
          >
            <Eye className="w-3.5 h-3.5 text-forest-900 animate-pulse" />
            <span>Simuler Visite Démo 👁️</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH STRIP */}
      <div className="bg-white p-4 rounded-2xl border border-sand-300/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="w-full sm:w-80 relative">
          <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un prospect ou quartier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-sand-50 border border-sand-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-ink-primary focus:outline-none focus:ring-2 focus:ring-forest-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-ink-muted uppercase">Filtrer :</span>
          {["Tous", "Restaurants", "Salons de coiffure", "Cliniques"].map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
                sectorFilter === sec
                  ? "bg-forest-900 text-lime-300"
                  : "bg-sand-100 hover:bg-sand-200 text-ink-secondary"
              )}
            >
              {sec}
            </button>
          ))}
        </div>

      </div>

      {/* KANBAN BOARD WITH 7 COLUMNS (HORIZONTAL SCROLL) */}
      <div className="overflow-x-auto pb-6 pt-2">
        <div className="flex gap-4 min-w-[1720px] items-start">
          
          {PIPELINE_COLUMNS.map((col) => {
            const columnBusinesses = filtered.filter((b) => b.crmStatus === col.id);
            const totalStageValue = columnBusinesses.length * 30000;

            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
                className="w-64 shrink-0 bg-sand-100/70 border border-sand-300/80 rounded-3xl p-3.5 space-y-3 min-h-[580px] flex flex-col justify-between transition-colors hover:border-forest-400/50"
              >
                
                {/* COLUMN HEADER */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-sand-300/60">
                    <div className="flex items-center gap-2">
                      <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", col.dotColor)} />
                      <h3 className="font-display font-bold text-xs text-ink-primary line-clamp-1">
                        {col.title}
                      </h3>
                    </div>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-white border border-sand-300 text-forest-900">
                      {columnBusinesses.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-ink-muted pt-1.5 px-0.5">
                    <span>Valeur potentielle</span>
                    <span className="font-semibold text-forest-800">
                      {formatFCFA(totalStageValue)}
                    </span>
                  </div>

                  {/* CARDS LIST IN COLUMN */}
                  <div className="mt-3 space-y-3">
                    {columnBusinesses.map((biz) => {
                      const { url: waUrl } = buildWhatsAppPitch(biz);

                      return (
                        <div
                          key={biz.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, biz.id)}
                          className={cn(
                            "bg-white rounded-2xl p-4 border border-sand-300 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all duration-200 space-y-3 group",
                            biz.crmStatus === "vente_validee" && "border-lime-400 bg-lime-50/30"
                          )}
                        >
                          
                          {/* TOP CARD: SECTOR & RATING */}
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="px-2 py-0.5 rounded-full bg-sand-100 font-semibold text-ink-secondary">
                              {biz.sector}
                            </span>
                            <span className="font-bold text-amber-600 flex items-center gap-0.5">
                              ★ {biz.googleRating}
                            </span>
                          </div>

                          {/* NAME & LOCATION */}
                          <div>
                            <Link
                              href={`/crm/${biz.id}`}
                              className="font-display font-bold text-sm text-ink-primary hover:text-forest-700 transition-colors block line-clamp-1"
                            >
                              {biz.name}
                            </Link>
                            <span className="text-[11px] text-ink-muted block line-clamp-1">
                              📍 {biz.neighborhood}, {biz.city}
                            </span>
                          </div>

                          {/* DEAL VALUE */}
                          <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-sand-200">
                            <span className="text-[10px] text-ink-muted font-normal">Offre site :</span>
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded-md",
                                biz.crmStatus === "vente_validee"
                                  ? "bg-lime-300 text-forest-950 font-extrabold"
                                  : "text-forest-900 bg-forest-50"
                              )}
                            >
                              30 000 FCFA
                            </span>
                          </div>

                          {/* REAL-TIME TELEMETRY BADGE IF VIEWED */}
                          {biz.demoLastViewed ? (
                            <div className="px-2.5 py-1.5 rounded-xl bg-forest-900 text-white text-[10px] flex items-center justify-between shadow-sm">
                              <span className="flex items-center gap-1.5 text-lime-400 font-bold">
                                <span className="w-2 h-2 rounded-full bg-lime-400 animate-live-pulse" />
                                👁️ Vu {formatTimeAgo(biz.demoLastViewed)}
                              </span>
                              <span className="text-forest-300 font-mono">
                                {biz.demoViewCount} {biz.demoViewCount > 1 ? "vues" : "vue"}
                              </span>
                            </div>
                          ) : (
                            <div className="text-[10px] text-ink-muted flex items-center gap-1">
                              <Clock className="w-3 h-3 text-sand-300" />
                              <span>Pas encore ouvert</span>
                            </div>
                          )}

                          {/* QUICK ACTIONS ON CARD */}
                          <div className="pt-2 border-t border-sand-200 flex items-center justify-between gap-1 text-[11px]">
                            
                            {/* WhatsApp Direct link */}
                            <a
                              href={waUrl}
                              target="_blank"
                              onClick={() => handleStageChange(biz.id, "whatsapp_envoye")}
                              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
                              title="Envoyer le pitch sur WhatsApp"
                            >
                              <Send className="w-3.5 h-3.5 text-[#25D366]" />
                            </a>

                            {/* Demo URL link */}
                            <a
                              href={`${biz.demoUrl}?demo=true`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-ink-primary transition-colors"
                              title="Ouvrir la démo client"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            {/* Fiche Prospection */}
                            <Link
                              href={`/crm/${biz.id}`}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-forest-900 hover:bg-forest-800 text-white font-bold text-[10px] transition-all ml-auto"
                            >
                              <span>Prospection</span>
                              <ChevronRight className="w-3 h-3 text-lime-400" />
                            </Link>

                          </div>

                          {/* FAST STAGE SELECTOR ON CARD */}
                          <div className="pt-1">
                            <select
                              value={biz.crmStatus}
                              onChange={(e) =>
                                handleStageChange(biz.id, e.target.value as PipelineStage)
                              }
                              className="w-full bg-sand-50 border border-sand-200 text-[10px] rounded-lg px-2 py-1 text-ink-secondary focus:outline-none"
                            >
                              {PIPELINE_COLUMNS.map((c) => (
                                <option key={c.id} value={c.id}>
                                  ➔ {c.title}
                                </option>
                              ))}
                            </select>
                          </div>

                        </div>
                      );
                    })}

                    {columnBusinesses.length === 0 && (
                      <div className="border border-dashed border-sand-300 rounded-2xl p-6 text-center text-xs text-ink-muted">
                        Glissez une carte ici
                      </div>
                    )}
                  </div>
                </div>

                {/* COLUMN FOOTER HINT */}
                <div className="text-[10px] text-ink-muted text-center pt-2 border-t border-sand-300/40">
                  Déposez un prospect
                </div>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}
