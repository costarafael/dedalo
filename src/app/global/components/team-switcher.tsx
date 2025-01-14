import React, { useEffect, useState } from 'react'
import { clientApi, providerApi } from '../api'

const TeamSwitcher: React.FC = () => {
  const [clients, setClients] = useState<any[]>([])
  const [providers, setProviders] = useState<any[]>([])

  useEffect(() => {
    async function fetchEntities() {
      try {
        const { data: clientsData } = await clientApi.getAll()
        const { data: providersData } = await providerApi.getAll()

        setClients(clientsData || [])
        setProviders(providersData || [])
      } catch (error) {
        console.error('Error fetching entities:', error)
      }
    }

    fetchEntities()
  }, [])

  return (
    // ... rest of the component code ...
  )
}

export default TeamSwitcher 