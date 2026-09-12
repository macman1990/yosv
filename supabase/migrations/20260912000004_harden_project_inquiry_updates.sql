-- Limit authenticated inquiry updates to the workflow status column.
-- Existing rows and row-level admin policies remain unchanged.
REVOKE UPDATE ON TABLE public.project_inquiries FROM authenticated;
GRANT UPDATE (status) ON TABLE public.project_inquiries TO authenticated;
