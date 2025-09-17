<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  let html = '';
  let container;
  const markdown = `# Problèmes Courants et Solutions

Au cours de notre échange avec Gemini, nous avons rencontré et résolu plusieurs problèmes typiques lors du déploiement d'un site MkDocs sur GitHub Pages. Voici un résumé des défis et de leurs solutions.

## Erreurs 404 sur GitHub Pages

L'erreur 404 est l'un des problèmes les plus frustrants. Elle indique que le serveur ne trouve pas la ressource demandée. Pour un site GitHub Pages, cela est souvent lié à la configuration des chemins.

### Causes et Solutions :

1.  **&#96;docs_dir&#96; incorrect dans &#96;mkdocs.yml&#96; :**
    *   **Problème :** Si &#96;docs_dir&#96; pointe vers le répertoire racine de votre dépôt (&#96;docs_dir: .&#96;), MkDocs peut générer des chemins qui ne sont pas compatibles avec la structure attendue par GitHub Pages pour un site de projet.
    *   **Solution :** Toujours utiliser un sous-répertoire dédié pour votre documentation, par exemple &#96;docs_dir: docs&#96;. Assurez-vous que tous vos fichiers Markdown sont bien dans ce répertoire.

2.  **&#96;site_dir&#96; à l'intérieur de &#96;docs_dir&#96; :**
    *   **Problème :** Si le répertoire de sortie (&#96;site_dir&#96;) est configuré pour être à l'intérieur de votre répertoire de documentation (&#96;docs_dir&#96;), cela peut créer des boucles infinies ou des problèmes de copie lors du déploiement.
    *   **Solution :** Assurez-vous que &#96;site_dir&#96; (par défaut &#96;site&#96;) est un répertoire frère de &#96;docs_dir&#96;. C'est le comportement par défaut de MkDocs, mais il est bon de le vérifier.

3.  **&#96;index.html&#96; manquant à la racine du site généré :**
    *   **Problème :** Pour les sites de projet GitHub Pages (&#96;utilisateur.github.io/nom-du-depot/&#96;), GitHub Pages s'attend à trouver un &#96;index.html&#96; à la racine du chemin du projet. Si votre navigation MkDocs ne commence pas par un fichier qui se compile en &#96;index.html&#96; à la racine, vous obtiendrez une 404.
    *   **Solution :** Créez un fichier &#96;index.md&#96; dans votre &#96;docs_dir&#96; et assurez-vous qu'il est la première entrée dans votre section &#96;nav&#96; de &#96;mkdocs.yml&#96; (par exemple, &#96;- Accueil: index.md&#96;).

4.  **Problèmes de chemins relatifs avec &#96;site_url&#96; et &#96;use_directory_urls&#96; :**
    *   **Problème :** MkDocs doit générer des liens qui fonctionnent correctement dans le sous-répertoire de votre dépôt GitHub Pages.
    *   **Solution :** Définissez correctement &#96;site_url&#96; dans votre &#96;mkdocs.yml&#96; avec l'URL complète de votre site GitHub Pages (par exemple, &#96;https://dvrch.github.io/Le_Pont_Procedural/&#96;). Assurez-vous également que &#96;use_directory_urls: true&#96; est activé pour des URLs propres.

5.  **Conflit avec Jekyll (&#96;.nojekyll&#96;) :**
    *   **Problème :** GitHub Pages utilise par défaut Jekyll pour construire les sites. Si vous utilisez MkDocs (ou un autre générateur de site statique), Jekyll peut interférer avec le processus de construction et causer des problèmes.
    *   **Solution :** Ajoutez un fichier vide nommé &#96;.nojekyll&#96; à la racine de votre dépôt. Cela indique à GitHub Pages de ne pas traiter votre site avec Jekyll.

## Problèmes de Navigation et d'Affichage

### Navigation Horizontale vs. Verticale

*   **Problème :** Vous souhaitez une navigation entièrement verticale sur la gauche, mais des onglets horizontaux apparaissent en haut.
*   **Solution :** La fonctionnalité &#96;navigation.tabs&#96; dans la section &#96;features&#96; de votre &#96;mkdocs.yml&#96; crée des onglets horizontaux. Pour une navigation purement verticale, désactivez ou supprimez cette fonctionnalité.

### Sections de Navigation non Repliables par Défaut

*   **Problème :** Les sous-éléments de votre navigation sont toujours visibles sans avoir à cliquer sur la section principale pour la dérouler.
*   **Solution :** La fonctionnalité &#96;navigation.sections&#96; est censée gérer cela. Si elle ne fonctionne pas comme prévu, cela peut être dû à un cache du navigateur ou à un conflit JavaScript. Assurez-vous que &#96;navigation.sections&#96; est activé et que &#96;navigation.expand&#96; (qui déroule tout par défaut) est désactivé. L'ajout de &#96;navigation.instant&#96; peut parfois aider à l'initialisation du JavaScript.

### Intégration de la Table des Matières dans la Navigation

*   **Problème :** La table des Matières de la page actuelle est intégrée à la barre latérale de navigation, rendant la navigation encombrée.
*   **Solution :** La fonctionnalité &#96;toc.integrate&#96; est responsable de cela. Désactivez-la dans la section &#96;features&#96; de votre &#96;mkdocs.yml&#96; pour que la table des matières reste sur la page principale et que la barre latérale affiche uniquement la structure de navigation globale.

## Problèmes de Caractères Spéciaux dans &#96;mkdocs.yml&#96;

*   **Problème :** Erreurs de syntaxe YAML (&#96;mapping values are not allowed here&#96;) dues à des caractères spéciaux (comme le double point &#96;:&#96;) ou des apostrophes (&#96;'&#96;) dans les titres de navigation.
*   **Solution :** Toujours entourer les titres de navigation contenant des caractères spéciaux ou des apostrophes de guillemets simples (&#96;'Titre: Sous-titre'&#96;) dans votre &#96;mkdocs.yml&#96;.`;
  onMount(() => {
    html = marked.parse(markdown);
  });
</script>

<div class="markdown-body" bind:this={container}>
  {@html html}
</div>