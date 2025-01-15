import { z } from 'zod'
import type { ComponentLibraryInsert } from '../interfaces/component-library.interfaces'

export const componentLibrarySchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().nullable().optional(),
  type: z.enum([
    'TEXT', 'TEXTAREA', 'PASSWORD', 'EMAIL', 'URL', 'NUMBER',
    'RATING', 'SELECT', 'MULTISELECT', 'RADIO', 'CHECKBOX',
    'DATE', 'TIME', 'DATETIME', 'DATE_RANGE', 'PHONE', 'TEL',
    'FILE', 'MULTIFILE', 'SIGNATURE', 'TOKEN_INPUT', 'CODE_EDITOR',
    'CAMERA', 'COLOR', 'CPF', 'CNPJ', 'SWITCH', 'CUSTOM'
  ] as const),
  category: z.enum([
    'DATA', 'FORM', 'LAYOUT', 'NAVIGATION', 'UTILITY', 'SECURITY', 'CUSTOM'
  ] as const),
  version: z.string(),
  is_active: z.boolean(),
  is_latest_version: z.boolean(),
  config: z.record(z.any()).default({}),
  metadata: z.record(z.any()).nullable().optional(),
  validation: z.record(z.any()).nullable().optional(),
  default_label: z.string().nullable().optional(),
  is_required_by_default: z.boolean().nullable().optional(),
  is_unique_by_default: z.boolean().nullable().optional()
})

export type CreateComponentLibraryDTO = z.infer<typeof componentLibrarySchema>

export function validateComponentLibrary(data: ComponentLibraryInsert) {
  return componentLibrarySchema.parse({
    ...data,
    config: data.config || {},
    metadata: data.metadata || null,
    validation: data.validation || null
  })
} 