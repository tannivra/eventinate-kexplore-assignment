<script>
  import { link } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'

  let { href, label, badge = null } = $props();
</script>

<a
  href={href}
  use:link
  use:active={{
    path: href,
    className: 'text-primary bg-card/55',
    inactiveClassName: 'text-foreground',
  }}
  class="inline-flex items-center gap-2 transition-colors hover:text-primary px-6 py-2 rounded-full backdrop-blur-md"
>
  <span>{label}</span>
  {#if badge}
    <span class="rounded-full bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 text-[10px] font-bold leading-none">
      {badge}
    </span>
  {/if}
</a>
