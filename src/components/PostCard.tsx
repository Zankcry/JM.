import { Link } from 'react-router-dom';
import { Post } from '../data/posts';
import { useTerminal } from '../context/TerminalContext';

export function PostCard({ post }: { post: Post }) {
  const { setHoveredCommand } = useTerminal();

  return (
    <div className="w-full pb-6">
      <Link 
        to={`/posts/${post.id}`} 
        className="group block w-full"
        onMouseEnter={() => setHoveredCommand(`posts/${post.id}`)}
        onMouseLeave={() => setHoveredCommand(null)}
      >
        <article className="relative flex w-full flex-col gap-3.5 rounded-2xl border border-theme-accent/10 bg-theme-bg/40 p-6 shadow-lg backdrop-blur-sm">
          {/* Top Metadata */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-semibold tracking-wider text-theme-text-muted/60 uppercase">
            <span>{post.date}</span>
            <span aria-hidden="true" className="text-theme-accent/40 font-bold">•</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-theme-accent tracking-widest font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2.5">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-theme-text transition-colors duration-300 group-hover:text-theme-accent sm:text-2xl">
              <span>{post.title}</span>
            </h2>
            <p className="text-[14px] leading-relaxed text-theme-text-muted sm:text-[15px] max-w-2xl font-light">
              {post.description}
            </p>
          </div>

          {/* Bottom indicator */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-theme-accent/70 group-hover:text-theme-accent transition-colors duration-300 mt-1">
            <span>Read full article</span>
          </div>
        </article>
      </Link>
    </div>
  );
}

