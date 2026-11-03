"use client";

import { useState, useEffect } from "react";
import {
  Coins,
  TrendingUp,
  AlertTriangle,
  Clock,
  Send,
  Plus,
  Search,
  Check,
  X,
} from "lucide-react";
import { BusinessItem, SubscriptionItem } from "@/types";
import {
  loadStoredBusinesses,
  loadStoredSubscriptions,
  saveSubscriptions,
} from "@/lib/crm-store";
import { formatFCFA } from "@/lib/utils";

export default function FinancesPage() {
  const [businesses, setBusinesses] = useState<BusinessItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Tous");

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

  const wonBusinesses = businesses.filter((b) => b.crmStatus === "vente_validee");
  const totalCashCollected = wonBusinesses.length * 30000;

  const activeSubs = subscriptions.filter((s) => s.status !== "overdue");
  const currentMRR = activeSubs.length * 5000;
  const annualRunRate = currentMRR * 12 + totalCashCollected;

  const expiringSoonSubs = subscriptions.filter(
    (s) => s.daysRemaining <= 30 && s.daysRemaining >= 0
  );
  const overdueSubs = subscriptions.filter((s) => s.status === "overdue" || s.daysRemaining < 0);

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

    setNewClientName("");
    setNewContactName("");
    setNewPhone("");
    setIsAddModalOpen(false);
  };

  const getWhatsAppRenewalUrl = (sub: SubscriptionItem) => {
    const cleanPhone = sub.phone.replace(/[^0-9]/g, "");
    const msg = `Bonjour ${sub.contactName} (${sub.businessName}),

Votre abonnement mensuel de maintenance et hébergement pour votre site officiel arrive à échéance le ${sub.nextRenewalDate} (5 000 FCFA / mois).

Règlement disponible par Mobile Money (Wave, Orange Money ou Moov).

Merci pour votre confiance.`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

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
    <div className="space-y-6 pb-16">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-primary tracking-tight">
            Finances & MRR
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Suivi des ventes de vitrines et abonnements de maintenance.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 bg-forest-900 hover:bg-forest-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-lime-400" />
          <span>Ajouter abonnement</span>
        </button>
      </div>

      {/* 4 CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-forest-900 text-white rounded-2xl p-5 border border-forest-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-forest-300 block">
              Cash Ventes (30 000 FCFA)
            </span>
            <div className="font-display text-2xl font-extrabold text-white mt-1.5">
              {formatFCFA(totalCashCollected || 390000)}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-forest-800 text-xs text-forest-300">
            {wonBusinesses.length} sites livrés
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-300 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-ink-muted block">
              MRR Récurrent
            </span>
            <div className="font-display text-2xl font-extrabold text-forest-900 mt-1.5">
              {formatFCFA(currentMRR || 125000)}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-sand-200 text-xs text-ink-muted">
            {activeSubs.length} clients sous contrat (5 000 FCFA/m)
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-300 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-ink-muted block">
              Projection Annuelle (ARR)
            </span>
            <div className="font-display text-2xl font-extrabold text-ink-primary mt-1.5">
              {formatFCFA(annualRunRate || 1890000)}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-sand-200 text-xs text-ink-muted">
            (MRR × 12) + Ventes cumulées
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-300 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
              Échéances à 30 Jours
            </span>
            <div className="font-display text-2xl font-extrabold text-ink-primary mt-1.5">
              {expiringSoonSubs.length + overdueSubs.length} contrats
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-sand-200 text-xs text-amber-800 font-medium">
            Relances en 1 clic
          </div>
        </div>

      </div>

      {/* ALERTES 30 JOURS */}
      {(expiringSoonSubs.length > 0 || overdueSubs.length > 0) && (
        <div className="bg-sand-100 border border-sand-300 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-ink-primary">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="font-display font-bold text-sm">
              Abonnements arrivant à échéance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[...overdueSubs, ...expiringSoonSubs].map((sub) => {
              const waUrl = getWhatsAppRenewalUrl(sub);
              const isOverdue = sub.daysRemaining < 0;

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-xl p-3.5 border border-sand-300 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-ink-primary">{sub.businessName}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sand-100">
                        {isOverdue ? `En retard (${Math.abs(sub.daysRemaining)} j)` : `Dans ${sub.daysRemaining} j`}
                      </span>
                    </div>
                    <div className="text-[11px] text-ink-muted mt-1">
                      {sub.contactName} • {sub.phone}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-sand-200 flex items-center justify-between gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      className="py-1 px-2.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1"
                    >
                      <Send className="w-3 h-3 text-[#25D366]" />
                      <span>Relancer</span>
                    </a>

                    <button
                      onClick={() => handleMarkAsPaid(sub.id)}
                      className="py-1 px-2.5 rounded bg-forest-100 text-forest-900 font-bold text-[11px]"
                    >
                      Payé (+30j)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-2xl p-5 border border-sand-300 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sand-200">
          <div>
            <h3 className="font-display text-base font-bold text-ink-primary">
              Registre des Abonnements (5 000 FCFA/mois)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-ink-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrer client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-sand-50 border border-sand-300 rounded-lg pl-7 pr-3 py-1 text-xs text-ink-primary w-40"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-sand-50 border border-sand-300 rounded-lg px-2 py-1 text-xs text-ink-primary"
            >
              <option value="Tous">Tous</option>
              <option value="active">Actif</option>
              <option value="expiring_soon">Échéance &lt; 30j</option>
              <option value="overdue">En retard</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sand-200 text-ink-muted uppercase text-[10px]">
                <th className="pb-2.5 font-bold">Client</th>
                <th className="pb-2.5 font-bold">Contact</th>
                <th className="pb-2.5 font-bold">Tarif</th>
                <th className="pb-2.5 font-bold">Échéance</th>
                <th className="pb-2.5 font-bold">Statut</th>
                <th className="pb-2.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {filteredSubs.map((sub) => {
                const waUrl = getWhatsAppRenewalUrl(sub);

                return (
                  <tr key={sub.id} className="hover:bg-sand-50">
                    <td className="py-3 font-bold text-ink-primary">{sub.businessName}</td>
                    <td className="py-3 text-ink-secondary">{sub.contactName} ({sub.phone})</td>
                    <td className="py-3 font-bold text-forest-800">{formatFCFA(sub.amount)}</td>
                    <td className="py-3">{sub.nextRenewalDate}</td>
                    <td className="py-3">
                      {sub.status === "active" ? (
                        <span className="text-[11px] font-semibold text-emerald-800">Actif</span>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-800">Échéance</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={waUrl}
                          target="_blank"
                          className="p-1 rounded bg-sand-100 hover:bg-sand-200"
                        >
                          <Send className="w-3 h-3 text-[#25D366]" />
                        </a>
                        <button
                          onClick={() => handleMarkAsPaid(sub.id)}
                          className="px-2 py-0.5 rounded bg-forest-900 text-white text-[10px] font-bold"
                        >
                          +30j
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

      {/* MODAL AJOUT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-sand-300 space-y-4 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded text-ink-muted hover:text-ink-primary"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="font-display text-base font-bold text-ink-primary">
                Nouvel Abonnement (5 000 FCFA/m)
              </h3>
            </div>

            <form onSubmit={handleAddSubscription} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-ink-muted uppercase mb-1">
                  Établissement *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Le Braisé d'Or"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-300 rounded-lg px-2.5 py-1.5 text-xs text-ink-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-ink-muted uppercase mb-1">
                  Contact
                </label>
                <input
                  type="text"
                  placeholder="Nom du gérant"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-300 rounded-lg px-2.5 py-1.5 text-xs text-ink-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-ink-muted uppercase mb-1">
                  Téléphone WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+229 97 00 00 00"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-300 rounded-lg px-2.5 py-1.5 text-xs text-ink-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-sand-300 text-ink-muted"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-forest-900 text-white px-3.5 py-1.5 rounded-lg font-bold"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
