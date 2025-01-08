import type { ColumnSort, Column } from "@tanstack/react-table"

declare global {
  interface Window {
    msw?: boolean
  }
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type StringKeyOf<TData> = Extract<keyof TData, string>

export type ColumnType = "text" | "number" | "date" | "boolean" | "select" | "multi-select"

export type FilterOperator =
  | "equals"
  | "not-equals"
  | "greater-than"
  | "greater-than-or-equals"
  | "less-than"
  | "less-than-or-equals"
  | "contains"
  | "not-contains"
  | "starts-with"
  | "ends-with"
  | "is-empty"
  | "is-not-empty"
  | "iLike"
  | "notILike"
  | "eq"
  | "ne"
  | "isEmpty"
  | "isNotEmpty"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "isBetween"
  | "isRelativeToToday"

export type JoinOperator = "and" | "or"

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface DataTableFilterableColumn<TData> {
  id: StringKeyOf<TData>
  title: string
  options: Option[]
}

export interface DataTableSearchableColumn<TData> {
  id: string
  title: string
}

export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>
  label: string
  placeholder?: string
  options?: Option[]
}

export interface DataTableAdvancedFilterField<TData> {
  id: keyof TData
  label: string
  type: "text" | "number" | "date" | "select"
  options?: {
    label: string
    value: string
  }[]
}export interface Filter<TData> {
  id: string
  field: keyof TData
  value: string | string[]
  operator: FilterOperator
}

export type ExtendedColumnSort<TData> = ColumnSort & {
  id: StringKeyOf<TData>
}

export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[]

export interface AdvancedFilter {
  id: string
  value: string | string[]
  operator: FilterOperator
  type?: ColumnType
}

// Base enums
export enum FieldType {
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  PASSWORD = 'PASSWORD',
  EMAIL = 'EMAIL',
  URL = 'URL',
  NUMBER = 'NUMBER',
  RATING = 'RATING',
  SELECT = 'SELECT',
  MULTISELECT = 'MULTISELECT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
  TIME = 'TIME',
  DATETIME = 'DATETIME',
  DATE_RANGE = 'DATE_RANGE',
  PHONE = 'PHONE',
  TEL = 'TEL',
  FILE = 'FILE',
  MULTIFILE = 'MULTIFILE',
  COLOR = 'COLOR',
  CPF = 'CPF',
  CNPJ = 'CNPJ',
  SWITCH = 'SWITCH'
}

// Model interfaces
interface RecordTemplate {
  id: string;
  moduleId: string;
  version: number;
  name: string;
  description?: string;
  slug: string;
  isActive: boolean;
  deletedAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  records?: AppRecord[];
  values?: RecordValue[];
  fields?: TemplateField[];
}

export interface AppRecord {
  id: string;
  templateId: string;
  version: number;
  name: string;
  email: string;
  status: string;
  type: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isActive: boolean;
  template: RecordTemplate;
  values?: RecordValue[];
}

interface RecordValue {
  id: string;
  recordId: string;
  fieldId: string;
  value: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isActive: boolean;
  moduleId?: string;
  templateId: string;

  // Relations
  field: TemplateField;
  record: AppRecord;
  template: RecordTemplate;
}

interface TemplateField {
  id: string;
  templateId: string;
  label: string;
  type: FieldType;
  order: number;
  isRequired: boolean;
  isUnique: boolean;
  config: Record<string, any>;
  validation?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isActive: boolean;

  // Relations
  values?: RecordValue[];
  template: RecordTemplate;
}

export type {
  RecordTemplate,
  RecordValue,
  TemplateField
}

