<script>
  import Icon from '@iconify/svelte'
  import { link } from "svelte-spa-router";
  export let event
  export let animated = true
</script>

<a
  href={`/event/${event.id}`}
  use:link
  class={`group block overflow-hidden rounded-4xl bg-card/60 backdrop-blur-md border border-border/30 text-card-foreground shadow-sm ${animated ? 'transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-card/75' : ''}`}
>
  <div class="relative aspect-[4/5] overflow-hidden" style={`background: ${event.gradient}`}>
    <img
      src={event.cover}
      alt={event.title}
      loading="lazy"
      decoding="async"
      class={`h-full w-full object-cover ${animated ? 'transition duration-500 group-hover:scale-105' : ''}`}
    />
    <div class={`absolute inset-0 bg-black/10 ${animated ? 'transition-colors duration-300 group-hover:bg-black/0' : ''}`}></div>
    <div class={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent px-5 pb-5 pt-16 ${animated ? 'translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100' : ''}`}>
      <p class="text-sm leading-5 text-white leading-relaxed">{event.description}</p>
    </div>
    <div class="absolute left-4 top-4 flex items-center gap-2">
      <span class="rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {event.category}
      </span>
      {#if event.featured}
        <span class="inline-flex items-center gap-1 rounded-full bg-amber-300/90 px-3 py-1 text-xs font-semibold text-amber-950 shadow-sm backdrop-blur-sm">
          <Icon icon="lucide:star" width="12" height="12" fill="currentColor" aria-hidden="true" />
          Featured
        </span>
      {/if}
    </div>
  </div>

  <div class="flex justify-between p-5">
     <div class="min-w-0">
       <div class="flex flex-col gap-y-1 mb-2">
         <p class="text-xs font-medium text-primary">{event.date}</p>
         <h3 class="truncate text-lg font-semibold tracking-tight" title={event.title}>{event.title}</h3>
      </div>
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm text-muted-foreground">{event.location}</p>
      </div>
    </div>
    <div>
      <p class="shrink-0 rounded-full bg-surface-raised/70 backdrop-blur-sm border border-border/30 px-3 py-1.5 text-sm shadow-sm">
         {event.price === 0 ? 'Free' : `₹${event.price.toLocaleString('en-IN')}`}
      </p>
    </div>
  </div>
</a>
