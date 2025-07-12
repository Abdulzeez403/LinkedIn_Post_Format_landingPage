/*
  # Create analytics table

  1. New Tables
    - `analytics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users.id)
      - `post_id` (text, LinkedIn post identifier)
      - `engagement_metrics` (jsonb, engagement data)
      - `formatting_used` (text[], array of formatting types used)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `analytics` table
    - Add policies for users to manage their own analytics
*/

CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id text NOT NULL,
  engagement_metrics jsonb DEFAULT '{
    "likes": 0,
    "comments": 0,
    "shares": 0,
    "views": 0
  }'::jsonb,
  formatting_used text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own analytics"
  ON analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics"
  ON analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics"
  ON analytics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS analytics_user_id_idx ON analytics(user_id);
CREATE INDEX IF NOT EXISTS analytics_post_id_idx ON analytics(post_id);
CREATE INDEX IF NOT EXISTS analytics_created_at_idx ON analytics(created_at);
CREATE INDEX IF NOT EXISTS templates_user_id_idx ON templates(user_id);
CREATE INDEX IF NOT EXISTS templates_category_idx ON templates(category);
CREATE INDEX IF NOT EXISTS templates_is_public_idx ON templates(is_public);