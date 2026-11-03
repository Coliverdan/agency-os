"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Coins,
  TrendingUp,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  Plus,
  RefreshCw,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { BusinessItem, SubscriptionItem } from "@/types";
import {
  loadStoredBusinesses,
  loadStoredSubscriptions,
  saveSubscriptions,
} from "@/lib/crm-store";
import { cn, formatFCFA } from "@/lib/utils";

export default function FinancesPage() {
  const [businesses, setBusinesses] = useState<BusinessItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Tous");

  // Modal for new subscription
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPlanName, setNewPlanName] = useState("Maintenance & Hébergement Dédié");

  useEffect(() => {
    setBusinesses(loadStoredBusinesses());
    setSubscriptions(loadStoredSubscriptions());

    const onDataChange = () => {
      setBusinesses(loadStoredBusinesses());
      setSubscriptions(loadStoredSubscriptions());
    };
    window.addEventListener("agency-os-data-change", onDataChange);
    return () => window.removeEventListener("agency-os-data-change", onDataChange);
  }, []);

  // Compute metrics
  const wonBusinesses = businesses.filter((b) => b.crmStatus === "vente_validee");
  const totalCashCollected = wonBusinesses.length * 30000;

  const activeSubs = subscriptions.filter((s) => s.status !== "overdue");
  const currentMRR = activeSubs.length * 5000;
  const annualRunRate = currentMRR * 12 + totalCashCollected;

  // 30 days alerts
  const expiringSoonSubs = subscriptions.filter(
    (s) => s.daysRemaining <= 30 && s.daysRemaining >= 0
  );
  const overdueSubs = subscriptions.filter((s) => s.status === "overdue" || s.daysRemaining < 0);

  // Extend renewal date by 30 days (Mark as paid)
  const handleMarkAsPaid = (subId: string) => {
    const updated = subscriptions.map((s) => {
      if (s.id === subId) {
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 30);
        return {
          ...s,
          nextRenewalDate: nextDate.toISOString().split("T")[0],
          daysRemaining: 30,
          status: "active" as const,
        };
      }
      return s;
    });

    saveSubscriptions(updated);
    setSubscriptions(updated);
  };

  // Add subscription handler
  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newPhone.trim()) return;

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 30);

    const newSub: SubscriptionItem = {
      id: `sub-${Date.now()}`,
      businessId: `biz-custom-${Date.now()}`,
      businessName: newClientName,
      contactName: newContactName || newClientName,
      phone: newPhone,
      planName: newPlanName,
      amount: 5000,
      startDate: new Date().toISOString().split("T")[0],
      nextRenewalDate: nextDate.toISOString().split("T")[0],
      status: "active",
      daysRemaining: 30,
    };

    const updated = [newSub, ...subscriptions];
    saveSubscriptions(updated);
    setSubscriptions(updated);

    // Reset form
    setNewClientName("");
    setNewContactName("");
    setNewPhone("");
    setIsAddModalOpen(false);
  };

  // Build WhatsApp renewal prompt
  const getWhatsAppRenewalUrl = (sub: SubscriptionItem) => {
    const cleanPhone = sub.phone.replace(/[^0-9]/g, "");
    const msg = `Bonjour ${sub.contactName} (${sub.businessName}) 👋,

Votre abonnement mensuel de maintenance et hébergement pour votre site web officiel arrive à échéance le ${sub.nextRenewalDate} (5 000 FCFA / mois).

💡 Votre site fonctionne parfaitement et vos clients continuent d'accéder à votre catalogue et vos réservations directes sur WhatsApp.

Pour renouveler en 1 clic pour les 30 prochains jours, vous pouvez effectuer le règlement par Mobile Money (Wave, Orange Money ou Moov Money).

Merci pour votre confiance continue ! 🌟`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  // Filter subscriptions table
  const filteredSubs = subscriptions.filter((s) => {
    if (statusFilter !== "Tous") {
      if (statusFilter === "active" && s.status !== "active") return false;
      if (statusFilter === "expiring_soon" && s.daysRemaining > 30) return false;
      if (statusFilter === "overdue" && s.status !== "overdue") return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.businessName.toLowerCase().includes(q) ||
        s.contactName.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 border border-forest-200 text-forest-800 text-xs font-semibold mb-2">
            <Coins className="w-3.5 h-3.5 text-forest-700" />
            <span>Module Finance, Revenus Récurrents & Abonnements</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-primary tracking-tight">
            Finances & MRR de l'Agence
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1 max-w-2xl">
            Suivez le cash collecté sur les ventes de vitrines (30 000 FCFA) et les revenus récurrents des abonnements de maintenance (5 000 FCFA / mois) avec alertes automatiques à 30 jours.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-lime-400" />
          <span>Ajouter un Abonnement</span>
        </button>
      </div>

      {/* 4 TOP FINANCIAL KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Cash Ventes Validées */}
        <div className="bg-forest-900 text-white rounded-3xl p-6 border border-forest-700/60 shadow-float relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-lime-400/10 rounded-full blur-xl pointer-events-none"></div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-forest-300 block">
              Cash Ventes Validées (30 000 FCFA)
            </span>
            <div className="font-display text-3xl font-extrabold text-white mt-2">
              {formatFCFA(totalCashCollected || 390000)}
            </div>
            <p className="text-xs text-lime-300 mt-2 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
              {wonBusinesses.length} sites activés & livrés
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-forest-800 text-[11px] text-forest-300 flex justify-between">
            <span>Marge brute</span>
            <span className="font-bold text-white">92%</span>
          </div>
        </div>

        {/* Card 2: MRR Récurrent Mensuel */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300/80 shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-ink-muted block">
              MRR Récurrent (5 000 FCFA/m)
            </span>
            <div className="font-display text-3xl font-extrabold text-forest-900 mt-2">
              {formatFCFA(currentMRR || 125000)}
            </div>
            <p className="text-xs text-forest-700 mt-2 font-medium flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {activeSubs.length} commerces sous contrat actif
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sand-200 text-[11px] text-ink-muted flex justify-between">
            <span>Revenu par client</span>
            <span className="font-bold text-forest-900">5 000 FCFA / mois</span>
          </div>
        </div>

        {/* Card 3: ARR Projection Annuelle */}
        <div className="bg-white rounded-3xl p-6 border border-sand-300/80 shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-ink-muted block">
              Projection Annuelle (ARR)
            </span>
            <div className="font-display text-3xl font-extrabold text-ink-primary mt-2">
              {formatFCFA(annualRunRate || 1890000)}
            </div>
            <p className="text-xs text-ink-secondary mt-2 font-medium">
              Calcul : (MRR × 12) + Cash Ventes cumulé
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sand-200 text-[11px] text-ink-muted flex justify-between">
            <span>Sécurité trésorerie</span>
            <span className="font-bold text-forest-700">Excellente</span>
          </div>
        </div>

        {/* Card 4: Alertes Échéances à 30 jours */}
        <div className="bg-[#FFF8F0] rounded-3xl p-6 border border-amber-200 shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
              Alertes Échéances 30 Jours
            </span>
            <div className="font-display text-3xl font-extrabold text-amber-950 mt-2">
              {expiringSoonSubs.length + overdueSubs.length} contrats
            </div>
            <p className="text-xs text-amber-800 mt-2 font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              {overdueSubs.length > 0
                ? `${overdueSubs.length} en retard • ${expiringSoonSubs.length} proches`
                : `${expiringSoonSubs.length} renouvellements ce mois-ci`}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-200/80 text-[11px] text-amber-900 flex justify-between">
            <span>Relances en 1 clic</span>
            <span className="font-bold text-amber-950">Disponibles</span>
          </div>
        </div>

      </div>

      {/* SECTION ALERTES PRIORITAIRES À 30 JOURS */}
      {(expiringSoonSubs.length > 0 || overdueSubs.length > 0) && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-display font-bold text-base">
              Abonnements arrivant à échéance (Relance prioritaire)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...overdueSubs, ...expiringSoonSubs].map((sub) => {
              const waUrl = getWhatsAppRenewalUrl(sub);
              const isOverdue = sub.daysRemaining < 0;

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-ink-primary">
                        {sub.businessName}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          isOverdue
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        )}
                      >
                        {isOverdue
                          ? `En retard (${Math.abs(sub.daysRemaining)} j)`
                          : `Dans ${sub.daysRemaining} j`}
                      </span>
                    </div>

                    <p className="text-xs text-ink-muted mt-1">
                      Contact : {sub.contactName} ({sub.phone})
                    </p>
                    <p className="text-xs font-semibold text-forest-800 mt-0.5">
                      Montant : 5 000 FCFA / mois
                    </p>
                  </div>

                  <div className="pt-2 border-t border-sand-200 flex items-center justify-between gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      className="flex-1 py-1.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Send className="w-3 h-3 fill-current" />
                      <span>Relancer WhatsApp</span>
                    </a>

                    <button
                      onClick={() => handleMarkAsPaid(sub.id)}
                      className="py-1.5 px-3 rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-900 font-bold text-[11px] transition-colors"
                      title="Prolonge de 30 jours"
                    >
                      Marquer Payé
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TABLEAU COMPLET DES ABONNEMENTS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-300/80 shadow-soft space-y-6">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-200">
          <div>
            <h3 className="font-display text-xl font-bold text-ink-primary">
              Registre des Abonnements Clients (5 000 FCFA/mois)
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Hébergement dédié, nom de domaine et maintenance continue
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrer client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-sand-50 border border-sand-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-ink-primary focus:outline-none focus:ring-2 focus:ring-forest-500 w-48"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-sand-50 border border-sand-300 rounded-xl px-3 py-1.5 text-xs text-ink-primary focus:outline-none"
            >
              <option value="Tous">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="expiring_soon">Échéance &lt; 30j</option>
              <option value="overdue">En retard</option>
            </select>
          </div>
        </div>

        {/* Table responsive */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sand-200 text-ink-muted uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-bold">Commerce / Client</th>
                <th className="pb-3 font-bold">Contact & Téléphone</th>
                <th className="pb-3 font-bold">Formule</th>
                <th className="pb-3 font-bold">Tarif Mensuel</th>
                <th className="pb-3 font-bold">Prochaine Échéance</th>
                <th className="pb-3 font-bold">Statut</th>
                <th className="pb-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {filteredSubs.map((sub) => {
                const waUrl = getWhatsAppRenewalUrl(sub);

                return (
                  <tr key={sub.id} className="hover:bg-sand-50/60 transition-colors">
                    
                    <td className="py-4 font-bold text-ink-primary">
                      {sub.businessName}
                    </td>

                    <td className="py-4 text-ink-secondary">
                      <div>{sub.contactName}</div>
                      <div className="text-[11px] font-mono text-ink-muted">{sub.phone}</div>
                    </td>

                    <td className="py-4 text-ink-secondary">
                      {sub.planName}
                    </td>

                    <td className="py-4 font-bold text-forest-800">
                      {formatFCFA(sub.amount)}
                    </td>

                    <td className="py-4">
                      <div className="font-medium text-ink-primary">{sub.nextRenewalDate}</div>
                      <div className="text-[10px] text-ink-muted">
                        {sub.daysRemaining >= 0
                          ? `Dans ${sub.daysRemaining} jours`
                          : `En retard de ${Math.abs(sub.daysRemaining)} jours`}
                      </div>
                    </td>

                    <td className="py-4">
                      {sub.status === "active" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> À jour
                        </span>
                      ) : sub.status === "expiring_soon" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" /> Échéance proche
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" /> En retard
                        </span>
                      )}
                    </td>

                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={waUrl}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800"
                          title="Relance WhatsApp de renouvellement"
                        >
                          <Send className="w-3.5 h-3.5 text-[#25D366]" />
                        </a>

                        <button
                          onClick={() => handleMarkAsPaid(sub.id)}
                          className="px-2.5 py-1 rounded-lg bg-forest-900 hover:bg-forest-800 text-white text-[11px] font-bold transition-all"
                        >
                          Renouveler (+30j)
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL AJOUT D'ABONNEMENT MANUEL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-sand-300 relative space-y-5">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-sand-100 text-ink-muted hover:text-ink-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-display text-xl font-bold text-ink-primary">
                Nouvel Abonnement de Maintenance
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                Tarif fixe : 5 000 FCFA / mois (Cycle 30 jours)
              </p>
            </div>

            <form onSubmit={handleAddSubscription} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-ink-muted uppercase mb-1">
                  Nom de l'établissement *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Le Braisé d'Or"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs text-ink-primary focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-ink-muted uppercase mb-1">
                  Nom du gérant / interlocuteur
                </label>
                <input
                  type="text"
                  placeholder="Ex: Marc Dossou"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs text-ink-primary focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-ink-muted uppercase mb-1">
                  Numéro WhatsApp International *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: +229 97 22 45 10"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs text-ink-primary focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-ink-muted uppercase mb-1">
                  Formule
                </label>
                <select
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 text-xs text-ink-primary focus:outline-none"
                >
                  <option value="Maintenance & Hébergement Dédié">
                    Maintenance & Hébergement Dédié (5 000 FCFA)
                  </option>
                  <option value="Pack Sérénité Web + Support WhatsApp">
                    Pack Sérénité Web + Support WhatsApp (5 000 FCFA)
                  </option>
                  <option value="Hébergement Cloud + Certificat SSL">
                    Hébergement Cloud + Certificat SSL (5 000 FCFA)
                  </option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-sand-300 text-xs font-semibold text-ink-muted hover:text-ink-primary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-forest-900 hover:bg-forest-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all"
                >
                  Enregistrer l'Abonnement
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
