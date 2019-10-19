CREATE OR REPLACE FUNCTION autoset_update_col()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated = now();
   RETURN NEW;
END;
$$ language 'plpgsql';