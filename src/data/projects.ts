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
  screenshots?: string[];
};

export const projects: Project[] = [
  {
    title: "Charlie's Barber & Salon",
    description: "A premium, high-performance static web application for a premier barbershop in Angeles City, featuring Tailwind CSS styling, Firebase Authentication, local SEO schemas, and GA4 analytics tracking.",
    image: '/videos/project_1.webp',
    poster: '/images/project_poster_1.webp',
    tags: ['HTML5', 'TailwindCSS', 'JavaScript', 'Firebase'],
    links: { github: 'https://github.com/Zankcry/Barbershop_Website', live: 'https://charliesbarbershop.vercel.app/' },
    screenshots: [
      '/images/project1Preview_1.png',
      '/images/project1Preview_2.png',
      '/images/project1Preview_3.png',
      '/images/project1Preview_4.png'
    ],
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
    tags: ['Angular', 'TypeScript', 'TailwindCSS'],
    links: { github: 'https://github.com/Zankcry/prelim-project-JM', live: 'https://prelim-project-jm.vercel.app' },
    screenshots: [
      '/images/project2Preview_1.png',
      '/images/project2Preview_2.png',
      '/images/project2Preview_3.png',
      '/images/project2Preview_4.png'
    ],
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
    description: 'A clean, ad-free, cross-platform web and light novel reader app with a Tachiyomi-inspired UI, built using Flutter and a PHP/MySQL REST API backend.',
    image: '/videos/project_3.webp',
    poster: '/images/project_poster_3.png',
    tags: ['Flutter', 'Dart', 'PHP', 'MySQL'],
    links: { github: 'https://github.com/Zankcry/Yomi', live: 'https://yomi.infinityfreeapp.com/' },
    details: {
      subtitle: "TACHIYOMI-INSPIRED CROSS-PLATFORM NOVEL READER",
      detailedDescription: "Yomi (読み) is a clean, ad-free web novel and light novel reader application designed to deliver an immersive and distraction-free reading experience. Drawing inspiration from the popular Tachiyomi interface, Yomi features a responsive dark-themed grid layout, custom reader layouts, and a secure service-oriented PHP/MySQL backend that synchronizes user libraries and reading progress across platforms.",
      architecture: [
        {
          tech: "Flutter (Dart) Frontend",
          description: "Leverages Flutter's cross-platform engine to deploy a unified, responsive client experience across Web, Windows, and mobile viewports."
        },
        {
          tech: "PHP REST API Backend",
          description: "Engineered a lightweight, environment-agnostic PHP REST API served locally via Apache/XAMPP and live in production on InfinityFree hosting."
        },
        {
          tech: "MySQL Relational DB",
          description: "Configured local 'yomi_db' and remote databases tracking user registry tables, novel catalogs, shelf structures, and reading session coordinates."
        },
        {
          tech: "GitHub Actions CI/CD",
          description: "Configured automated continuous deployment pipelines compiling production Flutter Web builds and pushing files via hosting integrations."
        }
      ],
      keyFeatures: [
        "📖 Tachiyomi-inspired interface featuring premium dark modes, fluid grid layouts, and clean shelf collections.",
        "⚡ Distraction-free custom reading view equipped with adjustable font sizes, line heights, and continuous vertical scroll physics.",
        "🔐 Secure user authentication overlays with robust session handlers, secure registration, and password hashing.",
        "🔄 Seamless Local & Production Database Sync keeping reading progress and shelf additions aligned across environments.",
        "📁 Environment-agnostic asset and API routing utilizing relative paths for zero-overhead, modular deployments."
      ]
    }
  },
  {
    title: 'Freedom Wall',
    description: 'A modern, interactive anonymous message board built with Next.js 16 (App Router), React 19, Supabase (PostgreSQL), and Tailwind CSS v4, supporting image uploads and real-time moderation.',
    image: '/videos/project_4.webp',
    poster: '/images/project_poster_4.png',
    tags: ['Next.js', 'React', 'TailwindCSS', 'Supabase', 'TypeScript'],
    links: { github: 'https://github.com/Zankcry/freedom-wall', live: 'https://freedom-wall-three.vercel.app/' },
    details: {
      subtitle: "REAL-TIME ANONYMOUS EXPRESSION PLATFORM",
      detailedDescription: "Freedom Wall is a modern, interactive web application designed for community expression. It provides a secure, fully responsive anonymous portal where users can share authentic thoughts, support messages, whispers, and media uploads. Powering the system is Next.js 16 and React 19, featuring custom glassmorphism styling, real-time Postgres synchronization via Supabase, and a server-verified moderation dashboard.",
      architecture: [
        {
          tech: "Next.js 16 (App Router)",
          description: "Engineered on React 19 and Next.js 16 App Router, utilizing dynamic layouts, strictly-typed API endpoints, and optimized server-side components."
        },
        {
          tech: "Supabase Serverless DB",
          description: "Integrated Supabase for continuous real-time PostgreSQL database synchronization, instant relational queries, and secure database indexing."
        },
        {
          tech: "Tailwind CSS v4.0",
          description: "Leverages the cutting-edge Tailwind CSS v4 engine, incorporating customized color transitions, smooth dark/light mode toggling, and glassmorphic card overlays."
        },
        {
          tech: "Administrative Moderation Core",
          description: "Implemented a password-protected admin dashboard featuring secure server-verified session logins to approve, reject, or soft-delete entries."
        }
      ],
      keyFeatures: [
        "🎨 Premium Glassmorphic UI featuring minimal visual scrollbars, vibrant gradient cards, and gentle floating background stickers.",
        "👤 Anonymous Posting enabling visitors to publish entries safely under customized anonymous codenames.",
        "🖼️ Rich Media Base64 uploads supporting high-quality embedded image shares up to 5MB.",
        "❤️ LocalStorage-backed vote validation alongside custom CSS micro-animations for real-time post likes.",
        "💬 Relational, threaded comment feeds supporting nested replies and anonymous poster tags.",
        "🔄 Soft-deletes and undo actions allowing admins to instantly clean the public board while preserving relational data integrity."
      ]
    }
  },
  {
    title: 'Hubspot Coffee',
    description: 'A premium static and interactive website for Hubspot Coffee. Features a custom dark-themed Leaflet map integration, smooth AOS animations, responsive product lists, and custom customer message boards.',
    image: '/videos/project_5.webp',
    poster: '/images/project_poster_5.png',
    tags: ['HTML5', 'TailwindCSS', 'JavaScript'],
    links: { github: 'https://github.com/Zankcry/HubSpot-Coffee', live: 'https://hub-spot-coffee.vercel.app/index.html' },
    details: {
      subtitle: "PREMIUM DARK STOREFRONT & INTERACTIVE CAFÉ HUB",
      detailedDescription: "Hubspot Coffee is a premium, beautifully crafted café web storefront and customer relations mockup designed for a modern café located directly in front of Holy Angel University in Angeles City. Styled with a sleek, desaturated dark aesthetic, the website integrates interactive client capabilities—such as a dynamic shopping cart and customized dark-themed geographic Leaflet map—alongside dedicated dashboard views for loyalty customer lists and customer message records.",
      architecture: [
        {
          tech: "Premium Dark UI & Spacing",
          description: "Engineered using highly responsive desaturated dark utility blocks, custom scrollbars, Poppins typography, and AOS (Animate On Scroll) to project a premium, cozy café atmosphere."
        },
        {
          tech: "Leaflet.js Dark Cartography",
          description: "Integrated a custom Leaflet map centered at coordinates [15.13438, 120.59136] utilizing CartoDB Dark Matter tile basemaps and custom CSS gold-filtered map markers."
        },
        {
          tech: "Dynamic Mock API Fetching",
          description: "Configured mock API endpoint fetch gateways (/products, /customers) that resolve dynamically based on host environments (localhost:3000 vs. live Vercel production api routes)."
        },
        {
          tech: "Interactive Cart & Ratings JS",
          description: "Implemented custom vanilla JavaScript handling dynamic cart updates, currency price calculation, and interactive click-to-rate star rating states."
        }
      ],
      keyFeatures: [
        "🗺️ Custom Leaflet.js Map highlighting the café's physical location right in front of Holy Angel University with gold-filtered markers.",
        "🛒 Interactive Shopping Cart computing real-time PHP totals and supporting dynamic additions and quantity changes.",
        "⭐ Unique Star Rating System allowing users to rate signature beverages and pastries (Java Chip, Double Strawberry) with instant gold highlight states.",
        "📋 Live Search Filtering enabling instant real-time searches through products, categories, flavor notes, and loyalty databases.",
        "📬 Action-Driven Contact Form routing user submissions automatically to customized Email or Social Media mockups based on selected channels.",
        "👥 Admin CRM Dashboards showcasing full layouts of mock customer loyalty databases and contact records."
      ]
    }
  },
];

