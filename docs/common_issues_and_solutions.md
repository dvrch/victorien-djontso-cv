# Problèmes Courants et Solutions

Au cours de notre échange avec Gemini, nous avons rencontré et résolu plusieurs problèmes typiques lors du déploiement d'un site MkDocs sur GitHub Pages. Voici un résumé des défis et de leurs solutions.

## Erreurs 404 sur GitHub Pages

L'erreur 404 est l'un des problèmes les plus frustrants. Elle indique que le serveur ne trouve pas la ressource demandée. Pour un site GitHub Pages, cela est souvent lié à la configuration des chemins.

### Causes et Solutions :

1.  **`docs_dir` incorrect dans `mkdocs.yml` :**
    *   **Problème :** Si `docs_dir` pointe vers le répertoire racine de votre dépôt (`docs_dir: .`), MkDocs peut générer des chemins qui ne sont pas compatibles avec la structure attendue par GitHub Pages pour un site de projet.
    *   **Solution :** Toujours utiliser un sous-répertoire dédié pour votre documentation, par exemple `docs_dir: docs`. Assurez-vous que tous vos fichiers Markdown sont bien dans ce répertoire.

2.  **`site_dir` à l'intérieur de `docs_dir` :**
    *   **Problème :** Si le répertoire de sortie (`site_dir`) est configuré pour être à l'intérieur de votre répertoire de documentation (`docs_dir`), cela peut créer des boucles infinies ou des problèmes de copie lors du déploiement.
    *   **Solution :** Assurez-vous que `site_dir` (par défaut `site`) est un répertoire frère de `docs_dir`. C'est le comportement par défaut de MkDocs, mais il est bon de le vérifier.

3.  **`index.html` manquant à la racine du site généré :**
    *   **Problème :** Pour les sites de projet GitHub Pages (`utilisateur.github.io/nom-du-depot/`), GitHub Pages s'attend à trouver un `index.html` à la racine du chemin du projet. Si votre navigation MkDocs ne commence pas par un fichier qui se compile en `index.html` à la racine, vous obtiendrez une 404.
    *   **Solution :** Créez un fichier `index.md` dans votre `docs_dir` et assurez-vous qu'il est la première entrée dans votre section `nav` de `mkdocs.yml` (par exemple, `- Accueil: index.md`).

4.  **Problèmes de chemins relatifs avec `site_url` et `use_directory_urls` :**
    *   **Problème :** MkDocs doit générer des liens qui fonctionnent correctement dans le sous-répertoire de votre dépôt GitHub Pages.
    *   **Solution :** Définissez correctement `site_url` dans votre `mkdocs.yml` avec l'URL complète de votre site GitHub Pages (par exemple, `https://dvrch.github.io/Le_Pont_Procedural/`). Assurez-vous également que `use_directory_urls: true` est activé pour des URLs propres.

5.  **Conflit avec Jekyll (`.nojekyll`) :**
    *   **Problème :** GitHub Pages utilise par défaut Jekyll pour construire les sites. Si vous utilisez MkDocs (ou un autre générateur de site statique), Jekyll peut interférer avec le processus de construction et causer des problèmes.
    *   **Solution :** Ajoutez un fichier vide nommé `.nojekyll` à la racine de votre dépôt. Cela indique à GitHub Pages de ne pas traiter votre site avec Jekyll.

## Problèmes de Navigation et d'Affichage

### Navigation Horizontale vs. Verticale

*   **Problème :** Vous souhaitez une navigation entièrement verticale sur la gauche, mais des onglets horizontaux apparaissent en haut.
*   **Solution :** La fonctionnalité `navigation.tabs` dans la section `features` de votre `mkdocs.yml` crée des onglets horizontaux. Pour une navigation purement verticale, désactivez ou supprimez cette fonctionnalité.

### Sections de Navigation non Repliables par Défaut

*   **Problème :** Les sous-éléments de votre navigation sont toujours visibles sans avoir à cliquer sur la section principale pour la dérouler.
*   **Solution :** La fonctionnalité `navigation.sections` est censée gérer cela. Si elle ne fonctionne pas comme prévu, cela peut être dû à un cache du navigateur ou à un conflit JavaScript. Assurez-vous que `navigation.sections` est activé et que `navigation.expand` (qui déroule tout par défaut) est désactivé. L'ajout de `navigation.instant` peut parfois aider à l'initialisation du JavaScript.

### Intégration de la Table des Matières dans la Navigation

*   **Problème :** La table des matières de la page actuelle est intégrée à la barre latérale de navigation, rendant la navigation encombrée.
*   **Solution :** La fonctionnalité `toc.integrate` est responsable de cela. Désactivez-la dans la section `features` de votre `mkdocs.yml` pour que la table des matières reste sur la page principale et que la barre latérale affiche uniquement la structure de navigation globale.

## Problèmes de Caractères Spéciaux dans `mkdocs.yml`

*   **Problème :** Erreurs de syntaxe YAML (`mapping values are not allowed here`) dues à des caractères spéciaux (comme le double point `:`) ou des apostrophes (`'`) dans les titres de navigation.
*   **Solution :** Toujours entourer les titres de navigation contenant des caractères spéciaux ou des apostrophes de guillemets simples (`'Titre: Sous-titre'`) dans votre `mkdocs.yml`.
