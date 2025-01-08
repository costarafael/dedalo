-- Create UnitSelectionMode enum
CREATE TYPE public."UnitSelectionMode" AS ENUM ('single', 'multiple');

-- Add unit_selection_mode column to node_names
ALTER TABLE public.node_names
ADD COLUMN unit_selection_mode public."UnitSelectionMode" NOT NULL DEFAULT 'single'; 