<script>
  import NavItem from '../NavItem/NavItem.svelte'
  import { ticketsStore } from '../../lib/tickets.js'

  export let onNavigate = null
  export let vertical = false

  $: ticketCount = $ticketsStore.length

  $: navItems = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/tickets', label: 'Tickets', badge: ticketCount > 0 ? ticketCount : null }
  ]
</script>

<nav aria-label="Main navigation">
  <ul class={`flex ${vertical ? 'flex-col gap-y-2' : 'flex-row gap-x-1'}`}>
    {#each navItems as item}
      <li>
        <NavItem {...item} onclick={onNavigate} />
      </li>
    {/each}
  </ul>
</nav>
