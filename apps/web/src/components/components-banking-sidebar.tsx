"use client"

import * as React from "react"
import { 
  ChevronsUpDown,
  Check,
  CreditCard, 
  DollarSign, 
  FileText, 
  HelpCircle, 
  Home, 
  PieChart, 
  Settings, 
  User, 
  Users, 
  Wallet, 
  ChevronRight 
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { useSidebar } from "@/components/sidebar/SidebarContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RevenueChart from "@/components/dashboard/RevenueChart";
import { TransferenciasLimite } from "./dashboard/TransferenciasLimite"
import { MPOSLimit } from "./dashboard/MPOSLimit"
import { EcommerceLimits } from "./dashboard/EcommerceLimits"
import TransferenciasPage from "@/app/(home)/dashboard/transferencias/page"
import { useRouter } from "next/navigation"
import { signOut } from 'aws-amplify/auth';
import { useToast } from "@/hooks/use-toast";



const data = {
  navMain: [
    {
      title: "Dashboard",
      icon: Home,
      url: "#",
      className: "font-clash-display",
    },
    {
      title: "Transferencias",
      icon: FileText,
      url: "transferencias",
      className: "font-clash-display",
      items: [
        {
          title: "Pago de tarjeta",
          url: "transferencias/pago-de-tarjetas",
          className: "font-clash-display",
        },
      ],
    },
    {
      title: "POS",
      icon: DollarSign,
      url: "pos",
      className: "font-clash-display",
      
    },
    // {
    //   title: "Grupos",
    //   icon: Users,
    //   url: "#",
    //   className: "font-clash-display",
    // },
    // {
    //   title: "Tarjetas",
    //   icon: CreditCard,
    //   url: "#",
    //   className: "font-clash-display",
    //   items: [
    //     {
    //       title: "Tarjetas de Crédito",
    //       url: "#",
    //       className: "font-clash-display",
    //     },
    //     {
    //       title: "Tarjetas de Débito",
    //       url: "#",
    //       className: "font-clash-display",
    //     },
    //   ],
    // },
    {
      title: "Tarjetas",
      icon: Wallet,
      url: "tarjetas",
      className: "font-clash-display",
    },
    // {
    //   title: "Pagos de Facturas",
    //   icon: FileText,
    //   url: "#",
    //   className: "font-clash-display",
    //   items: [
    //     {
    //       title: "Pagar Facturas",
    //       url: "#",
    //       className: "font-clash-display",
    //     },
    //     {
    //       title: "Administrar Pagos",
    //       url: "#",
    //       className: "font-clash-display",
    //     },
    //   ],
    // },
    // {
    //   title: "Inversiones",
    //   icon: PieChart,
    //   url: "#",
    //   className: "font-clash-display",
    //   items: [
    //     {
    //       title: "Portafolio",
    //       url: "#",
    //       className: "font-clash-display",
    //     },
    //     {
    //       title: "Operaciones",
    //       url: "#",
    //       className: "font-clash-display",
    //     },
    //   ],
    // },
    {
      title: "Soporte",
      icon: HelpCircle,
      url: "#",
      className: "font-clash-display",
    },
  ],
}

export function BankingSidebar({ children }: { children: React.ReactNode }) {
  const { selectedItem, setSelectedItem } = useSidebar();
  const [selectedVersion, setSelectedVersion] = React.useState("1.0.0");
  const versions = ["1.0.0", "1.1.0", "2.0.0"];

  const router = useRouter()
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente",
      });
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error al cerrar sesión",
        description: error instanceof Error ? error.message : "Ocurrió un error inesperado",
        variant: "destructive",
      });
    }
  };

  const renderContent = () => {
    return (
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    )
  }

  return (
    <SidebarProvider>
      <Sidebar 
        collapsible="offcanvas" 
        className="bg-cedi-beige [&_[data-sidebar=sidebar]]:bg-cedi-beige"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-16 items-center justify-center rounded-lg bg-transparent text-primary-foreground">
                      <Image
                        src="/logo-cedi.PNG"
                        alt="Cedi"
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <Image
                        src="/tipografia-cedi.PNG"
                        alt="Cedi"
                        width={100}
                        height={32}
                      />
                    
                    </div>
               
                  </SidebarMenuButton>
        
                
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="gap-0">
          {data.navMain.map((item) => (
            <Collapsible
              key={item.title}
              // Only open dashboard section by default if it contains these components
              defaultOpen={item.title === "Dashboard"}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label font-clash-display text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger 
                    className="flex w-full items-center"
                    onClick={() => {
                      setSelectedItem(item.title)
                      router.push(`/dashboard/${item.url}`)
                    }}
                  >
                    {item.icon && <item.icon className="mr-3 h-4 w-4" />}
                    <span className={`${item.className} font-clash-display`}>{item.title}</span>
                    {item.items && (
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                {item.items && (
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item.items.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton
                              asChild
                              onClick={() => {
                                setSelectedItem(subItem.title);
                                router.push(`/dashboard/${subItem.url}`);
                              }}
                            >
                              <a href="#" className={`pl-10 ${subItem.className}`}>
                                {subItem.title}
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                )}
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-2 h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-clash-display">{selectedItem}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Add this new section */}
          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src="/avatars/default-avatar.png" alt="Profile" />
                  <AvatarFallback className="bg-cedi-dark-gray text-white">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-clash-display">Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem 
                    className="font-clash-display cursor-pointer"
                    onClick={() => {
                      setSelectedItem("Perfil");
                      router.push("/dashboard/profile");
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-clash-display cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ajustes</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="font-clash-display cursor-pointer text-red-600"
                  onClick={handleSignOut}
                >
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
