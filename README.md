# ⚡ Agency OS — Système Tout-en-Un pour Agence Web Locale

> **Version Anti-Slop & Vente Locale (Afrique Francophone) — Déployable en 1 clic sur Vercel.**

Agency OS est la plateforme de gestion et de closing pour agences web vendant des sites vitrines à forte conversion aux commerces locaux (Restaurants, Salons de coiffure, Instituts de beauté, Cliniques dentaires, Boutiques) en Afrique francophone (Cotonou, Abidjan, Douala, Dakar, Lomé).

---

## 🚀 Fonctionnalités Clés & Modules

### 1. Module Sourcing Local (`/sourcing`)
* **2 Filtres Déterminants :** Secteur d'activité et Ville / Quartier.
* **Mock Réaliste & Certifié :** Commerces locaux avec Note Google ≥ 4.5, nombre d'avis réels, adresse, téléphone au format international (`+229...`, `+225...`, `+237...`, etc.) et galerie de 4 photos d'illustration.
* **Filtre obligatoire :** Uniquement les commerces où le site web est inexistant (**100% d'opportunités à fort ROI**).
* **Bouton "Créer le projet Antigravity" :** Initialise la fiche dans le CRM et génère instantanément le fichier JSON `data-[slug].json` prêt à l'emploi avec modal de prévisualisation et téléchargement direct.

### 2. Module CRM & Pipeline Commercial (`/crm`)
* **Kanban 7 colonnes :**
  1. *Prospect Détecté*
  2. *Projet Initialisé (Antigravity)*
  3. *Démo en Ligne*
  4. *WhatsApp Envoyé*
  5. *Appel Effectué*
  6. *Vente Validée (30 000 FCFA)* (avec pluie de confettis !)
  7. *Perdu / Refusé*
* **Télémétrie en temps réel :** Dès qu'un prospect clique sur sa démo avec le paramètre `?demo=true`, un appel API silencieux est enregistré et un badge clignotant **« 👁️ Consulté il y a X minutes »** s'allume en direct sur sa carte !
* Bouton simulateur intégré pour tester le ping télémétrique en direct.

### 3. Module Prospection 1-Clic (`/crm/[id]`)
* **Bouton WhatsApp 1-Clic :** Génère automatiquement l'URL `https://wa.me/[telephone]?text=...` avec un message d'accroche personnalisé citant la note Google, le lien démo interactif et la proposition irrésistible à **30 000 FCFA**.
* **Section Téléphone & Script 30s :** Chronomètre interactif de 30 secondes déroulé en 3 phases (Accroche, Démo, Offre 30 000 FCFA) + boutons de compte-rendu instantanés (*Intéressé*, *Rappeler plus tard*, *Pas intéressé*) et bloc-notes persistant.

### 4. Module Finance & Revenus Récurrents (`/finances`)
* **Suivi du Cash Collecté :** Nombre de ventes validées × **30 000 FCFA**.
* **Suivi du MRR d'Abonnement :** Clients actifs × **5 000 FCFA / mois** (hébergement dédié et maintenance continue).
* **Alertes d'échéances à 30 jours :** Badges d'urgence avec bouton de relance WhatsApp prérempli en 1 clic.

### 5. Serveur de Fichiers Démo (`/public/sites/[slug]/index.html`)
* Servies directement par Next.js sous `/public/sites/[slug]/index.html`.
* **3 Démos complètes incluses :**
  * `le-braise-d-or` : Restaurant gastronomique à Cotonou (Haie Vive)
  * `institut-ebene-prestige` : Salon de coiffure & Spa à Abidjan (Cocody)
  * `clinique-sourire-plus` : Clinique dentaire & esthétique à Douala (Bonanjo)
* **Double Moteur Anti-Slop :**
  * Si `?demo=true` : Bandeau supérieur fixe d'urgence, décompte 48h dynamique et télémétrie active.
  * Si `demo=false` : Site officiel en production sans aucun bandeau.

---

## 🛠️ Stack Technique

* **Framework :** Next.js 15 (App Router)
* **Styling :** Tailwind CSS + Lucide Icons (stroke fine monochrome)
* **Langage :** TypeScript (Strict Mode)
* **Design :** Conforme à la charte visuelle (Palette Forest Green, Lime/Chartreuse, Studio Sand) et aux règles Anti-Slop.
* **Persistance :** Client-side localStorage synchronisé + API Routes `/api/track-view`, `/api/crm`, `/api/export-antigravity`.

---

## ⚡ Démarrage Rapide

```bash
# Installation des dépendances
pnpm install

# Lancer en développement
pnpm dev

# Build de production
pnpm build
pnpm start
```

## ☁️ Déploiement en 1 Clic sur Vercel

1. Pousser le dépôt sur GitHub / GitLab.
2. Importer le projet dans votre tableau de bord [Vercel](https://vercel.com).
3. Vercel détecte automatiquement Next.js 15. Cliquez sur **Deploy**.
