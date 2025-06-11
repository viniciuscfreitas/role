import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

if (!GOOGLE_MAPS_API_KEY) {
  console.warn('⚠️ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY não configurada - usando fallback')
}

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY || 'DEMO_KEY',
  version: 'weekly',
  libraries: ['places', 'geometry']
})

export const loadGoogleMaps = async (): Promise<typeof google.maps> => {
  try {
    const google = await loader.load()
    return google.maps
  } catch (error) {
    console.error('Error loading Google Maps:', error)
    throw new Error('Failed to load Google Maps API')
  }
}

// Cache para evitar múltiplas chamadas
let mapsPromise: Promise<typeof google.maps> | null = null

export const getGoogleMaps = (): Promise<typeof google.maps> => {
  if (!mapsPromise) {
    mapsPromise = loadGoogleMaps()
  }
  return mapsPromise
} 