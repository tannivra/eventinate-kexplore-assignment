# Evently Event Management

Evently is a responsive event discovery and registration website built with Svelte, Vite, and Tailwind CSS. Users can browse Indian events, search and filter the catalogue, view event details, register for tickets, and manage saved digital passes.

## Features

- Featured and upcoming event sections on the home page
- Event search, category filtering, category counts, and sorting
- Event detail pages with pricing, venue, organizer, countdown, save, and share actions
- Registration form with name, email, phone, ticket tier, quantity, and notes
- Client-side validation for required fields, email, phone, terms, and event availability
- Digital ticket confirmation after registration
- Local Storage ticket wallet at `/tickets`
- Ticket search, print, delete, and event navigation
- Responsive layouts for mobile, tablet, and desktop screens
- Reusable Button, Dropdown, EventCard, and TicketConfirmation components

## Tech Stack

- Svelte 5
- Vite
- Tailwind CSS
- Bits UI
- Iconify
- svelte-spa-router

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

## Project Structure

- `src/pages/Home` contains the landing page and Home search handoff.
- `src/pages/Events` contains search, category filtering, and sorting.
- `src/pages/Event` contains event details and registration navigation.
- `src/pages/Register` contains the registration form and validation.
- `src/pages/Tickets` contains the Local Storage ticket wallet.
- `src/components` contains reusable UI components.
- `src/data/events.js` contains the event catalogue.
- `src/lib/tickets.js` manages tickets stored under `kexplore_tickets` in Local Storage.

## Deployment

The production output can be deployed to Vercel, Netlify, or GitHub Pages after connecting the repository. Use `npm run build` as the build command and `dist` as the output directory.

## Submission Links

- GitHub repository: add the repository URL here.
- Deployed website: add the Vercel, Netlify, or GitHub Pages URL here.
