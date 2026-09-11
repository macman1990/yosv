CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 160),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 320),
  phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 40),
  project_type TEXT CHECK (project_type IS NULL OR char_length(project_type) <= 160),
  budget TEXT CHECK (budget IS NULL OR char_length(budget) <= 80),
  timeline TEXT CHECK (timeline IS NULL OR char_length(timeline) <= 160),
  brief_url TEXT CHECK (brief_url IS NULL OR char_length(brief_url) <= 2048),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 5000),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'ar')),
  source TEXT NOT NULL DEFAULT 'portfolio' CHECK (source = 'portfolio')
);

ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.project_inquiries FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.project_inquiries TO anon, authenticated;
GRANT SELECT, UPDATE ON TABLE public.project_inquiries TO authenticated;

CREATE POLICY "Public portfolio can submit inquiries"
ON public.project_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND source = 'portfolio'
  AND char_length(name) BETWEEN 1 AND 160
  AND char_length(email) BETWEEN 3 AND 320
  AND char_length(message) BETWEEN 1 AND 5000
);

CREATE POLICY "Admins can read project inquiries"
ON public.project_inquiries FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
  )
);

CREATE POLICY "Admins can update project inquiry status"
ON public.project_inquiries FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
  )
)
WITH CHECK (
  status IN ('new', 'read', 'replied', 'archived')
);
