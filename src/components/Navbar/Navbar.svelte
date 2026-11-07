<script>
  import NavItem from '../NavItem/NavItem.svelte'
  import { ticketsStore } from '../../lib/tickets.js'

  $: ticketCount = $ticketsStore.length

  $: navItems = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/tickets', label: 'Tickets', badge: ticketCount > 0 ? ticketCount : null }
  ]
</script>

<nav aria-label="Main navigation">
  <ul class="flex gap-x-1">
    {#each navItems as item}
      <li><NavItem {...item} /></li>
    {/each}
  </ul>
</nav>
