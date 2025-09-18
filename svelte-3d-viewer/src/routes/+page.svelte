<script>
  export let data;
</script>

<div class="container">
  <h1>Welcome</h1>
  <p>This is the main page. Select a document to view:</p>
  
  <ul>
    {#each data.posts as post}
      <li>
        <a href="/{post.slug}">{post.title}</a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    text-align: center;
  }
  ul {
    list-style: none;
    padding: 0;
    margin-top: 2rem;
  }
  li {
    margin: 0.5rem 0;
  }
  a {
    font-size: 1.2rem;
    text-decoration: none;
    color: #007bff;
  }
  a:hover {
    text-decoration: underline;
  }
</style>