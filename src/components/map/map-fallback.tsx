'use client'

import { MapPin, Key, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function MapFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
      <div className="text-center max-w-md p-8">
        <div className="mb-6">
          <MapPin className="h-24 w-24 text-primary mx-auto mb-4 opacity-50" />
          <Badge variant="secondary" className="mb-4">
            Google Maps API
          </Badge>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Configuração Necessária
        </h3>
        
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          Para usar o mapa interativo, você precisa configurar uma API Key do Google Maps. 
          É gratuito para desenvolvimento!
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="bg-card border rounded-lg p-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Key className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Passos rápidos:</span>
            </div>
                         <ol className="text-xs text-muted-foreground space-y-1 ml-6 list-decimal">
               <li>Acesse o Google Cloud Console</li>
               <li>Habilite &quot;Maps JavaScript API&quot;</li>
               <li>Crie uma API Key</li>
               <li>Adicione ao arquivo .env.local</li>
             </ol>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3">
            <code className="text-xs text-foreground">
              NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_key_aqui
            </code>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => window.open('https://console.cloud.google.com/apis/credentials', '_blank')}
        >
          <ExternalLink className="h-4 w-4" />
          Obter API Key
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4">
          Gratuito até 28.000 chamadas/mês
        </p>
      </div>
    </div>
  )
} 