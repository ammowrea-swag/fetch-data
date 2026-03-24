<!--
@component
This is your page!
-->
<script>
  // Import all the news furniture components
  import ArticleHeader from '$lib/components/ArticleHeader.svelte';
  import ArticleBody from '$lib/components/ArticleBody.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import Image from '$lib/components/Image.svelte';
  import SplashHeader from '$lib/components/SplashHeader.svelte';

  // Article metadata
  let headline = 'Dog Bites in NYC: A Closer Look at the Data';
  let byline = 'Ashley Mowreader';
  let pubDate = '2026-01-31';

   let { data } = $props();
  let selected = $state(null);

  function formatDate(dateString) {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }

  function toSentenceCase(value) {
    if (!value) return 'Unknown';

    const text = String(value).trim().toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

</script>

<!-- This sets the page title in the browser tab -->
<svelte:head>
  <title>{headline} | NYCity News Service</title>

</svelte:head>

<!-- Your page content goes here -->
<div class="container">
 
  <!-- Article Header: Headline, byline, and publication date -->
   <SplashHeader
    headline= "Dog Bites in NYC"
    kicker = "Data that Bites"
    deck= "Analyzing the patterns and trends of dog bites across New York City."
    byline= "Ashley Mowreader"
    {pubDate}
  />

 <div class="dogs">
  {#each data.dogs as dogs (dogs.uniqueid)}
    <button type="button" class="card" onclick={() => selected = dogs}>
      <h3>{toSentenceCase(dogs.breed)}</h3>
      <p>{dogs.borough}</p>
    </button>
  {/each}

  {#if selected}
  <div class="overlay" onclick={() => selected = null}>
    <div class="popup" onclick={(e) => e.stopPropagation()}>
      <button class="close-btn" onclick={() => selected = null}>&times;</button>
      <h2>{selected.subcategoryname}</h2>
      <p><strong>Breed:</strong> {toSentenceCase(selected.breed)}</p>
      <p><strong>Age:</strong> {selected.age}</p>
      <p><strong>Borough:</strong> {selected.borough}</p>
      <p><strong>Date:</strong> {formatDate(selected.dateofbite)}</p>
    </div>
  </div>
{/if}
</div>
</div>  


<style lang="scss">
  @use '$lib/styles' as *;

  .dogs {
    padding-top: var(--spacing-md);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-sm);
  }

  .card {
    padding: var(--spacing-sm);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: 12px;
    cursor: pointer;

    &:hover {
      background-color: var(--color-light-gray);
    }
  }

    .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup {
    position: relative;
    background: white;
    padding: var(--spacing-lg);
    max-width: 500px;
    width: 90%;
  }

  .popup button {
    float: right;
    cursor: pointer;
  }

  .close-btn {
    position: absolute;
    top: var(--spacing-xs);
    right: var(--spacing-xs);
    background: none;
    border: none;
    font-size: var(--font-size-3xl);
    line-height: 1;
    color: var(--color-medium-gray);
    cursor: pointer;

    &:hover {
      color: var(--color-dark);
    }
  }
    .container {
    max-width: 1300px;
    margin: var(--spacing-md) auto;
    padding: 0 var(--spacing-sm);
    
  }
</style>
