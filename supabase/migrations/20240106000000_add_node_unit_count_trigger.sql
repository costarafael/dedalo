-- Criar função para atualizar unit_count
CREATE OR REPLACE FUNCTION update_node_unit_count() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE node_names 
        SET unit_count = (
            SELECT COUNT(*) 
            FROM organizational_units 
            WHERE node_name_id = NEW.node_name_id
        )
        WHERE id = NEW.node_name_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE node_names 
        SET unit_count = (
            SELECT COUNT(*) 
            FROM organizational_units 
            WHERE node_name_id = OLD.node_name_id
        )
        WHERE id = OLD.node_name_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.node_name_id != NEW.node_name_id THEN
        -- Atualizar contagem do node antigo
        UPDATE node_names 
        SET unit_count = (
            SELECT COUNT(*) 
            FROM organizational_units 
            WHERE node_name_id = OLD.node_name_id
        )
        WHERE id = OLD.node_name_id;
        
        -- Atualizar contagem do novo node
        UPDATE node_names 
        SET unit_count = (
            SELECT COUNT(*) 
            FROM organizational_units 
            WHERE node_name_id = NEW.node_name_id
        )
        WHERE id = NEW.node_name_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Remover trigger se existir
DROP TRIGGER IF EXISTS update_node_unit_count_trigger ON organizational_units;

-- Criar trigger
CREATE TRIGGER update_node_unit_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON organizational_units
FOR EACH ROW EXECUTE FUNCTION update_node_unit_count();

-- Atualizar contagens existentes
UPDATE node_names 
SET unit_count = (
    SELECT COUNT(*) 
    FROM organizational_units 
    WHERE node_name_id = node_names.id
); 