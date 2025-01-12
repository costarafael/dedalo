import * as z from "zod"
import { ContextType } from "@/lib/core/interfaces"

export const createClientSchema = z.object({
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  type: z.literal(ContextType.CLIENT).default(ContextType.CLIENT),
  entity_type: z.literal('INTERNAL').default('INTERNAL')
})

export type CreateClient = z.infer<typeof createClientSchema> 