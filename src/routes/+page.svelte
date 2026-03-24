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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&display=swap" rel="stylesheet">
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
      <h3 class="h3">{toSentenceCase(dogs.breed)}</h3>
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
      <p><strong>Gender:</strong> {selected.gender}</p>
      <p><strong>Spayed or Neutered:</strong> {selected.spayneuter}</p>
      <p><strong>Borough:</strong> {selected.borough}</p>
      <p><strong>Date:</strong> {formatDate(selected.dateofbite)}</p>
    </div>
  </div>
{/if}
</div>
</div>  


<style lang="scss">
  @use '$lib/styles' as *;
   @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

     :global(body) {
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
    background: linear-gradient(180deg, #fffaf2 0%, #fff4e6 100%);
    color: #B39DDB;
    cursor: '/static/paw.png', auto;
  }

  .h3 { font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
    font-size: 2rem;
    color: var(--color-dark-gray);
    margin: var(--spacing-sm) 0;

  }
  .dogs {
    padding-top: var(--spacing-md);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-sm);
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
    font-size: var(--font-size-md);
  }

  .card {
    padding: var(--spacing-sm);
     border: 2px solid #B39DDB;
    border-radius: 18px;
    background: #fff;
     box-shadow: 0 6px 18px rgba(191, 122, 72, 0.12);
    cursor: pointer;
    font-family: "Comic Relief", system-ui, -apple-system, sans-serif;
    text-align: center;

    &:hover {
     transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(191, 122, 72, 0.2);
      background-color: #fff8f1;
    }
  }
    .overlay {
        position: fixed;
    inset: 0;
    background-color: rgba(81, 47, 28, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
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
    box-shadow: 0 20px 40px rgba(81, 47, 28, 0.2);
    border: 2px solid #b39ddb;
    border-radius: 20px;

  
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
  .comic-relief-regular {
  font-family: "Comic Relief", system-ui;
  font-weight: 400;
  font-style: normal;
}

.comic-relief-bold {
  font-family: "Comic Relief", system-ui;
  font-weight: 700;
  font-style: normal;
}

</style>
