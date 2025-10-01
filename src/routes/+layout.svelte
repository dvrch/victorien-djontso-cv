<script>
  import { base } from '$app/paths';
  import { navigating } from '$app/stores';
  export let data;
</script>

{#if $navigating}
  <div class="loading-indicator">Chargement...</div>
{/if}

<div class="app">
  <nav class="sidebar">
    <ul>
      {#each data.posts as page}
        <li>
          <a href={base + '/' + page.slug} data-sveltekit-prefetch>{page.title}</a>
        </li>
      {/each}
    </ul>
  </nav>

  <main>
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
  }

  .sidebar {
    width: 200px;
    padding: 20px;
    border-right: 1px solid #ccc;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  main {
    padding: 20px;
    flex: 1;
    min-width: 0; /* Prevents overflow in flex containers */
  }

  .loading-indicator {
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 100;
  }
</style>
