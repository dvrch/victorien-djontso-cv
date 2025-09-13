# Comprendre GitHub Actions

GitHub Actions est une plateforme d'intégration continue (CI) et de déploiement continu (CD) directement intégrée à GitHub. Elle vous permet d'automatiser, de personnaliser et d'exécuter vos workflows de développement directement dans votre dépôt GitHub.

## Pourquoi utiliser GitHub Actions pour la documentation ?

*   **Automatisation du déploiement :** Chaque fois que vous poussez des modifications à votre documentation (fichiers Markdown), GitHub Actions peut automatiquement reconstruire et déployer votre site web.
*   **Cohérence :** Garantit que votre documentation est toujours à jour avec la dernière version de votre code ou de vos informations.
*   **Gain de temps :** Élimine les tâches manuelles répétitives de construction et de déploiement.
*   **Environnement contrôlé :** Les workflows s'exécutent dans des environnements virtuels propres, garantissant la reproductibilité.

## Concepts Clés

*   **Workflow :** Un processus automatisé composé d'une ou plusieurs tâches (jobs).
*   **Job :** Un ensemble d'étapes (steps) qui s'exécutent sur le même runner.
*   **Step :** Une tâche individuelle qui peut exécuter une commande (shell) ou utiliser une action (action).
*   **Action :** Une application personnalisée ou réutilisable qui effectue une tâche spécifique (par exemple, `actions/checkout` pour cloner votre dépôt, `actions/setup-python` pour configurer Python).
*   **Runner :** Le serveur qui exécute votre workflow. GitHub fournit des runners hébergés (machines virtuelles) ou vous pouvez héberger les vôtres.

## Structure d'un Workflow (`.yml`)

Les workflows sont définis dans des fichiers `.yml` (YAML) situés dans le répertoire `.github/workflows/` de votre dépôt.

```yaml
name: Mon Premier Workflow

on:
  push:
    branches:
      - main # Déclenche le workflow sur les pushes vers la branche main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest # Exécute le job sur un runner Ubuntu
    steps:
      - name: Checkout code
        uses: actions/checkout@v4 # Cloner le dépôt

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.x'

      - name: Install dependencies
        run: pip install mkdocs mkdocs-material

      - name: Build and Deploy MkDocs site
        run: mkdocs gh-deploy --force
```

Ce workflow simple clone le dépôt, configure Python, installe MkDocs et son thème, puis déploie le site sur GitHub Pages. Nous verrons plus en détail comment adapter cela à nos besoins spécifiques.
