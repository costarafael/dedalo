import { Client } from "@/lib/core/interfaces/repository.interfaces"
import { clientService } from "@/lib/core/services/client.service"

class ClientApi {
  private readonly baseUrl = "/api/clients"

  async getAll() {
    try {
      const response = await fetch(this.baseUrl)
      if (!response.ok) throw new Error("Erro ao buscar clientes")
      const data = await response.json()
      return {
        ok: true,
        data: data as Client[]
      }
    } catch (error) {
      console.error("Error fetching clients:", error)
      return {
        ok: false,
        error: "Erro ao buscar clientes"
      }
    }
  }

  async getById(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`)
      if (!response.ok) throw new Error("Erro ao buscar cliente")
      const data = await response.json()
      return {
        ok: true,
        data: data as Client
      }
    } catch (error) {
      console.error("Error fetching client:", error)
      return {
        ok: false,
        error: "Erro ao buscar cliente"
      }
    }
  }

  async create(data: { name: string; metadata: Client["metadata"] }) {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error("Erro ao criar cliente")
      const responseData = await response.json()
      return {
        ok: true,
        data: responseData as Client
      }
    } catch (error) {
      console.error("Error creating client:", error)
      return {
        ok: false,
        error: "Erro ao criar cliente"
      }
    }
  }

  async update(id: string, data: Partial<Client>) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error("Erro ao atualizar cliente")
      const responseData = await response.json()
      return {
        ok: true,
        data: responseData as Client
      }
    } catch (error) {
      console.error("Error updating client:", error)
      return {
        ok: false,
        error: "Erro ao atualizar cliente"
      }
    }
  }

  async delete(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE"
      })
      if (!response.ok) throw new Error("Erro ao excluir cliente")
      return {
        ok: true
      }
    } catch (error) {
      console.error("Error deleting client:", error)
      return {
        ok: false,
        error: "Erro ao excluir cliente"
      }
    }
  }
}

export const clientApi = new ClientApi() 