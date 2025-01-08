import { faker } from "@faker-js/faker/locale/pt_BR"
import { db } from "@/db"
import { clients } from "@/db/schema"
import type { ClientType, ClientStatus, Priority } from "@/db/schema"

interface SeedClientsOptions {
  count?: number
}

export async function seedClients({ count = 10 }: SeedClientsOptions = {}) {
  const clients_data = Array.from({ length: count }, () => ({
    name: faker.company.name(),
    type: faker.helpers.arrayElement([
      "company",
      "individual",
      "government",
    ] as ClientType[]),
    status: faker.helpers.arrayElement([
      "active",
      "inactive",
      "pending",
    ] as ClientStatus[]),
    priority: faker.helpers.arrayElement([
      "low",
      "medium",
      "high",
    ] as Priority[]),
    archived: faker.datatype.boolean(),
    created_at: faker.date.past(),
    updated_at: new Date(),
  }))

  await db.insert(clients).values(clients_data)

  return clients_data
}