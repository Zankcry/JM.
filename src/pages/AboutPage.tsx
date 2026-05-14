import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconBrandSpotify } from '@tabler/icons-react';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconFileCv,
  IconStar,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { allPhotos } from '../data/photos';


type SpotifyEmbed = {
  type: 'track' | 'playlist';
  id: string;
};

const spotifyPlaylist: SpotifyEmbed = { type: 'playlist', id: '4JBe2E2lZx0HWE8fMynVo5' };

type JpWord = {
  kanji: string;
  furigana: string;
  romaji: string;
  pos: string; // part of speech
  meaning: string;
  example?: { jp: string; en: string };
};

const jpWords: JpWord[] = [
  { kanji: '頑張る', furigana: 'がんばる', romaji: 'ganbaru', pos: 'verb', meaning: 'To do one\'s best; to persist; to hang in there', example: { jp: '毎日頑張っています。', en: 'I\'m doing my best every day.' } },
  { kanji: '懐かしい', furigana: 'なつかしい', romaji: 'natsukashii', pos: 'adjective', meaning: 'Nostalgic; fondly remembered', example: { jp: 'この曲は懐かしいな。', en: 'This song brings back memories.' } },
  { kanji: '相変わらず', furigana: 'あいかわらず', romaji: 'aikawarazu', pos: 'adverb', meaning: 'Your still the cutest', example: { jp: '相変わらず可愛いね。', en: 'You are still the cutest.' } },
  { kanji: '物語', furigana: 'ものがたり', romaji: 'monogatari', pos: 'noun', meaning: 'Story; tale; narrative', example: { jp: '面白い物語を読んだ。', en: 'I read an interesting story.' } },
  { kanji: 'いつか会える', furigana: 'いつかあえる', romaji: 'itsuka aeru', pos: 'phrase', meaning: 'I hope to see you someday', example: { jp: 'いつかまた会えるのを楽しみにしています。', en: 'I look forward to seeing you again someday.' } },
  { kanji: '縁', furigana: 'えん', romaji: 'en', pos: 'noun', meaning: 'Fate; destiny; a karmic bond between people', example: { jp: '不思議な縁で出会った。', en: 'We met through a mysterious fate.' } },
  { kanji: '原動力', furigana: 'げんどうりょく', romaji: 'gendouryoku', pos: 'noun', meaning: 'Your my motivation', example: { jp: '君は僕の原動力だよ。', en: 'You are the driving force that keeps me going.' } },
  { kanji: '夢中', furigana: 'むちゅう', romaji: 'muchuu', pos: 'noun/adjective', meaning: 'Absorbed in; crazy about; engrossed', example: { jp: 'ゲームに夢中になった。', en: 'I got completely absorbed in the game.' } },
  { kanji: '雰囲気', furigana: 'ふんいき', romaji: 'fun\'iki', pos: 'noun', meaning: 'Atmosphere; vibe; ambiance', example: { jp: 'いい雰囲気のカフェだ。', en: 'It\'s a café with a nice vibe.' } },
  { kanji: '恋しい', furigana: 'こいしい', romaji: 'koishii', pos: 'adjective', meaning: 'I absolutely miss someone', example: { jp: '君の声が恋しい。', en: 'I absolutely miss hearing your voice.' } },
  { kanji: '切ない', furigana: 'せつない', romaji: 'setsunai', pos: 'adjective', meaning: 'Heartbreaking; melancholic; aching', example: { jp: '切ない音楽が好きだ。', en: 'I like melancholic music.' } },
  { kanji: '積み重ねる', furigana: 'つみかさねる', romaji: 'tsumikasaneru', pos: 'verb', meaning: 'To pile up; to accumulate (effort, experience)', example: { jp: '経験を積み重ねる。', en: 'To accumulate experience.' } },
];

// Deterministically pick a word based on ISO week number
function getWeekWord(): JpWord {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
  return jpWords[weekNumber % jpWords.length];
}

