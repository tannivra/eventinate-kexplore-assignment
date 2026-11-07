<script>
    import Icon from '@iconify/svelte'
    import { link, push } from "svelte-spa-router";
    import EventCard from '../../components/EventCard/EventCard.svelte'
    import { featuredEvents, upcomingEvents } from '../../data/events.js'

    let searchQuery = ''

    function searchEvents() {
        const query = searchQuery.trim()
        push(query ? `/events?search=${encodeURIComponent(query)}` : '/events')
    }
</script>

<svelte:head>
  <title>Home | Eventinate</title>
</svelte:head>

<div class="flex flex-col gap-y-12 sm:gap-y-16 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <section class="relative mx-auto flex w-full items-center justify-center text-center my-14 sm:my-24 md:my-32">
        <div class="flex flex-col items-center gap-y-4 w-full">
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-foreground max-w-lg mx-auto">
                Discover events worth
                showing up for.
            </h1>
            <form class="relative mt-4 sm:mt-6 w-full max-w-xl mx-auto" onsubmit={(event) => { event.preventDefault(); searchEvents() }}>
                <Icon
                    icon="lucide:search"
                    width="18"
                    height="18"
                    aria-hidden="true"
                    class="pointer-events-none absolute left-5 sm:left-7 top-1/2 -translate-y-1/2 text-muted-foreground z-1"
                />
                <input
                    type="text"
                    placeholder="Search events..."
                    bind:value={searchQuery}
                    class="h-[52px] sm:h-[64px] w-full rounded-full border border-border/30 bg-card/50 py-2 pl-13 sm:pl-18 pr-6 text-sm sm:text-base text-foreground placeholder:text-muted-foreground shadow-lg shadow-black/10 backdrop-blur-md focus:border-border/60 focus:outline-none"
                />
            </form>
        </div>
    </section>

    <section class="space-y-6">
        <div class="flex justify-between items-center gap-x-4">
            <h2 class="text-xl font-semibold text-foreground">Featured</h2>
            <a href="/events" use:link class="text-sm font-medium text-primary hover:underline inline-flex items-center">
                All Featured
                <Icon icon="material-symbols:arrow-outward-rounded" width="18" height="18" class="inline-block ml-1" />
            </a>
        </div>
        <div class="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {#each featuredEvents.slice(0, 4) as event}
                <EventCard {event} />
            {/each}
        </div>
    </section>

    <section class="space-y-6 pb-20">
        <div class="flex justify-between items-center gap-x-4">
            <h2 class="text-xl font-semibold text-foreground">Upcoming</h2>
            <a href="/events" use:link class="text-sm font-medium text-primary hover:underline inline-flex items-center">
                All Upcoming
                <Icon icon="material-symbols:arrow-outward-rounded" width="18" height="18" class="inline-block ml-1" />
            </a>
        </div>
        <div class="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {#each upcomingEvents.slice(0, 4) as event}
                <EventCard {event} />
            {/each}
        </div>
    </section>
</div>
