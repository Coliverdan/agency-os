"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Compass,
  KanbanSquare,
  Coins,
  Globe2,
  PhoneCall,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Eye,
  Send,
  Building2,
  Users,
  ShieldCheck,
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

  // Compute metrics
  const wonBusinesses = businesses.filter((b) => b.crmStatus === "vente_validee");
  const totalCashCollected = wonBusinesses.length * 30000;
  
  const activeSubs = subscriptions.filter((s) => s.status !== "overdue");
  const currentMRR = activeSubs.length * 5000;
  const annualRunRate = currentMRR * 12 + totalCashCollected;

  const demoViewedBiz = businesses
    .filter((b) => b.demoLastViewed)
    .sort((a, b) => new Date(b.demoLastViewed!).getTime() - new Date(a.demoLastViewed!).getTime());

  const latestDemo = demoViewedBiz[0];

  return (
    <div className="space-y-10 pb-16">
      
      {/* HERO SECTION — BENTO STYLE INSPIRÉ DU VISUEL DE RÉFÉRENCE */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-b from-[#F2F6F1] to-[#E5EFE8] border border-forest-100 p-8 sm:p-12 lg:p-14 shadow-soft">
        
        {/* Glow & accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-lime-300/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-forest-400/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT: PITCH & TAGLINE */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-forest-200/80 shadow-sm text-xs font-semibold text-forest-900">
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-live-pulse"></span>
              <span>Machine de Vente Digitale Locale</span>
              <span className="text-forest-300">•</span>
              <span className="text-forest-700">Afrique Francophone</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-primary tracking-tight leading-[1.08]">
              Next-Gen <span className="text-forest-800 bg-lime-300/60 px-2 py-0.5 rounded-xl inline-block">Agency OS</span>, Conçu pour Closer.
            </h1>

            <p className="text-ink-secondary text-base sm:text-lg leading-relaxed max-w-xl">
              Détectez les meilleurs commerces locaux sans site web, générez des maquettes interactives en 1 clic et concluez des offres irrésistibles à <strong>30 000 FCFA</strong> + <strong>5 000 FCFA/mois</strong> d'abonnement.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/sourcing"
                className="bg-forest-900 hover:bg-forest-800 text-white px-7 py-3.5 rounded-full font-bold text-sm flex items-center gap-3 shadow-float hover:scale-105 active:scale-95 transition-all"
              >
                <Compass className="w-4 h-4 text-lime-400" />
                <span>Scanner les commerces locaux</span>
                <ArrowUpRight className="w-4 h-4 text-lime-400" />
              </Link>

              <Link
                href="/crm"
                className="bg-white hover:bg-forest-50 border border-sand-300/90 text-forest-900 px-6 py-3.5 rounded-full font-bold text-sm shadow-sm transition-all"
              >
                Ouvrir le Kanban CRM ({businesses.length} prospects)
              </Link>
            </div>

            {/* Proof pill */}
            <div className="pt-4 flex items-center gap-6 text-xs text-ink-muted border-t border-forest-200/50">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600" />
                <span>Filtre strict "Sans site web"</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600" />
                <span>Note Google ≥ 4.5 vérifiée</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600" />
                <span>WhatsApp-First</span>
              </div>
            </div>

          </div>

          {/* RIGHT: FLOATING CARDS & KEY HIGHLIGHT WIDGET */}
          <div className="lg:col-span-5 relative space-y-4">
            
            {/* Card 1: Primary Dark Forest Card inspired by image */}
            <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-7 shadow-float border border-forest-700/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-full blur-2xl"></div>

              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-forest-300 font-semibold">
                  Cash Collecté Ventes (30 000 FCFA)
                </span>
                <span className="p-2 rounded-xl bg-forest-800 text-lime-400">
                  <Coins className="w-4 h-4" />
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {mounted ? formatFCFA(totalCashCollected || 390000) : "390 000 FCFA"}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-forest-300">
                <span className="inline-flex items-center gap-1 font-bold text-lime-400 bg-lime-400/15 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  +13 ventes
                </span>
                <span>closées en moins de 14 jours</span>
              </div>

              {/* Mini Sparkline indicator */}
              <div className="mt-5 pt-4 border-t border-forest-800/80 flex items-center justify-between text-xs text-forest-200">
                <span>Objectif Mensuel</span>
                <span className="font-bold text-lime-300">78% Atteint</span>
              </div>
              <div className="w-full bg-forest-800 rounded-full h-2 mt-1.5 overflow-hidden">
                <div className="bg-lime-400 h-full rounded-full w-[78%]"></div>
              </div>
            </div>

            {/* Card 2: MRR & Recurring Subscriptions card */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-sand-300/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Abonnements MRR Récurrents
                </span>
                <div className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-ink-primary">
                  {mounted ? formatFCFA(currentMRR || 125000) : "125 000 FCFA"}{" "}
                  <span className="text-xs font-normal text-ink-muted">/ mois</span>
                </div>
                <p className="text-xs text-forest-700 mt-1 font-medium">
                  {mounted ? activeSubs.length : 25} commerces actifs sous contrat (5 000 FCFA/m)
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-lime-100 border border-lime-300 flex items-center justify-center text-forest-900 font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            {/* Card 3: Live Telemetry Notification Pill */}
            {latestDemo && (
              <div className="bg-[#EBF5ED] border border-forest-200 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-forest-900 text-lime-400 flex items-center justify-center">
                    <Eye className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-forest-900 block">
                      👁️ Démo consultée en direct !
                    </span>
                    <span className="text-[11px] text-forest-700">
                      {latestDemo.name} ({formatTimeAgo(latestDemo.demoLastViewed)})
                    </span>
                  </div>
                </div>
                <Link
                  href={`/crm/${latestDemo.id}`}
                  className="text-xs font-bold text-forest-900 hover:text-forest-700 underline flex items-center gap-1"
                >
                  Closer <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* 4 CORE MODULES BENTO GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-forest-700 font-bold">
              Workflow Opérationnel
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-primary mt-1">
              Les 4 Piliers d'Agency OS
            </h2>
          </div>
          <p className="text-xs text-ink-muted max-w-sm">
            De la détection du commerce sans site web jusqu'à la relance d'abonnement récurrente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Mod 1: Sourcing */}
          <Link
            href="/sourcing"
            className="group bg-white rounded-3xl p-6 border border-sand-300/70 hover:border-forest-500 hover:shadow-float transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 group-hover:bg-forest-900 group-hover:text-lime-400 transition-colors">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink-primary mt-5 flex items-center justify-between">
                <span>1. Sourcing Local</span>
                <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-forest-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                Filtres par secteur et quartier. Données certifiées Google (Note ≥ 4.5) et ciblage chirurgical des commerces <strong>sans site web</strong>.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-xs">
              <span className="text-forest-700 font-bold">Création JSON Antigravity</span>
              <span className="bg-sand-100 px-2.5 py-1 rounded-full text-ink-muted font-mono text-[11px]">/sourcing</span>
            </div>
          </Link>

          {/* Mod 2: CRM & Kanban */}
          <Link
            href="/crm"
            className="group bg-white rounded-3xl p-6 border border-sand-300/70 hover:border-forest-500 hover:shadow-float transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 group-hover:bg-forest-900 group-hover:text-lime-400 transition-colors">
                <KanbanSquare className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink-primary mt-5 flex items-center justify-between">
                <span>2. Pipeline CRM</span>
                <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-forest-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                Kanban à 7 colonnes interactif. Télémétrie en temps réel dès que la démo est ouverte avec <code>?demo=true</code> par le gérant.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-xs">
              <span className="text-forest-700 font-bold">Badge 👁️ Télémétrie</span>
              <span className="bg-sand-100 px-2.5 py-1 rounded-full text-ink-muted font-mono text-[11px]">/crm</span>
            </div>
          </Link>

          {/* Mod 3: Prospection 1-Clic */}
          <Link
            href="/crm/biz-1"
            className="group bg-white rounded-3xl p-6 border border-sand-300/70 hover:border-forest-500 hover:shadow-float transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 group-hover:bg-forest-900 group-hover:text-lime-400 transition-colors">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink-primary mt-5 flex items-center justify-between">
                <span>3. Closing 1-Clic</span>
                <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-forest-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                Bouton WhatsApp prérempli avec offre à 30 000 FCFA + Script d'appel télémarketing 30 secondes chronométré avec boutons de compte-rendu.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-xs">
              <span className="text-forest-700 font-bold">Pitch 30 000 FCFA</span>
              <span className="bg-sand-100 px-2.5 py-1 rounded-full text-ink-muted font-mono text-[11px]">/crm/[id]</span>
            </div>
          </Link>

          {/* Mod 4: Finances & MRR */}
          <Link
            href="/finances"
            className="group bg-white rounded-3xl p-6 border border-sand-300/70 hover:border-forest-500 hover:shadow-float transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 group-hover:bg-forest-900 group-hover:text-lime-400 transition-colors">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink-primary mt-5 flex items-center justify-between">
                <span>4. Finances & MRR</span>
                <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-forest-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                Suivi du cash collecté et des abonnements de maintenance (5 000 FCFA/mois) avec alertes d'échéances à 30 jours et relance WhatsApp.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-xs">
              <span className="text-forest-700 font-bold">Alertes 30 jours</span>
              <span className="bg-sand-100 px-2.5 py-1 rounded-full text-ink-muted font-mono text-[11px]">/finances</span>
            </div>
          </Link>

        </div>
      </section>

      {/* QUICK PREVIEWS OF READY-TO-USE DEMO SITES */}
      <section className="bg-white rounded-3xl p-8 border border-sand-300/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-200">
          <div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-forest-700" />
              <h3 className="font-display text-xl font-bold text-ink-primary">
                Serveur de Démonstrations Antigravity (/public/sites/[slug])
              </h3>
            </div>
            <p className="text-xs text-ink-muted mt-1">
              Démos déjà générées, hébergées en statique et prêtes à être envoyées sur WhatsApp avec décompte d'urgence 48h.
            </p>
          </div>
          <Link
            href="/sites"
            className="text-xs font-bold text-forest-800 hover:text-forest-900 underline flex items-center gap-1 self-start sm:self-auto"
          >
            Voir le hub de démos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          
          <div className="border border-sand-200 rounded-2xl p-4 hover:border-forest-300 transition-all bg-sand-50/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                Restaurant
              </span>
              <h4 className="font-display font-bold text-base text-ink-primary mt-2">Le Braisé d'Or</h4>
              <p className="text-xs text-ink-muted">Haie Vive, Cotonou • ★ 4.8 (168 avis)</p>
            </div>
            <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between">
              <a
                href="/sites/le-braise-d-or/index.html?demo=true"
                target="_blank"
                className="text-xs font-bold text-forest-800 hover:text-forest-900 flex items-center gap-1"
              >
                Tester Mode Démo 👁️
              </a>
              <span className="text-xs font-bold text-forest-700">30 000 FCFA</span>
            </div>
          </div>

          <div className="border border-sand-200 rounded-2xl p-4 hover:border-forest-300 transition-all bg-sand-50/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                Salon de Coiffure & Beauté
              </span>
              <h4 className="font-display font-bold text-base text-ink-primary mt-2">Institut Ébène Prestige</h4>
              <p className="text-xs text-ink-muted">Cocody, Abidjan • ★ 4.9 (214 avis)</p>
            </div>
            <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between">
              <a
                href="/sites/institut-ebene-prestige/index.html?demo=true"
                target="_blank"
                className="text-xs font-bold text-forest-800 hover:text-forest-900 flex items-center gap-1"
              >
                Tester Mode Démo 👁️
              </a>
              <span className="text-xs font-bold text-forest-700">30 000 FCFA</span>
            </div>
          </div>

          <div className="border border-sand-200 rounded-2xl p-4 hover:border-forest-300 transition-all bg-sand-50/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                Clinique & Dentiste
              </span>
              <h4 className="font-display font-bold text-base text-ink-primary mt-2">Clinique Sourire Plus</h4>
              <p className="text-xs text-ink-muted">Bonanjo, Douala • ★ 4.7 (92 avis)</p>
            </div>
            <div className="mt-4 pt-3 border-t border-sand-200 flex items-center justify-between">
              <a
                href="/sites/clinique-sourire-plus/index.html?demo=true"
                target="_blank"
                className="text-xs font-bold text-forest-800 hover:text-forest-900 flex items-center gap-1"
              >
                Tester Mode Démo 👁️
              </a>
              <span className="text-xs font-bold text-forest-700">30 000 FCFA</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
