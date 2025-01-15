export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actionType: Database["public"]["Enums"]["AuditActionType"]
          context_id: string | null
          created_at: string
          entity_id: string
          entity_type: string
          hierarchy_id: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          new_data: Json | null
          previous_data: Json | null
          status: Database["public"]["Enums"]["GenericStatus"]
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          actionType: Database["public"]["Enums"]["AuditActionType"]
          context_id?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          hierarchy_id?: string | null
          id: string
          ip_address?: string | null
          metadata?: Json | null
          new_data?: Json | null
          previous_data?: Json | null
          status?: Database["public"]["Enums"]["GenericStatus"]
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          actionType?: Database["public"]["Enums"]["AuditActionType"]
          context_id?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          hierarchy_id?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_data?: Json | null
          previous_data?: Json | null
          status?: Database["public"]["Enums"]["GenericStatus"]
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      component_library: {
        Row: {
          category: Database["public"]["Enums"]["ComponentCategory"]
          config: Json
          created_at: string
          default_label: string | null
          deleted_at: string | null
          description: string | null
          id: string
          is_active: boolean
          is_latest_version: boolean
          is_required_by_default: boolean | null
          is_unique_by_default: boolean | null
          metadata: Json | null
          name: string
          type: Database["public"]["Enums"]["componentfieldtype"]
          updated_at: string
          validation: Json | null
          version: string
        }
        Insert: {
          category: Database["public"]["Enums"]["ComponentCategory"]
          config: Json
          created_at?: string
          default_label?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_latest_version?: boolean
          is_required_by_default?: boolean | null
          is_unique_by_default?: boolean | null
          metadata?: Json | null
          name: string
          type: Database["public"]["Enums"]["componentfieldtype"]
          updated_at: string
          validation?: Json | null
          version?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["ComponentCategory"]
          config?: Json
          created_at?: string
          default_label?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_latest_version?: boolean
          is_required_by_default?: boolean | null
          is_unique_by_default?: boolean | null
          metadata?: Json | null
          name?: string
          type?: Database["public"]["Enums"]["componentfieldtype"]
          updated_at?: string
          validation?: Json | null
          version?: string
        }
        Relationships: []
      }
      container_node_names: {
        Row: {
          container_id: string
          created_at: string
          deleted_at: string | null
          id: string
          is_required: boolean
          item_count: number
          metadata: Json | null
          node_name_id: string
          order: number
          updated_at: string
        }
        Insert: {
          container_id: string
          created_at?: string
          deleted_at?: string | null
          id: string
          is_required?: boolean
          item_count?: number
          metadata?: Json | null
          node_name_id: string
          order?: number
          updated_at: string
        }
        Update: {
          container_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_required?: boolean
          item_count?: number
          metadata?: Json | null
          node_name_id?: string
          order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "container_node_names_container_id_fkey"
            columns: ["container_id"]
            isOneToOne: false
            referencedRelation: "unit_containers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "container_node_names_node_name_id_fkey"
            columns: ["node_name_id"]
            isOneToOne: false
            referencedRelation: "node_names"
            referencedColumns: ["id"]
          },
        ]
      }
      context_permissions: {
        Row: {
          deleted_at: string | null
          id: string
          isActive: boolean
          permission_id: string
          scope_id: string
          scope_type: Database["public"]["Enums"]["ScopeType"]
          user_context_id: string
        }
        Insert: {
          deleted_at?: string | null
          id: string
          isActive?: boolean
          permission_id: string
          scope_id: string
          scope_type: Database["public"]["Enums"]["ScopeType"]
          user_context_id: string
        }
        Update: {
          deleted_at?: string | null
          id?: string
          isActive?: boolean
          permission_id?: string
          scope_id?: string
          scope_type?: Database["public"]["Enums"]["ScopeType"]
          user_context_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "context_permissions_org_unit_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "organizational_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "context_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "context_permissions_unit_container_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "unit_containers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "context_permissions_user_context_id_fkey"
            columns: ["user_context_id"]
            isOneToOne: false
            referencedRelation: "user_contexts"
            referencedColumns: ["id"]
          },
        ]
      }
      entity: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          name: string
          status: string
          type: Database["public"]["Enums"]["ContextType"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id: string
          is_active?: boolean
          name: string
          status?: string
          type?: Database["public"]["Enums"]["ContextType"] | null
          updated_at: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
          status?: string
          type?: Database["public"]["Enums"]["ContextType"] | null
          updated_at?: string
        }
        Relationships: []
      }
      group_members: {
        Row: {
          created_at: string
          deleted_at: string | null
          group_id: string
          id: string
          is_active: boolean
          metadata: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          group_id: string
          id: string
          is_active?: boolean
          metadata?: Json | null
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          group_id?: string
          id?: string
          is_active?: boolean
          metadata?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      group_permissions: {
        Row: {
          deleted_at: string | null
          group_id: string
          id: string
          isActive: boolean
          permission_id: string
          scope_id: string
          scope_type: Database["public"]["Enums"]["ScopeType"]
        }
        Insert: {
          deleted_at?: string | null
          group_id: string
          id: string
          isActive?: boolean
          permission_id: string
          scope_id: string
          scope_type: Database["public"]["Enums"]["ScopeType"]
        }
        Update: {
          deleted_at?: string | null
          group_id?: string
          id?: string
          isActive?: boolean
          permission_id?: string
          scope_id?: string
          scope_type?: Database["public"]["Enums"]["ScopeType"]
        }
        Relationships: [
          {
            foreignKeyName: "group_permissions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_permissions_org_unit_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "organizational_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_permissions_unit_container_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "unit_containers"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          contextType: Database["public"]["Enums"]["ContextType"]
          created_at: string
          deleted_at: string | null
          description: string | null
          entity_id: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          contextType: Database["public"]["Enums"]["ContextType"]
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          entity_id?: string | null
          id: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          updated_at: string
        }
        Update: {
          contextType?: Database["public"]["Enums"]["ContextType"]
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          entity_id?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      integration_logs: {
        Row: {
          created_at: string
          direction: string
          duration: number | null
          error: string | null
          id: string
          integration_type: string
          metadata: Json | null
          request_data: Json | null
          response_data: Json | null
          status: Database["public"]["Enums"]["GenericStatus"]
        }
        Insert: {
          created_at?: string
          direction: string
          duration?: number | null
          error?: string | null
          id: string
          integration_type: string
          metadata?: Json | null
          request_data?: Json | null
          response_data?: Json | null
          status: Database["public"]["Enums"]["GenericStatus"]
        }
        Update: {
          created_at?: string
          direction?: string
          duration?: number | null
          error?: string | null
          id?: string
          integration_type?: string
          metadata?: Json | null
          request_data?: Json | null
          response_data?: Json | null
          status?: Database["public"]["Enums"]["GenericStatus"]
        }
        Relationships: []
      }
      module_components: {
        Row: {
          category: Database["public"]["Enums"]["ComponentCategory"]
          config: Json
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          is_required: boolean
          library_id: string | null
          metadata: Json | null
          module_id: string
          order: number
          type: Database["public"]["Enums"]["ComponentType"]
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["ComponentCategory"]
          config: Json
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          is_required?: boolean
          library_id?: string | null
          metadata?: Json | null
          module_id: string
          order?: number
          type: Database["public"]["Enums"]["ComponentType"]
          updated_at: string
        }
        Update: {
          category?: Database["public"]["Enums"]["ComponentCategory"]
          config?: Json
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          is_required?: boolean
          library_id?: string | null
          metadata?: Json | null
          module_id?: string
          order?: number
          type?: Database["public"]["Enums"]["ComponentType"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_components_library_id_fkey"
            columns: ["library_id"]
            isOneToOne: false
            referencedRelation: "component_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_components_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      module_dependencies: {
        Row: {
          created_at: string
          dependency_id: string
          id: string
          isRequired: boolean
          metadata: Json | null
          module_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dependency_id: string
          id?: string
          isRequired?: boolean
          metadata?: Json | null
          module_id: string
          updated_at: string
        }
        Update: {
          created_at?: string
          dependency_id?: string
          id?: string
          isRequired?: boolean
          metadata?: Json | null
          module_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_dependencies_dependency_id_fkey"
            columns: ["dependency_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_dependencies_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      module_instances: {
        Row: {
          client_id: string
          config: Json | null
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          module_id: string
          source_id: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          config?: Json | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          module_id: string
          source_id?: string | null
          updated_at: string
        }
        Update: {
          client_id?: string
          config?: Json | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          module_id?: string
          source_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_instances_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_instances_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      module_organizational_scopes: {
        Row: {
          created_at: string
          id: string
          is_required: boolean
          metadata: Json | null
          module_id: string
          scope_id: string
          scopeType: Database["public"]["Enums"]["ScopeType"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          is_required?: boolean
          metadata?: Json | null
          module_id: string
          scope_id: string
          scopeType: Database["public"]["Enums"]["ScopeType"]
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: string
          is_required?: boolean
          metadata?: Json | null
          module_id?: string
          scope_id?: string
          scopeType?: Database["public"]["Enums"]["ScopeType"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_organizational_scopes_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_scopes_node_name_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "node_names"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_scopes_org_unit_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "organizational_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_scopes_unit_container_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "unit_containers"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          is_active: boolean
          is_library: boolean
          metadata: Json | null
          name: string
          slug: string
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_library?: boolean
          metadata?: Json | null
          name: string
          slug: string
          updated_at: string
          version?: number
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_library?: boolean
          metadata?: Json | null
          name?: string
          slug?: string
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      node_hierarchy_rules: {
        Row: {
          child_node_id: string
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          isRequired: boolean
          metadata: Json | null
          parent_node_id: string
          updated_at: string
        }
        Insert: {
          child_node_id: string
          created_at?: string
          deleted_at?: string | null
          id: string
          is_active?: boolean
          isRequired?: boolean
          metadata?: Json | null
          parent_node_id: string
          updated_at: string
        }
        Update: {
          child_node_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          isRequired?: boolean
          metadata?: Json | null
          parent_node_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "node_hierarchy_rules_child_node_id_fkey"
            columns: ["child_node_id"]
            isOneToOne: false
            referencedRelation: "node_names"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "node_hierarchy_rules_parent_node_id_fkey"
            columns: ["parent_node_id"]
            isOneToOne: false
            referencedRelation: "node_names"
            referencedColumns: ["id"]
          },
        ]
      }
      node_names: {
        Row: {
          client_id: string
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          is_required: boolean
          is_root: boolean | null
          metadata: Json | null
          name: string
          order: number
          unit_count: number
          unit_selection_mode: Database["public"]["Enums"]["UnitSelectionMode"]
          updated_at: string
          validationType: Database["public"]["Enums"]["HierarchyValidationType"]
        }
        Insert: {
          client_id: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id: string
          is_required?: boolean
          is_root?: boolean | null
          metadata?: Json | null
          name: string
          order?: number
          unit_count?: number
          unit_selection_mode?: Database["public"]["Enums"]["UnitSelectionMode"]
          updated_at: string
          validationType?: Database["public"]["Enums"]["HierarchyValidationType"]
        }
        Update: {
          client_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_required?: boolean
          is_root?: boolean | null
          metadata?: Json | null
          name?: string
          order?: number
          unit_count?: number
          unit_selection_mode?: Database["public"]["Enums"]["UnitSelectionMode"]
          updated_at?: string
          validationType?: Database["public"]["Enums"]["HierarchyValidationType"]
        }
        Relationships: []
      }
      organizational_units: {
        Row: {
          client_id: string
          created_at: string
          deleted_at: string | null
          depth: number
          full_path: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          node_name_id: string
          order_index: number
          type: Database["public"]["Enums"]["NodeType"]
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          deleted_at?: string | null
          depth?: number
          full_path?: string | null
          id: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          node_name_id: string
          order_index?: number
          type?: Database["public"]["Enums"]["NodeType"]
          updated_at: string
        }
        Update: {
          client_id?: string
          created_at?: string
          deleted_at?: string | null
          depth?: number
          full_path?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          node_name_id?: string
          order_index?: number
          type?: Database["public"]["Enums"]["NodeType"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizational_units_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizational_units_node_name_id_fkey"
            columns: ["node_name_id"]
            isOneToOne: false
            referencedRelation: "node_names"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_logs: {
        Row: {
          created_at: string
          duration: number
          id: string
          metadata: Json | null
          operation: string
          status: Database["public"]["Enums"]["GenericStatus"]
        }
        Insert: {
          created_at?: string
          duration: number
          id: string
          metadata?: Json | null
          operation: string
          status: Database["public"]["Enums"]["GenericStatus"]
        }
        Update: {
          created_at?: string
          duration?: number
          id?: string
          metadata?: Json | null
          operation?: string
          status?: Database["public"]["Enums"]["GenericStatus"]
        }
        Relationships: []
      }
      permissions: {
        Row: {
          contextTypes: Database["public"]["Enums"]["ContextType"][] | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          scopeTypes: Database["public"]["Enums"]["ScopeType"][] | null
          slug: string
          updated_at: string
        }
        Insert: {
          contextTypes?: Database["public"]["Enums"]["ContextType"][] | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          scopeTypes?: Database["public"]["Enums"]["ScopeType"][] | null
          slug: string
          updated_at: string
        }
        Update: {
          contextTypes?: Database["public"]["Enums"]["ContextType"][] | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          scopeTypes?: Database["public"]["Enums"]["ScopeType"][] | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      provider_hierarchies: {
        Row: {
          client_id: string | null
          created_at: string
          deleted_at: string | null
          hierarchy_path: string[] | null
          id: string
          is_active: boolean | null
          level: number | null
          metadata: Json | null
          parent_provider_id: string | null
          provider_id: string
          root_provider_id: string | null
          updated_at: string
          valid_from: string | null
          valid_to: string | null
          version: number | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          deleted_at?: string | null
          hierarchy_path?: string[] | null
          id?: string
          is_active?: boolean | null
          level?: number | null
          metadata?: Json | null
          parent_provider_id?: string | null
          provider_id: string
          root_provider_id?: string | null
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
          version?: number | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          deleted_at?: string | null
          hierarchy_path?: string[] | null
          id?: string
          is_active?: boolean | null
          level?: number | null
          metadata?: Json | null
          parent_provider_id?: string | null
          provider_id?: string
          root_provider_id?: string | null
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_hierarchies_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_hierarchies_parent_provider_id_fkey"
            columns: ["parent_provider_id"]
            isOneToOne: false
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_hierarchies_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_hierarchies_root_provider_id_fkey"
            columns: ["root_provider_id"]
            isOneToOne: false
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_hierarchy_cache: {
        Row: {
          created_at: string
          depth: number
          hierarchy_id: string
          id: string
          metadata: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          depth: number
          hierarchy_id: string
          id?: string
          metadata?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          depth?: number
          hierarchy_id?: string
          id?: string
          metadata?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_hierarchy_cache_hierarchy_id_fkey"
            columns: ["hierarchy_id"]
            isOneToOne: false
            referencedRelation: "provider_hierarchies"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_hierarchy_history: {
        Row: {
          changed_by: string | null
          created_at: string
          hierarchy_id: string
          id: string
          metadata: Json | null
          version: number
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          hierarchy_id: string
          id?: string
          metadata?: Json | null
          version: number
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          hierarchy_id?: string
          id?: string
          metadata?: Json | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "provider_hierarchy_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_hierarchy_history_hierarchy_id_fkey"
            columns: ["hierarchy_id"]
            isOneToOne: false
            referencedRelation: "provider_hierarchies"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_hierarchy_rules: {
        Row: {
          client_id: string | null
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          priority: number | null
          updated_at: string
          validation_type: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          priority?: number | null
          updated_at?: string
          validation_type?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          priority?: number | null
          updated_at?: string
          validation_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_hierarchy_rules_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
        ]
      }
      record: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          hierarchy_id: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          organizational_unit_id: string | null
          status: string
          template_id: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          hierarchy_id?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          organizational_unit_id?: string | null
          status?: string
          template_id: string
          updated_at: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          hierarchy_id?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          organizational_unit_id?: string | null
          status?: string
          template_id?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "Record_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Record_organizational_unit_id_fkey"
            columns: ["organizational_unit_id"]
            isOneToOne: false
            referencedRelation: "organizational_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Record_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "record_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Record_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      record_files: {
        Row: {
          bucket_path: string
          created_at: string
          deleted_at: string | null
          field_id: string
          file_name: string
          file_type: string
          file_url: string
          fileSize: number
          id: string
          is_active: boolean
          metadata: Json | null
          record_id: string
          updated_at: string
        }
        Insert: {
          bucket_path: string
          created_at?: string
          deleted_at?: string | null
          field_id: string
          file_name: string
          file_type: string
          file_url: string
          fileSize: number
          id: string
          is_active?: boolean
          metadata?: Json | null
          record_id: string
          updated_at: string
        }
        Update: {
          bucket_path?: string
          created_at?: string
          deleted_at?: string | null
          field_id?: string
          file_name?: string
          file_type?: string
          file_url?: string
          fileSize?: number
          id?: string
          is_active?: boolean
          metadata?: Json | null
          record_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "record_files_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "template_fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "record_files_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "record"
            referencedColumns: ["id"]
          },
        ]
      }
      record_history: {
        Row: {
          changes: Json
          created_at: string
          created_by: string
          id: string
          metadata: Json | null
          record_id: string
          version: number
        }
        Insert: {
          changes: Json
          created_at?: string
          created_by: string
          id: string
          metadata?: Json | null
          record_id: string
          version: number
        }
        Update: {
          changes?: Json
          created_at?: string
          created_by?: string
          id?: string
          metadata?: Json | null
          record_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "record_history_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "record_history_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "record"
            referencedColumns: ["id"]
          },
        ]
      }
      record_organizational_units: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          module_id: string | null
          organizational_unit_id: string
          record_id: string
          scope_id: string
          scope_type: Database["public"]["Enums"]["ScopeType"]
        }
        Insert: {
          created_at?: string
          id: string
          metadata?: Json | null
          module_id?: string | null
          organizational_unit_id: string
          record_id: string
          scope_id: string
          scope_type: Database["public"]["Enums"]["ScopeType"]
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          module_id?: string | null
          organizational_unit_id?: string
          record_id?: string
          scope_id?: string
          scope_type?: Database["public"]["Enums"]["ScopeType"]
        }
        Relationships: [
          {
            foreignKeyName: "record_organizational_units_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "record_organizational_units_organizational_unit_id_fkey"
            columns: ["organizational_unit_id"]
            isOneToOne: false
            referencedRelation: "organizational_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "record_organizational_units_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "record"
            referencedColumns: ["id"]
          },
        ]
      }
      record_templates: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          module_id: string
          name: string
          slug: string
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          module_id: string
          name: string
          slug: string
          updated_at: string
          version?: number
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          module_id?: string
          name?: string
          slug?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "record_templates_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      record_values: {
        Row: {
          created_at: string
          deleted_at: string | null
          field_id: string
          id: string
          is_active: boolean
          metadata: Json | null
          module_id: string | null
          record_id: string
          templateId: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          field_id: string
          id: string
          is_active?: boolean
          metadata?: Json | null
          module_id?: string | null
          record_id: string
          templateId: string
          updated_at: string
          value: Json
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          field_id?: string
          id?: string
          is_active?: boolean
          metadata?: Json | null
          module_id?: string | null
          record_id?: string
          templateId?: string
          updated_at?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "record_values_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "template_fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "record_values_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "record_values_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "record"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "record_values_templateId_fkey"
            columns: ["templateId"]
            isOneToOne: false
            referencedRelation: "record_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      security_logs: {
        Row: {
          created_at: string
          details: Json | null
          eventType: Database["public"]["Enums"]["SecurityEventType"]
          id: string
          ip_address: string
          metadata: Json | null
          status: Database["public"]["Enums"]["GenericStatus"]
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          eventType: Database["public"]["Enums"]["SecurityEventType"]
          id: string
          ip_address: string
          metadata?: Json | null
          status: Database["public"]["Enums"]["GenericStatus"]
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          eventType?: Database["public"]["Enums"]["SecurityEventType"]
          id?: string
          ip_address?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["GenericStatus"]
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_logs: {
        Row: {
          created_at: string
          details: Json | null
          id: string
          level: Database["public"]["Enums"]["LogLevel"]
          message: string
          metadata: Json | null
          source: string
          stack_trace: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          id: string
          level: Database["public"]["Enums"]["LogLevel"]
          message: string
          metadata?: Json | null
          source: string
          stack_trace?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          id?: string
          level?: Database["public"]["Enums"]["LogLevel"]
          message?: string
          metadata?: Json | null
          source?: string
          stack_trace?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      template_fields: {
        Row: {
          component_library_id: string | null
          component_version: string | null
          config: Json
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          is_required: boolean
          is_unique: boolean
          label: string
          metadata: Json | null
          order: number
          template_id: string
          type: Database["public"]["Enums"]["componentfieldtype"]
          updated_at: string
          validation: Json | null
        }
        Insert: {
          component_library_id?: string | null
          component_version?: string | null
          config: Json
          created_at?: string
          deleted_at?: string | null
          id: string
          is_active?: boolean
          is_required?: boolean
          is_unique?: boolean
          label: string
          metadata?: Json | null
          order?: number
          template_id: string
          type: Database["public"]["Enums"]["componentfieldtype"]
          updated_at: string
          validation?: Json | null
        }
        Update: {
          component_library_id?: string | null
          component_version?: string | null
          config?: Json
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          is_required?: boolean
          is_unique?: boolean
          label?: string
          metadata?: Json | null
          order?: number
          template_id?: string
          type?: Database["public"]["Enums"]["componentfieldtype"]
          updated_at?: string
          validation?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "template_fields_component_library_id_fkey"
            columns: ["component_library_id"]
            isOneToOne: false
            referencedRelation: "component_library"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_fields_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "record_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_organizational_scopes: {
        Row: {
          created_at: string
          id: string
          is_required: boolean
          metadata: Json | null
          scope_id: string
          scopeType: Database["public"]["Enums"]["ScopeType"]
          template_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          is_required?: boolean
          metadata?: Json | null
          scope_id: string
          scopeType: Database["public"]["Enums"]["ScopeType"]
          template_id: string
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: string
          is_required?: boolean
          metadata?: Json | null
          scope_id?: string
          scopeType?: Database["public"]["Enums"]["ScopeType"]
          template_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_organizational_scopes_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "record_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_scopes_node_name_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "node_names"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_scopes_org_unit_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "organizational_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_scopes_unit_container_fkey"
            columns: ["scope_id"]
            isOneToOne: false
            referencedRelation: "unit_containers"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_container_items: {
        Row: {
          container_id: string
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          unit_id: string
          updated_at: string
        }
        Insert: {
          container_id: string
          created_at?: string
          deleted_at?: string | null
          id: string
          is_active?: boolean
          metadata?: Json | null
          unit_id: string
          updated_at: string
        }
        Update: {
          container_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          unit_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_container_items_container_id_fkey"
            columns: ["container_id"]
            isOneToOne: false
            referencedRelation: "unit_containers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_container_items_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "organizational_units"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_containers: {
        Row: {
          client_id: string
          container_key: string
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          is_active: boolean
          item_count: number
          metadata: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          client_id: string
          container_key: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id: string
          is_active?: boolean
          item_count?: number
          metadata?: Json | null
          name: string
          updated_at: string
        }
        Update: {
          client_id?: string
          container_key?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          item_count?: number
          metadata?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      unit_hierarchies: {
        Row: {
          child_id: string
          created_at: string
          deleted_at: string | null
          depth: number
          id: string
          is_active: boolean
          is_primary: boolean
          metadata: Json | null
          parent_id: string
          path_from_root: string | null
          updated_at: string
        }
        Insert: {
          child_id: string
          created_at?: string
          deleted_at?: string | null
          depth?: number
          id: string
          is_active?: boolean
          is_primary?: boolean
          metadata?: Json | null
          parent_id: string
          path_from_root?: string | null
          updated_at: string
        }
        Update: {
          child_id?: string
          created_at?: string
          deleted_at?: string | null
          depth?: number
          id?: string
          is_active?: boolean
          is_primary?: boolean
          metadata?: Json | null
          parent_id?: string
          path_from_root?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_hierarchies_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "organizational_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_hierarchies_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "organizational_units"
            referencedColumns: ["id"]
          },
        ]
      }
      user_contexts: {
        Row: {
          contextType: Database["public"]["Enums"]["ContextType"]
          created_at: string
          deleted_at: string | null
          entity_id: string
          id: string
          is_active: boolean
          is_admin: boolean
          metadata: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contextType: Database["public"]["Enums"]["ContextType"]
          created_at?: string
          deleted_at?: string | null
          entity_id: string
          id?: string
          is_active?: boolean
          is_admin?: boolean
          metadata?: Json | null
          updated_at: string
          user_id: string
        }
        Update: {
          contextType?: Database["public"]["Enums"]["ContextType"]
          created_at?: string
          deleted_at?: string | null
          entity_id?: string
          id?: string
          is_active?: boolean
          is_admin?: boolean
          metadata?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_contexts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          deleted_at: string | null
          email: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          email: string
          id: string
          is_active?: boolean
          name: string
          updated_at: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          email?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      workflow_records: {
        Row: {
          assignee_id: string | null
          assigneeType: Database["public"]["Enums"]["AssigneeType"] | null
          created_at: string
          current_state_id: string
          deleted_at: string | null
          due_date: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          record_id: string
          updated_at: string
          workflow_id: string
        }
        Insert: {
          assignee_id?: string | null
          assigneeType?: Database["public"]["Enums"]["AssigneeType"] | null
          created_at?: string
          current_state_id: string
          deleted_at?: string | null
          due_date?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          record_id: string
          updated_at: string
          workflow_id: string
        }
        Update: {
          assignee_id?: string | null
          assigneeType?: Database["public"]["Enums"]["AssigneeType"] | null
          created_at?: string
          current_state_id?: string
          deleted_at?: string | null
          due_date?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          record_id?: string
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_records_current_state_id_fkey"
            columns: ["current_state_id"]
            isOneToOne: false
            referencedRelation: "workflow_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_records_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "record"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_records_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_state_history: {
        Row: {
          assignee_id: string | null
          assigneeType: Database["public"]["Enums"]["AssigneeType"] | null
          changed_by: string
          duration: number | null
          entered_at: string
          exited_at: string | null
          id: string
          metadata: Json | null
          state_id: string
          workflow_record_id: string
        }
        Insert: {
          assignee_id?: string | null
          assigneeType?: Database["public"]["Enums"]["AssigneeType"] | null
          changed_by: string
          duration?: number | null
          entered_at?: string
          exited_at?: string | null
          id: string
          metadata?: Json | null
          state_id: string
          workflow_record_id: string
        }
        Update: {
          assignee_id?: string | null
          assigneeType?: Database["public"]["Enums"]["AssigneeType"] | null
          changed_by?: string
          duration?: number | null
          entered_at?: string
          exited_at?: string | null
          id?: string
          metadata?: Json | null
          state_id?: string
          workflow_record_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_state_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_state_history_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "workflow_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_state_history_workflow_record_id_fkey"
            columns: ["workflow_record_id"]
            isOneToOne: false
            referencedRelation: "workflow_records"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_states: {
        Row: {
          assignee_id: string | null
          assigneeType: Database["public"]["Enums"]["AssigneeType"] | null
          auto_transition: boolean
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          is_final: boolean
          is_initial: boolean
          metadata: Json | null
          name: string
          order: number
          transition_rules: Json | null
          updated_at: string
          workflow_id: string
        }
        Insert: {
          assignee_id?: string | null
          assigneeType?: Database["public"]["Enums"]["AssigneeType"] | null
          auto_transition?: boolean
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          is_final?: boolean
          is_initial?: boolean
          metadata?: Json | null
          name: string
          order?: number
          transition_rules?: Json | null
          updated_at: string
          workflow_id: string
        }
        Update: {
          assignee_id?: string | null
          assigneeType?: Database["public"]["Enums"]["AssigneeType"] | null
          auto_transition?: boolean
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          is_final?: boolean
          is_initial?: boolean
          metadata?: Json | null
          name?: string
          order?: number
          transition_rules?: Json | null
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_states_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_transition_history: {
        Row: {
          error: string | null
          id: string
          metadata: Json | null
          success: Database["public"]["Enums"]["GenericStatus"]
          transition_id: string
          triggered_at: string
          triggered_by: string
          workflow_record_id: string
        }
        Insert: {
          error?: string | null
          id: string
          metadata?: Json | null
          success?: Database["public"]["Enums"]["GenericStatus"]
          transition_id: string
          triggered_at?: string
          triggered_by: string
          workflow_record_id: string
        }
        Update: {
          error?: string | null
          id?: string
          metadata?: Json | null
          success?: Database["public"]["Enums"]["GenericStatus"]
          transition_id?: string
          triggered_at?: string
          triggered_by?: string
          workflow_record_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_transition_history_transition_id_fkey"
            columns: ["transition_id"]
            isOneToOne: false
            referencedRelation: "workflow_transitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transition_history_triggered_by_fkey"
            columns: ["triggered_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transition_history_workflow_record_id_fkey"
            columns: ["workflow_record_id"]
            isOneToOne: false
            referencedRelation: "workflow_records"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_transitions: {
        Row: {
          actions: Json | null
          conditions: Json | null
          created_at: string
          deleted_at: string | null
          from_state_id: string
          id: string
          is_active: boolean
          metadata: Json | null
          to_state_id: string
          updated_at: string
          workflow_id: string
        }
        Insert: {
          actions?: Json | null
          conditions?: Json | null
          created_at?: string
          deleted_at?: string | null
          from_state_id: string
          id?: string
          is_active?: boolean
          metadata?: Json | null
          to_state_id: string
          updated_at: string
          workflow_id: string
        }
        Update: {
          actions?: Json | null
          conditions?: Json | null
          created_at?: string
          deleted_at?: string | null
          from_state_id?: string
          id?: string
          is_active?: boolean
          metadata?: Json | null
          to_state_id?: string
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_transitions_from_state_id_fkey"
            columns: ["from_state_id"]
            isOneToOne: false
            referencedRelation: "workflow_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transitions_to_state_id_fkey"
            columns: ["to_state_id"]
            isOneToOne: false
            referencedRelation: "workflow_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_transitions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_trigger_executions: {
        Row: {
          error: string | null
          finished_at: string | null
          id: string
          metadata: Json | null
          result: Json | null
          started_at: string
          status: Database["public"]["Enums"]["GenericStatus"]
          trigger_id: string
          triggered_by: string | null
        }
        Insert: {
          error?: string | null
          finished_at?: string | null
          id: string
          metadata?: Json | null
          result?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["GenericStatus"]
          trigger_id: string
          triggered_by?: string | null
        }
        Update: {
          error?: string | null
          finished_at?: string | null
          id?: string
          metadata?: Json | null
          result?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["GenericStatus"]
          trigger_id?: string
          triggered_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_trigger_executions_trigger_id_fkey"
            columns: ["trigger_id"]
            isOneToOne: false
            referencedRelation: "workflow_triggers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_trigger_executions_triggered_by_fkey"
            columns: ["triggered_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_triggers: {
        Row: {
          actions: Json | null
          conditions: Json | null
          created_at: string
          deleted_at: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          schedule: string | null
          type: Database["public"]["Enums"]["TriggerType"]
          updated_at: string
          workflow_id: string
        }
        Insert: {
          actions?: Json | null
          conditions?: Json | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          schedule?: string | null
          type: Database["public"]["Enums"]["TriggerType"]
          updated_at: string
          workflow_id: string
        }
        Update: {
          actions?: Json | null
          conditions?: Json | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          schedule?: string | null
          type?: Database["public"]["Enums"]["TriggerType"]
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_triggers_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          description: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          module_id: string | null
          name: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          created_at?: string
          created_by: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          module_id?: string | null
          name: string
          updated_at: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          module_id?: string | null
          name?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "workflows_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      orioledb_index: {
        Row: {
          datoid: unknown | null
          description: string | null
          index_relnode: unknown | null
          index_reloid: unknown | null
          index_type: string | null
          name: string | null
          table_relnode: unknown | null
          table_reloid: unknown | null
        }
        Relationships: []
      }
      orioledb_index_descr: {
        Row: {
          datoid: unknown | null
          refcnt: unknown | null
          relnode: unknown | null
          reloid: unknown | null
        }
        Relationships: []
      }
      orioledb_table: {
        Row: {
          datoid: unknown | null
          description: string | null
          relnode: unknown | null
          reloid: unknown | null
        }
        Relationships: []
      }
      orioledb_table_descr: {
        Row: {
          datoid: unknown | null
          refcnt: unknown | null
          relnode: unknown | null
          reloid: unknown | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_entity_id: {
        Args: {
          name: string
          entity_type: Database["public"]["Enums"]["ContextType"]
        }
        Returns: string
      }
      orioledb_commit_hash: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      orioledb_compression_max_level: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      orioledb_evict_pages: {
        Args: {
          relid: unknown
          maxlevel: number
        }
        Returns: undefined
      }
      orioledb_get_evicted_trees: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      orioledb_get_index_descrs: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      orioledb_get_table_descrs: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      orioledb_has_retained_undo: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      orioledb_idx_structure: {
        Args: {
          relid: unknown
          tree_name: string
          options?: string
          depth?: number
        }
        Returns: string
      }
      orioledb_index_description: {
        Args: {
          datoid: unknown
          relid: unknown
          relnode: unknown
          index_type: string
        }
        Returns: Record<string, unknown>
      }
      orioledb_index_oids: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      orioledb_index_rows: {
        Args: {
          relid: unknown
        }
        Returns: Record<string, unknown>
      }
      orioledb_page_stats: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      orioledb_parallel_debug_start: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      orioledb_parallel_debug_stop: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      orioledb_recovery_synchronized: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      orioledb_relation_size: {
        Args: {
          relid: unknown
        }
        Returns: number
      }
      orioledb_sys_tree_check: {
        Args: {
          num: number
          force_map_check?: boolean
        }
        Returns: boolean
      }
      orioledb_sys_tree_rows: {
        Args: {
          num: number
        }
        Returns: Json[]
      }
      orioledb_sys_tree_structure: {
        Args: {
          num: number
          options?: string
          depth?: number
        }
        Returns: string
      }
      orioledb_table_description:
        | {
            Args: {
              datoid: unknown
              relid: unknown
              relnode: unknown
            }
            Returns: string
          }
        | {
            Args: {
              relid: unknown
            }
            Returns: string
          }
      orioledb_table_oids: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      orioledb_table_pages: {
        Args: {
          relid: unknown
        }
        Returns: Record<string, unknown>[]
      }
      orioledb_tableam_handler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      orioledb_tbl_are_indices_equal: {
        Args: {
          idx_oid1: unknown
          idx_oid2: unknown
        }
        Returns: boolean
      }
      orioledb_tbl_bin_structure: {
        Args: {
          relid: unknown
          print_bytes?: boolean
          depth?: number
        }
        Returns: string
      }
      orioledb_tbl_check: {
        Args: {
          relid: unknown
          force_map_check?: boolean
        }
        Returns: boolean
      }
      orioledb_tbl_compression_check: {
        Args: {
          level: number
          relid: unknown
          ranges?: number[]
        }
        Returns: string
      }
      orioledb_tbl_indices: {
        Args: {
          relid: unknown
        }
        Returns: string
      }
      orioledb_tbl_structure: {
        Args: {
          relid: unknown
          options?: string
          depth?: number
        }
        Returns: string
      }
      orioledb_ucm_check: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      orioledb_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      orioledb_write_pages: {
        Args: {
          relid: unknown
        }
        Returns: undefined
      }
      pg_stopevent_reset: {
        Args: {
          eventname: string
        }
        Returns: boolean
      }
      pg_stopevent_set: {
        Args: {
          eventname: string
          condition: unknown
        }
        Returns: undefined
      }
      pg_stopevents: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      s3_get: {
        Args: {
          objectname: string
        }
        Returns: string
      }
      s3_put: {
        Args: {
          objectname: string
          filename: string
        }
        Returns: string
      }
    }
    Enums: {
      AssigneeType:
        | "USER"
        | "GROUP"
        | "CONTEXT"
        | "PROVIDER"
        | "PROVIDER_GROUP"
        | "CLIENT"
      AuditActionType:
        | "CREATE"
        | "READ"
        | "UPDATE"
        | "DELETE"
        | "LOGIN"
        | "LOGOUT"
        | "EXPORT"
        | "IMPORT"
        | "SHARE"
        | "APPROVE"
        | "REJECT"
        | "CUSTOM"
      ComponentCategory:
        | "DATA"
        | "FORM"
        | "LAYOUT"
        | "NAVIGATION"
        | "UTILITY"
        | "SECURITY"
        | "CUSTOM"
      componentfieldtype:
        | "TEXT"
        | "TEXTAREA"
        | "PASSWORD"
        | "EMAIL"
        | "URL"
        | "NUMBER"
        | "RATING"
        | "SELECT"
        | "MULTISELECT"
        | "RADIO"
        | "CHECKBOX"
        | "DATE"
        | "TIME"
        | "DATETIME"
        | "DATE_RANGE"
        | "PHONE"
        | "TEL"
        | "FILE"
        | "MULTIFILE"
        | "SIGNATURE"
        | "TOKEN_INPUT"
        | "CODE_EDITOR"
        | "CAMERA"
        | "COLOR"
        | "CPF"
        | "CNPJ"
        | "SWITCH"
        | "CUSTOM"
      ComponentType:
        | "FIELD"
        | "FILE"
        | "SIGNATURE"
        | "TOKEN_INPUT"
        | "CODE_EDITOR"
        | "CAMERA"
        | "DATE_RANGE"
        | "CUSTOM"
      ContextType: "ADMIN" | "AGENCY" | "CLIENT" | "PROVIDER"
      entitytype: "CLIENT" | "PROVIDER" | "AGENCY"
      FieldType:
        | "TEXT"
        | "TEXTAREA"
        | "PASSWORD"
        | "EMAIL"
        | "URL"
        | "NUMBER"
        | "RATING"
        | "SELECT"
        | "MULTISELECT"
        | "RADIO"
        | "CHECKBOX"
        | "DATE"
        | "TIME"
        | "DATETIME"
        | "DATE_RANGE"
        | "PHONE"
        | "TEL"
        | "FILE"
        | "MULTIFILE"
        | "COLOR"
        | "CPF"
        | "CNPJ"
        | "SWITCH"
      GenericStatus:
        | "SUCCESS"
        | "FAILURE"
        | "PENDING"
        | "CANCELLED"
        | "BLOCKED"
        | "FLAGGED"
      HierarchyValidationType: "STRICT" | "FLEXIBLE" | "CUSTOM"
      LogLevel: "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL"
      NodeType: "ROOT" | "CATEGORY" | "OPTION"
      ScopeType:
        | "MODULE"
        | "WORKFLOW"
        | "RECORD_TEMPLATE"
        | "COMPONENT"
        | "PROVIDER_HIERARCHY"
        | "ORGANIZATIONAL_UNIT"
        | "UNIT_CONTAINER"
      SecurityEventType:
        | "LOGIN_ATTEMPT"
        | "PASSWORD_CHANGE"
        | "PERMISSION_CHANGE"
        | "API_KEY_GENERATED"
        | "TOKEN_GENERATED"
        | "ACCESS_DENIED"
        | "SUSPICIOUS_ACTIVITY"
      TriggerType: "SCHEDULE" | "EVENT" | "CONDITION"
      UnitSelectionMode: "single" | "multiple"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
