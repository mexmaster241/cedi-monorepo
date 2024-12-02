"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  fullName: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
  // company: z.string().min(3, {
  //   message: "Company name must be at least 3 characters.",
  // }),
  // phone: z.string().min(10, {
  //   message: "Phone number must be at least 10 digits.",
  // }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        
        form.reset({
          username: currentUser.username,
          email: attributes.email || "",
          fullName: `${attributes.given_name || ""} ${attributes.family_name || ""}`.trim(),
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [form, toast]);

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    // WIP conectar al backend
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    // WIP conectar al backend
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    setIsPasswordDialogOpen(false);
    passwordForm.reset();
  }

  const handle2FAToggle = async (checked: boolean) => {
    try {
      // WIP conectar al backend
      setIs2FAEnabled(checked);
      toast({
        title: `2FA ${checked ? 'enabled' : 'disabled'}`,
        description: `Two-factor authentication has been ${checked ? 'enabled' : 'disabled'} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update 2FA settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-clash-display">Perfil</CardTitle>
          <CardDescription className="font-clash-display">
            Administra tu información y configuración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-clash-display">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        type="email"
                        placeholder="Enter your email"
                        className="font-clash-display"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-clash-display">Nombre Completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        placeholder=""
                        className="font-clash-display"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-clash-display">Empresa</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        placeholder="CediOS"
                        className="font-clash-display"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-clash-display">Número de Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        placeholder=""
                        className="font-clash-display"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="my-6" />
              
              {/* Security Settings Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-clash-display">Configuración de Seguridad</h3>
                
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="font-clash-display">Autenticación de Dos Factores</FormLabel>
                    <FormDescription className="font-clash-display">
                      Agrega una capa extra de seguridad a tu cuenta
                    </FormDescription>
                  </div>
                  <Switch
                    checked={is2FAEnabled}
                    onCheckedChange={handle2FAToggle}
                  />
                </div>

                {/* Change Password Button */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="font-clash-display">Password</FormLabel>
                    <FormDescription className="font-clash-display">
                      Cambia tu contraseña de cuenta
                    </FormDescription>
                  </div>
                  <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="font-clash-display">Cambiar Contraseña</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-clash-display">Cambiar Contraseña</DialogTitle>
                        <DialogDescription className="font-clash-display">
                          Ingresa tu contraseña actual y elige una nueva
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                          <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-clash-display">Contraseña Actual</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder=""
                                    className="font-clash-display"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-clash-display">Nueva Contraseña</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder=""
                                    className="font-clash-display"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-clash-display">Confirmar Nueva Contraseña</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder=""
                                    className="font-clash-display"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end space-x-4 mt-6">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setIsPasswordDialogOpen(false);
                                passwordForm.reset();
                              }}
                            >
                              Cancelar
                            </Button>
                            <Button type="submit" className="font-clash-display">Actualizar Contraseña</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                {!isEditing ? (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="font-clash-display"
                  >
                    Editar Perfil
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        form.reset();
                      }}
                      className="font-clash-display"
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="font-clash-display">Guardar Cambios</Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}