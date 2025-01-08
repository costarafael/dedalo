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
import { NavProjects } from "@/components/layout/nav-projects"

const data = {
  user: {
    name: "Client User",
    email: "client@example.com",
    avatar: "/avatars/default.jpg",
  },
  projects: [
    {
      name: "Clients",
      url: "/global/clients",
      icon: Building,
    },
    {
      name: "Providers",
      url: "/global/providers",
      icon: Store,
    },
    {
      name: "Users",
      url: "#",
      icon: Users,
    },
    {
      name: "Modules",
      url: "/global/modules",
      icon: Blocks,
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
  entities: {
    items: data.projects
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
  libraries: {
    items: data.applications
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeSection, setActiveSection] = React.useState("entities")

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case "entities":
        return <NavProjects projects={sections.entities.items} />
      case "modules":
        return <NavModules />
      case "libraries":
        return <NavMain items={sections.libraries.items} label="Libraries" />
      default:
        return null
    }
  }

  return (
    <Sidebar 
      collapsible="icon" 
      {...props}
      role="navigation"
      aria-label="Main navigation"
    >
      <SidebarHeader>
        <TeamSwitcher aria-label="Switch between teams" />
      </SidebarHeader>

      <SidebarContent>
        <nav aria-label={`${activeSection} navigation`}>
          {renderSectionContent()}
        </nav>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator decorative aria-hidden="true" />
        <NavSections 
          onSectionChange={handleSectionChange} 
          aria-label="Change navigation section"
        />
        <SidebarSeparator decorative aria-hidden="true" />
        <NavUser 
          user={data.user} 
          aria-label="User menu"
        />
      </SidebarFooter>

      <SidebarRail 
        aria-hidden="true" 
        role="presentation"
      />
    </Sidebar>
  )
}