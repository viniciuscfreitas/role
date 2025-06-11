'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export function CreateEventPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <Plus className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Criar Evento</h2>
        <p className="text-muted-foreground">Formulário de criação de eventos será implementado em breve</p>
      </motion.div>
    </div>
  )
} 