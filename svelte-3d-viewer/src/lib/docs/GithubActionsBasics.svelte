<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  let html = '';
  const markdown = `# Comprendre GitHub Actions\n\nGitHub Actions est une plateforme d'intégration continue (CI) et de déploiement continu (CD) directement intégrée à GitHub. Elle vous permet d'automatiser, de personnaliser et d'exécuter vos workflows de développement directement dans votre dépôt GitHub.\n\n## Pourquoi utiliser GitHub Actions pour la documentation ?\n\n*   **Automatisation du déploiement :** Chaque fois que vous poussez des modifications à votre documentation (fichiers Markdown), GitHub Actions peut automatiquement reconstruire et déployer votre site web.\n*   **Cohérence :** Garantit que votre documentation est toujours à jour avec la dernière version de votre code ou de vos informations.\n*   **Gain de temps :** Élimine les tâches manuelles répétitives de construction et de déploiement.\n*   **Environnement contrôlé :** Les workflows s'exécutent dans des environnements virtuels propres, garantissant la reproductibilité.\n\n## Concepts Clés\n\n*   **Workflow :** Un processus automatisé composé d'une ou plusieurs tâches (jobs).\n*   **Job :** Un ensemble d'étapes (steps) qui s'exécutent sur le même runner.\n*   **Step :** Une tâche individuelle qui peut exécuter une commande (shell) ou utiliser une action (action).\n*   **Action :** Une application personnalisée ou réutilisable qui effectue une tâche spécifique (par exemple, \`actions/checkout\` pour cloner votre dépôt, \`actions/setup-python\` pour configurer Python).\n*   **Runner :** Le serveur qui exécute votre workflow. GitHub fournit des runners hébergés (machines virtuelles) ou vous pouvez héberger les vôtres.\n\n## Structure d'un Workflow (\`.yml\`)\n\nLes workflows sont définis dans des fichiers \`.yml\` (YAML) situés dans le répertoire \`.github/workflows/\` de votre dépôt.\n\n\
```yaml\nname: Mon Premier Workflow\n\non:\n  push:\n    branches:\n      - main # Déclenche le workflow sur les pushes vers la branche main\n\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest # Exécute le job sur un runner Ubuntu\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4 # Cloner le dépôt\n\n      - name: Setup Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: '3.x'\n\n      - name: Install dependencies\n        run: pip install mkdocs mkdocs-material\n\n      - name: Build and Deploy MkDocs site\n        run: mkdocs gh-deploy --force\n\
\
```\n\nCe workflow simple clone le dépôt, configure Python, installe MkDocs et son thème, puis déploie le site sur GitHub Pages. Nous verrons plus en détail comment adapter cela à nos besoins spécifiques.\n`;
  onMount(() => {
    html = marked.parse(markdown);
  });
</script>

<div class="markdown-body" bind:this={container}>
  {@html html}
</div>

