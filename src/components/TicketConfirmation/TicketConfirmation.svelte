<script>
  import Icon from '@iconify/svelte'
  import { link } from 'svelte-spa-router'

  export let event
  export let fullName
  export let email
  export let ticketCount
  export let ticketType
  export let ticketId
  export let total
  export let printTicket
</script>

<div class="mx-auto max-w-2xl py-4 sm:py-6 text-center">
  <div class="mx-auto mb-4 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400">
    <Icon icon="lucide:check-circle-2" width="30" height="30" />
  </div>

  <span class="inline-flex items-center gap-x-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
    Booking Confirmed
  </span>

  <h1 class="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
    You're registered, {fullName.split(' ')[0]}!
  </h1>
  <p class="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
    We've sent a confirmation receipt and ticket details to <span class="font-medium text-foreground">{email}</span>.
  </p>

  <div class="mt-8 sm:mt-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-border/40 bg-card/75 text-left shadow-2xl backdrop-blur-md">
    <div class="relative p-5 sm:p-7 md:p-8" style={`background: ${event.gradient}`}>
      <div class="absolute inset-0 bg-black/45 backdrop-blur-xs"></div>
      <div class="relative z-1 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 text-white">
        <div>
          <span class="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {event.category}
          </span>
          <h2 class="mt-2.5 text-xl sm:text-2xl font-bold leading-tight">{event.title}</h2>
          <p class="mt-1 text-xs text-white/80">{event.location}</p>
        </div>
        <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
          <span class="inline-block rounded-lg border border-white/10 bg-black/30 px-3 py-1 font-mono text-xs font-semibold tracking-wider backdrop-blur-sm">
            {ticketId}
          </span>
          <p class="text-[11px] uppercase tracking-wider text-white/70">
            {ticketType === 'vip' ? 'VIP Pass' : 'General Admission'}
          </p>
        </div>
      </div>
    </div>

    <div class="relative flex items-center justify-between border-y border-dashed border-border/50 bg-surface-raised/40 px-5 sm:px-6 py-2">
      <span class="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-foreground">Digital Access Pass</span>
      <span class="font-mono text-xs text-muted-foreground">{ticketCount} {ticketCount > 1 ? 'Tickets' : 'Ticket'}</span>
    </div>

    <div class="space-y-5 sm:space-y-6 p-5 sm:p-7 md:p-8">
      <div class="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
        <div>
          <p class="text-[11px] text-muted-foreground uppercase tracking-wider">Attendee</p>
          <p class="mt-1 truncate text-xs sm:text-sm font-semibold text-foreground">{fullName}</p>
        </div>
        <div>
          <p class="text-[11px] text-muted-foreground uppercase tracking-wider">Date</p>
          <p class="mt-1 text-xs sm:text-sm font-semibold text-foreground">{event.date}</p>
        </div>
        <div>
          <p class="text-[11px] text-muted-foreground uppercase tracking-wider">Time</p>
          <p class="mt-1 text-xs sm:text-sm font-semibold text-foreground">{event.time}</p>
        </div>
        <div>
          <p class="text-[11px] text-muted-foreground uppercase tracking-wider">Amount Paid</p>
          <p class="mt-1 text-xs sm:text-sm font-semibold text-foreground">{total === 0 ? 'Free' : `₹${total.toLocaleString('en-IN')}`}</p>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-4 rounded-2xl border border-border/20 bg-surface-raised/50 p-4 sm:flex-row sm:items-center">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/30 bg-card text-foreground">
            <Icon icon="lucide:map-pin" width="18" height="18" />
          </div>
          <div>
            <p class="text-[11px] text-muted-foreground">Venue Address</p>
            <p class="text-xs font-medium text-foreground leading-snug">{event.venue}</p>
          </div>
        </div>
        <div class="flex shrink-0 items-center justify-end sm:justify-start gap-2">
          <Icon icon="lucide:qr-code" width="40" height="40" class="text-foreground/70" />
        </div>
      </div>
    </div>

    <div class="flex flex-col items-stretch sm:items-center gap-3 border-t border-border/30 bg-card/90 p-5 sm:p-6 sm:flex-row">
      <button onclick={printTicket} class="inline-flex w-full flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto">
        <Icon icon="lucide:download" width="16" height="16" />
        Print / Save Pass
      </button>
      <a href="/tickets" use:link class="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-border/40 bg-surface-raised/70 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-raised sm:w-auto">
        <Icon icon="lucide:ticket" width="16" height="16" />
        View in My Tickets
      </a>
    </div>
  </div>
</div>
