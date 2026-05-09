export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    id: 'spline-2d-guide',
    title: 'The Power of Spline 2D in Modern Web Design',
    description: 'A deep dive into why Spline 2D is becoming a staple in high-end web development and how it bridges the gap between design and motion.',
    date: 'May 9, 2026',
    tags: ['Spline', 'Animation', 'UX Design', 'WebDev']
  }
];
