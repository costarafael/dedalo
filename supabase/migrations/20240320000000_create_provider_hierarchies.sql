-- Remover tabelas e políticas existentes
drop policy if exists "Provider hierarchies são visíveis para usuários autenticados" on public.provider_hierarchies;
drop policy if exists "Usuários autenticados podem inserir provider hierarchies" on public.provider_hierarchies;
drop policy if exists "Usuários autenticados podem atualizar provider hierarchies" on public.provider_hierarchies;
drop policy if exists "Usuários autenticados podem deletar provider hierarchies" on public.provider_hierarchies;
drop policy if exists "Acesso total para usuários autenticados" on public.provider_hierarchies;

-- Remover índices existentes
drop index if exists public.provider_hierarchies_provider_id_idx;
drop index if exists public.provider_hierarchies_client_id_idx;
drop index if exists public.provider_hierarchies_parent_provider_id_idx;
drop index if exists public.provider_hierarchies_root_provider_id_idx;
drop index if exists public.provider_hierarchies_hierarchy_path_idx;
drop index if exists public.provider_hierarchies_is_active_idx;
drop index if exists public.provider_hierarchies_level_idx;
drop index if exists public.provider_hierarchies_version_idx;
drop index if exists public.provider_hierarchies_valid_from_valid_to_idx;

-- Remover constraints existentes
alter table if exists public.provider_hierarchies 
  drop constraint if exists provider_hierarchies_client_id_fkey,
  drop constraint if exists provider_hierarchies_provider_id_fkey,
  drop constraint if exists provider_hierarchies_parent_provider_id_fkey,
  drop constraint if exists provider_hierarchies_root_provider_id_fkey,
  drop constraint if exists provider_hierarchies_client_or_parent_check,
  drop constraint if exists provider_hierarchies_client_id_provider_id_parent_provider_id_key;

-- Remover tabela
drop table if exists public.provider_hierarchies cascade;
drop table if exists public.provider_hierarchy_cache cascade;
drop table if exists public.provider_hierarchy_history cascade;
drop table if exists public.provider_hierarchy_rules cascade;

-- Criar nova tabela
create table if not exists public.provider_hierarchies (
  id text primary key default gen_random_uuid()::text,
  provider_id text not null references public."Entity"(id),
  client_id text references public."Entity"(id),
  parent_provider_id text references public."Entity"(id),
  root_provider_id text references public."Entity"(id),
  is_active boolean default true,
  version integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone,
  metadata jsonb,
  hierarchy_path text[] default array[]::text[],
  level integer default 1,
  valid_from timestamp with time zone default timezone('utc'::text, now()),
  valid_to timestamp with time zone,
  constraint provider_hierarchies_client_or_parent_check check (
    (client_id is not null and parent_provider_id is null) or
    (client_id is null and parent_provider_id is not null)
  ),
  constraint provider_hierarchies_client_id_provider_id_parent_provider_id_key unique (client_id, provider_id, parent_provider_id)
);

-- Criar tabela de cache
create table if not exists public.provider_hierarchy_cache (
  id text primary key default gen_random_uuid()::text,
  hierarchy_id text not null references public.provider_hierarchies(id),
  depth integer not null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar tabela de histórico
create table if not exists public.provider_hierarchy_history (
  id text primary key default gen_random_uuid()::text,
  hierarchy_id text not null references public.provider_hierarchies(id),
  version integer not null,
  changed_by text references public.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  metadata jsonb
);

-- Criar tabela de regras
create table if not exists public.provider_hierarchy_rules (
  id text primary key default gen_random_uuid()::text,
  client_id text references public."Entity"(id),
  is_active boolean default true,
  priority integer default 0,
  validation_type text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone
);

-- Índices
create index if not exists provider_hierarchies_provider_id_idx on public.provider_hierarchies(provider_id);
create index if not exists provider_hierarchies_client_id_idx on public.provider_hierarchies(client_id);
create index if not exists provider_hierarchies_parent_provider_id_idx on public.provider_hierarchies(parent_provider_id);
create index if not exists provider_hierarchies_root_provider_id_idx on public.provider_hierarchies(root_provider_id);
create index if not exists provider_hierarchies_hierarchy_path_idx on public.provider_hierarchies(hierarchy_path);
create index if not exists provider_hierarchies_is_active_idx on public.provider_hierarchies(is_active);
create index if not exists provider_hierarchies_level_idx on public.provider_hierarchies(level);
create index if not exists provider_hierarchies_version_idx on public.provider_hierarchies(version);
create index if not exists provider_hierarchies_valid_from_valid_to_idx on public.provider_hierarchies(valid_from, valid_to);

create index if not exists provider_hierarchy_cache_depth_idx on public.provider_hierarchy_cache(depth);
create unique index if not exists provider_hierarchy_cache_hierarchy_id_key on public.provider_hierarchy_cache(hierarchy_id);

create index if not exists provider_hierarchy_history_changed_by_idx on public.provider_hierarchy_history(changed_by);
create index if not exists provider_hierarchy_history_created_at_idx on public.provider_hierarchy_history(created_at);
create index if not exists provider_hierarchy_history_hierarchy_id_idx on public.provider_hierarchy_history(hierarchy_id);
create index if not exists provider_hierarchy_history_version_idx on public.provider_hierarchy_history(version);

create index if not exists provider_hierarchy_rules_client_id_idx on public.provider_hierarchy_rules(client_id);
create index if not exists provider_hierarchy_rules_is_active_idx on public.provider_hierarchy_rules(is_active);
create index if not exists provider_hierarchy_rules_priority_idx on public.provider_hierarchy_rules(priority);

-- Desabilitar RLS
alter table public.provider_hierarchies disable row level security;
alter table public.provider_hierarchy_cache disable row level security;
alter table public.provider_hierarchy_history disable row level security;
alter table public.provider_hierarchy_rules disable row level security; 