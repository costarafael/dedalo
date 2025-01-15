import { z } from 'zod'
import type { TemplateFieldInsert } from '../interfaces/template-field.interfaces'
import type { Database } from '@/types/supabase'

type FieldType = Database["public"]["Enums"]["FieldType"]

export const templateFieldSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(3).max(255),
  type: z.enum(['TEXT', 'TEXTAREA', 'PASSWORD', 'EMAIL', 'URL', 'NUMBER', 'RATING', 'SELECT', 'MULTISELECT', 'RADIO', 'CHECKBOX', 'DATE', 'TIME', 'DATETIME', 'DATE_RANGE', 'PHONE', 'TEL', 'FILE', 'MULTIFILE', 'COLOR', 'CPF', 'CNPJ', 'SWITCH'] as [FieldType, ...FieldType[]]),
  order: z.number().optional(),
  is_active: z.boolean().optional(),
  is_required: z.boolean().optional(),
  is_unique: z.boolean().optional(),
  template_id: z.string(),
  metadata: z.record(z.any()).nullable().optional(),
  validation: z.record(z.any()).nullable().optional(),
  config: z.record(z.any()),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  deleted_at: z.string().nullable().optional()
})

export type CreateTemplateFieldDTO = z.infer<typeof templateFieldSchema>

export const validateTemplateField = (data: Partial<TemplateFieldInsert>) => {
  return templateFieldSchema.parse(data)
} 