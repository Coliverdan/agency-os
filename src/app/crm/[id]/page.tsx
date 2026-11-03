"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Send,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Eye,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageSquare,
  FileText,
  Coins,
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

export default function ProspectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [business, setBusiness] = useState<BusinessItem | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [originUrl, setOriginUrl] = useState("");

  // Timer states for the 30-second call script
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Notes state
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOriginUrl(window.location.origin);
    }

    const businesses = loadStoredBusinesses();
    const found = businesses.find((b) => b.id === id || b.slug === id);
    if (found) {
      setBusiness(found);
      setNotes(found.callNotes || "");
    }
  }, [id]);

  // Timer countdown hook
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!business) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold">Prospect introuvable</h2>
        <p className="text-xs text-ink-muted">Le commerce demandé n'existe pas ou a été déplacé.</p>
        <Link
          href="/crm"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au CRM
        </Link>
      </div>
    );
  }

  const { url: whatsAppUrl, messageText } = buildWhatsAppPitch(business, originUrl);

  const handleUpdateStatus = (newStage: PipelineStage) => {
    const businesses = loadStoredBusinesses();
    const updated = businesses.map((b) => {
      if (b.id === business.id) {
        return {
          ...b,
          crmStatus: newStage,
          lastInteraction: new Date().toISOString(),
        };
      }
      return b;
    });

    saveBusinesses(updated);
    setBusiness({ ...business, crmStatus: newStage });

    if (newStage === "vente_validee") {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#BEFA3C", "#08291A", "#25D366"],
      });
    }
  };

  const handleSaveNotes = () => {
    const businesses = loadStoredBusinesses();
    const updated = businesses.map((b) => {
      if (b.id === business.id) {
        return {
          ...b,
          callNotes: notes,
          lastInteraction: new Date().toISOString(),
        };
      }
      return b;
    });

    saveBusinesses(updated);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  const handleCallOutcome = (outcome: "interested" | "callback" | "not_interested") => {
    let nextStage: PipelineStage = business.crmStatus;
    let autoNote = "";

    if (outcome === "interested") {
      nextStage = "appel_effectue";
      autoNote = `[Appel du ${new Date().toLocaleDateString("fr-FR")}] : Le client est très intéressé par la démo. Souhaite valider l'activation à 30 000 FCFA.`;
    } else if (outcome === "callback") {
      nextStage = "appel_effectue";
      autoNote = `[Appel du ${new Date().toLocaleDateString("fr-FR")}] : Rappeler plus tard (le gérant était en service / réunion).`;
    } else {
      nextStage = "perdu_refuse";
      autoNote = `[Appel du ${new Date().toLocaleDateString("fr-FR")}] : Pas intéressé pour le moment.`;
    }

    const updatedNotes = notes ? `${autoNote}\n${notes}` : autoNote;
    setNotes(updatedNotes);

    const businesses = loadStoredBusinesses();
    const updated = businesses.map((b) => {
      if (b.id === business.id) {
        return {
          ...b,
          crmStatus: nextStage,
          callStatus: outcome,
          callNotes: updatedNotes,
          lastInteraction: new Date().toISOString(),
        };
      }
      return b;
    });

    saveBusinesses(updated);
    setBusiness({
      ...business,
      crmStatus: nextStage,
      callStatus: outcome,
      callNotes: updatedNotes,
    });
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* TOP BREADCRUMB & PROSPECT BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/crm"
          className="inline-flex items-center gap-2 text-xs font-bold text-forest-800 hover:text-forest-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au Tableau Kanban</span>
        </Link>

        {/* Current Stage Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-ink-muted font-bold uppercase">Étape CRM :</span>
          <select
            value={business.crmStatus}
            onChange={(e) => handleUpdateStatus(e.target.value as PipelineStage)}
            className="bg-white border border-sand-300 rounded-xl px-3 py-1.5 text-xs font-bold text-forest-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            {PIPELINE_COLUMNS.map((col) => (
              <option key={col.id} value={col.id}>
                {col.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PROSPECT MAIN PROFILE CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-300/80 shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sand-100 text-ink-secondary">
                {business.sector}
              </span>
              <span className="flex items-center gap-1 text-xs font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{business.googleRating} / 5</span>
                <span className="text-ink-muted">({business.reviewCount} avis certifiés)</span>
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-primary">
              {business.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-ink-secondary">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-forest-600" />
                {business.address}
              </span>
              <span className="flex items-center gap-1.5 font-mono font-bold text-forest-900">
                <Phone className="w-4 h-4 text-forest-600" />
                {business.phone}
              </span>
            </div>
          </div>

          {/* TELEMETRY WIDGET */}
          <div className="lg:col-span-4 bg-forest-900 text-white rounded-2xl p-5 border border-forest-700/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-forest-300 uppercase tracking-wider text-[10px] font-bold">
                Télémétrie Démo
              </span>
              {business.demoLastViewed ? (
                <span className="flex items-center gap-1 text-lime-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-live-pulse" />
                  Actif
                </span>
              ) : (
                <span className="text-forest-400">En attente</span>
              )}
            </div>

            <div className="text-sm font-bold">
              {business.demoLastViewed ? (
                <div className="space-y-1">
                  <p className="text-lime-300 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    Consulté {formatTimeAgo(business.demoLastViewed)}
                  </p>
                  <p className="text-xs text-forest-300 font-normal">
                    Le gérant a ouvert le lien démo {business.demoViewCount} fois.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-forest-300 font-normal">
                  Le prospect n'a pas encore cliqué sur le lien de sa démo.
                </p>
              )}
            </div>

            <a
              href={`${business.demoUrl}?demo=true`}
              target="_blank"
              className="w-full py-2 px-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-lime-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Tester la Démo client ({business.slug})</span>
            </a>
          </div>

        </div>
      </div>

      {/* TWO ACTION COLUMNS: WHATSAPP 1-CLIC & SCRIPT TÉLÉPHONIQUE 30S */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN LEFT (6 COLS): WHATSAPP 1-CLIC */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-300/80 shadow-soft space-y-5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                  <Send className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink-primary">
                    1. Prospection WhatsApp 1-Clic
                  </h2>
                  <p className="text-[11px] text-ink-muted">
                    Message d'accroche personnalisé avec lien démo et offre à 30 000 FCFA
                  </p>
                </div>
              </div>
            </div>

            {/* REALISTIC WHATSAPP CHAT BUBBLE */}
            <div className="bg-[#EFEAE2] p-4 sm:p-5 rounded-2xl border border-sand-300/80 relative overflow-hidden">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-black/5 text-xs text-slate-800 leading-relaxed space-y-3 font-sans">
                <p className="whitespace-pre-line">{messageText}</p>
                <div className="text-right text-[10px] text-slate-400 font-medium">
                  {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} ✓✓
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                onClick={() => handleUpdateStatus("whatsapp_envoye")}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Ouvrir WhatsApp & Envoyer le Pitch</span>
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(messageText);
                  setCopiedMessage(true);
                  setTimeout(() => setCopiedMessage(false), 2500);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-sand-300 hover:bg-sand-50 text-xs font-semibold text-ink-primary flex items-center justify-center gap-2 transition-all"
              >
                {copiedMessage ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-forest-700" />
                    <span>Message copié dans le presse-papier !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-ink-muted" />
                    <span>Copier le texte du message</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* COLUMN RIGHT (6 COLS): SCRIPT TÉLÉPHONIQUE 30 SECONDES */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-300/80 shadow-soft space-y-5">
            
            {/* SCRIPT HEADER & 30S TIMER */}
            <div className="flex items-center justify-between pb-4 border-b border-sand-200">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink-primary">
                    2. Script Commercial 30s
                  </h2>
                  <p className="text-[11px] text-ink-muted">
                    Pitch téléphonique d'impact pour déclencher la vente
                  </p>
                </div>
              </div>

              {/* INTERACTIVE TIMER CHRONO */}
              <div className="flex items-center gap-2 bg-sand-100 p-1.5 rounded-2xl border border-sand-300">
                <div className="px-3 py-1 bg-forest-900 text-lime-400 font-mono font-bold text-sm rounded-xl">
                  {timerSeconds}s
                </div>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1.5 rounded-lg bg-white hover:bg-forest-50 text-forest-900"
                  title={isTimerRunning ? "Pause" : "Démarrer"}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(30);
                  }}
                  className="p-1.5 rounded-lg bg-white hover:bg-forest-50 text-ink-muted hover:text-forest-900"
                  title="Réinitialiser"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3 STEPS SCRIPT */}
            <div className="space-y-4">
              
              {/* Step 1: Accroche 0-10s */}
              <div className="p-4 rounded-2xl bg-forest-50/60 border border-forest-200/70 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-forest-900">
                  <span>PHASE 1 : ACCROCHE & COMPLIMENT</span>
                  <span className="font-mono text-forest-600">0 - 10 sec</span>
                </div>
                <p className="text-xs text-ink-primary italic leading-relaxed">
                  « Bonjour [Nom du Gérant], c'est [Votre Prénom] de l'agence Antigravity. Je vous appelle car j'ai vu votre excellente note de {business.googleRating}/5 sur Google Maps à {business.neighborhood}. Bravo pour vos avis clients ! »
                </p>
              </div>

              {/* Step 2: Pitch Démo 10-20s */}
              <div className="p-4 rounded-2xl bg-sand-100/70 border border-sand-200 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-forest-900">
                  <span>PHASE 2 : LA DÉMO EN LIGNE</span>
                  <span className="font-mono text-forest-600">10 - 20 sec</span>
                </div>
                <p className="text-xs text-ink-primary italic leading-relaxed">
                  « Beaucoup de vos clients cherchent votre menu et vos tarifs avant de venir. Pour vous éviter de perdre ces réservations, mon équipe a déjà conçu gratuitement votre site web officiel et l'a mis en ligne pour vous montrer le rendu sur smartphone. »
                </p>
              </div>

              {/* Step 3: Offre 30 000 FCFA 20-30s */}
              <div className="p-4 rounded-2xl bg-lime-100/50 border border-lime-300 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-forest-950">
                  <span>PHASE 3 : L'OFFRE 30 000 FCFA</span>
                  <span className="font-mono text-forest-800">20 - 30 sec</span>
                </div>
                <p className="text-xs text-forest-950 font-medium italic leading-relaxed">
                  « L'activation officielle avec votre nom de domaine .com et les commandes WhatsApp directes est à seulement 30 000 FCFA tout compris. Je viens de vous envoyer la maquette sur votre WhatsApp : avez-vous 2 minutes pour y jeter un coup d'œil ? »
                </p>
              </div>

            </div>

            {/* CALL OUTCOME BUTTONS (COMPTE-RENDU D'APPEL INSTANTANÉ) */}
            <div className="pt-2 border-t border-sand-200 space-y-3">
              <span className="block text-[11px] uppercase font-bold text-ink-muted">
                Compte-rendu d'appel instantané :
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleCallOutcome("interested")}
                  className="py-2.5 px-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-lime-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
                  <span>Intéressé</span>
                </button>

                <button
                  onClick={() => handleCallOutcome("callback")}
                  className="py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Rappeler + tard</span>
                </button>

                <button
                  onClick={() => handleCallOutcome("not_interested")}
                  className="py-2.5 px-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Pas intéressé</span>
                </button>
              </div>
            </div>

            {/* CALL NOTES & REMARKS */}
            <div className="space-y-2 pt-2 border-t border-sand-200">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-ink-muted uppercase">
                  Notes & Historique d'Échanges :
                </label>
                {notesSaved && (
                  <span className="text-[10px] text-forest-700 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Enregistré
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Le gérant souhaite ajouter 2 photos supplémentaires de sa terrasse..."
                className="w-full bg-sand-50 border border-sand-300 rounded-xl p-3 text-xs text-ink-primary focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
              <button
                onClick={handleSaveNotes}
                className="text-xs bg-forest-100 hover:bg-forest-200 text-forest-900 font-bold px-4 py-1.5 rounded-lg transition-colors"
              >
                Sauvegarder les notes
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

