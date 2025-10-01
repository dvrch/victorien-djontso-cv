# Sujets Avancés (new)

Maintenant que les bases sont couvertes, explorons quelques sujets avancés qui peuvent enrichir votre documentation et votre workflow.

## Génération Automatique de la Carte de Contenu (pour sites HTML/JS purs)

Si vous choisissez de ne pas utiliser un générateur de site statique comme MkDocs et de construire votre site avec du HTML, du CSS et du JavaScript pur, la gestion de la navigation peut devenir un défi. Une solution est de générer automatiquement une carte de contenu de vos fichiers Markdown.

### Principe :

Un script (souvent en Python) s'exécute au moment du déploiement pour parcourir votre répertoire de documentation, identifier tous les fichiers Markdown, extraire leurs titres (par exemple, le premier titre H1), et générer un fichier JSON (`content_map.json`). Ce fichier JSON contient la liste des chemins de fichiers et de leurs titres.

Votre JavaScript côté client peut ensuite lire ce `content_map.json` pour construire dynamiquement la barre de navigation et charger le contenu des fichiers Markdown à la demande.

### Avantages :

*   **Automatisation :** Plus besoin de maintenir manuellement la liste des fichiers dans votre JavaScript.
*   **Flexibilité :** Vous avez un contrôle total sur le rendu HTML/CSS/JS.

### Inconvénients :

*   **Complexité accrue :** Vous devez gérer vous-même la conversion Markdown-HTML, la recherche, la table des matières, etc., qui sont des fonctionnalités intégrées dans MkDocs.

*   **Dépendance au script :** Le script Python doit être exécuté à chaque déploiement.

## Intégration de Données Dynamiques (CSV/YAML)

Vous pouvez intégrer des données provenant de fichiers CSV ou YAML directement dans votre documentation.

### Avec MkDocs (recommandé) :

Utilisez des plugins MkDocs comme `mkdocs-macros-plugin` ou `mkdocs-data-plugin`. Ces plugins vous permettent de lire vos fichiers de données pendant la construction du site et d'injecter leur contenu dans vos pages Markdown en utilisant une syntaxe simple.

### Avec HTML/JS pur :

Vous devrez écrire du JavaScript pour :

1.  Récupérer le fichier CSV/YAML (qui doit être hébergé statiquement).
2.  Parser le contenu du fichier.
3.  Générer le HTML correspondant (par exemple, un tableau) et l'insérer dans le DOM.

## Liens Croisés (Wikilinks)

La syntaxe `[[NomDeLaPage]]` est très pratique pour lier des pages entre elles sans avoir à spécifier le chemin complet.

### Avec MkDocs (recommandé) :

Activez l'extension `pymdownx.wikilinks` dans la section `markdown_extensions` de votre `mkdocs.yml`. MkDocs gérera automatiquement la conversion de ces wikilinks en liens HTML valides.

### Avec HTML/JS pur :

Vous devrez écrire du JavaScript pour :

1.  Parcourir le contenu HTML généré à partir du Markdown.
2.  Identifier les motifs `[[...]]`.
3.  Les remplacer par des balises `<a href="...">` appropriées.

## Coloration Syntaxique de Code

Pour afficher du code avec une belle coloration syntaxique.

### Avec MkDocs (recommandé) :

Material for MkDocs intègre Pygments pour la coloration syntaxique. Assurez-vous que `pygments` est installé et que vous utilisez les blocs de code Markdown standard (` ```python `).

### Avec HTML/JS pur :

Utilisez une bibliothèque JavaScript comme `highlight.js` ou `Prism.js`. Vous devrez l'inclure dans votre `index.html` et l'initialiser dans votre `script.js`.

## Personnalisation Avancée du Thème

Material for MkDocs offre de nombreuses options de personnalisation via `mkdocs.yml` et la possibilité de surcharger des blocs de template Jinja2 pour des modifications plus profondes.

Si vous utilisez HTML/JS pur, vous avez un contrôle total sur le CSS et le JavaScript, but you have to build everything from scratch.