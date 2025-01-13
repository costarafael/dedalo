# Core

Esta pasta contém a camada central da aplicação, responsável pela lógica de negócios e abstração do acesso a dados.

## Estrutura

```
/core
  /interfaces      # Interfaces e tipos
  /repositories    # Implementações dos repositórios
  /validators      # Validadores de regras de negócio
```

## Repositories

Os repositórios são responsáveis por abstrair o acesso aos dados, utilizando serviços HTTP para comunicação com o backend. Cada repositório implementa uma interface definida em `/interfaces`.

### Características

- Implementam interfaces definidas em `/interfaces`
- Utilizam serviços HTTP da pasta `/lib/http/services`
- Não possuem lógica de negócio complexa (movida para o backend)
- Retornam tipos fortemente tipados

### Repositórios Disponíveis

- `ClientRepository`: Gerenciamento de clientes
- `NodeRepository`: Gerenciamento de nós
- `NodeHierarchyRepository`: Gerenciamento de hierarquias de nós
- `UnitRepository`: Gerenciamento de unidades organizacionais
- `UnitHierarchyRepository`: Gerenciamento de hierarquias de unidades
- `UnitContainerRepository`: Gerenciamento de containers de unidades

## Interfaces

As interfaces definem os contratos que os repositórios devem implementar e os tipos de dados utilizados.

### Principais Interfaces

- `IClientRepository`
- `INodeRepository`
- `INodeHierarchyRepository`
- `IUnitRepository`
- `IUnitHierarchyRepository`
- `IUnitContainerRepository`

### Tipos

- `Entity`: Base para entidades
- `Client`: Cliente
- `NodeName`: Nó
- `NodeHierarchyRule`: Regra de hierarquia de nós
- `OrganizationalUnit`: Unidade organizacional
- `UnitHierarchy`: Hierarquia de unidades
- `UnitContainer`: Container de unidades
- `UnitContainerItem`: Item de container

## Uso

```typescript
// Exemplo de uso de um repositório
const unitRepo = new UnitRepository()

// Buscar todas as unidades
const units = await unitRepo.findAll()

// Criar uma nova unidade
const newUnit = await unitRepo.create({
  name: 'Nova Unidade',
  client_id: 'client-123',
  node_name_id: 'node-456'
})

// Atualizar uma unidade
const updatedUnit = await unitRepo.update('unit-789', {
  name: 'Unidade Atualizada'
})

// Deletar uma unidade
await unitRepo.delete('unit-789')
```

## Integração com React Query

Os repositórios são utilizados pelos serviços HTTP que fornecem hooks do React Query para gerenciamento de estado e cache:

```typescript
// Exemplo de uso dos hooks
const { data: units } = useUnits()
const { data: unit } = useUnit(id)
const { mutate: createUnit } = useCreateUnit()
const { mutate: updateUnit } = useUpdateUnit()
const { mutate: deleteUnit } = useDeleteUnit()
```

## Validações

As validações de regras de negócio foram movidas para o backend, mas os repositórios ainda fornecem métodos para validar operações específicas:

```typescript
// Exemplo de validação
const isValid = await nodeHierarchyRepo.validateRule(parentId, childId)
``` 