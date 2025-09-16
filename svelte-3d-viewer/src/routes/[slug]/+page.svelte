<script>
  import { page } from '$app/stores';
  import Index from '$lib/docs/Index.svelte';
  import CvEn from '$lib/docs/CvEn.svelte';
  import CvImprimable from '$lib/docs/CvImprimable.svelte';
  import Achievements from '$lib/docs/Achievements.svelte';
  import GithubActionsBasics from '$lib/docs/GithubActionsBasics.svelte';
  import MkdocsSetup from '$lib/docs/MkdocsSetup.svelte';
  import CommonIssuesAndSolutions from '$lib/docs/CommonIssuesAndSolutions.svelte';
  import AdvancedTopics from '$lib/docs/AdvancedTopics.svelte';
  import Svelte3dIntegration from '$lib/docs/Svelte3dIntegration.svelte';

  const components = {
    index: Index,
    cven: CvEn,
    cvimprimable: CvImprimable,
    achievements: Achievements,
    githubactionsbasics: GithubActionsBasics,
    mkdocssetup: MkdocsSetup,
    commonissuesandsolutions: CommonIssuesAndSolutions,
    advancedtopics: AdvancedTopics,
    svelte3dintegration: Svelte3dIntegration,
  };

  $: component = components[$page.params.slug.toLowerCase()];
</script>

<svelte:component this={component} />
