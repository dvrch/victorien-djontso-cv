<script>
  export let data;
</script>

<div class="app">
  <nav class="sidebar">
    <ul>
      {#each data.posts as page}
        <li>
          <a href="/{page.slug}">{page.title}</a>
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
</style>
