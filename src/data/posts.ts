export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    id: 'spine-2d-guide',
    title: 'The Power of Spine 2D in Modern Web Design',
    description: 'A deep dive into why Spine 2D is becoming a staple in high-end web development and how it bridges the gap between design and motion.',
    date: 'May 12, 2026',
    tags: ['Spine', 'Animation', 'UX Design', 'WebDev']
  }
];
