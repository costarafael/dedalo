# Arquitetura Backend Core

Este documento descreve a arquitetura e padrões utilizados na implementação do backend em `/core`.

## Estrutura de Diretórios

```
/src/lib/core/
├── interfaces/           # Tipos, interfaces e constantes
│   ├── index.ts         # Export central
│   └── repository.interfaces.ts
├── repositories/        # Implementações dos repositories
│   ├── index.ts        # Export central
│   ├── client.repository.ts
│   ├── unit.repository.ts
│   └── ...
└── services/           # Regras de negócio complexas
    └── ...
```

## Padrão Repository

### Interface Base
Todo repository implementa uma interface base que estende `IBaseRepository`:

```typescript
export interface IBaseRepository<T, CreateDTO = any, UpdateDTO = Partial<T>> {
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(data: CreateDTO): Promise<T>
  update(id: string, data: UpdateDTO): Promise<T>
  delete(id: string): Promise<void>
}

// Exemplo de interface específica
export interface IClientRepository extends IBaseRepository<Entity> {
  findActive(): Promise<Entity[]>
}
```

### Implementação Padrão

```typescript
export class EntityRepository implements IEntityRepository {
  // Métodos base
  async findAll(): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .from(TABLES.ENTITY)
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  // Métodos específicos
  async findActive(): Promise<Entity[]> {
    const supabase = getBrowserClient()
    const { data, error } = await supabase
      .select('*')
      .eq('status', 'ACTIVE')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}
```

## Convenções e Padrões

### 1. Tipagem e Interfaces

#### 1.1 Definição de Tipos
```typescript
// Tipos base do Supabase
type Tables = Database['public']['Tables']

// Tipos específicos por tabela
export type EntityRow = Tables['entity']['Row']
export type EntityInsert = Tables['entity']['Insert']
export type EntityUpdate = Tables['entity']['Update']

// Interface de negócio
export interface Entity extends EntityRow {
  // Campos adicionais específicos
}
```

#### 1.2 Constantes e Enums
```typescript
export const TABLES = {
  ENTITY: 'entity',
  ORGANIZATIONAL_UNITS: 'organizational_units'
} as const

export const CONTEXT_TYPES = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT'
} as const

export type ContextType = typeof CONTEXT_TYPES[keyof typeof CONTEXT_TYPES]
```

### 2. Interação com Banco de Dados

#### 2.1 Cliente Supabase
```typescript
import { getBrowserClient } from '@/lib/database/supabase'

// Sempre instanciar no início do método
const supabase = getBrowserClient()
```

#### 2.2 Queries Padrão
```typescript
// Select com joins
const { data, error } = await supabase
  .from(TABLES.MODULES)
  .select(`
    *,
    module_instances!inner(*),
    module_components(*)
  `)
  .eq('client_id', clientId)
  .is('deleted_at', null)

// Insert com retorno
const { data, error } = await supabase
  .from(TABLES.ENTITY)
  .insert(insertData)
  .select()
  .single()

// Update com condições
const { error } = await supabase
  .from(TABLES.ENTITY)
  .update(updateData)
  .eq('id', id)
  .eq('type', CONTEXT_TYPES.CLIENT)
```

### 3. Validações e Regras de Negócio

#### 3.1 Validações de Unicidade
```typescript
async validateUniqueName(name: string, excludeId?: string): Promise<void> {
  const supabase = getBrowserClient()
  const query = supabase
    .from(TABLES.ENTITY)
    .select('*')
    .eq('name', name)
    .eq('type', CONTEXT_TYPES.CLIENT)
    .is('deleted_at', null)

  if (excludeId) {
    query.neq('id', excludeId)
  }

  const { data: existing } = await query.maybeSingle()
  if (existing) {
    throw new Error("Já existe um registro com este nome")
  }
}
```

#### 3.2 Validações Hierárquicas
```typescript
async validateRootUnit(clientId: string): Promise<void> {
  const existing = await this.findRootUnit(clientId)
  if (existing) {
    throw new Error("Já existe uma unidade root para este cliente")
  }
}
```

### 4. Gestão de Estado

#### 4.1 Soft Delete
```typescript
async delete(id: string): Promise<void> {
  const supabase = getBrowserClient()
  const { error } = await supabase
    .from(TABLES.ENTITY)
    .update({
      is_active: false,
      status: 'INACTIVE',
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) throw error
}
```

#### 4.2 Timestamps e Metadados
```typescript
const now = new Date().toISOString()
const insertData = {
  ...data,
  created_at: now,
  updated_at: now,
  deleted_at: null,
  metadata: data.metadata || {},
  is_active: true
}
```

## Padrões Específicos por Entidade

### 1. Clientes (Entity)

#### 1.1 Estrutura
```typescript
interface Entity {
  id: string
  name: string
  type: ContextType
  status: string
  is_active: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  metadata: Json
}
```

#### 1.2 Regras Específicas
- Nome único por tipo de entidade
- Status gerenciado (ACTIVE/INACTIVE)
- Tipo imutável após criação

### 2. Unidades Organizacionais

#### 2.1 Estrutura
```typescript
interface OrganizationalUnit {
  id: string
  client_id: string
  name: string
  node_name_id: string
  type: NodeType
  depth: number
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  metadata: Json
  full_path: string | null
}
```

#### 2.2 Regras Específicas
- Uma única unidade ROOT por cliente
- Hierarquia mantida via full_path
- Profundidade calculada automaticamente

### 3. Módulos

#### 3.1 Estrutura
```typescript
interface Module {
  id: string
  name: string
  version: number
  is_library: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  metadata: Json
}

interface ModuleInstance {
  id: string
  module_id: string
  client_id: string
  config: Json
  is_active: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  metadata: Json
}
```

#### 3.2 Regras Específicas
- Versionamento incremental
- Configuração por instância
- Dependências gerenciadas

## Boas Práticas

### 1. Organização do Código

#### 1.1 Estrutura de Arquivos
```typescript
// imports
import { ... } from '../interfaces'

// tipos e interfaces locais
interface LocalInterface { ... }

// implementação da classe
export class Repository { ... }
```

#### 1.2 Ordem dos Métodos
1. Métodos de busca (find*)
2. Métodos de criação/atualização
3. Métodos de deleção
4. Métodos auxiliares privados

### 2. Performance

#### 2.1 Otimização de Queries
```typescript
// Selecionar apenas campos necessários
.select('id, name, status')

// Usar índices em filtros
.eq('indexed_field', value)

// Limitar resultados quando apropriado
.limit(20)
```

#### 2.2 Joins Eficientes
```typescript
// Preferir joins específicos
.select(`
  id,
  name,
  module_components(id, name)
`)

// Usar inner joins quando possível
.select(`
  *,
  instances!inner(*)
`)
```

### 3. Tratamento de Erros

#### 3.1 Erros de Banco
```typescript
if (error) {
  console.error('Database error:', error)
  throw error
}
```

#### 3.2 Erros de Negócio
```typescript
if (invalidCondition) {
  throw new Error("Mensagem clara em português")
}
```

## Testes

### 1. Estrutura de Testes
```typescript
describe('ClientRepository', () => {
  describe('findAll', () => {
    it('should return only active clients')
    it('should order by created_at desc')
  })
})
```

### 2. Mocks e Fixtures
```typescript
const mockClient = {
  id: '123',
  name: 'Test Client',
  type: CONTEXT_TYPES.CLIENT
}
``` 