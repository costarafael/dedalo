export const clientKeys = {
  all: ["clients"] as const,
  lists: () => [...clientKeys.all, "list"],
  list: (filters: any) => [...clientKeys.lists(), { filters }],
  details: () => [...clientKeys.all, "detail"],
  detail: (id: string) => [...clientKeys.details(), id],
}

export const nodeKeys = {
  all: ["nodes"] as const,
  lists: () => [...nodeKeys.all, "list"],
  list: (filters: any) => [...nodeKeys.lists(), { filters }],
  details: () => [...nodeKeys.all, "detail"],
  detail: (id: string) => [...nodeKeys.details(), id],
}

export const unitKeys = {
  all: ["units"] as const,
  lists: () => [...unitKeys.all, "list"],
  list: (filters: any) => [...unitKeys.lists(), { filters }],
  details: () => [...unitKeys.all, "detail"],
  detail: (id: string) => [...unitKeys.details(), id],
}

export const containerKeys = {
  all: ["containers"] as const,
  lists: () => [...containerKeys.all, "list"],
  list: (filters: any) => [...containerKeys.lists(), { filters }],
  details: () => [...containerKeys.all, "detail"],
  detail: (id: string) => [...containerKeys.details(), id],
} 