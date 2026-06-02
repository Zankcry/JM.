export type ProjectDetail = {
  subtitle?: string;
  role?: string;
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
    description: "A fast, responsive website for a local barbershop in Angeles City, featuring clean CSS styling, Firebase authentication, local SEO optimizations, and analytics tracking.",
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
      subtitle: "LOCAL BARBERSHOP STOREFRONT & LOCAL SEO OPTIMIZATION",
      role: "Lead Developer",
      detailedDescription: "Charlie's Barber & Salon is a fast, responsive website displaying barbering and grooming services in Angeles City, Pampanga (conveniently located right in front of Holy Angel University). Built with Tailwind CSS and vanilla JavaScript, it handles user accounts, booking links, and local search discovery.",
      architecture: [
        {
          tech: "Semantic HTML5 & SEO Tags",
          description: "Built with standard SEO tags and accessibility features to help search engines easily find and index the site."
        },
        {
          tech: "Tailwind CSS Styling",
          description: "Styled with a modern dark theme and custom glassmorphic cards, keeping the stylesheet small and quick to load."
        },
        {
          tech: "Firebase Auth",
          description: "Allows clients to sign up and log in securely using Google accounts or their email and password."
        },
        {
          tech: "AOS & Vanilla JavaScript",
          description: "Uses Animate On Scroll (AOS) and modular ES6+ JavaScript for smooth transitions and popups without slowing down the browser."
        }
      ],
      keyFeatures: [
        "🔐 Secure Firebase Auth supporting Google Sign-In and email registrations.",
        "📊 Google Analytics 4 (GA4) tracking to see how users interact with the site and booking links.",
        "🎨 Clean photo portfolio showing haircut styles, fades, and services.",
        "🎥 Embedded hair styling videos loaded lazily to keep the page fast.",
        "📝 Informative blog posts with local keywords regarding grooming.",
        "🗺️ Integrated map directions showing the salon directly in front of Holy Angel University."
      ],
      localSeo: {
        achievement: "First Page Rank for Local Keywords",
        term: "barbershops in angeles city",
        location: "Angeles City, Pampanga",
        details: "Helped the shop appear on the first page of Google Search for local terms by adding JSON-LD schemas (LocalBusiness, Organization, FAQPage), a sitemap, and local metadata."
      },
      ga4Seo: {
        strategy: "User Behavior & Layout Optimization",
        implementation: "Adjusted call-to-actions and blog layout based on user data to make it easier for people to find the booking links.",
        results: "By analyzing user feedback alongside keyword data, we restructured the layout to minimize drop-offs and improve the overall reading experience."
      }
    }
  },
  {
    title: 'Hoyoverse Hub',
    description: 'A responsive fan portal built with Angular 18+ and Tailwind CSS, featuring game catalogs, active stats, search filters, and a custom employee directory with full database management.',
    image: '/videos/project_2.webp',
    poster: '/images/project_poster_2.webp',
    tags: ['Angular', 'TypeScript', 'TailwindCSS'],
    links: { github: 'https://github.com/Zankcry/prelim-project-JM', live: 'https://hoyoverse-hub.vercel.app' },
    screenshots: [
      '/images/project2Preview_1.png',
      '/images/project2Preview_2.png',
      '/images/project2Preview_3.png',
      '/images/project2Preview_4.png'
    ],
    details: {
      subtitle: "HOYOVERSE-THEMED FAN PORTAL & EMPLOYEE DIRECTORY",
      role: "Lead Developer",
      detailedDescription: "Cognosphere / Hoyoverse Hub is a fan-made website inspired by Hoyoverse games like Genshin Impact and Honkai: Star Rail. It is built with Angular 18 and Tailwind CSS, displaying game catalogs, global milestones, and an active employee directory.",
      architecture: [
        {
          tech: "Angular 18+ Standalone",
          description: "Built using Angular standalone components and routing to make page transitions quick."
        },
        {
          tech: "Tailwind CSS Layouts",
          description: "Uses Tailwind's modern utility classes for responsive spacing and clean container designs."
        },
        {
          tech: "AOS Animations",
          description: "Uses Animate On Scroll (AOS) for smooth entry transitions as the user scrolls."
        },
        {
          tech: "Cinzel & Inter Fonts",
          description: "Elegant Cinzel fonts for game-styled headings and highly readable Inter typography for information."
        }
      ],
      keyFeatures: [
        "🎬 Video hero section showing the games' highlights.",
        "🎮 Games grid with screenshots, description, and links.",
        "👥 Fully filterable directory showing staff names, active statuses, roles, and contact info.",
        "📊 Stats section displaying global game milestones.",
        "📱 Clean layout working across desktop, tablet, and mobile browsers."
      ]
    }
  },
  {
    title: 'Yomi (読み)',
    description: 'A clean, ad-free novel reader app with a Tachiyomi-inspired dark UI, built using Flutter. Integrates custom reading views, reading progress syncing, and a PHP/MySQL API backend.',
    image: '/videos/project_3.webp',
    poster: '/images/project_poster_3.png',
    tags: ['Flutter', 'Dart', 'PHP', 'MySQL'],
    links: { github: 'https://github.com/Zankcry/Yomi', live: 'https://yomi.infinityfreeapp.com/' },
    screenshots: [
      '/images/project3Preview_1.png',
      '/images/project3Preview_2.png',
      '/images/project3Preview_3.png',
      '/images/project3Preview_4.png'
    ],
    details: {
      subtitle: "TACHIYOMI-INSPIRED CROSS-PLATFORM NOVEL READER",
      role: "Lead Developer",
      detailedDescription: "Yomi is a clean, ad-free web novel and light novel reader application designed for a comfortable, distraction-free reading experience. Drawing inspiration from the popular Tachiyomi interface, Yomi features a responsive dark-themed grid layout, custom reader layouts, and a PHP/MySQL backend that synchronizes user libraries and reading progress across devices.",
      architecture: [
        {
          tech: "Flutter (Dart) Frontend",
          description: "Uses Flutter's cross-platform engine to deploy a single responsive app for Web, Windows, and mobile screens."
        },
        {
          tech: "PHP REST API Backend",
          description: "A lightweight PHP API served locally via XAMPP and live in production on InfinityFree hosting."
        },
        {
          tech: "MySQL Relational DB",
          description: "Uses a MySQL database to track user profiles, novel catalogs, shelf structures, and reading progress coordinates."
        },
        {
          tech: "GitHub Actions CI/CD",
          description: "Automated pipeline that compiles production Flutter Web builds and pushes updates directly to the web host."
        }
      ],
      keyFeatures: [
        "📖 Tachiyomi-inspired interface featuring dark modes, simple grids, and clean collections.",
        "⚡ Custom reading view with adjustable font sizes, line heights, and vertical scrolling physics.",
        "🔐 User signup and login with secure password hashing.",
        "🔄 Database sync keeping reading progress and shelf additions aligned between different devices.",
        "📁 Modular asset routing utilizing relative paths for easy deployment."
      ]
    }
  },
  {
    title: 'Freedom Wall',
    description: 'A modern, interactive anonymous message board built with Next.js 16, React 19, Supabase, and Tailwind CSS v4, supporting image uploads and real-time moderation.',
    image: '/videos/project_4.webp',
    poster: '/images/project_poster_4.png',
    tags: ['Next.js', 'TailwindCSS', 'Supabase', 'TypeScript'],
    links: { github: 'https://github.com/Zankcry/freedom-wall', live: 'https://freedom-wall-three.vercel.app/' },
    screenshots: [
      '/images/project4Preview_1.png',
      '/images/project4Preview_2.png',
      '/images/project4Preview_3.png',
      '/images/project4Preview_4.png'
    ],
    details: {
      subtitle: "REAL-TIME ANONYMOUS EXPRESSION PLATFORM",
      role: "Solo Developer",
      detailedDescription: "Freedom Wall is an interactive web app where users can share authentic thoughts, support messages, and media uploads anonymously. Built using Next.js 16 and React 19, the site features modern glassmorphism styling, real-time database synchronization via Supabase, and a secure moderation dashboard.",
      architecture: [
        {
          tech: "Next.js 16 & React 19",
          description: "Built on Next.js 16 with the App Router, utilizing dynamic layouts, type-safe API endpoints, and optimized server-side components."
        },
        {
          tech: "Supabase & Postgres",
          description: "Uses Supabase for real-time PostgreSQL database synchronization, instant queries, and secure database indexing."
        },
        {
          tech: "Tailwind CSS v4.0",
          description: "Uses the modern Tailwind CSS v4 engine, incorporating customized color transitions and dark/light mode toggles."
        },
        {
          tech: "Moderation Dashboard",
          description: "Features a password-protected admin dashboard to approve, reject, or restore posts."
        }
      ],
      keyFeatures: [
        "🎨 Glassmorphic UI featuring minimal scrollbars, gradient cards, and subtle animations.",
        "👤 Anonymous Posting enabling visitors to publish entries safely under custom anonymous codenames.",
        "🖼️ Image uploads supporting files up to 5MB encoded as Base64.",
        "❤️ LocalStorage-backed vote validation alongside custom micro-animations for real-time likes.",
        "💬 Relational, threaded comment feeds supporting nested replies and anonymous poster tags.",
        "🔄 Soft-deletes allowing admins to clean the board instantly while preserving relational data integrity."
      ]
    }
  },
  {
    title: 'Hubspot Coffee',
    description: 'A website for Hubspot Coffee. Features a custom dark-themed Leaflet map, smooth scrolling animations, responsive product lists, and a customer message board.',
    image: '/videos/project_5.webp',
    poster: '/images/project_poster_5.png',
    tags: ['HTML5', 'TailwindCSS', 'JavaScript'],
    links: { github: 'https://github.com/Zankcry/HubSpot-Coffee', live: 'https://hub-spot-coffee.vercel.app/index.html' },
    screenshots: [
      '/images/project5Preview_1.png',
      '/images/project5Preview_2.png',
      '/images/project5Preview_3.png',
      '/images/project5Preview_4.png'
    ],
    details: {
      subtitle: "DARK CAFÉ STOREFRONT & CLIENT DASHBOARD MOCKUP",
      role: "Lead Developer",
      detailedDescription: "Hubspot Coffee is a beautifully designed café website and client dashboard mockup for a modern coffee shop located in front of Holy Angel University in Angeles City. Styled with a cozy dark theme, the site features an interactive shopping cart, a custom dark Leaflet map, and dedicated admin dashboard panels for loyalty customers and feedback records.",
      architecture: [
        {
          tech: "Dark UI & Typography",
          description: "Uses cozy dark utility blocks, custom scrollbars, Poppins typography, and AOS (Animate On Scroll) to create a warm, inviting café atmosphere."
        },
        {
          tech: "Leaflet.js Map Integration",
          description: "Includes a custom Leaflet map centered at the café coordinates, styled with CartoDB Dark Matter tiles and gold-tinted map markers."
        },
        {
          tech: "Dynamic API Mocking",
          description: "Configured mock API fetch endpoints (/products, /customers) that resolve dynamically depending on whether the site is running locally or live."
        },
        {
          tech: "Interactive Cart & Ratings",
          description: "Uses custom vanilla JavaScript to handle live shopping cart updates, PHP price calculations, and star rating interactions."
        }
      ],
      keyFeatures: [
        "🗺️ Custom Leaflet.js Map highlighting the café's physical location right in front of Holy Angel University.",
        "🛒 Interactive Shopping Cart computing real-time PHP totals and supporting quantity changes.",
        "⭐ Star Rating System allowing users to rate signature beverages and pastries with instant highlights.",
        "📋 Live Search Filtering enabling instant searches through products, categories, flavor notes, and customer databases.",
        "📬 Contact Form routing user submissions to social media and email mockups based on selected channels.",
        "👥 Admin CRM Dashboards showcasing mock customer loyalty databases and contact records."
      ]
    }
  },
  {
    title: 'Simpler Player',
    description: 'A "Cinematic Terminal" Picture-in-Picture experience for web videos, Reels, and Shorts. Vibe coded as a browser extension using the modern Document PiP API.',
    image: '/videos/project_6.webp',
    poster: '/images/project6Preview_1.png',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    links: { github: 'https://github.com/Zankcry/Simple-Player', live: 'https://chromewebstore.google.com/detail/simple-player-universal-p/nbhenlkfbomgopnkecffgfennnobejfn?authuser=1&hl=en' },
    screenshots: [
      '/images/project6Preview_1.png',
      '/images/project6Preview_2.png',
      '/images/project6Preview_3.png',
      '/images/project6Preview_4.png'
    ],
    details: {
      subtitle: "CINEMATIC TERMINAL PICTURE-IN-PICTURE ENGINE",
      role: "Solo Developer",
      detailedDescription: "Simple Player is a browser extension I vibe coded that uses the modern Document Picture-in-Picture API to pull videos out of their webpages and place them in a floating, fully controllable cinematic window. Designed to support tricky targets like nested iframes, Reels, and Shadow DOM elements, it provides a universal and smooth desktop playback experience with a terminal-style theme.",
      architecture: [
        {
          tech: "Tiered Capture Chain",
          description: "A priority-ordered rendering pipeline featuring Direct PiP (DOM migration), same-origin Iframe Proxy (canvas drawing), cross-origin Iframe Relay (ImageBitmap buffers over postMessage), and DRM Fallback overlays."
        },
        {
          tech: "SyncManager Layer",
          description: "A cross-frame event bus built on chrome.storage.session that syncs play, pause, seek, and volume changes immediately without heavy messaging overhead."
        },
        {
          tech: "BFS Discovery Engine",
          description: "A custom Breadth-First-Search scanner that traverses frame boundaries and Shadow DOMs to find and lock onto active video elements."
        },
        {
          tech: "Cinematic Terminal UI",
          description: "A dark theme using glassmorphism backgrounds (backdrop-filter: blur(20px)) with neon accents, monospace typography, terminal-style audio visualizers, and customized subtitles."
        }
      ],
      keyFeatures: [
        "📺 Universal video extraction using Document Picture-in-Picture to bypass standard webpage container restrictions.",
        "⛓️ Multi-tiered Capture Chain that handles direct, proxy, relay, and DRM-protected media contexts.",
        "⚡ Cross-frame SyncManager ensuring instant playback and volume synchronization across nested frames.",
        "🔍 Shadow DOM-aware BFS scanner to locate and bind to active and visible video elements.",
        "🎨 Dark glassmorphism UI with neon terminal vibes and monospace console styling.",
        "🎵 Shared AudioContext background visualizer streaming real-time frequency data in retro terminal-style graphs.",
        "📝 Animated subtitle rendering supporting standard TextTracks and platforms like YouTube layout."
      ]
    }
  }
];

