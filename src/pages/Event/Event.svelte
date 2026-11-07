<script>
    import Icon from '@iconify/svelte'
    import { onMount } from 'svelte'
    import { link } from 'svelte-spa-router'
    import { getEventById } from '../../data/events.js'

    export let params = {}

    $: event = getEventById(params.id)
    let countdown = ''
    let isSaved = false
    let shareMessage = ''

    function eventDate(event) {
        const value = String(event.dateOrder)
        return new Date(
            Number(value.slice(0, 4)),
            Number(value.slice(4, 6)) - 1,
            Number(value.slice(6, 8)),
            12,
            0,
            0
        )
    }

    function updateCountdown() {
        if (!event) return
        const difference = eventDate(event).getTime() - Date.now()
        if (difference <= 0) {
            countdown = 'Event date has passed'
            return
        }

        const days = Math.floor(difference / 86400000)
        const hours = Math.floor((difference % 86400000) / 3600000)
        const minutes = Math.floor((difference % 3600000) / 60000)
        countdown = `${days}d ${hours}h ${minutes}m to go`
    }

    function toggleSaved() {
        const saved = JSON.parse(localStorage.getItem('eventinate_saved_events') || localStorage.getItem('kexplore_saved_events') || '[]')
        const updated = isSaved
            ? saved.filter((id) => id !== event.id)
            : [...saved, event.id]
        localStorage.setItem('eventinate_saved_events', JSON.stringify(updated))
        isSaved = !isSaved
    }

    async function shareEvent() {
        const url = window.location.href
        try {
            if (navigator.share) {
                await navigator.share({ title: event.title, text: event.description, url })
            } else {
                await navigator.clipboard.writeText(url)
                shareMessage = 'Link copied'
                setTimeout(() => (shareMessage = ''), 1800)
            }
        } catch (error) {
            if (error.name !== 'AbortError') shareMessage = 'Could not share'
        }
    }

    onMount(() => {
        if (event) {
            const saved = JSON.parse(localStorage.getItem('eventinate_saved_events') || localStorage.getItem('kexplore_saved_events') || '[]')
            isSaved = saved.includes(event.id)
        }
        updateCountdown()
        const interval = setInterval(updateCountdown, 60000)
        return () => clearInterval(interval)
    })
</script>

<svelte:head>
    <title>{event ? `${event.title} | Eventinate` : 'Event Not Found | Eventinate'}</title>
</svelte:head>

