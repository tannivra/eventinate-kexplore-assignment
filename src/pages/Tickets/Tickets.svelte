<script>
    import Icon from '@iconify/svelte'
    import { link } from 'svelte-spa-router'
    import { ticketsStore, deleteTicket } from '../../lib/tickets.js'

    $: tickets = $ticketsStore

    let searchQuery = ''
    let ticketToDelete = null

    $: filteredTickets = searchQuery.trim()
        ? tickets.filter((t) =>
            t.event?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.ticketId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.event?.location?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : tickets

    function handleDelete(ticketId) {
        deleteTicket(ticketId)
        ticketToDelete = null
    }

    function handlePrint() {
        window.print()
    }
</script>

<svelte:head>
    <title>My Tickets ({tickets.length}) | Eventinate</title>
</svelte:head>

<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24" style="animation: fade-in-up 0.5s ease-out both;">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/20">
        <div class="space-y-2 sm:space-y-3">
            <div class="flex items-center gap-3">
                {#if tickets.length > 0}
                    <span class="rounded-full bg-surface-raised/70 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground border border-border/30">
                        {tickets.length} {tickets.length === 1 ? 'Pass' : 'Passes'}
                    </span>
                {/if}
            </div>
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                My Tickets
            </h1>
            <p class="text-xs sm:text-sm text-muted-foreground max-w-xl">
                All your confirmed event registrations and digital admission passes stored securely on your browser.
            </p>
        </div>

        {#if tickets.length > 0}
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <!-- Search bar if multiple tickets -->
                <div class="relative w-full sm:w-72">
                    <Icon icon="lucide:search" width="16" height="16" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search tickets..."
                        bind:value={searchQuery}
                        class="w-full rounded-full border border-border/30 bg-card/50 backdrop-blur-md py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-border/60"
                    />
                </div>
                <a
                    href="/events"
                    use:link
                    class="hidden sm:inline-flex items-center justify-center gap-2 rounded-full border border-border/40 bg-card/60 backdrop-blur-md px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-card/90 shrink-0"
                >
                    <Icon icon="lucide:compass" width="15" height="15" />
                    Find More Events
                </a>
            </div>
        {/if}
    </div>

    <!-- Main Content -->
    {#if tickets.length === 0}
        <!-- Empty State -->
        <div class="mx-auto flex max-w-md flex-col items-center justify-center py-20 sm:py-28 text-center" style="animation: fade-in-up 0.5s ease-out both;">
            <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-border/30 bg-card/60 backdrop-blur-md text-muted-foreground shadow-lg">
                <Icon icon="lucide:ticket" width="40" height="40" />
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-foreground">No tickets booked yet</h2>
            <p class="mt-2 text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
                You haven't registered for any events yet. When you register, your admission passes and booking details will appear right here.
            </p>
            <a
                href="/events"
                use:link
                class="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
            >
                <Icon icon="lucide:compass" width="16" height="16" />
                Browse Events
            </a>
        </div>

    {:else if filteredTickets.length === 0}
        <!-- Search query produced no results -->
        <div class="py-20 text-center">
            <p class="text-base font-semibold text-foreground">No tickets match "{searchQuery}"</p>
            <p class="mt-1 text-xs text-muted-foreground">Try searching with a different keyword or attendee name.</p>
            <button
                onclick={() => (searchQuery = '')}
                class="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-card/60 px-4 py-2 text-xs text-primary hover:bg-card/90 cursor-pointer"
            >
                Clear Search
            </button>
        </div>

    {:else}
        <!-- Ticket Grid -->
        <div class="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-2">
            {#each filteredTickets as ticket (ticket.ticketId)}
                <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/40 bg-card/75 text-left shadow-2xl backdrop-blur-md transition-all hover:border-border/60">
                    <!-- Ticket Header Banner -->
                    <div class="relative p-5 sm:p-7" style={`background: ${ticket.event?.gradient || 'linear-gradient(135deg, #312e81, #4f46e5)'}`}>
                        <div class="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
                        <div class="relative z-1 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 text-white">
                            <div class="space-y-1.5 sm:space-y-2">
                                <span class="inline-block rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                    {ticket.event?.category || 'Event Pass'}
                                </span>
                                <h3 class="text-lg sm:text-2xl font-bold leading-tight line-clamp-1">
                                    <a href={`/event/${ticket.event?.id}`} use:link class="hover:underline">
                                        {ticket.event?.title}
                                    </a>
                                </h3>
                                <div class="flex items-center gap-2 text-xs text-white/85">
                                    <Icon icon="lucide:map-pin" width="13" height="13" />
                                    <span>{ticket.event?.location}</span>
                                </div>
                            </div>

                            <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                                <span class="inline-block rounded-lg border border-white/15 bg-black/40 px-2.5 sm:px-3 py-1 font-mono text-xs font-bold tracking-wider backdrop-blur-sm">
                                    {ticket.ticketId}
                                </span>
                                <p class="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                                    {ticket.ticketType === 'vip' ? 'VIP Pass' : 'General Admission'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Perforated Tear Line with cutouts -->
                    <div class="relative flex items-center justify-between border-y border-dashed border-border/40 bg-surface-raised/40 px-5 sm:px-6 py-2.5">
                        <span class="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Digital Access Pass</span>
                        <span class="font-mono text-xs text-foreground font-medium">
                            {ticket.ticketCount} {ticket.ticketCount > 1 ? 'Tickets' : 'Ticket'}
                        </span>
                    </div>

                    <!-- Ticket Details Body -->
                    <div class="p-5 sm:p-7 space-y-5">
                        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div>
                                <p class="text-[11px] text-muted-foreground uppercase tracking-wider">Attendee</p>
                                <p class="mt-1 truncate text-xs font-semibold text-foreground" title={ticket.fullName}>
                                    {ticket.fullName}
                                </p>
                                <p class="truncate text-[10px] text-muted-foreground" title={ticket.email}>
                                    {ticket.email}
                                </p>
                            </div>
                            <div>
                                <p class="text-[11px] text-muted-foreground uppercase tracking-wider">Date</p>
                                <p class="mt-1 text-xs font-semibold text-foreground">{ticket.event?.date}</p>
                                <p class="text-[10px] text-muted-foreground">{ticket.event?.time}</p>
                            </div>
                            <div>
                                <p class="text-[11px] text-muted-foreground uppercase tracking-wider">Tier</p>
                                <p class="mt-1 text-xs font-semibold text-foreground">
                                    {ticket.ticketType === 'vip' ? 'VIP Priority' : 'General Entry'}
                                </p>
                                <p class="text-[10px] text-muted-foreground">
                                    {ticket.ticketCount} × {ticket.unitPrice === 0 ? 'Free' : `₹${ticket.unitPrice}`}
                                </p>
                            </div>
                            <div>
                                <p class="text-[11px] text-muted-foreground uppercase tracking-wider">Amount Paid</p>
                                <p class="mt-1 text-sm font-bold text-foreground">
                                    {ticket.total === 0 ? 'Free' : `₹${ticket.total?.toLocaleString('en-IN')}`}
                                </p>
                                <span class="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                                    <Icon icon="lucide:check-circle-2" width="10" height="10" />
                                    Confirmed
                                </span>
                            </div>
                        </div>

                        <!-- Venue Box + QR Code -->
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/20 bg-surface-raised/40 p-4">
                            <div class="flex items-start gap-3">
                                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-card text-foreground">
                                    <Icon icon="lucide:map-pin" width="16" height="16" />
                                </div>
                                <div class="min-w-0">
                                    <p class="text-[11px] text-muted-foreground">Venue Address</p>
                                    <p class="text-xs font-medium text-foreground leading-snug line-clamp-2">
                                        {ticket.event?.venue}
                                    </p>
                                </div>
                            </div>
                            <div class="shrink-0 flex items-center justify-end sm:justify-start">
                                <Icon icon="lucide:qr-code" width="44" height="44" class="text-foreground/75" />
                            </div>
                        </div>
                    </div>

                    <!-- Footer Action Buttons -->
                    <div class="flex flex-wrap items-center justify-between gap-3 border-t border-border/30 bg-card/90 px-5 sm:px-6 py-3.5 sm:py-4">
                        <div class="flex items-center gap-2">
                            <button
                                onclick={handlePrint}
                                class="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border/30 bg-surface-raised/60 px-3.5 sm:px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface-raised"
                            >
                                <Icon icon="lucide:printer" width="13" height="13" />
                                Print Pass
                            </button>
                            <a
                                href={`/event/${ticket.event?.id}`}
                                use:link
                                class="inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-surface-raised/60 px-3.5 sm:px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface-raised"
                            >
                                <Icon icon="lucide:external-link" width="13" height="13" />
                                View Event
                            </a>
                        </div>

                        <!-- Delete / Cancel Button -->
                        {#if ticketToDelete === ticket.ticketId}
                            <div class="flex items-center gap-2" style="animation: fade-in-up 0.2s ease-out both;">
                                <span class="text-xs text-rose-400">Cancel ticket?</span>
                                <button
                                    onclick={() => handleDelete(ticket.ticketId)}
                                    class="rounded-full bg-rose-500/20 border border-rose-500/40 px-3 py-1 text-xs font-semibold text-rose-400 hover:bg-rose-500/30 cursor-pointer"
                                >
                                    Yes, delete
                                </button>
                                <button
                                    onclick={() => (ticketToDelete = null)}
                                    class="rounded-full border border-border/30 px-3 py-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                                >
                                    No
                                </button>
                            </div>
                        {:else}
                            <button
                                onclick={() => (ticketToDelete = ticket.ticketId)}
                                class="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-rose-400"
                                title="Remove ticket from wallet"
                            >
                                <Icon icon="lucide:trash-2" width="13" height="13" />
                                Remove
                            </button>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
