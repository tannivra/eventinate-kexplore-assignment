<script>
  import { onMount } from 'svelte'
  import Dropdown from '../../components/Dropdown/Dropdown.svelte'
  import EventCard from '../../components/EventCard/EventCard.svelte'
  import { featuredEvents, upcomingEvents } from '../../data/events.js'

  const events = [...featuredEvents, ...upcomingEvents]
  const categoryCount = (category) => category === 'All Categories'
    ? events.length
    : events.filter((event) => event.category === category).length
  const categoryOptions = ['All Categories', ...new Set(events.map((event) => event.category))]
    .map((category) => ({ label: category, value: category, count: categoryCount(category) }))
  const sortOptions = [
    { label: 'Date', value: 'date' },
    { label: 'Name', value: 'name' },
    { label: 'Price: low to high', value: 'price-ascending' },
    { label: 'Price: high to low', value: 'price-descending' }
  ]
  let selectedCategory = 'All Categories'
  let selectedSort = 'date'
  let searchQuery = ''

  onMount(() => {
    const queryString = window.location.hash.split('?')[1] ?? window.location.search.slice(1)
    searchQuery = new URLSearchParams(queryString).get('search') ?? ''
  })

  $: filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch = !query || [event.title, event.category, event.location, event.description]
      .some((value) => value.toLowerCase().includes(query))

    return matchesCategory && matchesSearch
  })
  $: sortedEvents = [...filteredEvents].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1
    if (selectedSort === 'name') return a.title.localeCompare(b.title)
    if (selectedSort === 'price-ascending') return a.price - b.price
    if (selectedSort === 'price-descending') return b.price - a.price
    return a.dateOrder - b.dateOrder
  })
</script>

<svelte:head>
  <title>Events | Eventinate</title>
</svelte:head>

<section class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="flex flex-col pb-16">
    <!-- Search & Filter Controls -->
    <div class="sticky top-[72px] sm:top-[84px] z-20 flex flex-col md:flex-row py-3 sm:py-4 -mt-3 sm:-mt-4 gap-2.5 bg-background/80 backdrop-blur-md rounded-2xl mb-6">
      <input 
        type="text" 
        placeholder="Search events..." 
        bind:value={searchQuery}
        class="h-[46px] grow rounded-full border border-border/30 bg-card/60 backdrop-blur-md py-2 px-5 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-border/60"
      />
      <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <Dropdown
          options={categoryOptions}
          value={selectedCategory}
          onSelect={(value) => (selectedCategory = value)}
          showCounts={true}
        />
        <Dropdown
          options={sortOptions}
          value={selectedSort}
          onSelect={(value) => (selectedSort = value)}
          icon="lucide:arrow-up-down"
        />
      </div>
    </div>

    <!-- Events List / Grid -->
    {#if sortedEvents.length === 0}
      <div class="py-24 text-center">
        <p class="text-lg font-semibold text-foreground">No events found</p>
        <p class="mt-1 text-sm text-muted-foreground">Try adjusting your search query or selecting a different category.</p>
        <button
          onclick={() => { searchQuery = ''; selectedCategory = 'All Categories' }}
          class="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-card/60 px-5 py-2 text-xs font-medium text-primary hover:bg-card/90 cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    {:else}
      <div class="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each sortedEvents as event}
          <EventCard {event} />
        {/each}
      </div>
    {/if}
  </div>
</section>
