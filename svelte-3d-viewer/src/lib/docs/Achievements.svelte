<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  let html = '';
  let container;
  const markdown = `### SOME IMAGE ACHIEVEMENTS

![21](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0002.png)
![22](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0003.png)
![23](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0004.png)
![24](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0005.png)
![25](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0006.png)
![12](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0007.png)
![26](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0008.png)
![13](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0009.png)
![10](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0010.png)
![11](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0011.png)
![12](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0012.png)
![13](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0013.png)
![14](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0014.png)
![15](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0015.png)
![16](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0016.png)
![17](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0017.png)
![18](../../docs/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022.png/iadDJONTSO%20VICTORIEN%20-%20Portfolio%202%202022-0018.png)`;
  onMount(() => {
    html = marked.parse(markdown);
  });
</script>

<div class="markdown-body" bind:this={container}>
  {@html html}
</div>
