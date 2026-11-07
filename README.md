# Eventinate - Event Management System

Eventinate is a modern, responsive event discovery and registration website built with Svelte 5, Vite, and Tailwind CSS. Users can browse curated events, search and filter the catalogue, view rich event details with live countdowns, register for passes with instant validation, and manage their local digital ticket wallet.

This is a demo project made for my K-Explore elective "Web Design".

## Features

- **Home Page**: Featured and upcoming events showcase, instant search handoff, and responsive layout.
- **Events Catalogue**: Real-time search, category filters with live event counts, and sorting (by date, name, price).
- **Event Detail Page**: Cover hero with category badges, full event descriptions, venue location, organizer info, live date countdown, save to favorites, and native web share.
- **Event Registration**: Dedicated registration flow linked from each event with attendee details, ticket tier selection (General Entry & VIP Pass), quantity counter, dynamic price calculation, and client-side form validation.
- **Digital Ticket Pass & Confirmation**: Instant ticket confirmation with unique booking reference, QR badge, and printable/saveable pass.
- **Local Ticket Wallet (`/tickets`)**: Persistent ticket storage in `localStorage` under `eventinate_tickets`. Search and filter passes, view event details, print, or cancel tickets with confirmation.
- **Visual Design**: Subtle ambient gradient glows, dot-pattern background texture, and frosted glass cards (`backdrop-blur-md`).
- **Clean 404 Fallback**: Dedicated not found page with navigation links.

## Tech Stack

- **Svelte 5** (Runes & reactive stores)
- **Vite 8**
- **Tailwind CSS v4**
- **Bits UI** (Accessible headless dropdowns)
- **Iconify** (Lucide & Material icons)
- **svelte-spa-router** (Client-side routing)

## Run Locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```
