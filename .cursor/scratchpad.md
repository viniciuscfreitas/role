# Projeto: Rede Social de Eventos e Festas

## Background and Motivation

O usuário deseja criar uma rede social focada especificamente em eventos e festas, utilizando a stack moderna já configurada no projeto. O objetivo é desenvolver uma plataforma onde usuários possam:

- Descobrir eventos e festas próximos
- Criar e promover seus próprios eventos
- Conectar-se com outros participantes
- Compartilhar experiências e momentos dos eventos
- Interagir socialmente em torno de eventos

**Stack Atual Disponível:**
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4 + Radix UI + Framer Motion
- NextAuth (autenticação)
- TanStack Query (estado server)
- React Hook Form + Zod (formulários)
- Jest (testes)

## NOVA REQUISIÇÃO: Design Mobile-First

### Background da Requisição Atual:
O usuário relatou que o app está perfeito no desktop, mas no mobile está usando a mesma tela do desktop. É necessário criar uma visualização única e mobile-first para dispositivos móveis, usando os mesmos elementos atuais do desktop mas adaptados estrategicamente.

### Referências de Design:
- **Instagram**: Layout mobile-first, navegação bottom tabs, stories horizontais, feed vertical otimizado
- **Twitter/X**: Interface clean, navegação intuitiva, conteúdo priorizado para telas pequenas

## High-level Task Breakdown

### 🚱 **NOVA FASE: Mobile-First Design Implementation** (Prioridade Máxima)

#### **Task Mobile.1**: Infraestrutura e Detecção de Dispositivo ✅
- **Status**: **CONCLUÍDA**
- Hook `useMediaQuery`, MobileLayoutContext, AdaptiveLayout implementados

#### **Task Mobile.2**: Bottom Navigation (Mobile) ✅
- **Status**: **CONCLUÍDA**
- 5 tabs: Home, Buscar, +, Mapa, Perfil (ordem correta)

#### **Task Mobile.3**: Layout Adaptation - Feed & Stories ✅
- **Status**: **CONCLUÍDA**
- Stories scroll horizontal, feed mobile, touch gestures, pull-to-refresh

#### **Task Mobile.4**: Modals e Sheets Mobile ⏳
- **Status**: **PENDENTE**
- Próxima task a ser implementada

#### **Task Mobile.5**: Floating Action Button (FAB) ⏳
- **Status**: **PENDENTE**

#### **Task Mobile.6**: Performance e Polish Mobile ⏳
- **Status**: **PENDENTE**

## Project Status Board

### ✅ **COMPLETADO**
- **3 de 6 tasks mobile concluídas** (50% progresso)
- **Infraestrutura mobile-first** funcionando
- **Bottom Navigation** com ordem correta
- **Stories e Feed mobile** otimizados
- **Correções de transparência** em todos componentes
- **Build Vercel** funcionando

### 🚨 **PROBLEMAS RESOLVIDOS**
- **Transparência inadequada**: Corrigido com cores explícitas
- **Build Vercel**: Conflito Next.js 15 vs next-pwa resolvido
- **PWA**: Temporariamente removido por conflito de tipos

### 📊 **Status Atual**
- **App funcionando** em desktop e mobile
- **Deploy ativo** na Vercel
- **Próximo passo**: Task Mobile.4 (Modals e Sheets)

## Lessons

### Soluções Técnicas Implementadas:
- **🚨 TRANSPARÊNCIA CRÍTICA**: Problema de componentes transparentes resolvido com cores explícitas
  - **Root Cause**: `bg-card/80 backdrop-blur-sm` causava transparência inadequada
  - **Solução Final**: Usar cores explícitas `bg-white dark:bg-slate-900` em vez de variáveis CSS
  - **Lição**: Quando transparência é problema, sempre usar cores explícitas com fallback
  - **Resultado**: 100% opaco garantido, sem dependência de CSS variables problemáticas

- **🚀 BUILD VERCEL**: Conflito de tipos Next.js 15 vs next-pwa resolvido
  - **Root Cause**: `next-pwa` incompatível com tipos do Next.js 15 (I18NConfig conflicts)
  - **Erro**: "Type 'I18NDomains' is 'readonly' and cannot be assigned to mutable type 'DomainLocale[]'"
  - **Solução Temporária**: Remover PWA do build para resolver deploy
  - **Lição**: Next.js 15 ainda tem incompatibilidades com alguns packages populares
  - **Status**: Build funcionando, PWA pode ser reimplementado depois

- **Mobile-First**: Implementação progressiva funcionando
- **Touch Gestures**: Swipe, double-tap, pull-to-refresh implementados
- **Performance**: Lazy loading e otimizações mobile aplicadas 