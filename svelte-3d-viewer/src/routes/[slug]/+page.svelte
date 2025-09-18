<script>
  import { marked } from 'marked';
  export let data;

  const testMarkdown = "![test image](/images/portfolio/hero-bg.jpg)";
</script>

<div class="markdown-body">
  <h1>Test de rendu d'image</h1>
  <p>Si vous voyez une image ci-dessous, le rendu de base fonctionne :</p>
  {@html marked(testMarkdown)}
  <hr>
  <h1>Contenu du fichier</h1>
  <p>Ci-dessous, le contenu chargé depuis votre fichier .md :</p>
  {@html marked(data.content)}
</div>

<style>
  .markdown-body {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    line-height: 1.6;
  }
  hr {
    margin: 2rem 0;
  }
</style>
