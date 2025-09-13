# MkDocs : Configuration de Base et Personnalisation

MkDocs est un générateur de site statique rapide, simple et absolument génial, conçu pour construire des sites de documentation de projet. Il prend vos fichiers Markdown et les transforme en un site web entièrement navigable.

## Fichier de Configuration (`mkdocs.yml`)

Le cœur de votre site MkDocs est le fichier `mkdocs.yml`. C'est là que vous définissez le nom de votre site, sa navigation, le thème, et d'autres paramètres.

```yaml
site_name: Mon Super Guide
site_url: https://utilisateur.github.io/mon-super-guide/
site_description: Un guide pour apprendre MkDocs et GitHub Actions.

# Thème Material for MkDocs
theme:
  name: material
  palette:
    - scheme: slate # Thème sombre par défaut
      primary: blue grey
      accent: light blue
      toggle:
        icon: material/brightness-7
        name: Passer au mode clair
    - scheme: default # Thème clair
      primary: blue grey
      accent: light blue
      toggle:
        icon: material/brightness-4
        name: Passer au mode sombre
  features:
    - navigation.sections # Navigation verticale avec sections repliables
    # - navigation.tabs # Pour une navigation horizontale en haut (désactivé pour ce guide)
    # - toc.integrate # Pour intégrer la table des matières dans la barre latérale (désactivé pour ce guide)
    - search.highlight
    - content.tabs.link
  icon:
    logo: material/book-open-variant

# Répertoire contenant vos fichiers Markdown
docs_dir: docs

# Répertoire de sortie pour le site généré (par défaut: site)
site_dir: site

# URL du dépôt GitHub (important pour GitHub Pages)
repo_url: https://github.com/utilisateur/mon-super-guide

# Utiliser des URLs de répertoire (ex: /section/ au lieu de /section.html)
use_directory_urls: true

# Définition de la structure de navigation
nav:
  - Accueil: index.md
  - Introduction aux Actions GitHub: github_actions_basics.md
  - Configuration de MkDocs: mkdocs_setup.md
  - Problèmes Courants et Solutions:
    - Erreurs 404: common_issues_and_solutions.md#erreurs-404
    - Problèmes de Navigation: common_issues_and_solutions.md#problemes-de-navigation
  - Sujets Avancés: advanced_topics.md

# Extensions Markdown (pour des fonctionnalités supplémentaires)
markdown_extensions:
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.tabbed: {alternate_style: true}
  - attr_list
  - md_in_html
  - pymdownx.wikilinks # Pour les liens de type [[wikilink]]

# Plugins MkDocs (pour des fonctionnalités plus complexes)
plugins:
  - search
```

## Structure des Fichiers

Votre documentation Markdown doit être placée dans le répertoire spécifié par `docs_dir` (généralement `docs/`).

```
mon-super-guide/
├── mkdocs.yml
├── .github/
│   └── workflows/
│       └── deploy-docs.yml
└── docs/
    ├── index.md
    ├── github_actions_basics.md
    ├── mkdocs_setup.md
    └── ... (vos autres fichiers Markdown)
```

## Prévisualisation Locale

Avant de déployer, vous pouvez prévisualiser votre site localement. Assurez-vous d'avoir MkDocs et le thème Material installés (`pip install mkdocs mkdocs-material`).

```bash
mkdocs serve
```

Ouvrez votre navigateur à `http://127.0.0.1:8000` pour voir votre site.