{#if event}
<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20" style="animation: fade-in-up 0.5s ease-out both;">
    <!-- Back button -->
    <div class="pb-6">
        <button
            onclick={() => window.history.back()}
            class="inline-flex items-center gap-x-2 rounded-full bg-card/60 backdrop-blur-md border border-border/30 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-card/80 cursor-pointer"
        >
            <Icon icon="lucide:arrow-left" width="16" height="16" />
            Back
        </button>
    </div>

    <!-- Hero cover image -->
    <div class="relative h-[260px] sm:h-[340px] md:h-[420px] w-full overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-4xl" style={`background: ${event.gradient}`}>
        <img
            src={event.cover}
            alt={event.title}
            decoding="async"
            class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10">
            <div class="flex flex-wrap items-center gap-2 mb-2 sm:mb-4">
                <span class="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm border border-white/10">
                    {event.category}
                </span>
                {#if event.featured}
                    <span class="inline-flex items-center gap-1 rounded-full bg-amber-300/90 px-3 py-1 text-xs font-semibold text-amber-950 shadow-sm backdrop-blur-sm">
                        <Icon icon="lucide:star" width="12" height="12" fill="currentColor" aria-hidden="true" />
                        Featured
                    </span>
                {/if}
            </div>
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">{event.title}</h1>
            <p class="mt-2 max-w-2xl text-xs sm:text-sm md:text-base text-white/80 line-clamp-2 sm:line-clamp-none">{event.description}</p>
        </div>
    </div>

    <!-- Content grid -->
    <div class="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-6 sm:space-y-8">
            <!-- About -->
            <div class="rounded-2xl sm:rounded-3xl bg-card/60 backdrop-blur-md border border-border/30 p-5 sm:p-7 md:p-8">
                <h2 class="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">About this event</h2>
                <p class="text-xs sm:text-sm leading-relaxed text-muted-foreground">{event.about}</p>
            </div>

            <!-- Venue / Location -->
            <div class="rounded-2xl sm:rounded-3xl bg-card/60 backdrop-blur-md border border-border/30 p-5 sm:p-7 md:p-8">
                <h2 class="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Venue</h2>
                <div class="flex items-start gap-4">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-raised/70 backdrop-blur-sm border border-border/30">
                        <Icon icon="lucide:map-pin" width="18" height="18" class="text-muted-foreground" />
                    </div>
                    <div>
                        <p class="text-sm sm:text-base font-medium text-foreground">{event.location}</p>
                        <p class="mt-1 text-xs sm:text-sm text-muted-foreground">{event.venue}</p>
                    </div>
                </div>
            </div>

            <!-- Organizer -->
            <div class="rounded-2xl sm:rounded-3xl bg-card/60 backdrop-blur-md border border-border/30 p-5 sm:p-7 md:p-8">
                <h2 class="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Organized by</h2>
                <div class="flex items-center gap-4">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-raised/70 backdrop-blur-sm border border-border/30">
                        <Icon icon="lucide:user" width="18" height="18" class="text-muted-foreground" />
                    </div>
                    <p class="text-sm sm:text-base font-medium text-foreground">{event.organizer}</p>
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
            <!-- Ticket card -->
            <div class="lg:sticky lg:top-[110px] rounded-2xl sm:rounded-3xl bg-card/60 backdrop-blur-md border border-border/30 p-5 sm:p-7 md:p-8 space-y-6">
                <div>
                    <p class="text-xs sm:text-sm text-muted-foreground">Price</p>
                    <p class="mt-1 text-2xl sm:text-3xl font-bold text-foreground">
                        {event.price === 0 ? 'Free' : `₹${event.price.toLocaleString('en-IN')}`}
                    </p>
                    <p class="mt-2 text-xs font-medium text-primary">{countdown}</p>
                </div>

                <div class="space-y-3 sm:space-y-4">
                    <div class="flex items-start gap-3">
                        <Icon icon="lucide:calendar" width="18" height="18" class="shrink-0 text-muted-foreground mt-0.5" />
                        <div>
                            <p class="text-sm font-medium text-foreground">{event.date}</p>
                            <p class="text-xs text-muted-foreground">{event.time}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <Icon icon="lucide:map-pin" width="18" height="18" class="shrink-0 text-muted-foreground" />
                        <p class="text-sm font-medium text-foreground">{event.location}</p>
                    </div>
                </div>

                <a
                    href={`/register/${event.id}`}
                    use:link
                    class="block text-center w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
                >
                    {event.price === 0 ? 'Register for Free' : 'Get Tickets'}
                </a>

                <div class="flex items-center justify-center gap-4 pt-2">
                     <button onclick={toggleSaved} class="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                         <Icon icon="lucide:heart" width="16" height="16" fill={isSaved ? 'currentColor' : 'none'} />
                         {isSaved ? 'Saved' : 'Save'}
                     </button>
                     <button onclick={shareEvent} class="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                         <Icon icon="lucide:share-2" width="16" height="16" />
                         Share
                     </button>
                     {#if shareMessage}
                         <span class="text-xs text-primary">{shareMessage}</span>
                     {/if}
                </div>
            </div>
        </div>
    </div>
</div>
{:else}
<div class="mx-auto flex w-full max-w-md px-4 flex-col items-center justify-center py-24 sm:py-36 text-center" style="animation: fade-in-up 0.5s ease-out both;">
    <h1 class="text-3xl sm:text-4xl font-bold text-foreground">Event not found</h1>
    <p class="mt-3 text-sm text-muted-foreground">The event you're looking for doesn't exist or has been removed.</p>
    <a href="/events" use:link class="mt-6 inline-flex items-center gap-x-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
        <Icon icon="lucide:arrow-left" width="16" height="16" />
        Browse Events
    </a>
</div>
{/if}
