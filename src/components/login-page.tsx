'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/contexts/auth-context'
import { 
  Zap, 
  Calendar, 
  Users, 
  MapPin, 
  Eye, 
  EyeOff, 
  Sparkles,
  Music,
  Camera,
  Heart
} from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        // Login
        await login(formData.username, formData.password)
      } else {
        // Register - simular registro e depois login
        await login(formData.username, formData.password)
      }
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column - ROLE Brand Experience */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col items-center justify-center text-center space-y-12"
        >
          {/* Brand Hero */}
          <div className="space-y-8">
            <motion.div
              className="role-float"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/80 to-primary rounded-3xl flex items-center justify-center shadow-2xl mx-auto">
                  <Zap className="h-16 w-16 text-primary-foreground" strokeWidth={2.5} />
                </div>
                {/* Floating elements around logo */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-primary/60 to-primary rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-primary/70 to-primary rounded-full flex items-center justify-center"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Music className="h-3 w-3 text-primary-foreground" />
                </motion.div>
                <motion.div 
                  className="absolute top-8 -left-8 w-6 h-6 bg-gradient-to-r from-primary/60 to-primary rounded-full flex items-center justify-center"
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Camera className="h-3 w-3 text-primary-foreground" />
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/90 to-primary"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                ROLE
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Onde cada evento vira uma experiência inesquecível
              </motion.p>
            </div>
          </div>

          {/* Feature highlights */}
          <motion.div 
            className="grid grid-cols-2 gap-8 max-w-md"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/80 to-primary rounded-xl flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Eventos Únicos</h3>
                <p className="text-sm text-muted-foreground">Descubra experiências autênticas</p>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/80 to-primary rounded-xl flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Comunidade</h3>
                <p className="text-sm text-muted-foreground">Conecte-se com pessoas</p>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/80 to-primary rounded-xl flex items-center justify-center mx-auto">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Local</h3>
                <p className="text-sm text-muted-foreground">Eventos na sua cidade</p>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/80 to-primary rounded-xl flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Memórias</h3>
                <p className="text-sm text-muted-foreground">Momentos especiais</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Authentication Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md mx-auto space-y-6"
        >
          {/* Main form card */}
          <Card className="bg-card border border-border shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/80 to-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="h-10 w-10 text-primary-foreground" strokeWidth={2.5} />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                {isLogin ? 'Entrar no ROLE' : 'Criar conta'}
              </CardTitle>
              <CardDescription className="text-base">
                {isLogin 
                  ? 'Acesse sua conta e descubra eventos incríveis' 
                  : 'Junte-se à comunidade de eventos mais vibrante'
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username field with floating label */}
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="role-input-floating h-14"
                    required
                  />
                  <Label
                    htmlFor="username"
                    className="role-label-floating"
                  >
                    Nome de usuário
                  </Label>
                </div>

                {/* Email field for register */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="role-input-floating h-14"
                      required={!isLogin}
                    />
                    <Label
                      htmlFor="email"
                      className="role-label-floating"
                    >
                      Email
                    </Label>
                  </motion.div>
                )}

                {/* Password field */}
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="role-input-floating h-14 pr-12"
                    required
                  />
                  <Label
                    htmlFor="password"
                    className="role-label-floating"
                  >
                    Senha
                  </Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Confirm password for register */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="role-input-floating h-14"
                      required={!isLogin}
                    />
                    <Label
                      htmlFor="confirmPassword"
                      className="role-label-floating"
                    >
                      Confirmar senha
                    </Label>
                  </motion.div>
                )}

                {/* Submit button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 role-button-primary text-lg font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" className="gap-0" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      {isLogin ? 'Entrar' : 'Criar conta'}
                    </div>
                  )}
                </Button>
              </form>

              {/* Forgot password */}
              {isLogin && (
                <div className="text-center">
                  <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Esqueceu a senha?
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Switch between login/register */}
                        <Card className="bg-card border border-border shadow-sm">
            <CardContent className="py-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setFormData({ username: '', email: '', password: '', confirmPassword: '' })
                  }}
                  className="ml-2 text-primary font-bold hover:text-primary/80 transition-colors"
                >
                  {isLogin ? 'Cadastre-se' : 'Faça login'}
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 