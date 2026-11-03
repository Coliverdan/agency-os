"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  KanbanSquare,
  Search,
  Eye,
  Send,
  Star,
  ExternalLink,
  ChevronRight,
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
      `Le prospect "${target.name}" vient d'ouvrir sa démo (${target.slug}).`
    );
    setTimeout(() => setTelemetryAlert(null), 5000);
  };

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
      
      {telemetryAlert && (
        <div className="bg-forest-900 text-white border border-lime-400 p-3 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-lime-400" />
            <span className="font-bold text-lime-300">Télémétrie Démo Détectée :</span>
            <span>{telemetryAlert}</span>
          </div>
          <button
            onClick={() => setTelemetryAlert(null)}
            className="text-xs text-forest-300 hover:text-white"
          >
            Fermer
          </button>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-primary tracking-tight">
            Pipeline CRM
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Suivi des prospects, ouverture des démos et encaissements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white px-3.5 py-1.5 rounded-xl border border-sand-300 text-xs">
            <span className="text-ink-muted text-[10px] uppercase font-bold block">
              Ventes validées
            </span>
            <span className="font-display font-bold text-sm text-forest-800">
              {formatFCFA(wonCount * 30000)}
            </span>
          </div>

          <div className="bg-white px-3.5 py-1.5 rounded-xl border border-sand-300 text-xs">
            <span className="text-ink-muted text-[10px] uppercase font-bold block">
              En cours
            </span>
            <span className="font-display font-bold text-sm text-ink-primary">
              {inPipelineCount} deals
            </span>
          </div>

          <button
            onClick={() => handleSimulateTelemetry("le-braise-d-or")}
            className="flex items-center gap-1.5 bg-lime-300 hover:bg-lime-400 text-forest-950 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Tester visite démo</span>
          </button>
        </div>
      </div>

      {/* SEARCH STRIP */}
      <div className="bg-white p-3.5 rounded-xl border border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher prospect..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-sand-50 border border-sand-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-ink-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {["Tous", "Restaurants", "Salons de coiffure", "Cliniques"].map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors",
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

      {/* KANBAN BOARD */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3.5 min-w-[1680px] items-start">
          
          {PIPELINE_COLUMNS.map((col) => {
            const columnBusinesses = filtered.filter((b) => b.crmStatus === col.id);
            const totalStageValue = columnBusinesses.length * 30000;

            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
                className="w-60 shrink-0 bg-sand-100 border border-sand-300 rounded-2xl p-3 space-y-2.5 min-h-[520px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-sand-300">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("w-2 h-2 rounded-full", col.dotColor)} />
                      <h3 className="font-display font-bold text-xs text-ink-primary line-clamp-1">
                        {col.title}
                      </h3>
                    </div>
                    <span className="text-xs font-bold px-1.5 py-0.2 rounded bg-white border border-sand-300 text-forest-900">
                      {columnBusinesses.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-ink-muted pt-1">
                    <span>Valeur</span>
                    <span className="font-semibold text-forest-900">
                      {formatFCFA(totalStageValue)}
                    </span>
                  </div>

                  <div className="mt-2.5 space-y-2.5">
                    {columnBusinesses.map((biz) => {
                      const { url: waUrl } = buildWhatsAppPitch(biz);

                      return (
                        <div
                          key={biz.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, biz.id)}
                          className={cn(
                            "bg-white rounded-xl p-3.5 border border-sand-300 shadow-sm hover:border-forest-700 cursor-grab active:cursor-grabbing transition-colors space-y-2.5",
                            biz.crmStatus === "vente_validee" && "border-lime-400 bg-lime-50/20"
                          )}
                        >
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="px-1.5 py-0.5 rounded bg-sand-100 font-semibold text-ink-secondary">
                              {biz.sector}
                            </span>
                            <span className="font-bold text-amber-700 flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              {biz.googleRating}
                            </span>
                          </div>

                          <div>
                            <Link
                              href={`/crm/${biz.id}`}
                              className="font-display font-bold text-xs text-ink-primary hover:text-forest-700 block line-clamp-1"
                            >
                              {biz.name}
                            </Link>
                            <span className="text-[10px] text-ink-muted block line-clamp-1">
                              {biz.neighborhood}, {biz.city}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-sand-200">
                            <span className="text-[10px] text-ink-muted font-normal">Offre :</span>
                            <span className="text-forest-900 bg-sand-50 px-1.5 py-0.2 rounded">
                              30 000 FCFA
                            </span>
                          </div>

                          {/* TELEMETRY BADGE - NO 3D ICON */}
                          {biz.demoLastViewed ? (
                            <div className="px-2 py-1 rounded-lg bg-forest-900 text-white text-[10px] flex items-center justify-between">
                              <span className="flex items-center gap-1 text-lime-400 font-semibold">
                                <Eye className="w-3 h-3 text-lime-400" />
                                <span>Vu {formatTimeAgo(biz.demoLastViewed)}</span>
                              </span>
                              <span className="text-forest-300 font-mono text-[9px]">
                                {biz.demoViewCount} {biz.demoViewCount > 1 ? "vues" : "vue"}
                              </span>
                            </div>
                          ) : (
                            <div className="text-[10px] text-ink-muted flex items-center gap-1">
                              <Eye className="w-2.5 h-2.5 text-sand-300" />
                              <span>Non consulté</span>
                            </div>
                          )}

                          <div className="pt-1.5 border-t border-sand-200 flex items-center justify-between gap-1 text-[11px]">
                            <a
                              href={waUrl}
                              target="_blank"
                              onClick={() => handleStageChange(biz.id, "whatsapp_envoye")}
                              className="p-1.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                              title="Envoyer WhatsApp"
                            >
                              <Send className="w-3 h-3 text-[#25D366]" />
                            </a>

                            <a
                              href={`${biz.demoUrl}?demo=true`}
                              target="_blank"
                              className="p-1.5 rounded bg-sand-100 hover:bg-sand-200 text-ink-primary"
                              title="Voir démo"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>

                            <Link
                              href={`/crm/${biz.id}`}
                              className="flex items-center gap-0.5 px-2 py-1 rounded bg-forest-900 text-white font-bold text-[10px] ml-auto"
                            >
                              <span>Fiche</span>
                              <ChevronRight className="w-3 h-3 text-lime-400" />
                            </Link>
                          </div>

                          <div className="pt-1">
                            <select
                              value={biz.crmStatus}
                              onChange={(e) =>
                                handleStageChange(biz.id, e.target.value as PipelineStage)
                              }
                              className="w-full bg-sand-50 border border-sand-200 text-[10px] rounded px-1.5 py-1 text-ink-secondary"
                            >
                              {PIPELINE_COLUMNS.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}

                    {columnBusinesses.length === 0 && (
                      <div className="border border-dashed border-sand-300 rounded-xl p-4 text-center text-xs text-ink-muted">
                        Vide
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-ink-muted text-center pt-1 border-t border-sand-300/60">
                  Déposer un prospect
                </div>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}
