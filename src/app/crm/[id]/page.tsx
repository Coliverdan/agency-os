"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
  ExternalLink,
  Eye,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { BusinessItem, PipelineStage } from "@/types";
import { PIPELINE_COLUMNS } from "@/lib/mock-data";
import {
  loadStoredBusinesses,
  saveBusinesses,
  buildWhatsAppPitch,
} from "@/lib/crm-store";
import { formatTimeAgo } from "@/lib/utils";

export default function ProspectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [business, setBusiness] = useState<BusinessItem | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [originUrl, setOriginUrl] = useState("");

  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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
      <div className="py-16 text-center space-y-3">
        <h2 className="font-display text-xl font-bold">Prospect introuvable</h2>
        <Link
          href="/crm"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-forest-900 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au CRM</span>
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
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleCallOutcome = (outcome: "interested" | "callback" | "not_interested") => {
    let nextStage: PipelineStage = business.crmStatus;
    let autoNote = "";

    if (outcome === "interested") {
      nextStage = "appel_effectue";
      autoNote = `[Appel ${new Date().toLocaleDateString("fr-FR")}] : Client intéressé par l'activation à 30 000 FCFA.`;
    } else if (outcome === "callback") {
      nextStage = "appel_effectue";
      autoNote = `[Appel ${new Date().toLocaleDateString("fr-FR")}] : Rappeler plus tard.`;
    } else {
      nextStage = "perdu_refuse";
      autoNote = `[Appel ${new Date().toLocaleDateString("fr-FR")}] : Pas intéressé.`;
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
    <div className="space-y-6 pb-16">
      
      {/* BREADCRUMB */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/crm"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-950"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au Kanban</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-muted font-bold uppercase">Statut :</span>
          <select
            value={business.crmStatus}
            onChange={(e) => handleUpdateStatus(e.target.value as PipelineStage)}
            className="bg-white border border-sand-300 rounded-lg px-2.5 py-1 text-xs font-bold text-forest-900"
          >
            {PIPELINE_COLUMNS.map((col) => (
              <option key={col.id} value={col.id}>
                {col.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PROSPECT PROFILE */}
      <div className="bg-white rounded-2xl p-6 border border-sand-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-sand-100 text-ink-secondary">
                {business.sector}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <Star className="w-3 h-3 fill-current" />
                <span>{business.googleRating} / 5</span>
                <span className="font-normal text-ink-muted">({business.reviewCount} avis)</span>
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-primary">
              {business.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-secondary">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-forest-700" />
                {business.address}
              </span>
              <span className="flex items-center gap-1 font-mono font-bold text-forest-900">
                <Phone className="w-3.5 h-3.5 text-forest-700" />
                {business.phone}
              </span>
            </div>
          </div>

          {/* TELEMETRY WIDGET */}
          <div className="lg:col-span-4 bg-forest-900 text-white rounded-xl p-4 border border-forest-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-forest-300 uppercase text-[10px] font-bold">
              <span>Télémétrie démo</span>
              {business.demoLastViewed ? (
                <span className="text-lime-400 font-bold flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Connecté
                </span>
              ) : (
                <span className="text-forest-400">En attente</span>
              )}
            </div>

            <div className="text-xs font-medium">
              {business.demoLastViewed ? (
                <p className="text-lime-300">
                  Consulté {formatTimeAgo(business.demoLastViewed)} ({business.demoViewCount} fois).
                </p>
              ) : (
                <p className="text-forest-300">
                  Lien non encore ouvert par le client.
                </p>
              )}
            </div>

            <a
              href={`${business.demoUrl}?demo=true`}
              target="_blank"
              className="w-full py-1.5 px-3 rounded-lg bg-forest-800 hover:bg-forest-700 text-lime-300 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Voir la démo client</span>
            </a>
          </div>

        </div>
      </div>

      {/* ACTIONS ROW: WHATSAPP & SCRIPT 30S */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* WHATSAPP 1-CLIC */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-sand-300 space-y-4">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-[#25D366]" />
            <h2 className="font-display text-lg font-bold text-ink-primary">
              1. Prospection WhatsApp
            </h2>
          </div>

          <div className="bg-[#EFEAE2] p-4 rounded-xl border border-sand-300">
            <div className="bg-white p-3.5 rounded-lg text-xs text-slate-800 leading-relaxed font-sans space-y-2">
              <p className="whitespace-pre-line">{messageText}</p>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <a
              href={whatsAppUrl}
              target="_blank"
              onClick={() => handleUpdateStatus("whatsapp_envoye")}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span>Ouvrir WhatsApp & Envoyer le message</span>
            </a>

            <button
              onClick={() => {
                navigator.clipboard.writeText(messageText);
                setCopiedMessage(true);
                setTimeout(() => setCopiedMessage(false), 2000);
              }}
              className="w-full py-2 px-3 rounded-lg border border-sand-300 text-xs font-semibold text-ink-primary flex items-center justify-center gap-1.5"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-forest-700" />
                  <span>Message copié</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-ink-muted" />
                  <span>Copier le texte</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* SCRIPT TÉLÉPHONIQUE 30S */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-sand-300 space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-sand-200">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-forest-800" />
              <h2 className="font-display text-lg font-bold text-ink-primary">
                2. Script Téléphonique 30s
              </h2>
            </div>

            <div className="flex items-center gap-1.5 bg-sand-100 p-1 rounded-lg border border-sand-300">
              <div className="px-2 py-0.5 bg-forest-900 text-lime-400 font-mono font-bold text-xs rounded">
                {timerSeconds}s
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded bg-white text-forest-900"
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(30);
                }}
                className="p-1 rounded bg-white text-ink-muted"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg bg-sand-50 border border-sand-200">
              <span className="font-bold text-forest-900 block text-[10px] uppercase">
                0-10s : Accroche
              </span>
              <p className="text-ink-primary mt-0.5 italic">
                « Bonjour, je vous appelle suite aux avis très positifs sur votre fiche Google Maps à {business.neighborhood}. »
              </p>
            </div>

            <div className="p-3 rounded-lg bg-sand-50 border border-sand-200">
              <span className="font-bold text-forest-900 block text-[10px] uppercase">
                10-20s : Démo en ligne
              </span>
              <p className="text-ink-primary mt-0.5 italic">
                « Notre équipe a préparé la maquette officielle de votre futur site web avec vos menus/prestations et commandes directes sur WhatsApp. »
              </p>
            </div>

            <div className="p-3 rounded-lg bg-sand-50 border border-sand-200">
              <span className="font-bold text-forest-900 block text-[10px] uppercase">
                20-30s : Offre 30 000 FCFA
              </span>
              <p className="text-ink-primary mt-0.5 italic">
                « L'activation officielle avec votre nom de domaine dédié est à 30 000 FCFA net. Je vous ai envoyé le lien sur votre WhatsApp pour validation. »
              </p>
            </div>
          </div>

          {/* OUTCOME BUTTONS */}
          <div className="pt-2 border-t border-sand-200 space-y-2">
            <span className="text-[10px] uppercase font-bold text-ink-muted block">
              Compte-rendu d'appel :
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleCallOutcome("interested")}
                className="py-2 px-2 rounded-lg bg-forest-900 text-lime-300 font-bold text-xs flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-lime-400" />
                <span>Intéressé</span>
              </button>

              <button
                onClick={() => handleCallOutcome("callback")}
                className="py-2 px-2 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1"
              >
                <Clock className="w-3 h-3 text-amber-600" />
                <span>Rappeler</span>
              </button>

              <button
                onClick={() => handleCallOutcome("not_interested")}
                className="py-2 px-2 rounded-lg bg-rose-100 text-rose-900 font-bold text-xs flex items-center justify-center gap-1"
              >
                <XCircle className="w-3 h-3 text-rose-600" />
                <span>Refus</span>
              </button>
            </div>
          </div>

          {/* NOTES */}
          <div className="space-y-1.5 pt-2 border-t border-sand-200">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-ink-muted uppercase">
                Notes :
              </label>
              {notesSaved && <span className="text-[10px] text-forest-700 font-bold">Enregistré</span>}
            </div>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-sand-50 border border-sand-300 rounded-lg p-2 text-xs text-ink-primary"
            />
            <button
              onClick={handleSaveNotes}
              className="text-xs bg-sand-100 hover:bg-sand-200 text-forest-900 font-bold px-3 py-1 rounded transition-colors"
            >
              Sauvegarder
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
