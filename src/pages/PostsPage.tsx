import { IconArticle } from '@tabler/icons-react';
import { PostCard } from '../components/PostCard';
import { StatusSidebar } from '../components/StatusSidebar';
import { posts } from '../data/posts';

export default function PostsPage() {
  return (
    <div className="flex flex-1 flex-col items-start gap-12 w-full pt-8 sm:pt-14 lg:pt-16">
      {/* Header same as Projects Page */}
      <header className="flex w-full items-center gap-6">
        <h1 className="flex shrink-0 items-center gap-3 text-4xl font-bold tracking-tight text-theme-text sm:text-5xl">
          <IconArticle size={42} stroke={2.5} className="text-theme-accent" />
          Posts
        </h1>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-theme-border/60" />
      </header>

      {/* Main Content Layout */}
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Reddit-style Vertical Feed */}
        <div className="flex flex-1 max-w-3xl flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Sidebar for "What I'm doing" */}
        <StatusSidebar />
      </div>
    </div>
  );
}
