export type ProjectDetail = {
  subtitle?: string;
  detailedDescription?: string;
  architecture?: {
    tech: string;
    description: string;
  }[];
  keyFeatures?: string[];
  localSeo?: {
    achievement: string;
    term: string;
    location: string;
    details: string;
  };
  ga4Seo?: {
    strategy: string;
    implementation: string;
    results: string;
  };
};

export type Project = {
  title: string;
  description: string;
  image: string;
  poster?: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
  };
  details?: ProjectDetail;
};

export const projects: Project[] = [
  {
    title: "Charlie's Barber & Salon",
    description: "A premium, high-performance static web application for a premier barbershop in Angeles City, featuring Tailwind CSS styling, Firebase Authentication, local SEO schemas, and GA4 analytics tracking.",
    image: '/videos/project_1.webp',
    poster: '/images/project_poster_1.webp',
    tags: ['HTML5', 'TailwindCSS', 'JavaScript', 'Firebase', 'GA4', 'AOS'],
    links: { github: 'https://github.com/Zankcry/Barbershop_Website', live: 'https://charliesbarbershop.vercel.app/' },
    details: {
      subtitle: "PREMIUM WEB STOREFRONT & LOCAL SEARCH DOMINATION",
      detailedDescription: "Charlie's Barber & Salon is a high-performance, responsive static web application showcasing expert grooming services in Angeles City, Pampanga (conveniently located right in front of Holy Angel University). Meticulously crafted with Tailwind CSS and modern design patterns, this storefront bridges physical craftsmanship and digital visual excellence, driving user engagement, secure user registration, and local organic discovery.",
      architecture: [
        {
          tech: "Semantic HTML5 & SEO Tags",
          description: "Engineered with accessibility-driven attributes, preloaded hero assets, DNS prefetching, and preconnected API gateways to ensure flawless indexing and ultra-fast initial page loads."
        },
        {
          tech: "Tailwind CSS Utility Design",
          description: "Constructed with a premium dark-themed color palette, responsive design tokens, and highly interactive glassmorphic card overlays, completely eliminating stylesheet bloating."
        },
        {
          tech: "Firebase Auth & SDK v10",
          description: "Implemented a secure user authentication system supporting both Google Sign-In and traditional Email/Password credentials, ensuring clean session persistence."
        },
        {
          tech: "AOS & Vanilla JavaScript",
          description: "Leveraged Animate On Scroll (AOS) combined with modular ES6+ JavaScript for micro-animations and interactive state modal management with near-zero runtime overhead."
        }
      ],
      keyFeatures: [
        "🔐 Secure Firebase Auth overlay supporting seamless Google OAuth and Email/Password registration.",
        "📊 Complete Google Analytics 4 (GA4) setup tracking user-id metrics, conversion flows, and booking intent.",
        "🎨 Stunning visual portfolio showcase featuring high-res haircut styles, hair fades, and coloring treatments.",
        "🎥 Embedded dynamic video showcases wrapped in premium glassmorphic media containers with lazy-load optimizations.",
        "📝 SEO-centric static blog with local keywords, educating visitors on hair biology, styling practices, and grooming.",
        "🗺️ Custom geographical navigation elements highlighting the salon's premium location right in front of Holy Angel University."
      ],
      localSeo: {
        achievement: "Top 10 Local Search Authority",
        term: "barbershops in angeles city",
        location: "Angeles City, Pampanga",
        details: "Achieved organic front-page rankings in Google Local Search by implementing three distinct JSON-LD structured schema types (Organization, LocalBusiness, FAQPage). Integrated an XML sitemap, specialized robot crawls, and structured local metadata to capture localized search traffic, resulting in massive visibility jumps."
      },
      ga4Seo: {
        strategy: "Behavioral Analytics & Content Iteration",
        implementation: "Configured Google Analytics 4 (GA4) with custom triggers tracking authentication methods, booking link interaction, and static blog reading retention.",
        results: "By analyzing granular GA4 feedback loops alongside Ahrefs keywords metrics, we optimized site layout architectures and refined the blog knowledge base on hair education, successfully minimizing click-to-book drop-offs."
      }
    }
  },
  {
    title: 'Cognosphere / Hoyoverse Hub',
    description: 'A responsive web portal built with Angular 18+ and Tailwind CSS v4, showcasing flagship games (Genshin Impact, Honkai: Star Rail), global statistics, and a full employee registry system.',
    image: '/videos/project_2.webp',
    poster: '/images/project_poster_2.webp',
    tags: ['Angular', 'TypeScript', 'TailwindCSS', 'AOS', 'RemixIcon'],
    links: { github: 'https://github.com/Zankcry/prelim-project-JM', live: 'https://prelim-project-jm.vercel.app' },
    details: {
      subtitle: "HOYOVERSE-INSPIRED WEB HUB & TEAM REGISTRY",
      detailedDescription: "Cognosphere / Hoyoverse Hub is a premium, fan-made web storefront designed to capture the majestic visual identity of Hoyoverse's properties (such as Genshin Impact and Honkai: Star Rail). Powered by Angular 18+ and styled dynamically with Tailwind CSS v4, the application acts as an immersive catalog highlighting flagship gaming titles, global corporate milestones, and an active internal employee database.",
      architecture: [
        {
          tech: "Angular 18+ Architecture",
          description: "Built using Angular's modern standalone components, utilizing Vite-driven compilation modules and dynamic routing setups to ensure seamless, lightning-fast client transitions."
        },
        {
          tech: "Tailwind CSS v4 Utility Engine",
          description: "Leverages the cutting-edge Tailwind CSS v4 engine for modern responsive spacing, glassmorphic layout blocks, and game-inspired container designs."
        },
        {
          tech: "AOS Animations Core",
          description: "Configured with precise Animate On Scroll (AOS) easing hooks (ease-out-cubic over 800ms) to create premium, immersive entry animations that bring the gaming universes to life."
        },
        {
          tech: "Cinzel & Inter Typography",
          description: "Paired custom Google Fonts, employing the elegant Cinzel serif typeface for game-inspired decorative headings, and Inter/Exo 2 for clean, high-readability user interface text."
        }
      ],
      keyFeatures: [
        "🎬 Dynamic Video Hero section highlighting the legendary corporate slogan 'Tech Otakus Save the World'.",
        "🎮 Immersive Product Grid showcasing Genshin Impact, Honkai: Star Rail, Zenless Zone Zero, and Honkai Impact 3rd with rich animated GIF media states and download triggers.",
        "👥 Complete Employee Directory displaying internal staff (e.g. Lead Engineer Flins, Art Director Lauma), including active statuses, salary levels, contact channels, and avatars.",
        "📊 Milestones Panel illustrating key global statistics such as 500M+ downloads, multi-platform support, and worldwide corporate footprints.",
        "📱 Responsive Viewports optimized from the ground up for desktop, tablet, and mobile browsers with fluid hamburger menu navigation."
      ]
    }
  },
  {
    title: 'Yomi (読み)',
    description: 'A cross-platform light novel and web novel reader application built with Flutter, integrated with a custom PHP backend API. Features user authentication, library management, and progress tracking.',
    image: '/videos/project_3.webp',
    poster: '/images/project_poster_3.png',
    tags: ['Flutter', 'Dart', 'PHP', 'MySQL'],
    links: { github: 'https://github.com/Zankcry/Yomi', live: 'https://yomi.infinityfreeapp.com/' }
  },
  {
    title: 'Freedom Wall',
    description: 'An interactive anonymous message board where users can share authentic feelings, support messages, and whispers. Built with Next.js and TailwindCSS v4, using Supabase for real-time data streaming and instant updates.',
    image: '/videos/project_4.webp',
    poster: '/images/project_poster_4.png',
    tags: ['Next.js', 'React', 'TailwindCSS', 'Supabase', 'TypeScript'],
    links: { github: 'https://github.com/Zankcry/freedom-wall', live: 'https://freedom-wall-three.vercel.app/' }
  },
  {
    title: 'Hubspot Coffee',
    description: 'A premium static and interactive website for Hubspot Coffee. Features a custom dark-themed Leaflet map integration, smooth AOS animations, responsive product lists, and custom customer message boards.',
    image: '/videos/project_5.webp',
    poster: '/images/project_poster_5.png',
    tags: ['HTML5', 'TailwindCSS', 'JavaScript'],
    links: { github: 'https://github.com/Zankcry/HubSpot-Coffee', live: 'https://hub-spot-coffee.vercel.app/index.html' }
  },
];

