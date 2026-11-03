---
name: premium-design
description: Anti-AI-slop premium web design for Vivamelo. Use when restyling the landing or app, choosing fonts, colors, spacing, or validating a design before shipping. Triggers on: design, refonte, premium, AI slop, landing, typographie, couleurs, inspiration.
---

# Premium Design — Vivamelo

Méthode anti « AI Slop » adaptée au projet Vivamelo (Next.js 16 + Tailwind CSS 4, français, Mobile Money, public Afrique francophone). Tout redesign DOIT respecter les 5 modules ci-dessous + la checklist finale. En cas de conflit, ces règles gagnent sur les goûts par défaut.

## PROTOCOLE D'INTERACTION (obligatoire, prioritaire sur tout le reste)

Ne JAMAIS exécuter un module sans avoir posé ses questions d'abord via l'outil de questions, et sans réponse de l'utilisateur. Déroulé imposé :

1. Annoncer le module en cours (ex. « Module 01 — Inspiration »).
2. Poser les questions du module (choix proposés + réponse libre). Attendre la réponse.
3. Résumer ce qui a été retenu, demander validation explicite (« Je valide et tu passes au module suivant ? »).
4. Seulement après validation : exécuter, puis passer au module suivant.

Si l'utilisateur n'a pas l'élément demandé (pas de screenshots, pas de police...), proposer une alternative concrète (ex. créer ensemble les visuels avec Nano Banana) et faire valider avant de continuer. Ne jamais inventer les entrées utilisateur en silence.

### Inventaire des composants actuels (à lister à l'utilisateur au Module 01)

Landing `/` : nav, hero centré, badges styles musicaux, playlist 4 cartes, teaser pricing, avis 3 cartes, FAQ accordéon, footer.
App `/app` : sidebar, dashboard, wizard créer (5 étapes), Ma Musique + player, Notes/packs, Shorts (vide), Stats, login.
Pour chaque composant refondu : demander à l'utilisateur d'aller chercher 1–2 inspirations du MÊME type de composant (ex. « ramène-moi 2 grilles tarifaires que tu aimes ») et, pour les composants à choix (comparaison, pricing, hero), proposer 2–3 modèles et faire choisir (A/B/C) avant d'implémenter.

## Module 01 — Tableau d'inspiration (obligatoire avant toute refonte)

QUESTIONS À POSER : as-tu des URLs et/ou des captures d'écran à me fournir (3 à 5 refs) ? Pour chaque ref, quel élément précis emprunter ? Quels composants du site veux-tu remplacer en priorité (lister l'inventaire ci-dessus et faire choisir) ? Pour chaque composant à refaire, demander d'aller chercher 1–2 inspirations du même type.
- Ne jamais partir de zéro : exiger 3 à 5 références avec, pour chacune, UN élément précis à emprunter (ex. « hero asymétrique 60/40 de X », « cartes pricing avec badge unique de Y »). S'inspirer, jamais copier.
- Le tableau d'inspiration de Vivamelo vit dans `docs/design-inspirations.md` (URLs + élément retenu par site). Si le fichier est vide, le signaler et attendre les références avant de dessiner.
- Chaque section livrée doit citer la référence dont elle s'inspire (commentaire ou message de commit).

## Module 02 — Typographie

QUESTIONS À POSER : as-tu des polices d'inspiration à me fournir (nom ou lien Google Fonts/Fontshare) ? Sinon, proposer 3 options adaptées à une marque musicale africaine festive et faire choisir avant d'implémenter.
- INTERDIT : Inter comme police de titres (signe distinctif du slop). Corps de texte : 16–18px, police lisible (Inter autorisé UNIQUEMENT pour le body).
- UNE SEULE police d'affichage pour tous les titres (ex. Space Grotesk, Sora, Clash Display via Fontshare, Fraunces si ton chaleureux). Graisse 600–700 pour le caractère.
- Hiérarchie stricte : hero `text-4xl md:text-6xl tracking-tighter leading-none`, sections `text-2xl md:text-3xl`, jamais plus de 3 tailles de titres par page.
- Implémentation : fonts via `next/font/google` (ou Fontshare link) dans `src/app/layout.tsx`, exposées en variables CSS, utilisées via classes utilitaires.

## Module 03 — Couleurs (un rôle par couleur)

QUESTIONS À POSER : as-tu une palette ou des couleurs Hex d'inspiration ? Quelle ambiance pour Vivamelo (vive, chaleureuse, premium...) ? Valider le trio final (base, texte, accent) + l'action unique réservée à l'accent avant d'implémenter.
- Base neutre majoritaire + texte net. ZÉRO dégradé (ni violet IA, ni orange→rouge actuel sauf décision branding explicite).
- Palette Vivamelo (modifiable une fois, puis verrouillée) : `--color-base` (fond), `--color-ink` (texte), `--color-accent` (UNE seule).
- L'accent n'apparaît QUE là où l'utilisateur doit regarder/cliquer : CTA principal, liens, mot-clé du hero, badge « Populaire ». Partout ailleurs : neutres.
- Définir la palette dans `@theme` de `src/app/globals.css`. Jamais de couleur arbitraire en dur dans les pages.

## Module 04 — Espacement & asymétrie

QUESTIONS À POSER : pour les composants à choix (hero, comparaison, pricing), proposer 2–3 modèles de disposition (A/B/C) et faire choisir avant d'implémenter. Faire valider le plan page par page.
- Casser le centrage systématique : hero et sections en split 50/50 ou alignement gauche avec visuel décalé ; le centré est réservé aux pages tunnel (login, étapes wizard).
- Grille 8 points : tous les espacements/marges/paddings en multiples de 8px (Tailwind : `p-2, p-4, p-6, p-8, gap-4, gap-6...`, bannir les valeurs impaires sauf `tracking-tighter` et bordures 1px).
- Chaque famille de layout (3-col cards, split texte+image, bandeau, bento) apparaît UNE SEULE FOIS par page ; 6+ sections ⇒ 4+ familles distinctes.

## Module 05 — Vrais médias & effets premium

QUESTIONS À POSER : as-tu déjà créé des images à me fournir (covers, photos, logo) ? Sinon, on les crée ensemble avec Nano Banana : demander le style visuel souhaité (photo concert, illustration, etc.) et valider chaque visuel avant intégration. Lister les 3 visuels prioritaires et les produire un par un.
- Placeholders emoji/« ♫ » interdits en version livrée : covers générées ou photos réelles (concerts, fêtes, studios africains), `next/image` obligatoire.
- Hero avec visuel fort + scroll cinématographique léger (CSS/sticky, pas de lib lourde sans besoin). Lecteur audio visible et soigné (les `<audio>` natifs bruts sont interdits : styler le player).
- Cohérence : mêmes teintes/filtres sur tous les visuels de la page.

## Checklist finale (bloquante avant livraison)

- [ ] 01 Inspiration : chaque section cite sa référence (`docs/design-inspirations.md` à jour).
- [ ] 02 Typo : pas d'Inter en titres, body 16–18px, une seule display font.
- [ ] 03 Couleurs : base neutre, zéro dégradé, accent réservé aux actions.
- [ ] 04 Espacement : asymétrie volontaire, grille 8pt, pas de layouts dupliqués.
- [ ] 05 Médias : visuels réels/cohérents, player audio stylé, `next/image`.
- [ ] Mobile-first vérifié (WhatsApp-first : CTA de partage testés à 360px).

Si un point échoue : le signaler explicitement, ne jamais livrer en silence.
