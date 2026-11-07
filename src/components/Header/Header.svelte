<script>
  import { link } from 'svelte-spa-router'
  import Navbar from '../Navbar/Navbar.svelte'
</script>

<header class="sticky top-0 z-50 flex h-[90px] w-full items-center bg-transparent px-12 py-2">
  <div class="mx-auto flex w-full max-w-[calc(100vw-220px)] items-center gap-x-16">
    <div>
      <a href="/" use:link class="inline-flex items-center gap-2 text-lg font-semibold text-foreground">
        <img src="/logo.png" alt="Eventinate logo" class="h-9 w-9 rounded-full" />
        Eventinate
      </a>
    </div>

    <div>
      <Navbar />
    </div>
  </div>
</header>
