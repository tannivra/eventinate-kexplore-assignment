<script>
  import Icon from '@iconify/svelte'
  import { link } from 'svelte-spa-router'
  import Navbar from '../Navbar/Navbar.svelte'

  let isMobileMenuOpen = false

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false
  }
</script>

<header class="sticky top-0 z-50 w-full bg-background/40 backdrop-blur-md border-b border-border/20">
  <div class="mx-auto flex h-[72px] sm:h-[84px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <div>
      <a href="/" use:link onclick={closeMobileMenu} class="inline-flex items-center gap-2.5 text-lg font-semibold text-foreground transition-opacity hover:opacity-90">
        <img src="/logo.png" alt="Eventinate logo" class="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover" />
        <span class="tracking-tight">Eventinate</span>
      </a>
    </div>

    <!-- Desktop Navigation -->
    <div class="hidden md:block">
      <Navbar />
    </div>

    <!-- Mobile Menu Toggle Button -->
    <div class="flex items-center md:hidden">
      <button
        type="button"
        onclick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-card/60 backdrop-blur-md text-foreground transition-colors hover:bg-card/90 cursor-pointer"
      >
        {#if isMobileMenuOpen}
          <Icon icon="lucide:x" width="20" height="20" />
        {:else}
          <Icon icon="lucide:menu" width="20" height="20" />
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Dropdown Navigation -->
  {#if isMobileMenuOpen}
    <div class="border-b border-border/20 bg-background/95 px-4 pb-5 pt-3 backdrop-blur-xl md:hidden" style="animation: fade-in-up 0.2s ease-out both;">
      <Navbar vertical={true} onNavigate={closeMobileMenu} />
    </div>
  {/if}
</header>
