<script>
  import Icon from '@iconify/svelte'
  import { link } from 'svelte-spa-router'
</script>

<svelte:head>
  <title>Page Not Found | Eventinate</title>
</svelte:head>

<section class="mx-auto flex w-full max-w-lg flex-col items-center justify-center py-32 text-center" style="animation: fade-in-up 0.5s ease-out both;">
  <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-border/30 bg-card/60 backdrop-blur-md text-muted-foreground shadow-xl">
    <Icon icon="lucide:map-pin-off" width="38" height="38" />
  </div>
  <span class="rounded-full border border-border/30 bg-surface-raised/60 px-3.5 py-1 text-xs font-semibold text-muted-foreground">
    404 Error
  </span>
  <h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
    Page not found
  </h1>
  <p class="mt-2 text-sm text-muted-foreground leading-relaxed max-w-sm">
    Sorry, the page you are looking for doesn't exist or has been moved.
  </p>
  <div class="mt-8 flex items-center gap-3">
    <a
      href="/"
      use:link
      class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
    >
      <Icon icon="lucide:home" width="16" height="16" />
      Home
    </a>
    <a
      href="/events"
      use:link
      class="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/60 px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card/90 backdrop-blur-md"
    >
      <Icon icon="lucide:compass" width="16" height="16" />
      Browse Events
    </a>
  </div>
</section>
