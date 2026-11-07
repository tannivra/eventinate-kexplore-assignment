import Event from './pages/Event/Event.svelte'
import Events from './pages/Events/Events.svelte'
import Home from './pages/Home/Home.svelte'
import NotFound from './pages/NotFound/NotFound.svelte'
import Register from './pages/Register/Register.svelte'
import Tickets from './pages/Tickets/Tickets.svelte'

export const routes = {
    '/': Home,
    '/events': Events,
    '/event/:id': Event,
    '/register/:id': Register,
    '/tickets': Tickets,
    '*': NotFound
}
