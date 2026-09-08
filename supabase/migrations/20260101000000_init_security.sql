-- Create admin_users table for authorization
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admins can read the admin_users table
CREATE POLICY "Admins can view admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users a WHERE a.user_id = auth.uid() AND a.role = 'admin'
  )
);

-- Create portfolio_data table if it doesn't exist
CREATE TABLE IF NOT EXISTS portfolio_data (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  payload JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on portfolio_data
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- Only admins can read the raw portfolio_data (which contains drafts/hidden items)
CREATE POLICY "Admins can read raw portfolio_data"
ON portfolio_data FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Only admins can insert/update portfolio_data
CREATE POLICY "Admins can write portfolio_data"
ON portfolio_data FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create a secure view for public consumption that strips out drafts and hidden projects
CREATE OR REPLACE VIEW public_portfolio_data AS
SELECT 
  id, 
  jsonb_set(
    jsonb_set(
      payload, 
      '{blogPosts}', 
      COALESCE(
        (SELECT jsonb_agg(post) 
         FROM jsonb_array_elements(
           CASE 
             WHEN payload->'blogPosts' IS NULL OR jsonb_typeof(payload->'blogPosts') != 'array' THEN '[]'::jsonb 
             ELSE payload->'blogPosts' 
           END
         ) post 
         WHERE (post->>'published')::boolean = true), 
        '[]'::jsonb
      )
    ),
    '{projects}',
    COALESCE(
      (SELECT jsonb_agg(proj) 
       FROM jsonb_array_elements(
         CASE 
           WHEN payload->'projects' IS NULL OR jsonb_typeof(payload->'projects') != 'array' THEN '[]'::jsonb 
           ELSE payload->'projects' 
         END
       ) proj 
       WHERE (proj->>'visible')::boolean = true), 
      '[]'::jsonb
    )
  ) AS payload,
  updated_at
FROM portfolio_data;

-- Grant public read access to the secure view
GRANT SELECT ON public_portfolio_data TO anon, authenticated;

-- First Admin Setup Instructions (Manual Execution Required)
/*
To set up the first admin user:
1. Go to Supabase Authentication -> Users and create a user (or let them sign up if enabled).
2. Copy their user UUID.
3. Run this SQL command manually:

INSERT INTO admin_users (user_id, role)
VALUES ('<PASTE_UUID_HERE>', 'admin');
*/
