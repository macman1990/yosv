import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: {
      en: 'Youssef Mohamed',
      ar: 'يوسف محمد',
    },
    title: {
      en: 'Video Editor & Digital Marketing Freelancer',
      ar: 'محرر فيديو ومسوق رقمي مستقل',
    },
    shortTagline: {
      en: 'Turning raw footage and ideas into high-impact content through video editing, social media content, and digital marketing.',
      ar: 'تحويل اللقطات الخام والأفكار إلى محتوى مرئي مؤثر عبر تحرير الفيديو، ومحتوى منصات التواصل، والتسويق الرقمي.',
    },
    shortBio: {
      en: 'Freelance Video Editor and Digital Marketing specialist based in Cairo, Egypt. Experienced in short-form, long-form, and retention-driven video editing since May 2019.',
      ar: 'محرر فيديو ومسوق رقمي مستقل مقيم في القاهرة، مصر. متخصص في تحرير الفيديوهات القصيرة والمطولة والمحتوى الهادف لزيادة نسب المشاهدة منذ مايو 2019.',
    },
    longBio: {
      en: 'I help businesses, creators, and personal brands turn raw footage and ideas into content through video editing, social media content, and digital marketing. From short-form viral TikToks, Instagram Reels, and YouTube Shorts to YouTube long-form, talking-head content, and educational videos, I combine technical mastery across DaVinci Resolve, Adobe Premiere Pro, After Effects, and CapCut with visual storytelling, captions, color correction, audio cleanup, synchronization, and motion graphics.',
      ar: 'أساعد الشركات، صناع المحتوى، والعلامات التجارية الشخصية على تحويل اللقطات الخام والأفكار إلى محتوى احترافي عبر تحرير الفيديو، وصناعة محتوى منصات التواصل، والتسويق الرقمي. من المقاطع القصيرة على تيك توك وإنستغرام ريلز ويوتيوب شورتس إلى فيديوهات يوتيوب المطولة، والمحتوى الحواري والتعليمي، أدمج بين الإتقان البرمجي لأدوات دافينشي ريزولف وأدوبي بريمير برو وأفتر إفكتس وكاب كت، وبين السرد البصري، النصوص التفاعلية، معالجة الألوان، نقاء وتزامن الصوت، والمؤثرات الحركية.',
    },
    yearsExperience: 7,
    philosophy: {
      en: 'Every cut, caption, and sound element must serve the viewer’s attention and the brand’s message. Through rhythm, pacing, and clarity, raw footage becomes compelling storytelling.',
      ar: 'كل انتقال، نص توضيحي، أو عنصر صوتي يجب أن يخدم انتباه المشاهد ورسالة العلامة التجارية. عبر الإيقاع المتناسق والوضوح، تتحول اللقطات الخام إلى قصة مؤثرة تأسر المتابعين.',
    },
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    cvUrl: '#',
    contactEmail: 'unix.official.bs@gmail.com',
    whatsappNumber: '',
    location: {
      en: 'Cairo, Egypt',
      ar: 'القاهرة، مصر',
    },
    availableForWork: true,
  },

  categories: [
    { id: 'all', name: { en: 'All Disciplines', ar: 'كل الأعمال' }, order: 0, visible: true },
    { id: 'short-form', name: { en: 'Short-Form & Reels', ar: 'فيديوهات قصيرة وريلز' }, order: 1, visible: true },
    { id: 'youtube', name: { en: 'YouTube Long-Form', ar: 'يوتيوب وثائقي ومطول' }, order: 2, visible: true },
    { id: 'talking-head', name: { en: 'Talking-Head & Educational', ar: 'محتوى حواري وتعليمي' }, order: 3, visible: true },
    { id: 'motion-vfx', name: { en: 'Motion Graphics & VFX', ar: 'موشن جرافيكس ومؤثرات' }, order: 4, visible: true },
    { id: 'color-audio', name: { en: 'Color Grading & Audio Sync', ar: 'تلوين وهندسة صوتية' }, order: 5, visible: true },
  ],

  projects: [
    {
      id: 'proj-1',
      title: {
        en: 'High-Retention Vertical Video Campaign',
        ar: 'حملة فيديوهات رأسية عالية الاستبقاء',
      },
      subtitle: {
        en: 'Short-form content series engineered for TikTok, Instagram Reels, and YouTube Shorts.',
        ar: 'سلسلة محتوى رأسي مصممة لمنصات تيك توك، إنستغرام ريلز، ويوتيوب شورتس.',
      },
      description: {
        en: 'Crafted dynamic short-form videos with instant visual hooks, animated captions, sound effects, and fast-paced cutaways to maximize viewer completion rate.',
        ar: 'صناعة فيديوهات قصيرة حيوية بخطافات بصرية أولية، نصوص متحركة، مؤثرات صوتية وقطع سريع لرفع معدل إكمال المشاهدة.',
      },
      category: 'short-form',
      client: 'Content Creators & Personal Brands',
      date: '2025-10-12',
      thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=800&auto=format&fit=crop&q=80',
      previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      fullVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      videoId: 'dQw4w9WgXcQ',
      aspectRatio: '9:16',
      autoplay: false,
      muted: true,
      loop: true,
      controls: true,
      toolsUsed: ['Adobe Premiere Pro', 'CapCut', 'After Effects'],
      skills: ['Short-form content', 'TikTok', 'Instagram Reels', 'Captions & Subtitles', 'Retention-focused editing'],
      results: {
        en: 'High viewer retention • Strong engagement through synchronized visual hooks and kinetic subtitles.',
        ar: 'نسبة استبقاء عالية وتفاعل متزايد بفضل الخطافات المتزامنة والترجمات الحركية.',
      },
      tags: ['Short-Form', 'TikTok', 'Reels', 'Subtitles', 'Pacing'],
      credits: 'Edited by Youssef Mohamed',
      featured: true,
      status: 'published',
      order: 1,
      viewsCount: 38400,
      caseStudy: {
        enabled: true,
        challenge: {
          en: 'Viewers scroll away within 2 seconds if the hook does not immediately grab attention. Raw video needed tighter pacing and engaging captions.',
          ar: 'يميل المشاهد لتمرير الفيديو خلال ثانيتين إن لم تكن البداية مشوقة. كانت اللقطات الخام تحتاج لضغط الإيقاع وإضافة ترجمة جذابة.',
        },
        strategy: {
          en: 'Created an assertive visual hook in frame one, matched with dynamic sound whooshes and bold subtitles that highlight key concepts.',
          ar: 'تصميم خطاف بصري حاسم في الثانية الأولى مصحوباً بمؤثرات صوتية حركية ونصوص بارزة تركز على الكلمات المفتاحية.',
        },
        editingApproach: {
          en: 'Paced cuts to speech cadence, integrated relevant B-roll, and ensured zero audio latency across all cuts.',
          ar: 'مزامنة القطع مع مخارج الحروف، دمج لقطات B-roll التوضيحية، وإلغاء أي فواصل صمت ميتة.',
        },
        storytellingApproach: {
          en: 'Introduced an open question in the beginning and delivered the practical payoff before the loop.',
          ar: 'طرح تساؤل تشويقي في البداية وتقديم القيمة العملية قبل انتهاء المقطع لتشجيع إعادة المشاهدة.',
        },
      },
    },
    {
      id: 'proj-2',
      title: {
        en: 'YouTube Long-Form & Educational Video',
        ar: 'فيديو يوتيوب مطول ومحتوى تعليمي',
      },
      subtitle: {
        en: 'In-depth long-form storytelling with multi-cam synchronization, color correction, and motion graphics.',
        ar: 'سرد قصصي مطول متكامل مع تزامن متعدد الكاميرات، تصحيح الألوان، وعناصر موشن جرافيكس.',
      },
      description: {
        en: 'Structured comprehensive raw footage into a cohesive narrative. Balanced dialogue audio, removed unwanted pauses, added informational overlays, and calibrated natural color grading.',
        ar: 'إعادة هيكلة لقطات مطولة خام إلى قصة متماسكة. معالجة نقاء الصوت، حذف التردد، إضافة عناصر توضيحية وتدريج لوني طبيعي متوازن.',
      },
      category: 'youtube',
      client: 'Educational Creators & Digital Businesses',
      date: '2025-08-20',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
      previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      fullVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      videoId: 'dQw4w9WgXcQ',
      aspectRatio: '16:9',
      autoplay: false,
      muted: true,
      loop: true,
      controls: true,
      toolsUsed: ['DaVinci Resolve', 'Adobe Premiere Pro', 'After Effects'],
      skills: ['YouTube long-form', 'Educational content', 'Color correction', 'Audio editing', 'Motion graphics'],
      results: {
        en: 'Clear educational pacing • Professional broadcast look with consistent audio loudness.',
        ar: 'إيقاع تعليمي مريح ومظهر بصري احترافي مع ضبط قياسي لمستويات الصوت.',
      },
      tags: ['YouTube', 'Long-Form', 'Color Correction', 'Educational', 'Premiere Pro'],
      credits: 'Edited & Color Graded by Youssef Mohamed',
      featured: true,
      status: 'published',
      order: 2,
      viewsCount: 26500,
    },
    {
      id: 'proj-3',
      title: {
        en: 'Talking-Head & Thought Leadership Content',
        ar: 'محتوى حواري وبناء العلامة الشخصية',
      },
      subtitle: {
        en: 'Clean, professional talking-head edit with audio cleanup, multi-angle cuts, and kinetic titles.',
        ar: 'مونتاج حواري احترافي ونقي مع معالجة التشويش الصوتي، القطع متعدد الزوايا، والعناوين الحركية.',
      },
      description: {
        en: 'Enhanced executive and creator presentations with speech cleanup, noise reduction, natural color grading, and branded graphics for LinkedIn and YouTube.',
        ar: 'تطوير المحتوى الحواري للخبراء وصناع المحتوى عبر إزالة الضوضاء الصوتية، معالجة ألوان البشرة الطبيعية، وإضافة هوية بصرية رقمية مناسبة لمنصات التواصل.',
      },
      category: 'talking-head',
      client: 'Personal Brands & Professional Founders',
      date: '2025-11-05',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80',
      previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      fullVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      aspectRatio: '16:9',
      autoplay: false,
      muted: true,
      loop: true,
      controls: true,
      toolsUsed: ['Adobe Premiere Pro', 'CapCut', 'DaVinci Resolve'],
      skills: ['Talking-head content', 'Audio cleanup', 'Synchronization', 'Captions', 'Visual storytelling'],
      results: {
        en: 'Enhanced clarity and authority for founder personal branding across social channels.',
        ar: 'إبراز الحضور القيادي ونقاء الرسالة لصاحب المحتوى عبر المنصات المهنية.',
      },
      tags: ['Talking-Head', 'Personal Brand', 'Audio Cleanup', 'Sync'],
      credits: 'Edited by Youssef Mohamed',
      featured: true,
      status: 'published',
      order: 3,
      viewsCount: 19800,
    },
    {
      id: 'proj-4',
      title: {
        en: 'Motion Graphics, Transitions & Visual Effects Suite',
        ar: 'حزمة موشن جرافيكس وانتقالات ومؤثرات بصرية',
      },
      subtitle: {
        en: 'Custom kinetic overlays, title sequences, smooth wipes, and digital marketing graphics.',
        ar: 'عناصر نصوص حركية مخصصة، مقدمات عناوين، انتقالات سلسة، ورسوم تسويقية تفاعلية.',
      },
      description: {
        en: 'Designed engaging visual transitions, animated pointers, subscribe cards, lower-thirds, and visual effects in After Effects to keep audiences visually stimulated.',
        ar: 'تصميم انتقالات بصرية احترافية، مؤشرات توضيحية متحركة، بطاقات متابعة، وتأثيرات بصرية في أفتر إفكتس لإبقاء المشاهد متفاعلاً طوال الفيديو.',
      },
      category: 'motion-vfx',
      client: 'Digital Marketing & Content Creators',
      date: '2025-09-15',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
      previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      fullVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      aspectRatio: '16:9',
      autoplay: false,
      muted: true,
      loop: true,
      controls: true,
      toolsUsed: ['Adobe After Effects', 'Adobe Premiere Pro'],
      skills: ['Motion graphics', 'Transitions', 'Visual effects', 'Digital marketing'],
      results: {
        en: 'Elevated production quality with custom branded motion assets.',
        ar: 'رفع جودة الإنتاج البصري بأصول موشن جرافيكس مخصصة للهوية.',
      },
      tags: ['Motion Graphics', 'After Effects', 'Transitions', 'VFX'],
      credits: 'Motion Design & VFX by Youssef Mohamed',
      featured: false,
      status: 'published',
      order: 4,
      viewsCount: 14200,
    },
  ],

  services: [
    {
      id: 'serv-1',
      title: {
        en: 'Short-Form Video Editing (TikTok, Reels & Shorts)',
        ar: 'تحرير الفيديوهات القصيرة (تيك توك، ريلز، وشورتس)',
      },
      description: {
        en: 'Creating high-retention 9:16 vertical videos with psychological hooks, engaging captions, sound effects, and fast-paced editing tailored for social media algorithms.',
        ar: 'صناعة فيديوهات رأسية 9:16 عالية الاستبقاء بخطافات جذابة، وترجمات تفاعلية، ومؤثرات صوتية وإيقاع سريع مصمم لخوارزميات منصات التواصل.',
      },
      icon: 'Smartphone',
      tags: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Captions', 'Retention-focused editing'],
      ctaText: { en: 'Inquire for Short-Form', ar: 'طلب مونتاج ريلز' },
      order: 1,
      visible: true,
      status: 'published',
    },
    {
      id: 'serv-2',
      title: {
        en: 'YouTube Long-Form Video Editing',
        ar: 'تحرير فيديوهات يوتيوب المطولة',
      },
      description: {
        en: 'Transforming raw recordings into structured, engaging long-form YouTube videos with multi-cam synchronization, rhythm cuts, B-roll selection, and visual storytelling.',
        ar: 'تحويل التسجيلات الخام إلى فيديوهات يوتيوب منظمة وجذابة مع مزامنة الكاميرات المتعددة، ضبط الإيقاع، انتقاء لقطات B-roll والسرد البصري.',
      },
      icon: 'Film',
      tags: ['YouTube long-form', 'Multi-Cam', 'Storytelling', 'Pacing'],
      ctaText: { en: 'Inquire for YouTube', ar: 'طلب مونتاج يوتيوب' },
      order: 2,
      visible: true,
      status: 'published',
    },
    {
      id: 'serv-3',
      title: {
        en: 'Talking-Head & Educational Content Editing',
        ar: 'تحرير المحتوى الحواري والتعليمي',
      },
      description: {
        en: 'Polishing educational lessons and talking-head videos with audio noise reduction, smooth multi-angle cuts, lower-thirds, and visual aids that clarify complex ideas.',
        ar: 'تهذيب الدروس التعليمية والفيديوهات الحوارية بتنقية الصوت من الضوضاء، والقطع السلس بين الزوايا، وإضافة العناوين والرسوم التوضيحية.',
      },
      icon: 'Feather',
      tags: ['Talking-head', 'Educational content', 'Subtitles', 'Audio cleanup'],
      ctaText: { en: 'Inquire for Educational Edit', ar: 'طلب مونتاج تعليمي' },
      order: 3,
      visible: true,
      status: 'published',
    },
    {
      id: 'serv-4',
      title: {
        en: 'Color Correction & Color Grading',
        ar: 'تصحيح الألوان والتدريج اللوني',
      },
      description: {
        en: 'Calibrating raw camera footage in DaVinci Resolve and Premiere Pro to achieve natural skin tones, balanced exposures, and a cohesive cinematic or branded look.',
        ar: 'معالجة لقطات الكاميرا في دافينشي ريزولف وبريمير برو للحصول على ألوان بشرة طبيعية، وتوازن الإضاءة، ومظهر بصري جذاب متناسق.',
      },
      icon: 'Palette',
      tags: ['Color correction', 'Color grading', 'DaVinci Resolve', 'Visual consistency'],
      ctaText: { en: 'Request Color Work', ar: 'طلب تلوين فيديو' },
      order: 4,
      visible: true,
      status: 'published',
    },
    {
      id: 'serv-5',
      title: {
        en: 'Motion Graphics, Transitions & Visual Effects',
        ar: 'موشن جرافيكس، انتقالات، ومؤثرات بصرية',
      },
      description: {
        en: 'Designing custom title animations, kinetic typography, smooth wipes, subscribe reminders, and visual enhancements using Adobe After Effects.',
        ar: 'تصميم حركات العناوين، والطباعة الحركية، والانتقالات المخصصة، وتذكيرات الاشتراك، والتحسينات البصرية عبر أدوبي أفتر إفكتس.',
      },
      icon: 'Sparkles',
      tags: ['Motion graphics', 'Transitions', 'Visual effects', 'After Effects'],
      ctaText: { en: 'Request Motion Graphics', ar: 'طلب موشن جرافيكس' },
      order: 5,
      visible: true,
      status: 'published',
    },
    {
      id: 'serv-6',
      title: {
        en: 'Audio Editing, Cleanup & Synchronization',
        ar: 'تحرير الصوت وتنقيته والمزامنة',
      },
      description: {
        en: 'Removing background hiss, clicks, and echo, balancing dialogue levels, synchronizing multi-source audio tracks, and layering contextual sound effects.',
        ar: 'إزالة الضوضاء والتشويش والصدى، وموازنة درجات الصوت، ومزامنة مسارات الصوت الخارجية، وإضافة المؤثرات الصوتية المعززة للانتباه.',
      },
      icon: 'Headphones',
      tags: ['Audio editing', 'Cleanup', 'Synchronization', 'Sound effects'],
      ctaText: { en: 'Request Audio Editing', ar: 'طلب هندسة صوتية' },
      order: 6,
      visible: true,
      status: 'published',
    },
  ],

  skills: [
    { id: 'sk-1', name: { en: 'Short-Form Content & Viral Hooks (TikTok, Reels, Shorts)', ar: 'الفيديوهات القصيرة والخطافات (تيك توك، ريلز، شورتس)' }, level: 96, category: 'Editing', order: 1, enabled: true },
    { id: 'sk-2', name: { en: 'YouTube Long-Form & Educational Video Editing', ar: 'تحرير فيديوهات يوتيوب والمحتوى التعليمي' }, level: 94, category: 'Editing', order: 2, enabled: true },
    { id: 'sk-3', name: { en: 'Retention-Focused Editing & Visual Storytelling', ar: 'المونتاج المعزز للاستبقاء والسرد البصري' }, level: 95, category: 'Strategy', order: 3, enabled: true },
    { id: 'sk-4', name: { en: 'Talking-Head & Interview Video Editing', ar: 'تحرير المحتوى الحواري والمقابلات' }, level: 92, category: 'Editing', order: 4, enabled: true },
    { id: 'sk-5', name: { en: 'Captions & Subtitles Animation', ar: 'صناعة النصوص التفاعلية والترجمة الحركية' }, level: 95, category: 'Content', order: 5, enabled: true },
    { id: 'sk-6', name: { en: 'Color Correction & Color Grading', ar: 'تصحيح الألوان والتدريج اللوني' }, level: 90, category: 'Color', order: 6, enabled: true },
    { id: 'sk-7', name: { en: 'Audio Editing, Cleanup & Multi-Track Synchronization', ar: 'تحرير وتنقية الصوت وتزامن المسارات' }, level: 91, category: 'Audio', order: 7, enabled: true },
    { id: 'sk-8', name: { en: 'Motion Graphics, Transitions & Visual Effects', ar: 'الموشن جرافيكس والانتقالات والمؤثرات البصرية' }, level: 88, category: 'Motion', order: 8, enabled: true },
    { id: 'sk-9', name: { en: 'Digital Marketing & Social Media Content Strategy', ar: 'التسويق الرقمي واستراتيجية محتوى منصات التواصل' }, level: 90, category: 'Marketing', order: 9, enabled: true },
  ],

  tools: [
    {
      id: 'tool-1',
      name: 'DaVinci Resolve',
      icon: 'Activity',
      skillLevel: 92,
      yearsUsed: 6,
      description: {
        en: 'Professional color correction, color grading workflows, Fairlight audio cleanup, and finishing.',
        ar: 'تصحيح الألوان الاحترافي، التدريج اللوني المتقدم، معالجة وتنقية الصوت، وإنهاء المشاريع.',
      },
      category: 'Color & NLE',
      order: 1,
      visible: true,
    },
    {
      id: 'tool-2',
      name: 'Adobe Premiere Pro',
      icon: 'Scissors',
      skillLevel: 96,
      yearsUsed: 7,
      description: {
        en: 'Primary non-linear editing suite for long-form YouTube videos, multi-camera synchronization, and complex timelines.',
        ar: 'البرنامج الأساسي لتحرير الفيديوهات المطولة على يوتيوب، تزامن الكاميرات المتعددة، وإدارة خطوط التحرير المعقدة.',
      },
      category: 'NLE',
      order: 2,
      visible: true,
    },
    {
      id: 'tool-3',
      name: 'Adobe After Effects',
      icon: 'Layers',
      skillLevel: 88,
      yearsUsed: 6,
      description: {
        en: 'Custom motion graphics, kinetic typography, smooth transitions, visual effects, and graphic overlays.',
        ar: 'تصميم الموشن جرافيكس المخصص، الطباعة الحركية، الانتقالات السلسة، والمؤثرات البصرية التفاعلية.',
      },
      category: 'VFX & Motion',
      order: 3,
      visible: true,
    },
    {
      id: 'tool-4',
      name: 'CapCut',
      icon: 'Zap',
      skillLevel: 95,
      yearsUsed: 4,
      description: {
        en: 'Rapid short-form mobile and desktop iteration, automated caption synchronization, trending vertical pacing, and quick delivery.',
        ar: 'الإنتاج عالي السرعة للفيديوهات القصيرة، مزامنة الترجمات التلقائية، وضبط الإيقاع المناسب للريلز والتيك توك.',
      },
      category: 'Short Form',
      order: 4,
      visible: true,
    },
  ],

  experience: [
    {
      id: 'exp-1',
      company: 'Self-Employed',
      position: {
        en: 'Freelance Video Editor & Digital Marketing',
        ar: 'محرر فيديو ومسوق رقمي مستقل',
      },
      startDate: '2019-05',
      endDate: 'Present',
      currentPosition: true,
      description: {
        en: 'Helping businesses, creators, and personal brands turn raw footage and ideas into engaging content through video editing, social media content, and digital marketing.',
        ar: 'مساعدة الشركات، صناع المحتوى، والعلامات التجارية الشخصية على تحويل اللقطات الخام والأفكار إلى محتوى مؤثر عبر تحرير الفيديو، وصناعة محتوى منصات التواصل، والتسويق الرقمي.',
      },
      responsibilities: [
        {
          en: 'Edit short-form content for TikTok, Instagram Reels, and YouTube Shorts with retention hooks, kinetic captions, and sound effects.',
          ar: 'تحرير الفيديوهات القصيرة لـ تيك توك، ريلز، وشورتس مع خطافات استبقاء وترجمات حركية ومؤثرات صوتية.',
        },
        {
          en: 'Produce YouTube long-form, talking-head, and educational videos with clear pacing, B-roll integration, and audio cleanup.',
          ar: 'إنتاج فيديوهات يوتيوب المطولة والمحتوى الحواري والتعليمي بإيقاع منظم ودمج لقطات توضيحية وتنقية الصوت.',
        },
        {
          en: 'Execute color correction, color grading, audio synchronization, motion graphics, and transitions across client projects.',
          ar: 'تنفيذ تصحيح وتدريج الألوان، ومزامنة مسارات الصوت، وتصميم الموشن جرافيكس والانتقالات لمختلف المشاريع.',
        },
      ],
      achievements: [
        { en: 'Consistent track record delivering retention-focused edits for creators and businesses since May 2019.', ar: 'مسيرة مستمرة في تقديم محتوى يحقق نسب مشاهدة واحتفاظ عالية للعملاء منذ مايو 2019.' },
      ],
      tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects', 'CapCut'],
      location: 'Cairo, Egypt',
      order: 1,
      visible: true,
    },
    {
      id: 'exp-2',
      company: 'DeliveryX',
      position: {
        en: 'Operations Member',
        ar: 'عضو فريق العمليات',
      },
      startDate: '2025-11',
      endDate: 'Present',
      currentPosition: true,
      description: {
        en: 'Executing operational workflows, logistical coordination, and day-to-day process management in Cairo, Egypt.',
        ar: 'إدارة وتنسيق تدفقات العمل التشغيلية، المهام اللوجستية، والمتابعة اليومية للعمليات في القاهرة، مصر.',
      },
      responsibilities: [
        {
          en: 'Coordinate operational tasks and ensure efficient fulfillment across logistics workflows.',
          ar: 'تنسيق المهام التشغيلية وضمان كفاءة التنفيذ في سلاسل العمليات.',
        },
        {
          en: 'Manage daily operational communication and resolve issues promptly.',
          ar: 'متابعة التواصل التشغيلي اليومي ومعالجة العقبات بكفاءة وسرعة.',
        },
      ],
      achievements: [
        { en: 'Active contributor to operational efficiency and system coordination.', ar: 'مساهمة فاعلة في رفع كفاءة وتنسيق منظومة العمليات.' },
      ],
      tools: ['Operations Management', 'Coordination', 'Workflow Systems'],
      location: 'Cairo, Egypt',
      order: 2,
      visible: true,
    },
  ],

  education: [
    {
      id: 'edu-1',
      institution: {
        en: 'Helwan University',
        ar: 'جامعة حلوان',
      },
      degree: {
        en: 'Currently Studying Philosophy',
        ar: 'دراسة الفلسفة حالياً',
      },
      field: {
        en: 'Philosophy',
        ar: 'الفلسفة',
      },
      startDate: 'Enrolled',
      endDate: 'Present',
      description: {
        en: 'Currently studying Philosophy at Helwan University in Cairo, Egypt. Developing rigorous critical thinking, analytical reasoning, and conceptual storytelling frameworks.',
        ar: 'دراسة الفلسفة بجامعة حلوان في القاهرة، مصر حالياً. تعزيز مهارات التفكير النقدي، والتحليل المنطقي، وأسس البناء المفاهيمي للسرد القصصي.',
      },
      visible: true,
    },
  ],

  certifications: [],

  testimonials: [],

  stats: [
    {
      id: 'stat-1',
      number: 7,
      suffix: '+ Yrs',
      label: { en: 'Years of Experience (Since May 2019)', ar: 'سنوات من الخبرة العملية (منذ مايو 2019)' },
      icon: 'Award',
      order: 1,
      visible: true,
    },
    {
      id: 'stat-2',
      number: 4,
      suffix: ' NLEs',
      label: { en: 'Production Suites (DaVinci, Premiere, AE, CapCut)', ar: 'برامج إنتاج رئيسية (بريمير، دافينشي، أفتر إفكتس، كاب كت)' },
      icon: 'Cpu',
      order: 2,
      visible: true,
    },
    {
      id: 'stat-3',
      number: 100,
      suffix: '%',
      label: { en: 'Commitment to Retention & Storytelling', ar: 'تركيز كامل على إيقاع الاستبقاء والسرد البصري' },
      icon: 'TrendingUp',
      order: 3,
      visible: true,
    },
  ],

  contentItems: [
    {
      id: 'cnt-1',
      title: {
        en: 'Short-Form Retention Breakdown: How Frame One Captures Attention',
        ar: 'تحليل استبقاء الفيديوهات القصيرة: كيف يأسر الإطار الأول انتباه المشاهد',
      },
      type: 'tiktok',
      description: {
        en: 'A breakdown of visual hook pacing, text placement, and sound effects for viral TikToks and Reels.',
        ar: 'تحليل لإيقاع الخطاف البصري، موضع النصوص، والمؤثرات الصوتية في فيديوهات تيك توك وريلز سريعة الانتشار.',
      },
      mediaUrl: 'https://www.tiktok.com',
      platform: 'tiktok',
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80',
      date: '2026-02-10',
      views: 'Educational Breakdown',
      link: 'https://www.tiktok.com',
      order: 1,
      visible: true,
      status: 'published',
    },
    {
      id: 'cnt-2',
      title: {
        en: 'YouTube Talking-Head Workflow: Premiere Pro to DaVinci Resolve',
        ar: 'مسار عمل المحتوى الحواري على يوتيوب: من بريمير برو إلى دافينشي ريزولف',
      },
      type: 'youtube',
      description: {
        en: 'Walkthrough of multi-cam syncing, audio de-noising, and color correction for educational YouTube creators.',
        ar: 'شرح عملي لتزامن الكاميرات المتعددة، تنقية الصوت، وتصحيح الألوان لصناع المحتوى التعليمي على يوتيوب.',
      },
      mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
      date: '2026-01-18',
      views: 'Video Tutorial',
      link: 'https://www.youtube.com',
      order: 2,
      visible: true,
      status: 'published',
    },
  ],

  blogCategories: [
    { id: 'video-editing', name: { en: 'Video Editing', ar: 'تحرير الفيديو' }, slug: 'video-editing', order: 1, visible: true },
    { id: 'short-form', name: { en: 'Short-Form Content', ar: 'الفيديوهات القصيرة' }, slug: 'short-form', order: 2, visible: true },
    { id: 'digital-marketing', name: { en: 'Digital Marketing', ar: 'التسويق الرقمي' }, slug: 'digital-marketing', order: 3, visible: true },
    { id: 'tools-workflows', name: { en: 'Tools & Workflows', ar: 'البرامج ومسارات العمل' }, slug: 'tools-workflows', order: 4, visible: true },
  ],

  blogPosts: [
    {
      id: 'post-1',
      type: 'article',
      title: {
        en: 'The Retention Formula: How to Edit Short-Form Videos That Stop the Scroll',
        ar: 'معادلة الاستبقاء: كيف تصنع مونتاجاً لفيديوهات الريلز والشورتس يوقف التمرير',
      },
      slug: 'retention-formula-short-form-video-editing',
      excerpt: {
        en: 'Why the first 1.5 seconds dictate 80% of your video’s reach, and how to use cuts, kinetic captions, and sound cues to retain viewers.',
        ar: 'لماذا تحدد أول 1.5 ثانية 80% من انتشار الفيديو، وكيف تستخدم القطع والنصوص الحركية والمؤثرات الصوتية للحفاظ على المشاهدين.',
      },
      content: {
        en: `# The Retention Formula: How to Edit Short-Form Videos That Stop the Scroll

In modern social media algorithms across TikTok, Instagram Reels, and YouTube Shorts, one metric outweighs almost all others: **Completion Rate and Retention**.

If viewers swipe away in the first two seconds, the algorithm concludes that your content is irrelevant. However, by understanding editing psychology, you can keep audiences hooked.

## 1. Frame One: The Uncompromising Visual Hook
Never open a short-form video with a static title screen, a slow breath, or an intro logo. Start in the middle of the action or speech. 
- Use a high-contrast kinetic caption right in the center.
- Pair a visual cut with an auditory whoosh or subtle impact.
- Avoid dead air.

## 2. Pacing with Cadence
Every cut should serve a purpose. Remove breathing pauses, filler words, and repetitive statements. If you show a talking-head for more than 3 seconds without a zoom, an on-screen graphic, or a B-roll cutaway, the viewer's brain drifts.

## 3. Kinetic Captions & Character Tracking
Subtitles are no longer optional—over 70% of viewers watch social feeds with muted audio. Using clean, dynamic captions with active word highlighting ensures that the viewer reads along as they listen.

## 4. Audio Synchronization
The audio track is the heartbeat of video editing. Align visual transitions with music beats, subtle risers, and sound effects to create a seamless, dopamine-rewarding rhythm.`,
        ar: `# معادلة الاستبقاء: كيف تصنع مونتاجاً لفيديوهات الريلز والشورتس يوقف التمرير

في خوارزميات منصات التواصل الاجتماعي الحالية (تيك توك، إنستغرام ريلز، يوتيوب شورتس)، يعتبر **معدل الاستبقاء ونسبة إكمال الفيديو** المعيار الأهم على الإطلاق.

إذا مرر المشاهد الفيديو خلال أول ثانيتين، تفترض الخوارزمية أن المحتوى غير مجدٍ. لكن من خلال فهم سيكولوجيا التحرير البصري، يمكنك مضاعفة بقاء المشاهد حتى اللحظة الأخيرة.

## ١. الإطار الأول: الخطاف البصري الحاسم
لا تبدأ أي مقطع قصير بشاشة عنوان ثابتة أو مقدمة تقليدية. ابدأ فوراً في قلب الفكرة:
- ضع نصاً حركياً بارزاً في منتصف الشاشة يطرح التساؤل الرئيسي.
- اربط الانتقال الأول بمؤثر صوتي خاطف.
- احذف أي صمت أو تردد في البداية.

## ٢. ضبط إيقاع المشاهدة
كل قطع يجب أن يكون له مبرر. احذف التوقفات الطويلة، والكلمات المكررة. إذا استمر المتحدث لأكثر من 3 ثوانٍ دون تقريب الكاميرا (Zoom) أو إظهار رسم توضيحي أو لقطة مساعدة (B-roll)، يتشتت انتباه المشاهد.

## ٣. الترجمات الحركية والنصوص التفاعلية
أكثر من 70% من مستخدمي منصات التواصل يشاهدون المقاطع بدون تشغيل الصوت في البداية. استخدام نصوص متحركة واضحة تبرز الكلمات المنطوقة يضمن استيعاب المشاهد للرسالة فوراً.

## ٤. تزامن الصوت والصورة
الصوت هو روح المونتاج. ضبط الانتقالات البصرية على إيقاع الموسيقى والمؤثرات الصوتية يخلق تجربة متكاملة تبقي المتابع مشدوداً حتى نهاية المقطع.`,
      },
      platform: 'direct',
      thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=800&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=1200&auto=format&fit=crop&q=80',
      author: 'Youssef Mohamed',
      category: 'short-form',
      tags: ['Video Editing', 'Short-Form', 'TikTok', 'Reels', 'Retention'],
      featured: true,
      published: true,
      status: 'published',
      publishedAt: '2026-02-15',
      updatedAt: '2026-02-15',
      readingTime: '4 min read',
      seoTitle: {
        en: 'The Retention Formula: Short-Form Video Editing Guide',
        ar: 'معادلة الاستبقاء: دليل تحرير الفيديوهات القصيرة',
      },
      seoDescription: {
        en: 'Learn how to edit short-form videos for TikTok, Reels, and Shorts with high retention and visual storytelling.',
        ar: 'تعلم كيفية تحرير الفيديوهات القصيرة لتيك توك وريلز وشورتس بأعلى نسب استبقاء للمشاهدة.',
      },
      order: 1,
      viewsCount: 1420,
    },
    {
      id: 'post-2',
      type: 'youtube',
      title: {
        en: 'DaVinci Resolve vs Premiere Pro for Social Creators',
        ar: 'مقارنة دافينشي ريزولف وأدوبي بريمير برو لصناع المحتوى',
      },
      slug: 'davinci-resolve-vs-premiere-pro-social-creators',
      excerpt: {
        en: 'A practical breakdown of which NLE fits your workflow best: Premiere Pro’s speed and dynamic link vs DaVinci Resolve’s elite color grading and Fairlight audio.',
        ar: 'تحليل عملي للبرنامج الأنسب لمسار عملك: سرعة بريمير برو وربطه مع أفتر إفكتس في مقابل قوة دافينشي ريزولف في الألوان وهندسة الصوت.',
      },
      platform: 'youtube',
      externalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      author: 'Youssef Mohamed',
      category: 'tools-workflows',
      tags: ['DaVinci Resolve', 'Premiere Pro', 'Workflow', 'Video Tools'],
      featured: true,
      published: true,
      status: 'published',
      publishedAt: '2026-02-02',
      readingTime: 'Video breakdown',
      order: 2,
      viewsCount: 980,
    },
    {
      id: 'post-3',
      type: 'article',
      title: {
        en: 'Why Digital Marketing Strategy Must Lead Video Editing',
        ar: 'لماذا يجب أن تقود استراتيجية التسويق الرقمي عملية مونتاج الفيديو',
      },
      slug: 'digital-marketing-strategy-video-editing',
      excerpt: {
        en: 'Video editing is not just creative aesthetics—it is a conversion engine. How understanding your customer journey shapes every cut and call to action.',
        ar: 'المونتاج ليس مجرد جماليات بصرية، بل هو محرك تحويل ومبيعات. كيف يحدد فهم رحلة العميل توقيت كل قطع ودعوة للتفاعل.',
      },
      content: {
        en: `# Why Digital Marketing Strategy Must Lead Video Editing

Many editors focus solely on fancy transitions, 3D animations, or cinematic color LUTs. While aesthetic craft matters, **video without digital marketing direction produces passive views without results**.

## 1. Defining the Target Audience
Before trimming a single frame, the editor must ask:
- Who is this video for?
- What problem are they experiencing?
- What action should they take at the conclusion of this watch?

## 2. Pacing for Intent
An educational video for professionals requires clear visual aids and clean audio, while an e-commerce TikTok requires fast cuts, problem-solution urgency, and social proof.

## 3. The Seamless Call to Action (CTA)
A strong CTA should feel like the natural conclusion to the story, not an awkward commercial interruption. Integrating the CTA into the dialogue flow ensures maximum conversion.`,
        ar: `# لماذا يجب أن تقود استراتيجية التسويق الرقمي عملية مونتاج الفيديو

يركز الكثير من المحررين على الانتقالات المعقدة أو ألوان السينما فقط. ورغم أهمية الجماليات، إلا أن **أي فيديو دون رؤية تسويقية واضحة يحقق مشاهدات عابرة دون أي عائد حقيقي**.

## ١. تحديد الجمهور المستهدف بدقة
قبل وضع أول قطع على خط التحرير، يجب الإجابة عن:
- لمن يوجه هذا المحتوى؟
- ما المشكلة التي يبحث المشاهد عن حل لها؟
- ما الخطوة التالية التي نريده أن يتخذها بعد المشاهدة؟

## ٢. ضبط الإيقاع حسب الهدف
الفيديو التعليمي للخبراء يحتاج إلى إيضاحات بصرية دقيقة وصوت نقي، بينما إعلان منتج على تيك توك يحتاج إلى سرعة ومقارنة فورية بين المشكلة والحل.

## ٣. دعوة اتخاذ الإجراء بسلاسة (Call to Action)
يجب أن تأتي دعوة المتابعة أو الشراء كنتيجة منطقية للقصة المطروحة في الفيديو، لا كإعلان مفاجئ يقطع تركيز المشاهد. الدمج الطبيعي يضمن أعلى نسب تفاعل وتحويل.`,
      },
      platform: 'direct',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      author: 'Youssef Mohamed',
      category: 'digital-marketing',
      tags: ['Digital Marketing', 'Content Strategy', 'Video Editing', 'Conversion'],
      featured: false,
      published: true,
      status: 'published',
      publishedAt: '2026-01-25',
      readingTime: '3 min read',
      order: 3,
      viewsCount: 840,
    },
    {
      id: 'post-4',
      type: 'tiktok',
      title: {
        en: '5 Visual Hooks You Can Recreate in CapCut or Premiere',
        ar: '٥ خطافات بصرية سريعة يمكنك تنفيذها في كاب كت أو بريمير',
      },
      slug: '5-visual-hooks-capcut-premiere',
      excerpt: {
        en: 'Quick 60-second tutorial showing how zoom cuts, paper tears, sound drops, and kinetic highlights increase hook retention.',
        ar: 'شرح سريع في 60 ثانية يوضح كيف يرفع الزوم السريع، والمؤثرات الورقية والصوتية، والنصوص الحركية من نسبة التوقف عند المقطع.',
      },
      platform: 'tiktok',
      externalUrl: 'https://www.tiktok.com',
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80',
      author: 'Youssef Mohamed',
      category: 'short-form',
      tags: ['CapCut', 'Premiere Pro', 'TikTok', 'Shorts'],
      featured: false,
      published: true,
      status: 'published',
      publishedAt: '2026-01-12',
      readingTime: '60s Reel',
      order: 4,
      viewsCount: 2100,
    },
    {
      id: 'post-5',
      type: 'linkedin',
      title: {
        en: 'Transforming Raw Footage into Business Conversion: Case Insights',
        ar: 'تحويل اللقطات الخام إلى مبيعات ونمو تجاري: رؤى من أرض الواقع',
      },
      slug: 'transforming-raw-footage-business-conversion',
      excerpt: {
        en: 'Thoughts shared on LinkedIn analyzing why clear talking-head edits with professional audio synchronization drive business inquiries.',
        ar: 'رؤية مهنية منشورة على لينكد إن توضح أثر المحتوى الحواري المصحوب بالصوت المتزامن والنقي في توليد العملاء المحتملين.',
      },
      platform: 'linkedin',
      externalUrl: 'https://www.linkedin.com/in/unix-editor',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
      author: 'Youssef Mohamed',
      category: 'digital-marketing',
      tags: ['LinkedIn', 'Personal Branding', 'B2B Video', 'Digital Marketing'],
      featured: false,
      published: true,
      status: 'published',
      publishedAt: '2026-01-05',
      readingTime: 'LinkedIn Post',
      order: 5,
      viewsCount: 1650,
    },
  ],

  socialLinks: [
    { id: 'soc-1', platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/unix-editor', icon: 'Linkedin', order: 1, visible: true },
    { id: 'soc-2', platform: 'email', label: 'Direct Email', url: 'mailto:unix.official.bs@gmail.com', icon: 'Mail', order: 2, visible: true },
    { id: 'soc-3', platform: 'youtube', label: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', order: 3, visible: false },
    { id: 'soc-4', platform: 'tiktok', label: 'TikTok', url: 'https://tiktok.com', icon: 'Video', order: 4, visible: false },
    { id: 'soc-5', platform: 'instagram', label: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', order: 5, visible: false },
  ],

  customSections: [],

  pages: [],

  media: [
    {
      id: 'med-1',
      name: 'Youssef_Mohamed_Profile_Hero.jpg',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      type: 'image',
      size: '1.2 MB',
      uploadedAt: '2026-01-15',
    },
    {
      id: 'med-2',
      name: 'Vertical_Reels_Showcase.jpg',
      url: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=800&auto=format&fit=crop&q=80',
      type: 'image',
      size: '2.1 MB',
      uploadedAt: '2026-02-01',
    },
  ],

  navItems: [
    { id: 'nav-1', label: { en: 'Selected Work', ar: 'الأعمال المختارة' }, target: '#work', isExternal: false, order: 1, visible: true },
    { id: 'nav-2', label: { en: 'Services', ar: 'الخدمات' }, target: '#services', isExternal: false, order: 2, visible: true },
    { id: 'nav-3', label: { en: 'About', ar: 'عني' }, target: '#about', isExternal: false, order: 3, visible: true },
    { id: 'nav-4', label: { en: 'Experience', ar: 'الخبرات' }, target: '#experience', isExternal: false, order: 4, visible: true },
    { id: 'nav-5', label: { en: 'Tools & Skills', ar: 'البرامج والمهارات' }, target: '#tools', isExternal: false, order: 5, visible: true },
    { id: 'nav-6', label: { en: 'Content & Reels', ar: 'المحتوى والريلز' }, target: '#content', isExternal: false, order: 6, visible: true },
    { id: 'nav-7', label: { en: 'Blog & Hub', ar: 'المقالات والمحتوى' }, target: '#blog', isExternal: false, order: 7, visible: true },
    { id: 'nav-8', label: { en: 'Contact', ar: 'تواصل معي' }, target: '#contact', isExternal: false, order: 8, visible: true },
  ],

  appearance: {
    accentColor: '#10b981', // Emerald cinematic tone
    secondaryAccent: '#06b6d4',
    headingFont: 'Syne',
    bodyFont: 'Plus Jakarta Sans',
    borderRadius: 'md',
    animationIntensity: 'cinematic',
    customCursorEnabled: true,
    scrollAnimationEnabled: true,
    grainOverlayEnabled: true,
    defaultTheme: 'dark',
    navigationMode: 'slider', // Default to cinematic scene slider mode
  },

  seo: {
    siteTitle: {
      en: 'Youssef Mohamed | Video Editor & Digital Marketing Freelancer',
      ar: 'يوسف محمد | محرر فيديو ومسوق رقمي مستقل',
    },
    metaDescription: {
      en: 'Official portfolio of Youssef Mohamed, Video Editor & Digital Marketing Freelancer in Cairo, Egypt. Specializing in short-form, long-form, DaVinci Resolve, Premiere Pro, and retention-focused editing.',
      ar: 'الموقع الرسمي ليوسف محمد، محرر فيديو ومسوق رقمي مستقل في القاهرة، مصر. متخصص في تحرير الفيديوهات القصيرة والمطولة، بريمير برو، دافينشي ريزولف، والمونتاج المعزز للاستبقاء.',
    },
    keywords: [
      'Youssef Mohamed',
      'Video Editor',
      'Digital Marketing',
      'Short-Form Video',
      'TikTok Video Editor',
      'Instagram Reels',
      'YouTube Shorts',
      'YouTube Long-Form',
      'DaVinci Resolve',
      'Adobe Premiere Pro',
      'After Effects',
      'CapCut',
      'Cairo Egypt Video Editor',
      'محرر فيديو',
      'مسوق رقمي',
    ],
    ogImage: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=1200&auto=format&fit=crop&q=80',
    author: 'Youssef Mohamed',
    canonicalUrl: '',
  },

  contact: {
    email: 'unix.official.bs@gmail.com',
    whatsapp: '',
    ctaText: {
      en: 'Let’s Turn Your Raw Footage Into High-Impact Content',
      ar: 'دعنا نحول لقطاتك الخام وأفكارك إلى محتوى بصري فارق',
    },
    successMessage: {
      en: 'Thank you! Your project message has been received. I will reply to your email shortly.',
      ar: 'شكراً لك! تم استلام رسالتك وتفاصيل مشروعك بنجاح. سأتواصل معك عبر البريد الإلكتروني قريباً.',
    },
    formFields: {
      showProjectType: true,
      showBudget: true,
      showTimeline: true,
    },
  },

  analytics: [],
};
