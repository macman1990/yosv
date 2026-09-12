-- Expose only fields required by the public portfolio.
-- Private inbox, analytics, and inquiry data remain in portfolio_data.
CREATE OR REPLACE VIEW public.public_portfolio_data AS
WITH public_payload AS (
  SELECT
    id,
    jsonb_build_object(
      'profile', payload->'profile',
      'projects', payload->'projects',
      'categories', payload->'categories',
      'services', payload->'services',
      'servicePackages', payload->'servicePackages',
      'skills', payload->'skills',
      'tools', payload->'tools',
      'experience', payload->'experience',
      'education', payload->'education',
      'certifications', payload->'certifications',
      'testimonials', payload->'testimonials',
      'stats', payload->'stats',
      'contentItems', payload->'contentItems',
      'blogPosts', payload->'blogPosts',
      'blogCategories', payload->'blogCategories',
      'socialLinks', payload->'socialLinks',
      'siteFeatures', payload->'siteFeatures',
      'clientLogos', payload->'clientLogos',
      'availability', payload->'availability',
      'customSections', payload->'customSections',
      'pages', payload->'pages',
      'media', payload->'media',
      'navItems', payload->'navItems',
      'sectionOrder', payload->'sectionOrder',
      'appearance', payload->'appearance',
      'seo', payload->'seo',
      'contact', payload->'contact'
    ) AS payload,
    updated_at
  FROM public.portfolio_data
)
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
FROM public_payload;

GRANT SELECT ON public.public_portfolio_data TO anon, authenticated;
