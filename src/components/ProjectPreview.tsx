import { useState } from 'react';

type Project = {
    title: string;
    image: string;
    poster?: string;
};

export function ProjectPreview({ project, className }: { project: Project; className?: string }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className={`relative overflow-hidden ${className || 'aspect-[16/9] border-b border-theme-accent/20 bg-theme-bg/20'}`}
        >
            {/* Poster Image (Static) */}
            {project.poster && (
                <img
                    src={project.poster}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'
                        }`}
                />
            )}

            {/* Animated WebP (Lazy Loaded) */}
            <img
                src={project.image}
                alt={project.title}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
                className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
            />
        </div>
    );
}
