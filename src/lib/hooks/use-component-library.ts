import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { componentLibraryHttpService } from '../http/services/component-library.service'
import type { ComponentLibrary, ComponentLibraryInsert, ComponentLibraryUpdate } from '../core/interfaces/component-library.interfaces'
import { toast } from 'sonner'

export function useComponentLibrary() {
  const queryClient = useQueryClient()
  const queryKey = ['component-library']

  const { data: components = [], isLoading, error } = useQuery<ComponentLibrary[], Error>({
    queryKey,
    queryFn: () => componentLibraryHttpService.findAll(),
    retry: false
  })

  const { data: activeComponents = [], error: activeError } = useQuery<ComponentLibrary[], Error>({
    queryKey: [...queryKey, 'active'],
    queryFn: () => componentLibraryHttpService.findActive(),
    retry: false
  })

  const { mutateAsync: create } = useMutation({
    mutationFn: (data: ComponentLibraryInsert) => componentLibraryHttpService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Componente criado com sucesso')
    },
    onError: (error: Error) => {
      console.error('Error creating component:', error)
      toast.error('Erro ao criar componente')
    }
  })

  const { mutateAsync: update } = useMutation({
    mutationFn: ({ id, ...data }: ComponentLibraryUpdate & { id: string }) =>
      componentLibraryHttpService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Componente atualizado com sucesso')
    },
    onError: (error: Error) => {
      console.error('Error updating component:', error)
      toast.error('Erro ao atualizar componente')
    }
  })

  const { mutateAsync: remove } = useMutation({
    mutationFn: (id: string) => componentLibraryHttpService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Componente excluído com sucesso')
    },
    onError: (error: Error) => {
      console.error('Error deleting component:', error)
      toast.error('Erro ao excluir componente')
    }
  })

  if (error) {
    console.error('Error fetching components:', error)
    toast.error('Erro ao buscar componentes')
  }

  if (activeError) {
    console.error('Error fetching active components:', activeError)
    toast.error('Erro ao buscar componentes ativos')
  }

  return {
    components,
    activeComponents,
    isLoading,
    error,
    activeError,
    create,
    update,
    remove
  }
} 