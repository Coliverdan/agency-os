export type SectorType =
  | "Restaurants"
  | "Salons de coiffure"
  | "Instituts"
  | "Cliniques"
  | "Boutiques";

export type PipelineStage =
  | "prospect_detecte"
  | "projet_initialise"
  | "demo_en_ligne"
  | "whatsapp_envoye"
  | "appel_effectue"
  | "vente_validee"
  | "perdu_refuse";

export interface PipelineColumnConfig {
  id: PipelineStage;
  title: string;
  badgeColor: string;
  dotColor: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ServiceItem {
  name: string;
  price: number;
  description: string;
}

export interface BusinessItem {
  id: string;
  name: string;
  slug: string;
  sector: SectorType;
  city: string;
  neighborhood: string;
  googleRating: number;
  reviewCount: number;
  address: string;
  phone: string;
  website: string | null;
  photos: [string, string, string, string];
  services: ServiceItem[];
  openingHours: string;
  reviews: ReviewItem[];
  crmStatus: PipelineStage;
  demoUrl: string;
  demoLastViewed?: string;
  demoViewCount: number;
  pitchSentAt?: string;
  callStatus?: "interested" | "callback" | "not_interested" | "not_called";
  callNotes?: string;
  lastInteraction?: string;
  dealValue: number; // 30000 FCFA
  monthlyRetainer: number; // 5000 FCFA
  createdAt: string;
}

export interface SubscriptionItem {
  id: string;
  businessId: string;
  businessName: string;
  contactName: string;
  phone: string;
  planName: string;
  amount: number; // 5000 FCFA
  startDate: string;
  nextRenewalDate: string;
  status: "active" | "expiring_soon" | "overdue";
  daysRemaining: number;
}

export interface TelemetryEvent {
  siteSlug: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}
