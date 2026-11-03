"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Compass,
  KanbanSquare,
  Coins,
  Globe2,
  ArrowUpRight,
  TrendingUp,
  Check,
  Eye,
  Send,
  ChevronRight,
} from "lucide-react";
import { loadStoredBusinesses, loadStoredSubscriptions } from "@/lib/crm-store";
import { BusinessItem, SubscriptionItem } from "@/types";
import { formatFCFA, formatTimeAgo } from "@/lib/utils";

export default function HomePage() {
  const [businesses, setBusinesses] = useState<BusinessItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const load = () => {
      setBusinesses(loadStoredBusinesses());
      setSubscriptions(loadStoredSubscriptions());
    };
    load();

    window.addEventListener("agency-os-data-change", load);
    return () => window.removeEventListener("agency-os-data-change", load);
  }, []);

  const wonBusinesses = businesses.filter((b) => b.crmStatus === "vente_validee");
  const totalCashCollected = wonBusinesses.length * 30000;
  
  const activeSubs = subscriptions.filter((s) => s.status !== "overdue");
  const currentMRR = activeSubs.length * 5000;

  const demoViewedBiz = businesses
    .filter((b) => b.demoLastViewed)
    .sort((a, b) => new Date(b.demoLastViewed!).getTime() - new Date(a.demoLastViewed!).getTime());

  const latestDemo = demoViewedBiz[0];

  return (
    <div className="space-y-8 pb-16">
      
      {/* HERO SECTION — FOND 100% SOLIDE SANS DÉGRADÉ NI HALO */}
      <section className="rounded-3xl bg-[#ECEFE6] border border-sand-300 p-8 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: PITCH DIRECT SANS OVER-TEXTE */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sand-300 text-xs font-semibold text-forest-900">
              <span className="w-2 h-2 rounded-full bg-forest-600"></span>
              <span>Agency OS</span>
              <span className="text-sand-300">•</span>
              <span>Afrique Francophone</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-primary tracking-tight leading-tight">
              Gestion & Vente de Vitrines Locales.
            </h1>

            <p className="text-ink-secondary text-sm sm:text-base max-w-lg">
              Sourcing de commerces sans site web, pipeline CRM et closing WhatsApp à 30 000 FCFA + 5 000 FCFA/mois.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/sourcing"
                className="bg-forest-900 hover:bg-forest-800 text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-lime-400" />
                <span>Scanner Commerces</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-lime-400" />
              </Link>

              <Link
                href="/crm"
                className="bg-white hover:bg-sand-100 border border-sand-300 text-forest-900 px-5 py-2.5 rounded-full font-bold text-xs transition-colors"
              >
                Pipeline CRM ({businesses.length})
              </Link>
            </div>

            <div className="pt-3 flex items-center gap-6 text-xs text-ink-muted border-t border-sand-300">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-forest-700" /> Filtre sans site web
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-forest-700" /> Note Google ≥ 4.5
              </span>
            </div>

          </div>

          {/* RIGHT: METRICS WIDGETS */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* Card 1: Cash Ventes */}
            <div className="bg-forest-900 text-white rounded-2xl p-5 border border-forest-800">
              <div className="flex items-center justify-between text-xs text-forest-300 uppercase tracking-wider font-semibold">
                <span>Cash Collecté Ventes</span>
                <Coins className="w-4 h-4 text-lime-400" />
              </div>

              <div className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
                {mounted ? formatFCFA(totalCashCollected || 390000) : "390 000 FCFA"}
              </div>

              <div className="mt-2 text-xs text-forest-300">
                {wonBusinesses.length} vitrines vendues (30 000 FCFA)
              </div>
            </div>

            {/* Card 2: MRR */}
            <div className="bg-white rounded-2xl p-5 border border-sand-300 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Revenus Récurrents (MRR)
                </span>
                <div className="mt-1 font-display text-2xl font-extrabold text-ink-primary">
                  {mounted ? formatFCFA(currentMRR || 125000) : "125 000 FCFA"}
                  <span className="text-xs font-normal text-ink-muted"> / mois</span>
                </div>
                <div className="text-xs text-forest-800 mt-0.5">
                  {mounted ? activeSubs.length : 25} contrats actifs (5 000 FCFA/m)
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center text-forest-900">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            {/* Card 3: Live Telemetry Alert */}
            {latestDemo && (
              <div className="bg-white border border-sand-300 p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-forest-900 text-lime-400 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-forest-900 block">
                      Démo consultée en direct
                    </span>
                    <span className="text-[11px] text-ink-muted">
                      {latestDemo.name} ({formatTimeAgo(latestDemo.demoLastViewed)})
                    </span>
                  </div>
                </div>
                <Link
                  href={`/crm/${latestDemo.id}`}
                  className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-0.5"
                >
                  Fiche <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 4 CORE MODULES */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Link
          href="/sourcing"
          className="bg-white rounded-2xl p-5 border border-sand-300 hover:border-forest-700 transition-colors flex flex-col justify-between"
        >
          <div>
            <Compass className="w-5 h-5 text-forest-800" />
            <h3 className="font-display font-bold text-base text-ink-primary mt-3 flex items-center justify-between">
              <span>Sourcing Local</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
            </h3>
            <p className="text-xs text-ink-muted mt-1">
              Scanner Google Maps par quartier et filtre sans site web.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sand-200 text-xs font-semibold text-forest-800">
            Export JSON Antigravity
          </div>
        </Link>

        <Link
          href="/crm"
          className="bg-white rounded-2xl p-5 border border-sand-300 hover:border-forest-700 transition-colors flex flex-col justify-between"
        >
          <div>
            <KanbanSquare className="w-5 h-5 text-forest-800" />
            <h3 className="font-display font-bold text-base text-ink-primary mt-3 flex items-center justify-between">
              <span>Pipeline CRM</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
            </h3>
            <p className="text-xs text-ink-muted mt-1">
              Kanban 7 étapes avec télémétrie en temps réel.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sand-200 text-xs font-semibold text-forest-800">
            Télémétrie démo active
          </div>
        </Link>

        <Link
          href="/crm/biz-1"
          className="bg-white rounded-2xl p-5 border border-sand-300 hover:border-forest-700 transition-colors flex flex-col justify-between"
        >
          <div>
            <Send className="w-5 h-5 text-forest-800" />
            <h3 className="font-display font-bold text-base text-ink-primary mt-3 flex items-center justify-between">
              <span>Prospection 1-Clic</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
            </h3>
            <p className="text-xs text-ink-muted mt-1">
              Bouton WhatsApp prérempli et script d'appel 30 secondes.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sand-200 text-xs font-semibold text-forest-800">
            Pitch 30 000 FCFA
          </div>
        </Link>

        <Link
          href="/finances"
          className="bg-white rounded-2xl p-5 border border-sand-300 hover:border-forest-700 transition-colors flex flex-col justify-between"
        >
          <div>
            <Coins className="w-5 h-5 text-forest-800" />
            <h3 className="font-display font-bold text-base text-ink-primary mt-3 flex items-center justify-between">
              <span>Finances & MRR</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
            </h3>
            <p className="text-xs text-ink-muted mt-1">
              Suivi des encaissements et abonnements (5 000 FCFA/m).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sand-200 text-xs font-semibold text-forest-800">
            Alertes échéance 30j
          </div>
        </Link>

      </section>

    </div>
  );
}
