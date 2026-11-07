<script>
    import Router from 'svelte-spa-router'
    import Header from './components/Header/Header.svelte'
    import { routes } from './routes'
</script>

<div class="relative min-h-screen bg-background text-foreground overflow-hidden">
    <!-- Ambient gradient blobs -->
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div class="absolute -top-[300px] -left-[200px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,oklch(0.45_0.2_280/0.15),transparent_70%)]"
             style="animation: pulse-glow 8s ease-in-out infinite;"></div>
        <div class="absolute -bottom-[200px] -right-[200px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.5_0.18_330/0.12),transparent_70%)]"
             style="animation: pulse-glow 10s ease-in-out infinite 2s;"></div>
        <div class="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.4_0.15_200/0.08),transparent_70%)]"
             style="animation: pulse-glow 12s ease-in-out infinite 4s;"></div>
    </div>

    <!-- Dot pattern overlay -->
    <div class="pointer-events-none fixed inset-0 z-0 pattern-dots" aria-hidden="true"></div>

    <div class="relative z-1">
        <Header />
        <main>
            <Router {routes} />
        </main>
    </div>
</div>
