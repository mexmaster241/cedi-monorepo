'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Add login form schema
const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      
      await signIn({
        username: data.email,
        password: data.password,
      });

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta",
      });

      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: "Error al iniciar sesión",
        description: error instanceof Error ? error.message : "Credenciales inválidas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-clash-display">Correo electrónico</FormLabel>
              <FormControl>
                <Input className="font-clash-display" placeholder="correo@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-clash-display">Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    className="font-clash-display pr-10" 
                    type={showPassword ? "text" : "password"} 
                    {...field} 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-cedi-black hover:bg-cedi-light-gray font-clash-display text-white"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
        <div className="text-center text-sm">
          <Link href="/forgot-password" className="text-cedi-black font-clash-display hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="text-center text-sm font-clash-display">
          ¿No tienes una cuenta?{' '}
          <Link href="/sign-up" className="text-black font-clash-display hover:underline">
            Regístrate
          </Link>
        </div>
      </form>
    </Form>
  )
}