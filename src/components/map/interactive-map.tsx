'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { getGoogleMaps } from '@/lib/maps/google-maps-loader'
import { createEventMarker, fitMapToEvents, getUserLocation } from '@/lib/maps/map-utils'
import { InteractiveMapProps, MapControls } from '@/types/maps'
import { Loader2, MapPin, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MapFallback } from './map-fallback'

export function InteractiveMap({ 
  events, 
  selectedEventId, 
  onEventSelect, 
  onMapReady,
  className = "w-full h-full"
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map())
  const userMarkerRef = useRef<google.maps.Marker | null>(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  // Verificar se API key está configurada
  const hasApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // Inicializar mapa
  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return

    // Se não tem API key, mostrar fallback
    if (!hasApiKey) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const maps = await getGoogleMaps()

      // Centro padrão (São Paulo)
      const defaultCenter = { lat: -23.5505, lng: -46.6333 }

      mapInstance.current = new maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      })

      // Aguardar mapa carregar completamente
      await new Promise<void>((resolve) => {
        const listener = maps.event.addListener(mapInstance.current!, 'idle', () => {
          maps.event.removeListener(listener)
          resolve()
        })
      })

      setIsLoading(false)
    } catch (err) {
      console.error('Error initializing map:', err)
      setError('Erro ao carregar o mapa. Verifique sua conexão.')
      setIsLoading(false)
    }
  }, [])

  // Criar marcadores para eventos
  const updateMarkers = useCallback(async () => {
    if (!mapInstance.current || events.length === 0) return

    try {
      // Limpar marcadores existentes
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current.clear()

      // Criar novos marcadores
      for (const event of events) {
        const marker = await createEventMarker(
          mapInstance.current,
          event,
          onEventSelect
        )
        markersRef.current.set(event.id, marker)
      }

      // Ajustar visualização para mostrar todos os eventos
      fitMapToEvents(mapInstance.current, events)
    } catch (err) {
      console.error('Error creating markers:', err)
    }
  }, [events, onEventSelect])

  // Geolocalização do usuário
  const showUserLocation = useCallback(async () => {
    if (!mapInstance.current) return

    try {
      setIsLocating(true)
      const location = await getUserLocation()
      setUserLocation(location)

      const maps = await getGoogleMaps()

      // Remover marcador anterior
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null)
      }

      // Criar marcador do usuário
      userMarkerRef.current = new maps.Marker({
        position: location,
        map: mapInstance.current,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#059669" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new maps.Size(24, 24),
          anchor: new maps.Point(12, 12)
        },
        title: "Sua localização"
      })

      // Centralizar mapa na localização do usuário
      mapInstance.current.setCenter(location)
      mapInstance.current.setZoom(14)

    } catch (err) {
      console.error('Error getting user location:', err)
      setError('Erro ao obter sua localização')
    } finally {
      setIsLocating(false)
    }
  }, [])

  // Focar em evento específico
  const focusEvent = useCallback((eventId: string) => {
    const marker = markersRef.current.get(eventId)
    if (marker && mapInstance.current) {
      const position = marker.getPosition()
      if (position) {
        mapInstance.current.setCenter(position)
        mapInstance.current.setZoom(16)
        // Simular click para abrir info window
        google.maps.event.trigger(marker, 'click')
      }
    }
  }, [])

  // Ajustar para mostrar todos os eventos
  const fitAllEvents = useCallback(() => {
    if (mapInstance.current && events.length > 0) {
      fitMapToEvents(mapInstance.current, events)
    }
  }, [events])

  // Controles do mapa
  const mapControls: MapControls = {
    showUserLocation,
    focusEvent,
    fitAllEvents,
    setFilter: () => {} // Implementado no componente pai
  }

  // Efeitos
  useEffect(() => {
    initializeMap()
  }, [initializeMap])

  useEffect(() => {
    if (!isLoading && mapInstance.current) {
      updateMarkers()
    }
  }, [events, isLoading, updateMarkers])

  useEffect(() => {
    if (onMapReady && mapInstance.current && !isLoading) {
      onMapReady(mapControls)
    }
  }, [onMapReady, isLoading])

  useEffect(() => {
    if (selectedEventId) {
      focusEvent(selectedEventId)
    }
  }, [selectedEventId, focusEvent])

  // Se não tem API key, mostrar fallback
  if (!hasApiKey) {
    return <MapFallback />
  }

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-muted`}>
        <div className="text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Erro no Mapa</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={initializeMap} variant="outline">
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} relative`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center z-10">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando mapa...</p>
          </div>
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Controles flutuantes */}
      {!isLoading && (
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            onClick={showUserLocation}
            size="sm"
            variant="secondary"
            className="shadow-lg"
            disabled={isLocating}
          >
            {isLocating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            onClick={fitAllEvents}
            size="sm"
            variant="secondary"
            className="shadow-lg"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
} 