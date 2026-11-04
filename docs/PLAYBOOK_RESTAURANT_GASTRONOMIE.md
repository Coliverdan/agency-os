# 🏛️ BLUEPRINT & PLAYBOOK : SITES DE RESTAURATION HAUT DE GAMME
> **Framework d'Ingénierie Web, Direction Artistique Gastronomique & Méthode de Vente Amadou Fall (Objectif 1M FCFA/mois)**

Ce document rassemble l'ensemble des règles de design, d'animation GSAP, de formulaires WhatsApp-First et de techniques de prospection commerciale testées sur le projet **Le Châblis** et réutilisables à l'infini pour n'importe quel autre restaurant, hôtel ou lounge.

---

## 1. DIRECTION ARTISTIQUE (DA) & DESIGN SYSTEM

### Palette Chromatique Stricte (Zéro Dégradé Kitsch, 100% Flat & Sombre)
* **Fond Primaire Mat :** `#040D10` (Noir caviar / ardoise profond). Met en valeur les verres à vin, les tables et la dorure.
* **Accent Doré :** `#FFD28D` (Champagne gold). Utilisé pour les bordures fines (1px), badges de statut, sous-titres et icônes.
* **Texte Principal :** `#FFFFFF` (Blanc pur). Contraste parfait sur fond `#040D10`.
* **Texte Secondaire :** `#C8C8C8` (Gris doux). Descriptions, adresses et mentions de réassurance.
* **Bouton WhatsApp Conversion :** `#25D366` (Vert officiel WhatsApp) avec texte et icône en blanc `#FFFFFF`.
* **Surfaces de Saisie :** `#FFFFFF` (Blanc céramique) avec texte `#111111` pour une ergonomie optimale sur smartphone sans reflets.

### Duo Typographique Gastronomique
* **Titres & Display :** `Baskervville` (Serif éditorial, élégance intemporelle).
* **Textes Courants, Boutons & Inputs :** `Prompt` ou `Plus Jakarta Sans` (Sans-serif géométrique, ultra-lisible sur mobile).

---

## 2. ARCHITECTURE DE PAGE (8 BLOCS GAGNANTS)

1. **Preloader Ultra-Rapide (0.7s) :**
   - Logo circulaire blanc au centre + anneau tournant blanc pur (`border-top-color: #FFFFFF !important`). Disparition en 700ms pour ne pas ralentir le prospect.
2. **Hero Immersif avec Dégradé Noir Vertical :**
   - Calque vertical supérieur : `linear-gradient(180deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.00) 100%)`.
   - Permet aux écrits et au menu d'être ultra-lisibles même sur photo claire.
3. **L'Atmosphère & Histoire (Split Asymétrique) :**
   - Récit court (3 phrases maximum) valorisant le chef, la cave et l'art de recevoir.
4. **Vidéos & Reels d'Accès :**
   - Lecteur vidéo vertical ou bannière animée avec zoom au scroll (`data-speed="1.1"`).
5. **La Carte & Cave à Vins :**
   - Onglets de filtrage (Entrées, Plats, Desserts, Grands Crus) avec prix clairs en FCFA / EUR.
6. **Événement Spécial / Moment Fort :**
   - Soirée dégustation, Beaujolais Nouveau, Saint-Valentin, Soirée Jazz.
7. **Avis Certifiés Google Maps (4.4 / 5.0) :**
   - Avis textuels de vrais guides locaux pour une preuve sociale immédiate.
8. **Moteur de Réservation Instantanée WhatsApp-First :**
   - Formulaire épuré sans fond lourd, sélection de date et d'heure en 1 clic.
9. **Bouton d'Itinéraire Google Maps :**
   - Bouton d'action ouvrant directement l'application Google Maps avec les coordonnées GPS exactes.
10. **Footer Prestigieux :**
    - Horaires des services midi/soir, adresse exacte et bouton WhatsApp permanent.

---

## 3. MOTEUR D'ANIMATION GSAP 3 & PERFORMANCE

### Configuration ScrollSmoother
```javascript
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const smoother = ScrollSmoother.create({
  content: "#scrollsmoother-container",
  smooth: 1.1,
  normalizeScroll: true,
  ignoreMobileResize: true,
  effects: window.innerWidth > 991 ? true : false,
  smoothTouch: true,
});
```

