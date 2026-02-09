/*
  # Create Leaderboard Users Table

  1. New Tables
    - `leaderboard_users`
      - `id` (uuid, primary key) - Unique user identifier
      - `username` (text) - User's display name
      - `xp` (integer) - Total experience points
      - `level` (integer) - User's current level
      - `avatar_url` (text) - URL to user's avatar image
      - `weekly_xp` (integer) - XP earned this week
      - `rank` (integer) - Current ranking position
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `leaderboard_users` table
    - Add policy for public read access (leaderboard is public)
    - Add policy for authenticated users to update their own data
*/

CREATE TABLE IF NOT EXISTS leaderboard_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  xp integer DEFAULT 0,
  level integer DEFAULT 1,
  avatar_url text DEFAULT '',
  weekly_xp integer DEFAULT 0,
  rank integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leaderboard_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view leaderboard"
  ON leaderboard_users
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own data"
  ON leaderboard_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON leaderboard_users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE INDEX IF NOT EXISTS idx_leaderboard_weekly_xp ON leaderboard_users(weekly_xp DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_rank ON leaderboard_users(rank ASC);