import { Link } from 'react-router-dom';
import { Post } from '../data/posts';


export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/posts/${post.id}`} className="block w-full">
      <article className="group relative flex w-full flex-col gap-3 rounded-2xl border border-theme-border/60 bg-theme-surface/30 p-6 shadow-sm transition-all hover:border-theme-border-strong hover:bg-theme-surface/50">
      {/* Top Metadata */}
      <div className="flex items-center gap-3 text-[11px] font-medium tracking-wide text-theme-text-muted/70">
        <span>{post.date}</span>
        <span aria-hidden="true">•</span>
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-theme-accent uppercase">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold tracking-tight text-theme-text transition-colors group-hover:text-theme-accent sm:text-2xl">
          {post.title}
        </h2>
        <p className="line-clamp-2 text-[14px] leading-relaxed text-theme-text-muted sm:text-[15px]">
          {post.description}
        </p>
      </div>

      {/* Interaction Bar (Optional Reddit-style detail) */}
      <div className="mt-2 flex items-center gap-4 text-xs font-semibold text-theme-text-muted/60">
        <span className="cursor-pointer transition-colors hover:text-theme-accent">Read full post</span>
      </div>
      </article>
    </Link>
  );
}
