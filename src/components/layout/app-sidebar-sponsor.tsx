"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  FileText,
  Users,
  Settings2,
  Building2,
  Store,
  Building,
  Blocks,
  ShieldCheck,
  FileStack,
  Target,
  BarChart3,
  Files,
  FolderArchive,
  HelpCircle,
} from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import { NavUser } from "@/components/layout/nav-user"
import { NavSections } from "@/components/layout/nav-sections"
import TeamSwitcher from "@/components/layout/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { NavModules } from "@/components/layout/nav-modules"

const data = {
  user: {
    name: "Client User",
    email: "client@example.com",
    avatar: "/avatars/default.jpg",
  },
  teams: [
    {
      name: "Empresa Client A",
      logo: Building2,
      type: "client",
      plan: "Enterprise",
    },
  ],
  applications: [
    {
      title: "Contratos",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Lista de contratos",
          url: "#",
        },
        {
          title: "Documentos contratuais",
          url: "#",
        },
      ],
    },
    {
      title: "CRM",
      url: "#",
      icon: Target,
      items: [
        {
          title: "Clientes",
          url: "#",
        },
        {
          title: "Funil de vendas",
          url: "#",
        },
        {
          title: "Relatórios",
          url: "#",
        },
      ],
    },
    {
      title: "Providers",
      url: "#",
      icon: Store,
      items: [
        {
          title: "Lista de Providers",
          url: "#",
        },
        {
          title: "Documentos",
          url: "#",
        },
        {
          title: "Arquivos",
          url: "#",
        },
        {
          title: "HT",
          url: "#",
        },
      ],
    },
  ],
  settings: [
    {
      title: "Usuários",
      url: "/sponsor/settings/users",
      icon: Users,
    },
    {
      title: "Módulos",
      url: "/sponsor/settings/modules",
      icon: Blocks,
    },
    {
      title: "Permissões",
      url: "/sponsor/settings/permissions",
      icon: ShieldCheck,
    },
    {
      title: "Config. de Providers",
      url: "/sponsor/settings/providers",
      icon: Settings2,
    },
    {
      title: "Unidades Organizacionais",
      url: "/sponsor/settings/units",
      icon: Building2,
    },
  ],
}

const sections = {
  applications: {
    items: data.applications
  },
  modules: {
    items: [
      {
        title: "Module 1",
        url: "#",
        icon: Blocks,
        items: [],
      },
      {
        title: "Module 2",
        url: "#",
        icon: Blocks,
        items: [],
      },
    ]
  },
  settings: {
    items: data.settings
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeSection, setActiveSection] = React.useState("applications")

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case "applications":
        return <NavMain items={sections.applications.items} label="Aplicações" />
      case "modules":
        return <NavModules />
      case "settings":
        return <NavMain items={sections.settings.items} label="Configurações" />
      default:
        return null
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {renderSectionContent()}
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <NavSections 
          sections={["applications", "modules", "settings"]} 
          onSectionChange={handleSectionChange} 
        />
        <SidebarSeparator />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 