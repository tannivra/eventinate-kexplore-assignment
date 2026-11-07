import { writable } from 'svelte/store'

const STORAGE_KEY = 'eventinate_tickets'
const LEGACY_STORAGE_KEY = 'kexplore_tickets'

function loadFromStorage() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('Failed to load tickets from localStorage:', err)
    return []
  }
}

export const ticketsStore = writable(loadFromStorage())

export function getTickets() {
  return loadFromStorage()
}

export function saveTicket(ticket) {
  if (typeof window === 'undefined') return []
  try {
    const current = loadFromStorage()
    // Avoid duplicate if same ticketId exists
    const updated = [ticket, ...current.filter((t) => t.ticketId !== ticket.ticketId)]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    ticketsStore.set(updated)
    return updated
  } catch (err) {
    console.error('Failed to save ticket to localStorage:', err)
    return []
  }
}

export function deleteTicket(ticketId) {
  if (typeof window === 'undefined') return []
  try {
    const current = loadFromStorage()
    const updated = current.filter((t) => t.ticketId !== ticketId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    ticketsStore.set(updated)
    return updated
  } catch (err) {
    console.error('Failed to delete ticket from localStorage:', err)
    return []
  }
}
