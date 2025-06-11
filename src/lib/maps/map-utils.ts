import { getGoogleMaps } from './google-maps-loader'

export interface EventLocation {
  id: string
  title: string
  coordinates: { lat: number; lng: number }
  category: string
  attendees: number
  price: string
  image: string
  organizer: string
  organizerImage: string
  location: string
  date: Date
  distance: number
}

export const createEventMarker = async (
  map: google.maps.Map,
  event: EventLocation,
  onClick?: (event: EventLocation) => void
): Promise<google.maps.Marker> => {
  const maps = await getGoogleMaps()
  
  // Ícone customizado para eventos
  const eventIcon = {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#3B82F6" stroke="white" stroke-width="2"/>
        <path d="M16 8v8l4 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `),
    scaledSize: new maps.Size(32, 32),
    anchor: new maps.Point(16, 16)
  }

  const marker = new maps.Marker({
    position: event.coordinates,
    map,
    title: event.title,
    icon: eventIcon,
    animation: maps.Animation.DROP
  })

  // Info window com detalhes do evento
  const infoWindow = new maps.InfoWindow({
    content: `
      <div style="max-width: 250px; font-family: system-ui; padding: 8px;">
        <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1f2937;">${event.title}</h3>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <img src="${event.organizerImage}" alt="${event.organizer}" style="width: 20px; height: 20px; border-radius: 50%; object-fit: cover;">
          <span style="font-size: 12px; color: #6b7280;">${event.organizer}</span>
        </div>
        <p style="margin: 0 0 6px 0; font-size: 12px; color: #6b7280; line-height: 1.4;">📍 ${event.location}</p>
        <p style="margin: 0 0 6px 0; font-size: 12px; color: #6b7280;">🗓️ ${event.date.toLocaleDateString('pt-BR')}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
          <span style="font-size: 12px; color: #059669; font-weight: 600;">${event.price}</span>
          <span style="font-size: 12px; color: #6b7280;">👥 ${event.attendees}</span>
        </div>
      </div>
    `
  })

  marker.addListener('click', () => {
    infoWindow.open(map, marker)
    if (onClick) {
      onClick(event)
    }
  })

  return marker
}

export const fitMapToEvents = (map: google.maps.Map, events: EventLocation[]) => {
  if (events.length === 0) return

  const bounds = new google.maps.LatLngBounds()
  
  events.forEach(event => {
    bounds.extend(event.coordinates)
  })

  map.fitBounds(bounds)
  
  // Ajustar zoom se muito próximo
  const listener = google.maps.event.addListener(map, 'idle', () => {
    if (map.getZoom()! > 15) {
      map.setZoom(15)
    }
    google.maps.event.removeListener(listener)
  })
}

export const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  })
}

export const calculateDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number => {
  const R = 6371 // Raio da Terra em km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180
  const dLon = (point2.lng - point1.lng) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
} 