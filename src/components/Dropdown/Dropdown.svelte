<script>
  import Icon from '@iconify/svelte'
  import { DropdownMenu } from 'bits-ui'
  import Button from '../Button/Button.svelte'

  let {
    options = [],
    value,
    onSelect,
    icon = 'lucide:chevron-down',
    showCounts = false
  } = $props()

  let selectedOption = $derived(options.find((option) => option.value === value))
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="control" size="control" class="justify-between">
        {selectedOption?.label}
        {#if showCounts && selectedOption?.count !== undefined}
          <span class="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
            {selectedOption.count}
          </span>
        {/if}
        <Icon icon={icon} width="16" height="16" aria-hidden="true" />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      class="z-50 min-w-70 rounded-2xl border border-border/30 bg-card/80 p-1 text-card-foreground shadow-xl backdrop-blur-md outline-none"
      sideOffset={6}
      align="end"
    >
      {#each options as option}
        <DropdownMenu.Item
          class="flex cursor-pointer items-center justify-between gap-8 rounded-2xl px-4 py-3 text-sm outline-none transition-colors
           hover:bg-foreground/5"
          onclick={() => onSelect?.(option.value)}
        >
          <span>{option.label}</span>
          {#if showCounts && option.count !== undefined}
            <span class="rounded-full bg-surface-raised px-2 py-0.5 text-xs font-semibold text-muted-foreground">
              {option.count}
            </span>
          {/if}
        </DropdownMenu.Item>
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
