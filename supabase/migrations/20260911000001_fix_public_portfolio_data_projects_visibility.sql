CREATE OR REPLACE VIEW public.public_portfolio_data AS
SELECT 
  id,
  jsonb_set(
    jsonb_set(
      jsonb_set(
        payload,
        '{blogPosts}',
        COALESCE(
          (
            SELECT jsonb_agg(post.value)
            FROM jsonb_array_elements(
              CASE
                WHEN payload->'blogPosts' IS NULL OR jsonb_typeof(payload->'blogPosts') != 'array' THEN '[]'::jsonb
                ELSE payload->'blogPosts'
              END
            ) AS post(value)
            WHERE (post.value->>'published')::boolean = true
          ),
          '[]'::jsonb
        )
      ),
      '{projects}',
      COALESCE(
        (
          SELECT jsonb_agg(proj.value)
          FROM jsonb_array_elements(
            CASE
              WHEN payload->'projects' IS NULL OR jsonb_typeof(payload->'projects') != 'array' THEN '[]'::jsonb
              ELSE payload->'projects'
            END
          ) AS proj(value)
          WHERE (proj.value->>'status') = 'published'
             OR COALESCE((proj.value->>'visible')::boolean, false) = true
        ),
        '[]'::jsonb
      )
    ),
    '{testimonials}',
    COALESCE(
      (
        SELECT jsonb_agg(testimonial.value)
        FROM jsonb_array_elements(
          CASE
            WHEN payload->'testimonials' IS NULL OR jsonb_typeof(payload->'testimonials') != 'array' THEN '[]'::jsonb
            ELSE payload->'testimonials'
          END
        ) AS testimonial(value)
        WHERE (testimonial.value->>'visible')::boolean = true
      ),
      '[]'::jsonb
    )
  ) AS payload,
  updated_at
FROM portfolio_data;

GRANT SELECT ON public.public_portfolio_data TO anon, authenticated;
