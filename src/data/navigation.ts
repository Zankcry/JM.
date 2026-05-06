export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNavLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pics', href: '#pics' },
];

export const moreNavLinks: NavLink[] = [
  { label: 'Resume', href: '/resume.pdf', description: 'A quick overview of roles and experience.' },
  { label: 'Tutorials', href: '#tutorials', description: 'Practical notes and long-form guides.' },
  { label: 'Notes', href: '#notes', description: 'Short writeups and captured ideas.' },
  { label: 'Terminal', href: '#terminal', description: 'Experimental tools and utilities.' },
];

export const socialLinks: NavLink[] = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'X', href: 'https://x.com/' },
  { label: 'More about me', href: '#about' },
];