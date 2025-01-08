-- Drop triggers primeiro
DROP TRIGGER IF EXISTS trigger_create_client_root_unit ON "Entity";
DROP TRIGGER IF EXISTS trigger_set_entity_id ON "Entity";

-- Drop funções depois
DROP FUNCTION IF EXISTS create_client_root_unit();
DROP FUNCTION IF EXISTS set_entity_id();
DROP FUNCTION IF EXISTS generate_entity_id(TEXT, "ContextType");

-- Função existente para gerar IDs de entidades
CREATE OR REPLACE FUNCTION generate_entity_id(name TEXT, entity_type "ContextType")
RETURNS TEXT AS $$
DECLARE
    type_str TEXT;
BEGIN
    type_str := entity_type::TEXT;
    RETURN UPPER(
        SUBSTRING(name, 1, 2) || 
        SUBSTRING(MD5(RANDOM()::TEXT), 1, 5) || 
        LEFT(type_str, 1)
    );
END;
$$ LANGUAGE plpgsql;

-- Função existente para setar o ID da entidade
CREATE OR REPLACE FUNCTION set_entity_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.id = generate_entity_id(NEW.name, NEW.type);
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger existente para setar o ID da entidade
CREATE TRIGGER trigger_set_entity_id
  BEFORE INSERT ON "Entity"
  FOR EACH ROW
  EXECUTE FUNCTION set_entity_id();

-- Nova função para criar a unidade organizacional root
CREATE OR REPLACE FUNCTION create_client_root_unit()
RETURNS TRIGGER AS $$
DECLARE
    unit_id TEXT;
    node_name_id TEXT;
BEGIN
  IF NEW.type = 'CLIENT' THEN
    -- Gera um ID para a unidade organizacional
    unit_id := UPPER(
        SUBSTRING(NEW.name, 1, 2) || 
        SUBSTRING(MD5(RANDOM()::TEXT), 1, 5) || 
        'U'  -- U de Unit
    );

    -- Gera um ID para o node_name
    node_name_id := UPPER(
        SUBSTRING(NEW.name, 1, 2) || 
        SUBSTRING(MD5(RANDOM()::TEXT), 1, 5) || 
        'N'  -- N de Node
    );
    
    -- Insere o node_name
    INSERT INTO node_names (
      id,
      name,
      client_id,
      created_at,
      updated_at
    ) VALUES (
      node_name_id,
      NEW.name,
      NEW.id,
      NOW(),
      NOW()
    );
    
    -- Insere a unidade organizacional
    INSERT INTO organizational_units (
      id,
      client_id,
      name,
      type,
      depth,
      order_index,
      is_active,
      node_name_id,
      created_at,
      updated_at
    ) VALUES (
      unit_id,
      NEW.id,
      NEW.name,
      'ROOT',
      0,
      0,
      true,
      node_name_id,
      NOW(),
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Novo trigger para criar a unidade organizacional root
CREATE TRIGGER trigger_create_client_root_unit
  AFTER INSERT ON "Entity"
  FOR EACH ROW
  EXECUTE FUNCTION create_client_root_unit(); 