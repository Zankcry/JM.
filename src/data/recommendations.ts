export type Recommendation = {
  id: string;
  title: string;
  description: string;
  rating: number; // 1-10
  status: 'Reading' | 'Finished' | 'Watching' | 'Plan to Watch';
  image?: string;
};

export const mangaRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Random Chat',
    description: 'A compelling psychological drama about Joonwoo, a loner who discovers the true nature of his peers through an anonymous chat app.',
    rating: 10,
    status: 'Reading',
    image: '/images/randomChat.webp'
  },
  {
    id: '2',
    title: 'My Bias Gets on the Last Train',
    description: 'A story about a fan who unexpectedly ends up on the same last train as their favorite idol, written by JIXKSEE.',
    rating: 8,
    status: 'Reading',
    image: '/images/myBias.webp'
  }
];

export const animeRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Demon Slayer',
    description: 'A visual masterpiece by Koyoharu Gotouge. Tanjiros journey to save his sister is emotionally gripping and beautifully animated.',
    rating: 10,
    status: 'Finished',
    image: '/images/demonSlayer.webp'
  },
  {
    id: '2',
    title: 'Black Clover',
    description: 'A story about never giving up. Astas journey from a magic-less boy to a powerful wizard knight is truly inspiring.',
    rating: 9,
    status: 'Finished',
    image: '/images/blackClover.webp'
  }
];
