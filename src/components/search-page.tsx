'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function SearchPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar eventos, pessoas ou locais..." 
            className="pl-10 h-12 text-lg"
          />
        </div>
        
        <div className="text-center py-20">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Descubra eventos incríveis</h2>
          <p className="text-muted-foreground">Pesquise por eventos, organizadores ou locais</p>
        </div>
      </motion.div>
    </div>
  )
} 