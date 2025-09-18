<script>
  import { marked } from 'marked';
  export let data;
</script>

<div class="markdown-body">
  {@html marked(data.content)}
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
