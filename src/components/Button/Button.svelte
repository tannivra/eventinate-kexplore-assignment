<script>
  let {
    variant = 'default',
    size = 'default',
    class: className = '',
    children,
    ...rest
  } = $props()

  const variants = {
    default: 'bg-primary/90 text-primary-foreground backdrop-blur-sm hover:bg-primary',
    control: 'bg-input/60 backdrop-blur-md border border-border/30 text-foreground hover:bg-muted/80'
  }

  const sizes = {
    default: 'px-8 py-3',
    control: 'px-8 py-2'
  }
</script>

<button
  {...rest}
  class={`inline-flex items-center justify-center gap-x-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none 
  focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
>
  {@render children?.()}
</button>
