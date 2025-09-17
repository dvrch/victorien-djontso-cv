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
    *   **Solution :** Toujours utiliser un sous-répertoire dédié pour votre documentation, par exemple &#96;docs_dir: docs&#96;. Make sure that all your Markdown files are well in this directory.

2.  **&#96;site_dir&#96; à l'intérieur de &#96;docs_dir&#96; :**
    *   **Problème :** Si le répertoire de sortie (&#96;site_dir&#96;) est configuré pour être à l'intérieur de votre répertoire de documentation (&#96;docs_dir&#96;), cela peut créer des boucles infinies ou des problèmes de copie lors du déploiement.
    *   **Solution :** Make sure that &#96;site_dir&#96; (by default &#96;site&#96;) is a sibling directory of &#96;docs_dir&#96;. This is the default behavior of MkDocs, but it is good to check.

3.  **&#96;index.html&#96; manquant à la racine du site généré :**
    *   **Problème :** Pour les sites de projet GitHub Pages (&#96;utilisateur.github.io/nom-du-depot/&#96;), GitHub Pages s'attend à trouver un &#96;index.html&#96; à la racine du chemin du projet. Si votre navigation MkDocs ne commence pas par un fichier qui se compile en &#96;index.html&#96; à la racine, vous obtiendrez une 404.
    *   **Solution :** Créez un fichier &#96;index.md&#96; dans votre &#96;docs_dir&#96; and make sure it is the first entry in your &#96;nav&#96; section of &#96;mkdocs.yml&#96; (for example, &#96;- Accueil: index.md&#96;).

4.  **Problèmes de chemins relatifs avec &#96;site_url&#96; et &#96;use_directory_urls&#96; :**
    *   **Problème :** MkDocs doit générer des liens qui fonctionnent correctement dans le sous-répertoire de votre dépôt GitHub Pages.
    *   **Solution :** Définissez correctement &#96;site_url&#96; dans votre &#96;mkdocs.yml&#96; avec l'URL complète de votre site GitHub Pages (par exemple, &#96;https://dvrch.github.io/Le_Pont_Procedural/&#96;). Make sure that &#96;use_directory_urls: true&#96; is enabled for clean URLs.

5.  **Conflit avec Jekyll (&#96;.nojekyll&#96;) :**
    *   **Problème :** GitHub Pages utilise par défaut Jekyll pour construire les sites. Si vous utilisez MkDocs (ou un autre générateur de site statique), Jekyll peut interférer avec le processus de construction et causer des problèmes.
    *   **Solution :** Ajoutez un fichier vide nommé &#96;.nojekyll&#96; à la racine de votre dépôt. Cela indique à GitHub Pages de ne pas traiter votre site avec Jekyll.

## Problèmes de Navigation et d'Affichage

### Navigation Horizontale vs. Verticale

*   **Problème :** Vous souhaitez une navigation entièrement verticale sur la gauche, but horizontal tabs appear at the top.
*   **Solution :** The &#96;navigation.tabs&#96; feature in the &#96;features&#96; section of your &#96;mkdocs.yml&#96; creates horizontal tabs. For purely vertical navigation, disable or remove this feature.

### Sections de Navigation non Repliables par Défaut

*   **Problème :** Les sous-éléments de votre navigation sont toujours visibles sans avoir à cliquer sur la section principale pour la dérouler.
*   **Solution :** La fonctionnalité &#96;navigation.sections&#96; is supposed to handle this. If it doesn't work as expected, it may be due to a browser cache or a JavaScript conflict. Make sure &#96;navigation.sections&#96; is enabled and that &#96;navigation.expand&#96; (which unfolds everything by default) is disabled. Adding &#96;navigation.instant&#96; can sometimes help with JavaScript initialization.

### Intégration de la Table des Matières dans la Navigation

*   **Problème :** La table des Matières de la page actuelle est intégrée à la barre latérale de navigation, rendant la navigation encombrée.
*   **Solution :** La fonctionnalité &#96;toc.integrate&#96; is responsible for this. Disable it in the &#96;features&#96; section of your &#96;mkdocs.yml&#96; so that the table of contents remains on the main page and the sidebar only displays the global navigation structure.

## Problèmes de Caractères Spéciaux dans &#96;mkdocs.yml&#96;

*   **Problème :** Erreurs de syntaxe YAML (&#96;mapping values are not allowed here&#96;) due to special characters (like the colon &#96;:&#96;) or apostrophes (&#96;'&#96;) in navigation titles.
*   **Solution :** Always enclose navigation titles containing special characters or apostrophes in single quotes (&#96;'Titre: Sous-titre'&#96;) in your &#96;mkdocs.yml&#96;.`;
  onMount(() => {
    html = marked.parse(markdown);
  });
</script>

<div class="markdown-body" bind:this={container}>
  {@html html}
</div>
