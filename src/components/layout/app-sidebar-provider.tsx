"use client"

import * as React from "react"
import {
  FileText,
  Command,
  Users,
  Settings2,
  Building2,
  Store,
  Blocks,
  ShieldCheck,
  Target,
  Files,
  Building,
  UserCog,
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
    name: "Provider User",
    email: "provider@example.com",
    avatar: "/avatars/default.jpg",
  },
  teams: [
    {
      name: "Empresa Provider A",
      logo: Store,
      type: "provider",
      linkedTo: "Empresa Client A",
    },
  ],
  applications: [
    {
      title: "Documentos",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Lista de documentos",
          url: "#",
        },
        {
          title: "Arquivos",
          url: "#",
        },
      ],
    },
    {
      title: "Serviços",
      url: "#",
      icon: Target,
      items: [
        {
          title: "Catálogo",
          url: "#",
        },
        {
          title: "Pedidos",
          url: "#",
        },
        {
          title: "Relatórios",
          url: "#",
        },
      ],
    },
    {
      title: "Subproviders",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Lista",
          url: "#",
        },
        {
          title: "Documentos",
          url: "#",
        },
        {
          title: "Relatórios",
          url: "#",
        },
      ],
    },
  ],
  settings: [
    {
      title: "Usuários",
      url: "/provider/settings/users",
      icon: Users,
    },
    {
      title: "Dados da conta",
      url: "/provider/settings/account",
      icon: UserCog,
    },
    {
      title: "Permissões",
      url: "/provider/settings/permissions",
      icon: ShieldCheck,
    },
    {
      title: "Configurações",
      url: "/provider/settings/config",
      icon: Settings2,
    },
  ],
}

const sections = {
  applications: {
    items: data.applications
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
          sections={["applications", "settings"]}
          onSectionChange={handleSectionChange} 
        />
        <SidebarSeparator />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 