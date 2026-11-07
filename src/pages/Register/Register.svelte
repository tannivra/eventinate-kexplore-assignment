<script>
    import Icon from '@iconify/svelte'
    import { link } from 'svelte-spa-router'
    import TicketConfirmation from '../../components/TicketConfirmation/TicketConfirmation.svelte'
    import { getEventById } from '../../data/events.js'
    import { saveTicket } from '../../lib/tickets.js'

    export let params = {}

    $: event = params?.id ? getEventById(params.id) : null

    let fullName = ''
    let email = ''
    let phone = ''
    let organization = ''
    let ticketCount = 1
    let ticketType = 'general'
    let specialNotes = ''
    let agreedToTerms = false
    let isSubmitting = false
    let isSuccess = false
    let ticketId = ''
    let errors = {}

    function increaseTickets() {
        if (ticketCount < 8) ticketCount += 1
    }

    function decreaseTickets() {
        if (ticketCount > 1) ticketCount -= 1
    }

    $: unitPrice = event ? (ticketType === 'vip' ? (event.price === 0 ? 300 : event.price + 500) : event.price) : 0
    $: subtotal = unitPrice * ticketCount
    $: platformFee = 0
    $: total = subtotal + platformFee

    function validateForm() {
        const nextErrors = {}
        const normalizedPhone = phone.replace(/[\s()-]/g, '')

        if (fullName.trim().length < 2) nextErrors.fullName = 'Please enter your full name.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Please enter a valid email address.'
        if (!/^\+?\d{10,15}$/.test(normalizedPhone)) nextErrors.phone = 'Please enter a valid phone number.'
        if (!agreedToTerms) nextErrors.terms = 'Please agree to the event rules to continue.'
        if (!event) nextErrors.event = 'This event could not be found.'

        errors = nextErrors
        return Object.keys(nextErrors).length === 0
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!validateForm()) return

        isSubmitting = true
        setTimeout(() => {
            ticketId = 'EV-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000)
            
            // Save ticket to localStorage
            saveTicket({
                ticketId,
                bookedAt: new Date().toISOString(),
                event: {
                    id: event.id,
                    title: event.title,
                    category: event.category,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    venue: event.venue,
                    cover: event.cover,
                    gradient: event.gradient,
                    price: event.price
                },
                fullName: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                organization: organization.trim(),
                ticketCount,
                ticketType,
                specialNotes: specialNotes.trim(),
                unitPrice,
                total
            })

            isSubmitting = false
            isSuccess = true
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 600)
    }

    function printTicket() {
        window.print()
    }

    function resetForm() {
        isSuccess = false
        errors = {}
        fullName = ''
        email = ''
        phone = ''
        organization = ''
        ticketCount = 1
        ticketType = 'general'
        specialNotes = ''
    }
</script>

<svelte:head>
    <title>{isSuccess ? 'Registration Confirmed' : (event ? `Register for ${event.title}` : 'Register for an Event')} | Eventinate</title>
</svelte:head>

