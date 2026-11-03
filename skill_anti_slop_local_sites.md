---
name: local-site-builder-anti-slop
description: Spécification infaillible et anti-bouillie IA pour la génération et le design de sites vitrines de commerces locaux (Afrique francophone, Mobile Money, WhatsApp-First) avec Google Antigravity.
---

# CONSTITUTION DESIGN & MOTEUR VITRINE — ANTI-SLOP (Google AntiGravity)

Ce document constitue la règle absolue et non négociable de génération de sites vitrines pour commerces locaux (Restaurants, Salons de coiffure & Beauté, Cliniques, Instituts, Salles de sport, Boutiques). Il fusionne la rigueur du design suisse/africain moderne et la mécanique commerciale de conversion locale.

En cas de conflit entre les goûts par défaut de l'IA et ces directives, **ces règles gagnent systématiquement sans exception**.

---

## 1. LES 4 INTERDICTIONS FORMELLES (ANTI-BOUILLIE IA)

1. **BANNISSEMENT DES ICÔNES SYSTÈME MULTICOLORES & EMOJIS :**
   - ❌ **INTERDIT :** Les icônes emoji (ex: 🍽️, 💇‍♀️, 📍) ou les icônes SVG colorées enfermées dans des ronds pastels (icône verte dans un rond vert clair, icône bleue dans un rond bleu clair). C'est le marqueur n°1 du travail amateur.
   - ✅ **OBLIGATOIRE :** Utilisation exclusive de la librairie **Lucide Icons** en version vectorielle ultra-fine (`stroke-width="1.5"` ou `1.25"`). Les icônes doivent être strictement **monochromes** (blanc sur fond sombre, ou graphite/ambre discret), intégrées sans encadré criard.

2. **BANNISSEMENT DES CONTENEURS À SCROLL INTERNES ("TIROIRS") :**
   - ❌ **INTERDIT :** Toute boîte à hauteur fixe (`h-64`, `max-h-80`, `overflow-y-scroll` ou `overflow-y-auto`) forçant le visiteur à scroller à l'intérieur d'un encart avec une barre de défilement native grise.
   - ✅ **OBLIGATOIRE :** Tout le contenu (menus, prestations, tarifs, avis) s'étale naturellement en hauteur selon le flux de la page, ou s'organise en grille asymétrique fluide, ou en défilement horizontal fluide sur mobile sans barre apparente (`overflow-x-auto no-scrollbar scroll-smooth`).

3. **BANNISSEMENT DU TON-SUR-TON SANS CONTRASTE & DÉGRADÉS IA :**
   - ❌ **INTERDIT :** Écrire en vert sur un fond vert, en gris clair sur du blanc, ou utiliser les dégradés violets/bleus typiques des templates IA génériques.
   - ✅ **OBLIGATOIRE (Règle 60-30-10) :**
     * **60 % (Fond dominant) :** Soit un sombre feutré profond (`#0B0F17` ou `#121212`), soit un blanc cassé noble (`#FAF9F6`), jamais un fond saturé.
     * **30 % (Structure & Typo) :** Blanc pur pour les titres, gris ardoise `#94A3B8` pour les descriptions, bordures subtiles (`border border-white/10` ou `border-black/5`).
     * **10 % (Accent unique) :** Une seule couleur de signature (Doré noble `#D4AF37`, Ambre chaleureux `#F59E0B`, ou Émeraude profond) réservée **exclusivement** aux boutons d'action clés et aux badges d'urgence.

4. **BANNISSEMENT DU CENTRAGE SYSTÉMATIQUE & DU TOUT-INTER :**
   - ❌ **INTERDIT :** Centrer tous les textes et boutons au milieu de l'écran. Interdit formel d'utiliser la police *Inter* pour les titres.
   - ✅ **OBLIGATOIRE :** Alignements asymétriques (splits 60/40, disposition gauche avec visuel décalé) et typographies de caractère avec Google Fonts.

---

## 2. DUOS TYPOGRAPHIQUES PAR SECTEUR (SANS INTER EN TITRE)

À chaque génération, AntiGravity doit injecter le duo de polices adapté au secteur :

| Secteur d'activité | Police des Titres (Display Font) | Police de Corps (Body Font) | Ambiance visuelle |
| :--- | :--- | :--- | :--- |
| **Restaurants, Hôtels, Cafés** | `Playfair Display` ou `Cinzel` | `Plus Jakarta Sans` | Luxe, Gastronomie, Chaleur |
| **Beauté, Salons, Spas, Mode** | `Cormorant Garamond` ou `Syne` | `DM Sans` | Élégance, Raffinement, Épure |
| **Cliniques, Dentistes, Santé** | `Cabinet Grotesk` ou `Outfit` | `Inter Tight` (16px min) | Sérénité, Clarté, Rigueur |
| **Fitness, Sport, Garages** | `Space Grotesk` ou `Sora` | `Plus Jakarta Sans` | Énergie, Puissance, Précision |

* **Hiérarchie :**
  * Titre Hero : `text-4xl md:text-6xl font-bold tracking-tight leading-none`
  * Titres de sections : `text-2xl md:text-3xl font-semibold`
  * Jamais plus de 3 tailles de titres différentes par page.

---

## 3. LE DOUBLE MOTEUR : DÉMO URGENTE vs PRODUCTION OFFICIELLE

Le code généré doit intégrer la gestion native du paramètre d'URL `?demo=true` :

