import * as z from "zod"

export const createClientSchema = z.object({
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
})

export type CreateClient = z.infer<typeof createClientSchema> 