<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24" style="animation: fade-in-up 0.5s ease-out both;">
    <!-- Back Button -->
    <div class="pb-6">
        <button
            onclick={() => window.history.back()}
            class="inline-flex items-center gap-x-2 rounded-full bg-card/60 backdrop-blur-md border border-border/30 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-card/80 cursor-pointer"
        >
            <Icon icon="lucide:arrow-left" width="16" height="16" />
            Back
        </button>
    </div>

    {#if isSuccess && event}
        <TicketConfirmation
            {event}
            {fullName}
            {email}
            {ticketCount}
            {ticketType}
            {ticketId}
            {total}
            {printTicket}
        />

    {:else if event}
        <!-- Registration Form Layout -->
        <div class="space-y-3 mb-8">
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Event Registration
            </h1>
            <p class="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Secure your spot in seconds. Fill in your details below and we'll deliver your admission pass directly to your inbox.
            </p>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <!-- Left Form (8 cols) -->
            <form onsubmit={handleSubmit} class="lg:col-span-8 space-y-6 sm:space-y-8">
                <!-- Attendee Details Card -->
                <div class="rounded-2xl sm:rounded-3xl bg-card/60 backdrop-blur-md border border-border/30 p-5 sm:p-7 md:p-8 space-y-6">
                    <div class="flex items-center gap-3 border-b border-border/20 pb-4">
                        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-surface-raised/70 border border-border/30 text-primary">
                            <Icon icon="lucide:user" width="18" height="18" />
                        </div>
                        <div>
                            <h2 class="text-base font-semibold text-foreground">Attendee Information</h2>
                            <p class="text-xs text-muted-foreground">Primary ticket holder contact details</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <!-- Full Name -->
                        <div class="md:col-span-2 space-y-2">
                            <label for="fullname" class="block text-xs font-medium text-foreground">
                                Full Name <span class="text-rose-400">*</span>
                            </label>
                            <div class="relative">
                                <Icon icon="lucide:user" width="16" height="16" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    id="fullname"
                                    type="text"
                                    required
                                    bind:value={fullName}
                                    placeholder="e.g. Priya Sharma"
                                    class="w-full rounded-full border border-border/30 bg-input/50 backdrop-blur-md py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-border/60"
                                 />
                            </div>
                            {#if errors.fullName}<p class="text-xs text-rose-400">{errors.fullName}</p>{/if}
                        </div>

                        <!-- Email Address -->
                        <div class="space-y-2">
                            <label for="email" class="block text-xs font-medium text-foreground">
                                Email Address <span class="text-rose-400">*</span>
                            </label>
                            <div class="relative">
                                <Icon icon="lucide:mail" width="16" height="16" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    bind:value={email}
                                    placeholder="priya@example.com"
                                    class="w-full rounded-full border border-border/30 bg-input/50 backdrop-blur-md py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-border/60"
                                 />
                            </div>
                            {#if errors.email}<p class="text-xs text-rose-400">{errors.email}</p>{/if}
                        </div>

                        <!-- Phone Number -->
                        <div class="space-y-2">
                            <label for="phone" class="block text-xs font-medium text-foreground">
                                Mobile Number <span class="text-rose-400">*</span>
                            </label>
                            <div class="relative">
                                <Icon icon="lucide:phone" width="16" height="16" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    id="phone"
                                    type="tel"
                                    required
                                    bind:value={phone}
                                    placeholder="+91 98765 43210"
                                    class="w-full rounded-full border border-border/30 bg-input/50 backdrop-blur-md py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-border/60"
                                 />
                            </div>
                            {#if errors.phone}<p class="text-xs text-rose-400">{errors.phone}</p>{/if}
                        </div>

                        <!-- Company / Organization -->
                        <div class="md:col-span-2 space-y-2">
                            <label for="org" class="block text-xs font-medium text-foreground">
                                College / Company / Organization <span class="text-muted-foreground">(Optional)</span>
                            </label>
                            <div class="relative">
                                <Icon icon="lucide:building" width="16" height="16" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    id="org"
                                    type="text"
                                    bind:value={organization}
                                    placeholder="e.g. IIT Bombay / Independent"
                                    class="w-full rounded-full border border-border/30 bg-input/50 backdrop-blur-md py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-border/60"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ticket Options Card -->
                <div class="rounded-2xl sm:rounded-3xl bg-card/60 backdrop-blur-md border border-border/30 p-5 sm:p-7 md:p-8 space-y-6">
                    <div class="flex items-center gap-3 border-b border-border/20 pb-4">
                        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-surface-raised/70 border border-border/30 text-primary">
                            <Icon icon="lucide:ticket" width="18" height="18" />
                        </div>
                        <div>
                            <h2 class="text-base font-semibold text-foreground">Ticket Selection</h2>
                            <p class="text-xs text-muted-foreground">Select your entry tier and quantity</p>
                        </div>
                    </div>

                    <!-- Ticket Tier Options -->
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <!-- General Admission -->
                        <button
                            type="button"
                            onclick={() => (ticketType = 'general')}
                            class={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                                ticketType === 'general'
                                    ? 'border-primary bg-card/90 shadow-md ring-1 ring-primary/40'
                                    : 'border-border/30 bg-surface-raised/30 hover:bg-surface-raised/60'
                            }`}
                        >
                            <div class="flex items-center justify-between w-full">
                                <span class="text-sm font-semibold text-foreground">General Entry</span>
                                {#if ticketType === 'general'}
                                    <Icon icon="lucide:check-circle-2" width="16" height="16" class="text-primary" />
                                {/if}
                            </div>
                            <p class="mt-2 text-xs text-muted-foreground">Standard access to all regular event areas and sessions.</p>
                            <p class="mt-4 text-sm font-bold text-foreground">
                                {event.price === 0 ? 'Free' : `₹${event.price.toLocaleString('en-IN')}`}
                            </p>
                        </button>

                        <!-- VIP Access -->
                        <button
                            type="button"
                            onclick={() => (ticketType = 'vip')}
                            class={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                                ticketType === 'vip'
                                    ? 'border-primary bg-card/90 shadow-md ring-1 ring-primary/40'
                                    : 'border-border/30 bg-surface-raised/30 hover:bg-surface-raised/60'
                            }`}
                        >
                            <div class="flex items-center justify-between w-full">
                                <div class="flex items-center gap-1.5">
                                    <span class="text-sm font-semibold text-foreground">VIP Access</span>
                                    <span class="rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 text-[10px] font-bold">
                                        PRIORITY
                                    </span>
                                </div>
                                {#if ticketType === 'vip'}
                                    <Icon icon="lucide:check-circle-2" width="16" height="16" class="text-primary" />
                                {/if}
                            </div>
                            <p class="mt-2 text-xs text-muted-foreground">Priority check-in, reserved seating zone, and organizer meetup.</p>
                            <p class="mt-4 text-sm font-bold text-foreground">
                                {event.price === 0 ? '₹300' : `₹${(event.price + 500).toLocaleString('en-IN')}`}
                            </p>
                        </button>
                    </div>

                    <!-- Quantity Counter -->
                    <div class="flex items-center justify-between rounded-2xl bg-surface-raised/40 p-4 border border-border/20">
                        <div>
                            <p class="text-sm font-medium text-foreground">Number of Tickets</p>
                            <p class="text-xs text-muted-foreground">Max 8 tickets per registration</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <button
                                type="button"
                                onclick={decreaseTickets}
                                disabled={ticketCount <= 1}
                                class="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-card/60 text-foreground transition-opacity hover:bg-card/90 disabled:opacity-40 cursor-pointer"
                            >
                                <Icon icon="lucide:minus" width="14" height="14" />
                            </button>
                            <span class="w-8 text-center text-base font-semibold text-foreground">{ticketCount}</span>
                            <button
                                type="button"
                                onclick={increaseTickets}
                                disabled={ticketCount >= 8}
                                class="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-card/60 text-foreground transition-opacity hover:bg-card/90 disabled:opacity-40 cursor-pointer"
                            >
                                <Icon icon="lucide:plus" width="14" height="14" />
                            </button>
                        </div>
                    </div>

                    <!-- Special Requests -->
                    <div class="space-y-2">
                        <label for="notes" class="block text-xs font-medium text-foreground">
                            Special Requests / Dietary Notes <span class="text-muted-foreground">(Optional)</span>
                        </label>
                        <textarea
                            id="notes"
                            rows="2"
                            bind:value={specialNotes}
                            placeholder="Any accessibility requirements or questions for the organizers..."
                            class="w-full rounded-2xl border border-border/30 bg-input/50 backdrop-blur-md p-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-border/60 resize-none"
                        ></textarea>
                    </div>
                </div>

                <!-- Terms & Submit Card -->
                <div class="rounded-2xl sm:rounded-3xl bg-card/60 backdrop-blur-md border border-border/30 p-5 sm:p-7 space-y-5">
                    <label class="flex cursor-pointer select-none items-start gap-3 text-xs text-muted-foreground">
                        <input type="checkbox" bind:checked={agreedToTerms} class="mt-0.5 h-4 w-4 rounded border-border/40 accent-primary" />
                        <span>I agree to the <a href="/events" use:link class="text-primary hover:underline">event rules</a> and understand that ticket confirmations will be verified at the venue entrance.</span>
                    </label>
                    {#if errors.terms}<p class="text-xs text-rose-400">{errors.terms}</p>{/if}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        class="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 sm:py-4 text-sm font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    >
                        {#if isSubmitting}
                            <Icon icon="lucide:loader-2" width="18" height="18" class="animate-spin" />
                            Processing Registration...
                        {:else if total === 0}
                            <Icon icon="lucide:check" width="18" height="18" />
                            Confirm Free Registration ({ticketCount} {ticketCount > 1 ? 'tickets' : 'ticket'})
                        {:else}
                            <Icon icon="lucide:shield-check" width="18" height="18" />
                            Pay ₹{total.toLocaleString('en-IN')} & Confirm Registration
                        {/if}
                    </button>
                </div>
            </form>

            <!-- Right Sidebar / Order Summary (4 cols: narrower and taller on desktop, elegant stack on mobile) -->
            <div class="lg:col-span-4">
                <div class="lg:sticky lg:top-[110px] space-y-5">
                    <!-- Event Preview Card -->
                    <div class="overflow-hidden rounded-2xl sm:rounded-3xl bg-card/60 backdrop-blur-md border border-border/30 shadow-lg">
                        <div class="relative aspect-[16/9] sm:aspect-[3/4] w-full overflow-hidden" style={`background: ${event.gradient}`}>
                            <img
                                src={event.cover}
                                alt={event.title}
                                decoding="async"
                                class="h-full w-full object-cover"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                            <div class="absolute top-4 left-4 right-4 flex items-center justify-between">
                                <span class="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10">
                                    {event.category}
                                </span>
                                {#if event.featured}
                                    <span class="inline-flex items-center gap-1 rounded-full bg-amber-300/90 px-2.5 py-0.5 text-[11px] font-semibold text-amber-950 shadow-sm backdrop-blur-sm">
                                        <Icon icon="lucide:star" width="11" height="11" fill="currentColor" />
                                        Featured
                                    </span>
                                {/if}
                            </div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <h3 class="text-lg sm:text-xl font-bold text-white leading-tight">{event.title}</h3>
                            </div>
                        </div>

                        <div class="p-4 sm:p-5 space-y-4">
                            <!-- Event Quick Meta -->
                            <div class="space-y-2.5 text-xs">
                                <div class="flex items-center gap-2.5 text-foreground">
                                    <Icon icon="lucide:calendar" width="15" height="15" class="text-muted-foreground shrink-0" />
                                    <span>{event.date} • {event.time}</span>
                                </div>
                                <div class="flex items-start gap-2.5 text-foreground">
                                    <Icon icon="lucide:map-pin" width="15" height="15" class="text-muted-foreground shrink-0 mt-0.5" />
                                    <span class="text-muted-foreground leading-relaxed">{event.venue}</span>
                                </div>
                            </div>

                            <!-- Cost Breakdown -->
                            <div class="border-t border-border/20 pt-4 space-y-2 text-xs">
                                <div class="flex justify-between text-muted-foreground">
                                    <span>{ticketType === 'vip' ? 'VIP Pass' : 'General Pass'} ({ticketCount} × {unitPrice === 0 ? 'Free' : `₹${unitPrice}`})</span>
                                    <span class="text-foreground">{subtotal === 0 ? 'Free' : `₹${subtotal.toLocaleString('en-IN')}`}</span>
                                </div>
                                <div class="flex justify-between text-muted-foreground">
                                    <span>Booking Fee</span>
                                    <span class="text-emerald-400 font-medium">Free</span>
                                </div>
                                <div class="border-t border-border/20 pt-3 flex justify-between text-sm font-semibold text-foreground">
                                    <span>Total Payable</span>
                                    <span class="text-base text-primary font-bold">
                                        {total === 0 ? 'Free' : `₹${total.toLocaleString('en-IN')}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Trust / Assurance Badge -->
                    <div class="rounded-2xl border border-border/20 bg-surface-raised/40 p-4 backdrop-blur-sm flex items-center gap-3">
                        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card border border-border/30 text-emerald-400">
                            <Icon icon="lucide:shield-check" width="20" height="20" />
                        </div>
                        <div class="text-xs">
                            <p class="font-semibold text-foreground">Verified Ticket Guarantee</p>
                            <p class="text-muted-foreground">Instant digital pass generation with guaranteed entry.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <!-- Event Not Found -->
        <div class="mx-auto flex w-full max-w-md px-4 flex-col items-center justify-center py-24 sm:py-36 text-center">
            <h2 class="text-2xl sm:text-3xl font-bold text-foreground">Event not found</h2>
            <p class="mt-2 text-xs sm:text-sm text-muted-foreground">Could not find the event you are trying to register for.</p>
            <a href="/events" use:link class="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
                <Icon icon="lucide:arrow-left" width="16" height="16" />
                Return to Events
            </a>
        </div>
    {/if}
</div>
