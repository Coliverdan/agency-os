import { BusinessItem, PipelineStage, SubscriptionItem } from "@/types";
import { INITIAL_BUSINESSES, INITIAL_SUBSCRIPTIONS } from "./mock-data";

const STORAGE_KEY_BIZ = "agency_os_crm_businesses_v1";
const STORAGE_KEY_SUBS = "agency_os_crm_subscriptions_v1";

export function loadStoredBusinesses(): BusinessItem[] {
  if (typeof window === "undefined") {
    return INITIAL_BUSINESSES;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BIZ);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_BIZ, JSON.stringify(INITIAL_BUSINESSES));
      return INITIAL_BUSINESSES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erreur lecture localStorage businesses", e);
    return INITIAL_BUSINESSES;
  }
}

export function saveBusinesses(items: BusinessItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_BIZ, JSON.stringify(items));
    window.dispatchEvent(new Event("agency-os-data-change"));
  } catch (e) {
    console.error("Erreur écriture localStorage businesses", e);
  }
}

export function loadStoredSubscriptions(): SubscriptionItem[] {
  if (typeof window === "undefined") {
    return INITIAL_SUBSCRIPTIONS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SUBS, JSON.stringify(INITIAL_SUBSCRIPTIONS));
      return INITIAL_SUBSCRIPTIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erreur lecture localStorage subscriptions", e);
    return INITIAL_SUBSCRIPTIONS;
  }
}

export function saveSubscriptions(items: SubscriptionItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_SUBS, JSON.stringify(items));
    window.dispatchEvent(new Event("agency-os-data-change"));
  } catch (e) {
    console.error("Erreur écriture localStorage subscriptions", e);
  }
}

export function generateAntigravityJson(biz: BusinessItem) {
  return {
    $schema: "https://antigravity.agency/schemas/local-business-v1.json",
    generator: "Agency OS by Google AntiGravity",
    generatedAt: new Date().toISOString(),
    business: {
      id: biz.id,
      slug: biz.slug,
      name: biz.name,
      sector: biz.sector,
      city: biz.city,
      neighborhood: biz.neighborhood,
      address: biz.address,
      phoneInternational: biz.phone,
      googleRating: biz.googleRating,
      reviewCount: biz.reviewCount,
      openingHours: biz.openingHours,
      hasWebsite: false,
    },
    offer: {
      setupPriceFCFA: 30000,
      monthlyMaintenanceFCFA: 5000,
      deliveryHours: 48,
      includedFeatures: [
        "Vitrine Responsive Mobile-First & Anti-Slop",
        "Bouton WhatsApp Flottant Haute Conversion",
        "Carte & Menus avec Tarifs en FCFA",
        "Intégration Avis Google Certifiés",
        "Hébergement Haute Disponibilité & Nom de Domaine .com",
      ],
    },
    catalog: biz.services,
    gallery: biz.photos,
    verifiedReviews: biz.reviews,
    antigravityConfig: {
      typography: {
        titleFont:
          biz.sector === "Restaurants"
            ? "Playfair Display"
            : biz.sector === "Salons de coiffure"
            ? "Cormorant Garamond"
            : biz.sector === "Cliniques"
            ? "Outfit"
            : "Plus Jakarta Sans",
        bodyFont: "Plus Jakarta Sans",
      },
      colorPalette: {
        primary60: "#0F1319",
        structure30: "#FFFFFF",
        accent10:
          biz.sector === "Restaurants"
            ? "#D4AF37"
            : biz.sector === "Salons de coiffure"
            ? "#C59564"
            : "#0EA5E9",
      },
      demoMode: {
        urgencyBanner: true,
        countdownDurationHours: 48,
        telemetryEndpoint: `/api/track-view?site=${biz.slug}`,
      },
    },
  };
}

export function buildWhatsAppPitch(biz: BusinessItem, origin: string = ""): {
  url: string;
  messageText: string;
} {
  const cleanPhone = biz.phone.replace(/[^0-9]/g, "");
  const demoFullUrl = origin
    ? `${origin}${biz.demoUrl}?demo=true`
    : `https://agency-os-production.vercel.app${biz.demoUrl}?demo=true`;

  const messageText = `Bonjour ${biz.name} 👋,

J'ai remarqué votre excellente note Google de ${biz.googleRating}/5 (${biz.reviewCount} avis clients) à ${biz.neighborhood}, ${biz.city} ! 🌟

Pour vous permettre d'accueillir encore plus de clients et recevoir des réservations directes sur WhatsApp, notre agence a conçu une maquette complète et interactive de votre futur site web officiel :

👉 Voir votre maquette en direct : ${demoFullUrl}

💡 L'activation officielle de votre site avec nom de domaine dédié, affichage de votre menu/prestations en FCFA et support technique est à seulement 30 000 FCFA (paiement Mobile Money possible après validation).

Souhaitez-vous que je vous active le site officiel aujourd'hui ?`;

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
  return { url, messageText };
}
