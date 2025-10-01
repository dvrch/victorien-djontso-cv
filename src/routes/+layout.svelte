<script>
  import { base } from '$app/paths';
  export let data;
</script>

<header>
  <nav>
    <ul>
      {#each data.posts as page}
        <li>
          <a href={base + '/' + page.slug}>{page.title}</a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<main>
  <slot />
</main>

<style>
  header {
    background-color: #f8f9fa;
    padding: 10px 20px;
    border-bottom: 1px solid #dee2e6;
  }

  nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }

  nav li {
    margin: 0 15px;
  }

  nav a {
    text-decoration: none;
    color: #007bff;
    font-weight: 500;
  }

  nav a:hover {
    color: #0056b3;
  }

  main {
    padding: 20px;
  }
</style>
