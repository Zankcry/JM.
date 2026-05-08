export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

export const primaryNavLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Posts', href: '#posts' },
  { label: 'Pics', href: '#pics' },
];

export const moreNavLinks: NavLink[] = [
  { label: 'Resume', href: '/resume.pdf', description: 'A quick overview of roles and experience.' },
  { label: 'Tutorials', href: '#tutorials', description: 'Practical notes and long-form guides.' },
  { label: 'Notes', href: '#notes', description: 'Short writeups and captured ideas.' },
  { label: 'Terminal', href: '#terminal', description: 'Experimental tools and utilities.' },
];

export const socialLinks: NavLink[] = [
  { label: 'GitHub', href: 'https://github.com/Zankcry', icon: 'brand-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/james-michael-duque-100154350/', icon: 'brand-linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/jme_smichael/?hl=en', icon: 'brand-instagram' },
  { label: 'Resume', href: '/resume.pdf', icon: 'file-cv' },
  { label: 'More about me...', href: '#about', icon: 'user' },
];