### Handler Universel de Navigation & Fermeture Menu
```javascript
$(document).on('click', 'a[href^="#"]', function(e) {
  var href = $(this).attr('href');
  if (href && href.length > 1) {
    var target = $(href);
    if (target.length) {
      e.preventDefault();

      // Fermer le menu hamburger plein écran si ouvert
      var akMenuToggle = document.getElementById('akMenuToggle');
      var topMenuLi = document.querySelector('.top-main-menu-li');
      if (topMenuLi && window.getComputedStyle(topMenuLi).display !== 'none') {
        if (akMenuToggle) akMenuToggle.click();
      }

      // Scroll fluide GSAP
      setTimeout(function() {
        if (window.ScrollSmoother && typeof ScrollSmoother.get === 'function' && ScrollSmoother.get()) {
          try {
            ScrollSmoother.get().scrollTo(target[0], true, 'top top');
          } catch(err) {
            target[0].scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
        }
      }, 120);
    }
  }
});
```

---

## 4. MOTEUR DE RÉSERVATION WHATSAPP (ZÉRO BASE DE DONNÉES)

```javascript
var bookingForm = document.getElementById('chablis-booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('cust-name').value.trim() || 'Client';
    var guests = document.getElementById('cust-guests').value;
    var date = document.getElementById('cust-date').value;
    var time = document.getElementById('cust-time').value;

    var msg = "Bonjour " + restaurantName + ", je souhaite effectuer une réservation :\n\n" +
              "• Nom : " + name + "\n" +
              "• Date : " + date + "\n" +
              "• Heure : " + time + "\n" +
              "• Nombre de personnes : " + guests + "\n\n" +
              "Merci de me confirmer la disponibilité.";

    var url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(msg);
    window.open(url, '_blank');
  });
}
```

---

## 5. MÉTHODE COMMERCIALE & PITCH CLIENT (INSPIRÉE D'AMADOU FALL)

### La Règle d'Or : L'Offre en 1 Seule Phrase
> *« Nous créons la vitrine digitale officielle de votre restaurant pour transformer vos curieux et vos abonnés en réservations de tables directes sur votre WhatsApp, sans aucune commission et sans que vous n'ayez rien à gérer techniquement. »*

### Script A : Prospection Physique au Restaurant (Entre 15h00 et 17h00)
1. **Accroche :** Féliciter l'accueil et demander le gérant/propriétaire.
2. **Le Déclic :** *"Je suis consultant digital spécialisé dans les tables de prestige à [Ville]. Quand un client cherche votre table pour un dîner d'affaires ou un événement, il tombe sur des informations incomplètes. Au lieu de vous promettre des choses dans le vent, mon équipe a déjà conçu votre prototype interactif sur nos serveurs."*
3. **La Démonstration Mobile :** Tendre votre téléphone et lui faire cliquer sur la réservation WhatsApp.
4. **Le Closing :** *"Le site est prêt. On branche votre nom de domaine propre et vous recevez vos premières réservations d'ici 48 heures."*

### Script B : Message WhatsApp Direct avec Lien Vercel
```text
Bonjour [Nom du Gérant],

Grand admirateur de la table du [Nom du Restaurant], j'ai remarqué que votre présence en ligne méritait une vitrine à la hauteur de votre standing.

Plutôt que de simples promesses, mon agence a pris l'initiative de concevoir un prototype fonctionnel et interactif pour votre établissement :

👉 [Insérer le lien Vercel du site]

Ce que nous y avons configuré :
• Système de réservation instantané relié directement à votre WhatsApp officiel (zéro commission type plateforme tierce).
• Intégration de vos vidéos d'ambiance et d'itinéraire pour guider vos convives.
• Mise en avant de vos plats signatures et événements du moment.
• Accès itinéraire Google Maps en 1 clic.

Le site est prêt et optimisé smartphone. Seriez-vous disponible 5 minutes demain après-midi pour que je vous montre comment l'activer avec votre propre nom de domaine ?
```

---

## 6. LE PLAN POUR ATTEINDRE 1 MILLION FCFA / MOIS (AMADOU FALL)

* **Objectif Mensuel :** 60 prises de contact ciblées (2 visites ou messages par jour ouvré).
* **Taux de Conversion Démo :** ~8 à 10% (grâce à l'effet de surprise du site déjà monté).
* **Résultat :** 5 ventes par mois.
  - **Frais de Création One-Shot :** 5 × 175 000 FCFA = **875 000 FCFA**.
  - **Abonnements Maintenance / Mises à jour :** 15 clients × 15 000 FCFA/mois = **225 000 FCFA**.
  - **TOTAL :** **1 100 000 FCFA / MOIS de trésorerie nette**.
