<script>
  import { link } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'

  let { href, label, badge = null, onclick = null } = $props();
</script>

<a
  href={href}
  use:link
  use:active={{
    path: href,
    className: 'text-primary bg-card/70',
    inactiveClassName: 'text-foreground',
  }}
  onclick={() => onclick?.()}
  class="flex items-center justify-between md:inline-flex md:w-auto gap-2 transition-colors hover:text-primary px-5 py-2.5 sm:px-6 sm:py-2 rounded-full backdrop-blur-md w-full"
>
  <span>{label}</span>
  {#if badge}
    <span class="rounded-full bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 text-[10px] font-bold leading-none">
      {badge}
    </span>
  {/if}
</a>
