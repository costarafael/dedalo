-- Drop dos triggers e funções existentes
DROP TRIGGER IF EXISTS node_trigger ON node_names;
DROP FUNCTION IF EXISTS manage_node();

-- Adiciona coluna is_root se não existir
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'node_names' 
    AND column_name = 'is_root'
  ) THEN
    ALTER TABLE node_names ADD COLUMN is_root boolean DEFAULT false;
  END IF;
END $$;

-- Adiciona constraint unique para garantir apenas um root por cliente
DROP INDEX IF EXISTS unique_client_root;
CREATE UNIQUE INDEX unique_client_root 
  ON node_names (client_id)
  WHERE is_root = true AND deleted_at IS NULL;

-- Função para gerenciar nodes
CREATE OR REPLACE FUNCTION manage_node()
RETURNS TRIGGER AS $$
DECLARE
  v_has_nodes BOOLEAN;
BEGIN
  -- Verifica se é o primeiro node do cliente
  IF TG_OP = 'INSERT' THEN
    SELECT EXISTS (
      SELECT 1 
      FROM node_names n 
      WHERE n.client_id = NEW.client_id 
        AND n.deleted_at IS NULL
    ) INTO v_has_nodes;

    -- Se for o primeiro node, força ser root
    IF NOT v_has_nodes THEN
      NEW.is_root := true;
      NEW."order" := 0;
      NEW."validationType" := 'STRICT';
      NEW.is_required := true;
    END IF;
  END IF;

  -- Impede alteração do status root
  IF TG_OP = 'UPDATE' THEN
    IF OLD.is_root <> NEW.is_root THEN
      RAISE EXCEPTION 'Não é permitido alterar o status root de um node';
    END IF;
    
    -- Mantém ordem 0 para root
    IF OLD.is_root AND NEW."order" != 0 THEN
      NEW."order" := 0;
    END IF;
  END IF;

  -- Para nodes não-root, define ordem se necessário
  IF NOT NEW.is_root AND (NEW."order" IS NULL OR NEW."order" <= 0) THEN
    SELECT COALESCE(MAX(n."order"), 0) + 1
    INTO NEW."order"
    FROM node_names n
    WHERE n.client_id = NEW.client_id
      AND NOT n.is_root
      AND n.deleted_at IS NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para executar antes de inserir ou atualizar
CREATE TRIGGER node_trigger
  BEFORE INSERT OR UPDATE
  ON node_names
  FOR EACH ROW
  EXECUTE FUNCTION manage_node(); 