### A. Mode Démo (`demo=true`)
1. **Bandeau Supérieur Fixe (Sticky Urgency Banner) :**
   - Fixé en haut de page (`sticky top-0 z-50`).
   - Fond ambre/rouge sombre élégant avec texte blanc contrasté.
   - Mention claire : *« ⚠️ Maquette officielle conçue pour [Nom du commerce] — Disponibilité prioritaire »*.
   - **Compte à rebours dynamique en direct :** Horloge temps réel (ex: 47h 58m 24s) calculée sur 48 heures.
   - **CTA d'activation :** Bouton blanc contrasté : *« Activer ce site officiel (30 000 FCFA) »* qui redirige vers le WhatsApp de l'agence (`https://wa.me/NUMERO_AGENCE?text=Bonjour,%20je%20souhaite%20activer%20le%20site%20officiel%20de%20[Nom]`).
2. **Télémétrie d'ouverture :**
   - Un appel silencieux en arrière-plan (`fetch('/api/track-view?site=[slug]')`) pour avertir le CRM que le gérant a ouvert le lien.

### B. Mode Production (`demo=false` ou sans paramètre)
- Le bandeau et le décompte sont totalement absents du DOM.
- Le site est 100 % à la marque du client, prêt à être relié à un nom de domaine officiel (`.com` ou extension locale).

---

## 4. ARCHITECTURE DES SECTIONS OBLIGATOIRES (100% ACHEVÉ)

Chaque site produit par AntiGravity doit contenir les 7 sections suivantes, parfaitement rédigées sans aucun *lorem ipsum* :

1. **Barre de Navigation :**
   - Nom du commerce dans la police de marque.
   - Indicateur en temps réel : `🟢 Ouvert actuellement` (ou horaires du jour).
   - Bouton d'action d'appel direct ou WhatsApp.

2. **Hero Section (Asymétrique 60/40) :**
   - Visuel haute définition du commerce ou du secteur.
   - Titre accrocheur rédigé pour attirer des clients (ex: *« Savourez l'authentique cuisine braisée à Cotonou »*).
   - Badge de preuve sociale : Note Google vérifiée (ex: *★ 4.8/5 sur 74 avis réels*).
   - Bouton principal WhatsApp vert officiel (`#25D366`) : *« Commander / Réserver sur WhatsApp »*.

3. **Prestations / Menu avec Tarifs en FCFA :**
   - Grille responsive sans aucun tiroir à scroll.
   - 6 à 8 prestations ou plats types avec photos, descriptions concises et prix nets affichés en FCFA (ex: *4 500 FCFA*).

4. **Galerie & Ambiance :**
   - Grille moderne asymétrique (type Bento) avec 4 photos réelles du commerce (ou unifiées avec la même température de couleur).
   - Micro-effets de zoom au survol (`scale-105 transition-all duration-300`).

5. **Avis Clients Google Réels :**
   - 3 témoignages réels extraits de la fiche Google avec prénoms réels, étoiles dorées et dates récentes.

6. **Horaires & Localisation :**
   - Tableau épuré des horaires d'ouverture (Lundi au Dimanche).
   - Adresse physique claire avec quartier.
   - Bouton interactif : *« Ouvrir l'itinéraire Google Maps »*.

7. **Bouton WhatsApp Flottant Mobile (Sticky Bottom-Right) :**
   - Bouton rond vert WhatsApp flottant en bas à droite (`fixed bottom-6 right-6 z-40`).
   - Ouvre directement la messagerie du commerce avec message d'accueil pré-rempli.

---

## 5. RÈGLES DE CODAGE & PERFORMANCE (AFRIQUE & MOBILE-FIRST)

1. **Stack Technique :**
   - Pur HTML5 + Tailwind CSS (via script CDN) + micro-script JavaScript Vanilla (pour le décompte et la détection d'URL).
   - Poids total de la page : inférieur à **1,5 Mo** (images compressées au format WebP).
   - Chargement en moins de 0,5 seconde sur connexion mobile 3G/4G.
2. **Grille 8 Points :**
   - Tous les espacements et marges doivent être des multiples de 8px (`p-4, p-8, py-12, gap-4, gap-8`).
3. **Cartes & Effets Modernes :**
   - Remplacer les ombres portées floues par des bordures subtiles : `bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:border-white/[0.2]`.

---

## 6. CHECKLIST BLOQUANTE AVANT LIVRAISON (ANTI-GRAVITY SELF-AUDIT)

Avant de livrer le code à l'utilisateur, l'agent AntiGravity doit cocher mentalement chaque point :

- [ ] **Zéro icône ronde multicolore :** Toutes les icônes sont de la librairie Lucide en stroke 1.5 monochrome.
- [ ] **Zéro boîte à scroll interne :** Aucun `overflow-y-scroll` ni barre grise au milieu de la page.
- [ ] **Typographie validée :** Aucune utilisation d'Inter pour les titres de sections ou le hero.
- [ ] **Contraste 60-30-10 :** Aucun texte ton-sur-ton illisible, fond noble, accent unique réservé aux actions.
- [ ] **Mode Démo opérationnel :** Le bandeau d'urgence avec compte à rebours 48h s'active bien avec `?demo=true` et disparaît sans le paramètre.
- [ ] **Monnaie & Coordonnées :** Tarifs indiqués en FCFA, numéros de téléphone au format international avec lien WhatsApp fonctionnel.
- [ ] **Mobile-First garanti :** Testé visuellement à 360px de largeur sans débordement horizontal.
