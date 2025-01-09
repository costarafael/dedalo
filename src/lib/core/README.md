# Core Library

Esta biblioteca contém a implementação core do sistema, seguindo princípios de Clean Architecture e SOLID.

## Estrutura

```
/core
  /interfaces        # Contratos e tipos
  /repositories     # Acesso a dados
  /services        # Regras de negócio
```

## Padrões

### Repositories

- Responsáveis pelo acesso a dados
- Implementam operações CRUD básicas
- Não contêm regras de negócio
- Nomenclatura: `*.repository.ts`

### Services

- Implementam regras de negócio
- Recebem repositories como dependências
- Validam operações
- Nomenclatura: `*.service.ts`

### Interfaces

- Definem contratos entre camadas
- Garantem desacoplamento
- Facilitam testes unitários

## Uso

```typescript
// Instanciando repositories e services
const repository = new ClientRepository()
const service = new ClientService(repository)

// Usando o service
const client = await service.getById('123')
```

## Boas Práticas

1. Sempre use interfaces para definir contratos
2. Mantenha repositories focados em acesso a dados
3. Implemente regras de negócio nos services
4. Use injeção de dependências
5. Mantenha as camadas desacopladas
6. Documente interfaces e tipos importantes 