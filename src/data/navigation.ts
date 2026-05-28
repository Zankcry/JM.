export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

export const primaryNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Posts', href: '/posts' },
  { label: 'Photos', href: '/photos' },
];


export const socialLinks: NavLink[] = [
  { label: 'GitHub', href: 'https://github.com/Zankcry', icon: 'brand-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/james-michael-duque-100154350/', icon: 'brand-linkedin' },
  { label: 'Resume', href: '/resume.pdf', icon: 'file-cv' },
  { label: 'Mail', href: 'mailto:duquejames657@gmail.com', icon: 'mail' },
  { label: 'About me...', href: '/about', icon: 'user' },
];