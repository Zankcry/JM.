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
  },
  {
    id: '3',
    title: 'Jujutsu Kaisen',
    description: 'A high-stakes supernatural battle manga following Yuji Itadori as he enters the world of Jujutsu Sorcerers to combat powerful Curses.',
    rating: 10,
    status: 'Finished',
    image: '/images/jujutsuKaisen.webp'
  },
  {
    id: '4',
    title: 'Demon Slayer',
    description: 'A masterpiece by Koyoharu Gotouge. The manga offers a complete and emotional conclusion to Tanjiro\'s journey to save his sister.',
    rating: 10,
    status: 'Finished',
    image: '/images/demonSlayer.webp'
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
  },
  {
    id: '3',
    title: 'Jujutsu Kaisen',
    description: 'A visually stunning adaptation by MAPPA, featuring incredible fight choreography and a dark, compelling supernatural world.',
    rating: 10,
    status: 'Finished',
    image: '/images/jujutsuKaisen.webp'
  },
  {
    id: '4',
    title: 'Hunter x Hunter',
    description: 'A masterpiece of storytelling and power systems. Gon\'s journey to find his father is legendary, with complex characters and deep themes.',
    rating: 10,
    status: 'Finished',
    image: '/images/hxh.webp'
  }
];
