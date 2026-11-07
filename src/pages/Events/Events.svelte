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
  <title>Events | Evently</title>
</svelte:head>

<section class="mx-auto w-full max-w-[calc(100vw-220px)]">
    <div class="flex gap-x-8">
        <!-- <aside class="w-[250px]">
            <div class="flex flex-col gap-y-4">
                <div>
                    <span class="block text-sm font-medium text-foreground">Category</span>
                </div>
                <div>
                    <label for="location" class="block text-sm font-medium text-foreground">Location</label>
                    <input type="text" id="location" name="location" placeholder="Enter location" class="mt-1 block w-full rounded-md border 
                    border-border bg-background py-2 pl-3 pr-10 text-sm text-foreground focus:border-primary focus:outline-none 
                    focus:ring-primary sm:text-sm" />
                </div>
            </div>
        </aside> -->
        <div class="flex flex-col flex-1 pb-12">
             <div class="sticky top-0 z-2 flex py-5 -mt-5 items-stretch gap-x-2 bg-transparent backdrop-blur-md rounded-2xl">
                <input 
                    type="text" 
                    placeholder="Search events..."
                    bind:value={searchQuery}
                    class="h-[48px] grow rounded-full border border-border/30 bg-card/50 backdrop-blur-md py-2 px-6 text-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-border/60"
                />
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
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                 {#each sortedEvents as event}
                <EventCard {event} />
                {/each}
            </div>
        </div>
    </div>
</section>
