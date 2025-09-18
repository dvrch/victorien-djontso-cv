# Svelte 3D Viewer - Portfolio de Victorien Djontso

## Description

Application web SvelteKit présentant le portfolio de Victorien Djontso, architecte et développeur spécialisé en BIM et technologies 3D. L'application inclut une visualisation 3D interactive utilisant Three.js.

## Fonctionnalités

- **Portfolio interactif** avec navigation entre différentes sections
- **Visualisation 3D** avec modèle de vaisseau spatial
- **CV en ligne** avec formatage Markdown
- **Interface responsive** avec sidebar de navigation
- **Pré-rendu statique** pour un déploiement optimal

## Structure du projet

```
src/
├── lib/docs/           # Composants de documentation
├── routes/             # Pages et routage SvelteKit
│   ├── [slug]/        # Pages dynamiques
│   ├── +layout.svelte # Layout principal
│   └── +page.svelte   # Page d'accueil
└── app.html           # Template HTML principal

static/
├── images/portfolio/   # Images du portfolio
├── models/            # Modèles 3D (GLB)
└── favicon.png        # Icône du site
```

## Installation et développement

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Démarrer le serveur de développement :**
   ```bash
   npm run dev
   ```

3. **Construire pour la production :**
   ```bash
   npm run build
   ```

4. **Prévisualiser la version de production :**
   ```bash
   npm run preview
   ```

## Technologies utilisées

- **SvelteKit** - Framework web moderne
- **Three.js** - Bibliothèque 3D JavaScript
- **Marked** - Parseur Markdown
- **Vite** - Outil de build rapide

## Déploiement

L'application est configurée pour être déployée sur GitHub Pages avec le chemin de base `/victorien-djontso-cv/svelte-3d-viewer`.

## Pages disponibles

- **Accueil** - Vue d'ensemble du portfolio
- **English CV** - CV en anglais
- **CV Imprimable** - Version imprimable du CV
- **Réalisations** - Projets et réalisations
- **GitHub Actions Basics** - Documentation technique
- **MkDocs Setup** - Configuration MkDocs
- **Common Issues** - Solutions aux problèmes courants
- **Advanced Topics** - Sujets avancés
- **Svelte 3D Integration** - Intégration 3D avec Svelte

## Contact

- **Email :** dvrchipro@gmail.com
- **GitHub :** [dvrch](https://github.com/dvrch)
- **LinkedIn :** [djontso-victorien](https://www.linkedin.com/in/djontso-victorien)
- **YouTube :** [Chaîne YouTube](https://www.youtube.com/channel/UCiq3gafuKtIRvfB5_JGHTAw)
