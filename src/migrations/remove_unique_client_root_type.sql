-- Listar todos os índices na tabela
SELECT schemaname, tablename, indexname, indexdef
FROM pg_indexes
WHERE tablename = 'organizational_units';

-- Remover as restrições antigas
DROP INDEX IF EXISTS unique_client_root_type;
DROP INDEX IF EXISTS organizational_units_name_client_id_key;

-- Criar nova restrição apenas para ROOT
DROP INDEX IF EXISTS unique_client_root;
CREATE UNIQUE INDEX unique_client_root 
ON organizational_units (client_id, type) 
WHERE type = 'ROOT' AND deleted_at IS NULL AND is_active = true; 