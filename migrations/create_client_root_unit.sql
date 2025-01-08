-- Função para criar a unidade organizacional root
CREATE OR REPLACE FUNCTION create_client_root_unit()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type = 'CLIENT' THEN
    INSERT INTO organizational_units (
      client_id,
      name,
      type,
      depth,
      order_index,
      is_active,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      NEW.name,
      'ROOT',
      0,
      0,
      true,
      NOW(),
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para executar a função após a inserção de um cliente
CREATE TRIGGER trigger_create_client_root_unit
  AFTER INSERT ON "Entity"
  FOR EACH ROW
  EXECUTE FUNCTION create_client_root_unit(); 