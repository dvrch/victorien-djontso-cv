<script>
  import { marked } from 'marked';
  import { base } from '$app/paths';
  export let data;

  // Convertit le Markdown en HTML et préfixe les liens/ressources absolus avec paths.base
  const rawHtml = marked.parse(data.content);
  const html = rawHtml
    .replaceAll('src="/', `src="${base}/`)
    .replaceAll('href="/', `href="${base}/`);
</script>

<div class="markdown-body">
  {@html html}
  
</div>

<style>
  .markdown-body {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    line-height: 1.6;
  }

  :global(.markdown-body img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem auto;
  }
</style>