function WordOfTheWeek() {
  const word = getWeekWord();
  return (
    <section id="word-of-the-week" className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.35em] text-theme-text-muted/80">
          Word of the Week
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-theme-accent/30" />
        <span className="text-[11px] font-mono text-theme-text-muted/50">日本語</span>
      </div>

      {/* Card */}
      <div className="group relative overflow-hidden rounded-xl border border-theme-accent/20 bg-theme-bg p-6 sm:p-8 shadow-lg transition hover:border-theme-accent/50">
        {/* Decorative kanji watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-6 select-none text-[9rem] font-bold leading-none text-theme-text opacity-[0.04] transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.10]"
        >
          {word.kanji}
        </span>

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
          {/* Left: kanji + furigana */}
          <div className="flex flex-col items-start gap-1 shrink-0 sm:min-w-[140px]">
            <div className="pt-2">
              <ruby className="text-5xl font-bold text-theme-text [ruby-align:start]">
                {word.kanji}
                <rt className="text-sm font-normal text-theme-accent tracking-widest text-left pb-1">{word.furigana}</rt>
              </ruby>
            </div>
            <span className="text-xs font-mono text-theme-text-muted/60 mt-2 tracking-wider">{word.romaji}</span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px self-stretch bg-theme-accent/30" />
          <div className="block sm:hidden h-px w-full bg-theme-accent/30" />

          {/* Right: meaning + example */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-theme-accent/30 bg-theme-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-theme-accent">
                {word.pos}
              </span>
              <p className="text-base text-theme-text leading-relaxed">{word.meaning}</p>
            </div>

            {word.example && (
              <div className="rounded-xl border border-theme-accent/20 bg-theme-bg/40 px-4 py-3 shadow-sm">
                <p className="text-sm text-theme-text font-medium">{word.example.jp}</p>
                <p className="text-xs text-theme-text-muted mt-1 italic">{word.example.en}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const [randomPhoto, setRandomPhoto] = useState(allPhotos[Math.floor(Math.random() * allPhotos.length)]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setRandomPhoto(allPhotos[Math.floor(Math.random() * allPhotos.length)]);
        setIsFading(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-16 w-full pt-8 sm:pt-14 lg:pt-16 pb-20 sm:pb-32">

      {/* ── Page header ─────────────────────────────────── */}
      <header className="flex w-full items-center gap-6">
        <h1 className="shrink-0 text-4xl font-bold tracking-tight text-theme-text sm:text-5xl">
          About Me
        </h1>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-theme-accent/40" />
      </header>

      {/* ── Hero bio ────────────────────────────────────── */}
      <section className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        {/* Avatar + quick facts */}
        <div className="flex shrink-0 flex-col items-center gap-6 lg:items-start lg:pt-2">
          <div className="relative">
            <div className="h-48 w-48 overflow-hidden rounded-xl border-2 border-theme-accent/20 bg-theme-bg shadow-xl">
              <img
                src="/images/profilePic.jpg"
                alt="James Michael"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Chibi character overlay */}
            <video
              src="/videos/chibi.webm"
              autoPlay
              loop
              muted
              playsInline
              className="absolute -bottom-5 -right-9 h-20 w-20 object-contain drop-shadow-lg pointer-events-none"
            />
          </div>

          <div className="text-left">
            <p className="text-lg font-semibold text-theme-text">James Michael</p>
            <p className="text-xs font-mono text-theme-text-muted tracking-widest">ジェームズ・マイケル</p>
            <p className="text-sm text-theme-accent">@Zankcry</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 text-theme-text-muted">
            {[
              { icon: IconBrandGithub, href: 'https://github.com/Zankcry', label: 'GitHub' },
              { icon: IconBrandLinkedin, href: 'https://www.linkedin.com/in/james-michael-duque-100154350/', label: 'LinkedIn' },
              { icon: IconBrandInstagram, href: 'https://www.instagram.com/jme_smichael/?hl=en', label: 'Instagram' },
              { icon: IconFileCv, href: '/resume.pdf', label: 'Resume' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-lg p-2 transition hover:bg-theme-surface/60 hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-focus"
              >
                <Icon size={18} stroke={1.8} />
              </a>
            ))}
          </div>
        </div>

        {/* Bio text */}
        <div className="flex flex-col gap-5 text-base leading-8 text-theme-text-muted sm:text-[17px]">
          <p>
            Yahho! (やっほー) I&apos;m an IT undergraduate from{' '}
            <span className="text-theme-accent">Holy Angel University</span> based in{' '}
            <span className="text-theme-accent">
              Pampanga, Philippines{' '}
              <img
                src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1f5-1f1ed.svg"
                alt="🇵🇭"
                className="inline-block h-[1.1em] w-auto align-middle mb-0.5"
              />
            </span>. I&apos;m
            primarily a <span className="text-theme-accent">Frontend Web Developer</span>,
            but I&apos;m fully capable of working across the{' '}
            <span className="text-theme-accent">Full Stack</span>. I am currently{' '}
            <span className="text-theme-accent">looking for internships</span> to further
            apply my knowledge in real-world environments.
          </p>
          <p>
            I&apos;ve worked on personal projects and helped a local barbershop achieve <span className="text-theme-accent">Top 10</span> on seo local search. Right now I&apos;m deep in learning{' '}
            <a
              href="https://esotericsoftware.com/"
              target="_blank"
              rel="noreferrer"
              className="text-theme-accent px-1.5 py-0.5 rounded-md transition hover:bg-theme-accent/20"
            >
              Spine 2D
            </a>{' '}
            to animate characters and build richer UI experiences.
          </p>
          <p>
            Outside the screen, I spend my free time learning{' '}
            <span className="text-theme-accent">Japanese</span> and diving into anime and
            manga, especially ones with <span className="text-theme-accent">amazing visuals</span>.
            I also tinker with PC builds, OS-hop for fun, and build browser extensions nobody asked for.
          </p>
        </div>
      </section>

      {/* ── Word of the Week ─────────────────────────────── */}
      <WordOfTheWeek />

      {/* ── Music I Code To ─────────────────────────────── */}
      <section id="music" className="flex flex-col gap-6 pb-4">
        {/* Section header */}
        <div className="flex items-center gap-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.35em] text-theme-text-muted/80">
            Music I Code To
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-theme-accent/30 to-transparent" />
          {/* Animated equalizer bars */}
          <div className="flex items-end gap-[3px]" aria-hidden="true">
            {[12, 18, 10, 16, 8].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-theme-accent"
                style={{
                  height: `${h}px`,
                  animation: `eq-bounce ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
          <a
            href="https://open.spotify.com/user/zankcry"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-[#1DB954] transition hover:opacity-80"
          >
            <IconBrandSpotify size={14} />
            Spotify
          </a>
        </div>

        {/* Two-column layout for Music */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Random Photo */}
          <div className="flex flex-col lg:h-[352px]">
            <div className="group relative h-full w-full overflow-hidden rounded-xl border border-theme-accent/20 bg-theme-bg shadow-lg transition hover:border-theme-accent/50">
              <Link
                to="/pics"
                className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-theme-bg/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-theme-text backdrop-blur-md opacity-0 transition-all duration-300 hover:bg-theme-accent hover:text-theme-on-accent group-hover:opacity-100"
              >
                <span>View All</span>
                <IconArrowUpRight size={12} stroke={2.5} />
              </Link>
              <div className={`h-full w-full transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <img
                  src={randomPhoto.src}
                  alt={randomPhoto.id}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                <p className="absolute bottom-3 left-4 text-[10px] font-mono text-theme-text opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none">
                  {randomPhoto.comment}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Playlist */}
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-xl border border-theme-accent/20 bg-theme-bg shadow-lg transition hover:border-theme-accent/50">
              <iframe
                src={`https://open.spotify.com/embed/playlist/${spotifyPlaylist.id}?utm_source=generator&theme=1`}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-0 w-full block"
                title="Spotify playlist"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
