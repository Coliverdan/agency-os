---
name: local-site-builder-anti-slop
description: Spécification infaillible et anti-bouillie IA pour la génération et le design de sites vitrines de commerces locaux (Afrique francophone, Mobile Money, WhatsApp-First) avec Google Antigravity.
---

# CONSTITUTION DESIGN & MOTEUR VITRINE — ANTI-SLOP (Google AntiGravity)

Ce document constitue la règle absolue et non négociable pour Agency OS et la génération de sites vitrines locaux.

---

## 1. LES 6 INTERDICTIONS FORMELLES (ANTI-BOUILLIE IA)

1. **BANNISSEMENT ABSOLU DES EMOJIS & ICÔNES 3D :**
   - ❌ **INTERDIT :** Tout emoji dans l'interface, les badges ou les boutons (ex: 👁️, 🍽️, 💇‍♀️, 📍, 📞, 🌟, ⚠️, 👋). Interdiction totale des icônes 3D, des fausses perspectives ou des icônes emprisonnées dans des ronds colorés criards.
   - ✅ **OBLIGATOIRE :** Utilisation exclusive de la librairie **Lucide Icons** en version vectorielle ultra-fine (`stroke-width="1.25"` à `1.5"`). Les icônes sont strictement monochromes et discrètes.

2. **BANNISSEMENT DE TOUT DÉGRADÉ DE FOND (FONDS 100% UNIS) :**
   - ❌ **INTERDIT :** Tout dégradé linéaire (`bg-gradient-to-...`), radial, ou formes de lueur floues en arrière-plan (`blur-3xl`, `bg-lime-400/10 rounded-full blur-2xl`).
   - ✅ **OBLIGATOIRE :** Fonds **100% unis et mats** (Flat Solid Colors). Ex: Blanc pur `#FFFFFF`, Fond sable studio clair uni `#F8F9F5`, Vert forêt profond uni `#0B3528`, Gris feutré uni `#0F1319`. Pas de gradient.

3. **BANNISSEMENT DE L'OVER-TEXTE & DE LA SURDESCRIPTION :**
   - ❌ **INTERDIT :** Les longs paragraphes explicatifs, les surdescriptions marketing creuses, les phrases de remplissage et le texte bavard.
   - ✅ **OBLIGATOIRE :** Textes courts, directs, nets et professionnels. Titres brefs, sous-textes d'une seule ligne maximum, présentation synthétique orientée données (chiffres, prix nets, actions directes).

4. **BANNISSEMENT DU CENTRAGE SYSTÉMATIQUE & DU TOUT-INTER :**
   - ❌ **INTERDIT :** Centrer tous les textes et boutons au milieu de l'écran. Interdit formel d'utiliser la police *Inter* pour les titres.
   - ✅ **OBLIGATOIRE :** Alignements asymétriques (splits 60/40, disposition gauche avec visuel décalé) et typographies de caractère avec Google Fonts.

5. **BANNISSEMENT DES CONTENEURS À SCROLL INTERNES ("TIROIRS") :**
   - ❌ **INTERDIT :** Toute boîte à hauteur fixe (`h-64`, `overflow-y-auto`) forçant le visiteur à scroller à l'intérieur d'un encart avec barre de défilement native.
   - ✅ **OBLIGATOIRE :** Déroulement naturel selon le flux de la page ou grille fluide.

6. **SCANNER GOOGLE MAPS OPÉRATIONNEL :**
   - ✅ **OBLIGATOIRE :** Moteur de scan intégré permettant de requêter en direct les commerces locaux par ville/secteur via l'API Google Places ou moteur de recherche local pour identifier et importer les commerces sans site web.

---

## 2. DUOS TYPOGRAPHIQUES PAR SECTEUR (SANS INTER EN TITRE)

| Secteur d'activité | Police des Titres (Display Font) | Police de Corps (Body Font) | Ambiance visuelle |
| :--- | :--- | :--- | :--- |
| **Restaurants, Hôtels, Cafés** | `Playfair Display` ou `Cinzel` | `Plus Jakarta Sans` | Luxe, Gastronomie, Chaleur |
| **Beauté, Salons, Spas, Mode** | `Cormorant Garamond` ou `Syne` | `DM Sans` | Élégance, Raffinement, Épure |
| **Cliniques, Dentistes, Santé** | `Cabinet Grotesk` ou `Outfit` | `Plus Jakarta Sans` | Sérénité, Clarté, Rigueur |
| **Fitness, Sport, Garages** | `Space Grotesk` ou `Sora` | `Plus Jakarta Sans` | Énergie, Puissance, Précision |

---

## 3. MODE DÉMO DYNAMIQUE vs PRODUCTION

- **Mode Démo (`?demo=true`) :**
  - Bandeau supérieur fixe monochrome uni avec compte à rebours discret et CTA d'activation WhatsApp à 30 000 FCFA.
  - Télémétrie silencieuse `fetch('/api/track-view?site=[slug]')` avertissant le CRM sans icône 3D.
- **Mode Production officiel (sans paramètre) :**
  - Bandeau absent, 100% dédié à la marque du client.
