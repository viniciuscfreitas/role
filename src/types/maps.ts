export interface MapEvent {
  id: string
  title: string
  organizer: string
  organizerImage: string
  image: string
  location: string
  date: Date
  distance: number
  attendees: number
  category: string
  price: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface MapState {
  center: {
    lat: number
    lng: number
  }
  zoom: number
  userLocation?: {
    lat: number
    lng: number
  }
}

export interface MapControls {
  showUserLocation: () => void
  focusEvent: (eventId: string) => void
  fitAllEvents: () => void
  setFilter: (category: string) => void
}

export interface InteractiveMapProps {
  events: MapEvent[]
  selectedEventId?: string
  onEventSelect?: (event: MapEvent) => void
  onMapReady?: (controls: MapControls) => void
  className?: string
}

export interface MarkerCluster {
  position: { lat: number; lng: number }
  events: MapEvent[]
  count: number
} 