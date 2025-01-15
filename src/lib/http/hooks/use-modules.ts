import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { moduleApi } from '../services/module.api'
import type { ModuleInsert, ModuleUpdate } from '@/lib/core/interfaces/module.interfaces'

export function useModules() {
  const queryClient = useQueryClient()
  const queryKey = ['modules']

  const { data: modules = [], isLoading } = useQuery({
    queryKey,
    queryFn: () => moduleApi.findAll()
  })

  const createMutation = useMutation({
    mutationFn: (data: Partial<ModuleInsert>) => moduleApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<ModuleUpdate>) => 
      moduleApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => moduleApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })

  return {
    modules,
    isLoading,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending
  }
} 