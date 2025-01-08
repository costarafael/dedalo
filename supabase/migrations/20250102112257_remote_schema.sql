-- Cria a tabela Entity
CREATE TABLE IF NOT EXISTS "Entity" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type "ContextType",
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Função para gerar IDs de entidade
CREATE OR REPLACE FUNCTION generate_entity_id(name TEXT, entity_type TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN UPPER(
    SUBSTRING(name, 1, 2) || 
    SUBSTRING(MD5(RANDOM()::TEXT), 1, 5) || 
    LEFT(entity_type, 1)
  );
END;
$$ LANGUAGE plpgsql;

-- Função para criar um cliente
CREATE OR REPLACE FUNCTION create_client(p_name TEXT)
RETURNS "Entity" AS $$
DECLARE
  v_id TEXT;
  v_entity "Entity";
BEGIN
  -- Gera o ID do cliente
  v_id := generate_entity_id(p_name, 'CLIENT');
  
  -- Insere o cliente
  INSERT INTO "Entity" (id, name, type, created_at, updated_at)
  VALUES (v_id, p_name, 'CLIENT', NOW(), NOW())
  RETURNING * INTO v_entity;
  
  RETURN v_entity;
END;
$$ LANGUAGE plpgsql;

-- Função do trigger para setar ID e updated_at
CREATE OR REPLACE FUNCTION set_entity_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.id = generate_entity_id(NEW.name, NEW.type);
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar o ID automaticamente
CREATE TRIGGER trigger_set_entity_id
  BEFORE INSERT ON "Entity"
  FOR EACH ROW
  EXECUTE FUNCTION set_entity_id();
