/*
  # Create templates table

  1. New Tables
    - `templates`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users.id)
      - `name` (text, template name)
      - `content` (text, template content)
      - `category` (enum, template category)
      - `is_public` (boolean, whether template is public)
      - `usage_count` (integer, how many times used)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `templates` table
    - Add policies for users to manage their own templates
    - Add policy for reading public templates
*/

CREATE TYPE template_category AS ENUM ('announcement', 'question', 'story', 'tip', 'custom');

CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  content text NOT NULL,
  category template_category DEFAULT 'custom',
  is_public boolean DEFAULT false,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own templates"
  ON templates
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read public templates"
  ON templates
  FOR SELECT
  TO authenticated
  USING (is_public = true);

CREATE POLICY "Users can insert own templates"
  ON templates
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates"
  ON templates
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
  ON templates
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger to automatically update updated_at
CREATE OR REPLACE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment template usage count
CREATE OR REPLACE FUNCTION increment_template_usage(template_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE templates
  SET usage_count = usage_count + 1,
      updated_at = now()
  WHERE id = template_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;