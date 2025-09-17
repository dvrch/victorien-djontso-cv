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

1. **\`docs_dir\` incorrect dans \`mkdocs.yml\` :**
    * **Problème :** Si \`docs_dir\` pointe vers le répertoire racine de votre dépôt (\`docs_dir: .\`), MkDocs peut générer des chemins qui ne sont pas compatibles avec la structure attendue par GitHub Pages pour un site de projet.
    * **Solution :** Toujours utiliser un sous-répertoire dédié pour votre documentation, par exemple \`docs_dir: docs\`. Make sure that all your Markdown files are well in this directory.

2. **\`site_dir\` à l'intérieur de \`docs_dir\` :**
    * **Problème :** Si le répertoire de sortie (\`site_dir\`) est configuré pour être à l'intérieur de votre répertoire de documentation (\`docs_dir\`), cela peut créer des boucles infinies ou des problèmes de copie lors du déploiement.
    * **Solution :** Make sure that \`site_dir\` (by default \`site\`) is a sibling directory of \`docs_dir\`. This is the default behavior of MkDocs, but it is good to check.

3. **\`index.html\` manquant à la racine du site généré :**
    * **Problème :** Pour les sites de projet GitHub Pages (\`utilisateur.github.io/nom-du-depot/\`), GitHub Pages s'attend à trouver un \`index.html\` à la racine du chemin du projet. Si votre navigation MkDocs ne commence pas par un fichier qui se compile en \`index.html\` à la racine, vous obtiendrez une 404.
    * **Solution :** Créez un fichier \`index.md\` dans votre \`docs_dir\` and make sure it is the first entry in your \`nav\` section of \`mkdocs.yml\` (for example, \`- Accueil: index.md\`).

4. **Problèmes de chemins relatifs avec \`site_url\` et \`use_directory_urls\` :**
    * **Problème :** MkDocs doit générer des liens qui fonctionnent correctement dans le sous-répertoire de votre dépôt GitHub Pages.
    * **Solution :** Définissez correctement \`site_url\` dans votre \`mkdocs.yml\` avec l'URL complète de votre site GitHub Pages (par exemple, \`https://dvrch.github.io/Le_Pont_Procedural/\`). Make sure that \`use_directory_urls: true\` is enabled for clean URLs.

5. **Conflit avec Jekyll (\`.nojekyll\`) :**
    * **Problème :** GitHub Pages utilise par défaut Jekyll pour construire les sites. Si vous utilisez MkDocs (ou un autre générateur de site statique), Jekyll peut interférer avec le processus de construction et causer des problèmes.
    * **Solution :** Ajoutez un fichier vide nommé \`.nojekyll\` à la racine de votre dépôt. Cela indique à GitHub Pages de ne pas traiter votre site avec Jekyll.

## Problèmes de Navigation et d'Affichage

### Navigation Horizontale vs. Verticale

* **Problème :** Vous souhaitez une navigation entièrement verticale sur la gauche, but horizontal tabs appear at the top.
* **Solution :** The \`navigation.tabs\` feature in the \`features\` section of your \`mkdocs.yml\` creates horizontal tabs. For purely vertical navigation, disable or remove this feature.

### Sections de Navigation non Repliables par Défaut

* **Problème :** Les sous-éléments de votre navigation sont toujours visibles sans avoir à cliquer sur la section principale pour la dérouler.
* **Solution :** La fonctionnalité \`navigation.sections\` is supposed to handle this. If it doesn't work as expected, it may be due to a browser cache or a JavaScript conflict. Make sure \`navigation.sections\` is enabled and that \`navigation.expand\` (which unfolds everything by default) is disabled. Adding \`navigation.instant\` can sometimes help with JavaScript initialization.

### Intégration de la Table des Matières dans la Navigation

* **Problème :** La table des Matières de la page actuelle est intégrée à la barre latérale de navigation, rendant la navigation encombrée.
* **Solution :** La fonctionnalité \`toc.integrate\` is responsible for this. Disable it in the \`features\` section of your \`mkdocs.yml\` so that the table of contents remains on the main page and the sidebar only displays the global navigation structure.

## Problèmes de Caractères Spéciaux dans \`mkdocs.yml\`

* **Problème :** Erreurs de syntaxe YAML (\`mapping values are not allowed here\`) due to special characters (like the colon \`:\` ) or apostrophes (\`'\`) in navigation titles.
* **Solution :** Always enclose navigation titles containing special characters or apostrophes in single quotes (\`'Titre: Sous-titre'\`) in your \`mkdocs.yml\`.`;

  onMount(() => {
    html = marked.parse(markdown);
  });
</script>

<div class="markdown-body" bind:this={container}>
  {@html html}
</div>