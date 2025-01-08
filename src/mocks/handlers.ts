import { http, HttpResponse } from 'msw'
import { faker } from "@faker-js/faker"

interface CreateClientPayload {
  name: string
  email: string
}

export const handlers = [
  http.get('/api/clients', () => {
    return HttpResponse.json([
      {
        id: faker.string.uuid(),
        name: faker.company.name(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
      {
        id: faker.string.uuid(),
        name: faker.company.name(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    ])
  }),

  http.post('/api/clients', async ({ request }) => {
    const data = await request.json() as CreateClientPayload
    
    return HttpResponse.json({
      id: faker.string.uuid(),
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { status: 201 })
  }),
]
