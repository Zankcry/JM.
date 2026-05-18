import { useParams, Link } from 'react-router-dom';
import { IconArrowLeft, IconCalendar } from '@tabler/icons-react';

export default function PostDetailPage() {
  const { id } = useParams();

  // Since you want unique designs, we'll check the ID and render the specific post
  if (id !== 'spine-2d-guide') {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <h1 className="text-2xl font-bold text-theme-text">Post not found</h1>
        <Link to="/posts" className="text-theme-accent hover:underline">Back to all posts</Link>
      </div>
    );
  }

  // Metadata for Spine 2D
  const postDate = "May 12, 2026";
  const postTags = ['Spine', 'Animation', 'UX Design', 'WebDev'];

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-12 pt-8 sm:pt-14 lg:pt-16 pb-20 sm:pb-32">
      {/* Navigation & Back Button */}
      <Link
        to="/posts"
        className="group flex items-center gap-2 text-sm font-medium text-theme-text-muted transition-colors hover:text-theme-accent"
      >
        <IconArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        Back to Posts
      </Link>

      {/* Hero Header */}
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-theme-accent">
            <IconCalendar size={14} />
            {postDate}
          </div>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tighter text-theme-text sm:text-6xl lg:text-7xl">
            The Power of <span className="text-theme-accent">Spine 2D</span> in Modern Web Design
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {postTags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-theme-accent/20 bg-theme-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-theme-accent"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Decorative Line */}
      <div className="h-px w-full bg-gradient-to-r from-theme-accent/40 via-theme-accent/20 to-transparent" />

      {/* Structured Content - Manually Styled */}
      <div className="flex flex-col gap-16 text-[17px] leading-relaxed text-theme-text-muted sm:text-[18px]">

        {/* Section 1 */}
        <section className="flex flex-col gap-6">
          <h2 className="flex items-center gap-4 text-2xl font-bold tracking-tight text-theme-text">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-theme-accent/10 text-xs text-theme-accent">01</span>
            What is Spine 2D?
          </h2>
          <p>
            Spine 2D is a revolutionary tool that allows designers and developers to create <span className="font-semibold text-theme-text">interactive, vector-based animations</span> that run natively in the browser. Unlike traditional video formats like MP4 or static GIFs, Spine exports "scenes" that remain fully interactive.
          </p>
          <div className="rounded-xl border border-theme-accent/20 bg-theme-bg p-4 italic text-theme-accent shadow-lg">
            "This means elements can follow the user's cursor, react to clicks, or change state based on scroll position."
          </div>
        </section>

        {/* Section 2 */}
        <section className="flex flex-col gap-6">
          <h2 className="flex items-center gap-4 text-2xl font-bold tracking-tight text-theme-text">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-theme-accent/10 text-xs text-theme-accent">02</span>
            Why is it used?
          </h2>
          <p>
            The primary reason Spine 2D is used is <strong className="text-theme-accent underline decoration-theme-accent/30 underline-offset-4">Performance and Interactivity</strong>. Traditional high-fidelity animations usually require heavy video files that slow down page loads.
          </p>
          <p>
            Spine uses WebGL and small vector data, allowing for complex motion that is incredibly lightweight. It's used by top-tier brands to create a "premium" feel that static sites simply can't match.
          </p>
          <p>
            Its very cool! Sites like <a href="https://www.zenlesszonezero.com" className="text-theme-accent">Zenlesszonezero </a> uses it for their website, take a look!
          </p>

          <div className="overflow-hidden rounded-xl border border-theme-accent/20 bg-theme-bg shadow-lg">
            <img
              src="/videos/spine2d.webp"
              alt="Spine 2D Demonstration"
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-2 px-1 text-[11px] font-medium text-theme-text-muted/60">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-theme-accent/10 text-[10px] text-theme-accent">!</span>
            Note: All assets shown above are taken from the official Zenless Zone Zero website.
          </div>
        </section>

        {/* Section 3 */}
        <section className="flex flex-col gap-6">
          <h2 className="flex items-center gap-4 text-2xl font-bold tracking-tight text-theme-text">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-theme-accent/10 text-xs text-theme-accent">03</span>
            The Bridge to Web Dev
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-theme-accent/20 bg-theme-bg p-4 shadow-lg">
              <h3 className="mb-2 text-sm font-bold uppercase text-theme-accent">How it's used</h3>
              <p className="text-sm leading-relaxed">Designers create the scene, and developers embed it using a simple React component. You can easily control states via code.</p>
            </div>
            <div className="rounded-xl border border-theme-accent/20 bg-theme-bg p-4 shadow-lg">
              <h3 className="mb-2 text-sm font-bold uppercase text-theme-accent">The Complement</h3>
              <p className="text-sm leading-relaxed">It allows the designer to build the motion and the developer to implement it exactly as intended.</p>
            </div>
          </div>
          <p>Heres another Example! From <a href="https://www.youtube.com/@yuphi_kid" className="text-theme-accent">Yuphi</a> a youtuber showcasing and making tutorials about Spine2D</p>

          <div className="overflow-hidden rounded-xl border border-theme-accent/20 bg-theme-bg shadow-lg">
            <img
              src="/videos/spine2d_2.webp"
              alt="Spine 2D Tutorial Example"
              className="w-full"
            />
          </div>
        </section>

        {/* Conclusion */}
        <section className="flex flex-col gap-6">
          <h2 className="flex items-center gap-4 text-2xl font-bold tracking-tight text-theme-text">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-theme-accent/10 text-xs text-theme-accent">04</span>
            Final Thoughts
          </h2>
          <p>
            Overall, I think Spine2d is a great tool for creating interactive animations that can be embedded in websites. It's easy to use and can be used to create a variety of different animations. Not to mention the performance benefits!
          </p>
          <p>
            Its why im learning it and hope to use it in my future projects! Thats all about what i think of it so far. Arigatou Gozaimasu and Sayonara!👋❤️❤️
          </p>
        </section>

      </div>

      {/* Footer */}
      <footer className="flex flex-col gap-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-theme-accent/40 to-transparent" />
        <p className="text-center text-sm font-medium text-theme-text-muted/60">
          Thanks for reading! Check out my other posts or head back to the homepage.
        </p>
      </footer>
    </article>
  );
}
