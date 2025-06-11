'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/contexts/auth-context'
import { Calendar, MapPin, Users, Settings, Edit, Plus, Heart, MessageCircle, Camera, Clock, Bookmark } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

// Dados mockados para exemplo
const eventosParticipados = [
  {
    id: 'e1',
    nome: 'Workshop de React Native',
    data: '15 Jan 2024',
    horario: '19:00',
    local: 'São Paulo, SP',
    endereco: 'Av. Paulista, 1000',
    participantes: 45,
    categoria: 'Tech',
    imagem: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
  },
  {
    id: 'e2',
    nome: 'Festa dos Anos 80',
    data: '20 Jan 2024',
    horario: '22:00',
    local: 'São Paulo, SP',
    endereco: 'Rua Augusta, 500',
    participantes: 180,
    categoria: 'Festa',
    imagem: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'
  }
]

const eventosOrganizados = [
  {
    id: 'e3',
    nome: 'Meetup de Desenvolvedores',
    data: '10 Fev 2024',
    horario: '18:30',
    local: 'São Paulo, SP',
    endereco: 'Rua Vergueiro, 3185',
    participantes: 120,
    categoria: 'Tech',
    imagem: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94',
    status: 'Em breve'
  }
]

// Dados mockados para o feed de fotos
const fotos = [
  {
    id: 'f1',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    likes: 124,
    comments: 8,
    caption: 'Festa incrível ontem! 🎉'
  },
  {
    id: 'f2',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    likes: 89,
    comments: 5,
    caption: 'Show memorável! 🎸'
  },
  {
    id: 'f3',
    url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    likes: 256,
    comments: 15,
    caption: 'Festival de verão 2024 ☀️'
  },
  {
    id: 'f4',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    likes: 178,
    comments: 12,
    caption: 'Noite perfeita! 🎧'
  },
  {
    id: 'f5',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    likes: 145,
    comments: 7,
    caption: 'Dançando a noite toda 💃'
  },
  {
    id: 'f6',
    url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063',
    likes: 198,
    comments: 11,
    caption: 'Que evento incrível! ✨'
  },
  {
    id: 'f7',
    url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b',
    likes: 167,
    comments: 9,
    caption: 'Noite inesquecível 🌙'
  },
  {
    id: 'f8',
    url: 'https://images.unsplash.com/photo-1485872299829-c673f5194813',
    likes: 134,
    comments: 6,
    caption: 'Happy hour com a galera 🍻'
  },
  {
    id: 'f9',
    url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
    likes: 223,
    comments: 14,
    caption: 'Música boa! 🎵'
  }
]



export function ProfilePage() {
  const { user } = useAuth()
  
  if (!user) return null
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Cabeçalho do Perfil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl p-8 mb-8 relative"
      >
        <div className="absolute right-8 top-8 flex gap-2">
          <Button variant="outline" size="sm" className="hover:bg-muted/50">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-muted/50">
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-start gap-8">
          <Avatar className="w-32 h-32 ring-4 ring-primary/20">
            <AvatarImage src="/eu.jpeg" alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground text-3xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 pt-2">
            <h1 className="text-2xl font-bold text-foreground mb-2">{user.name}</h1>
            <p className="text-muted-foreground mb-6">{user.email}</p>
            
            <div className="flex gap-6 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Membro desde Jan 2024</span>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="text-center">
                <div className="font-bold text-xl text-foreground">12</div>
                <div className="text-sm text-muted-foreground">Eventos</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl text-foreground">240</div>
                <div className="text-sm text-muted-foreground">Seguindo</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl text-foreground">180</div>
                <div className="text-sm text-muted-foreground">Seguidores</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Conteúdo Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="fotos" className="w-full">
          <div className="flex justify-center">
            <TabsList className="p-1 bg-card border border-border sticky top-0 z-10 w-fit shadow-sm">
              <TabsTrigger 
                value="fotos" 
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all px-6"
              >
                <Camera className="h-4 w-4" />
                <span className="font-medium">Fotos</span>
                <Badge variant="secondary" className="ml-2 bg-muted-foreground/10">{fotos.length}</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="participou"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all px-6"
              >
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Participou</span>
                <Badge variant="secondary" className="ml-2 bg-muted-foreground/10">{eventosParticipados.length}</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="organizou"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all px-6"
              >
                <Users className="h-4 w-4" />
                <span className="font-medium">Organizou</span>
                <Badge variant="secondary" className="ml-2 bg-muted-foreground/10">{eventosOrganizados.length}</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="fotos" className="mt-0">
            <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
              {fotos.map(foto => (
                <div 
                  key={foto.id} 
                  className="aspect-square relative group cursor-pointer overflow-hidden bg-muted"
                >
                  <Image
                    src={foto.url}
                    alt={foto.caption}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 33vw, 300px"
                  />
                  
                  {/* Overlay com informações */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="flex gap-6 text-white">
                      <div className="flex items-center gap-2">
                        <Heart className="h-6 w-6 fill-white" />
                        <span className="font-semibold">{foto.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-6 w-6 fill-white" />
                        <span className="font-semibold">{foto.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="participou">
            <div className="grid gap-4">
              {eventosParticipados.map(evento => (
                <Card key={evento.id} className="overflow-hidden group">
                  <div className="flex">
                    {/* Imagem do Evento */}
                    <div className="relative w-48 h-48">
                      <Image
                        src={evento.imagem}
                        alt={evento.nome}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="mb-2" variant="secondary">{evento.categoria}</Badge>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {evento.nome}
                          </h3>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Bookmark className="h-4 w-4" />
                          Salvar
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{evento.data}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{evento.horario}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{evento.local}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{evento.participantes} participantes</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <Avatar key={i} className="border-2 border-background w-8 h-8">
                              <AvatarImage src={`https://source.unsplash.com/random/100x100?face=${i}`} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          ))}
                          {evento.participantes > 3 && (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-background text-xs font-medium">
                              +{evento.participantes - 3}
                            </div>
                          )}
                        </div>
                        <Badge>Participou</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="organizou">
            <div className="grid gap-4">
              {eventosOrganizados.map(evento => (
                <Card key={evento.id} className="overflow-hidden group">
                  <div className="flex">
                    {/* Imagem do Evento */}
                    <div className="relative w-48 h-48">
                      <Image
                        src={evento.imagem}
                        alt={evento.nome}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute bottom-2 left-2" variant="secondary">
                        {evento.status}
                      </Badge>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="mb-2" variant="secondary">{evento.categoria}</Badge>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {evento.nome}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button variant="default" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Convidar
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{evento.data}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{evento.horario}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{evento.local}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{evento.participantes} participantes</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <Avatar key={i} className="border-2 border-background w-8 h-8">
                              <AvatarImage src={`https://source.unsplash.com/random/100x100?face=${i}`} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          ))}
                          {evento.participantes > 3 && (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-background text-xs font-medium">
                              +{evento.participantes - 3}
                            </div>
                          )}
                        </div>
                        <Badge variant="default">Organizador</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <Button className="mt-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Evento
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
} 