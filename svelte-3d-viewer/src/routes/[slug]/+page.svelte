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
</style>
