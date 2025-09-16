import React, { useEffect } from 'react';
import type { Project } from '../types';
import { GitHubIcon } from './icons/GitHubIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import CodeSnippet from './CodeSnippet';

interface ProjectDetailPageProps {
    project: Project;
    onClose: () => void;
    onCloseAnimationComplete: () => void;
    isClosing: boolean;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onClose, onCloseAnimationComplete, isClosing }) => {
    
    // Lock body scroll when the detail page is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        
        // Scroll this component to the top on mount
        const pageElement = document.getElementById('project-detail-page');
        if(pageElement) pageElement.scrollTop = 0;

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
        // This event fires for both slide-in and slide-out animations.
        // We only want to trigger the unmount after the slide-out animation is complete.
        if (e.animationName === 'slide-out-to-right') {
            onCloseAnimationComplete();
        }
    };

    const hasGallery = project.gallery && project.gallery.length > 0;
    const hasTechnicalDetails = project.technicalDetails && project.technicalDetails.length > 0;
    const hasCodeSnippet = project.codeSnippet;

    return (
        <div 
            id="project-detail-page"
            className={`fixed inset-0 bg-slate-100 dark:bg-slate-950 z-60 overflow-y-auto ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}
            onAnimationEnd={handleAnimationEnd}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
        >
            <header className="sticky top-0 z-20 bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
                 <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                     <button 
                        onClick={onClose}
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white font-medium transition-colors"
                        aria-label="Back to all projects"
                     >
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>All Projects</span>
                     </button>
                 </div>
            </header>

            <main className="relative z-10 container mx-auto px-6 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">
                    {/* Project Title and Intro */}
                    <div className="text-center mb-12">
                        <h1 id="project-detail-title" className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tight leading-tight">
                            {project.title}
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            {project.detailedDescription}
                        </p>
                    </div>

                    {/* Main Image or Video */}
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-xl shadow-black/10 dark:shadow-black/40">
                         {project.videoUrl ? (
                            <div className="aspect-video w-full bg-black">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={project.videoUrl}
                                    title={`YouTube video player for ${project.title}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover" />
                        )}
                    </div>

                    <div className="space-y-16">
                         {/* Gallery Section */}
                        {hasGallery && (
                             <section>
                                <h2 className="text-2xl font-bold text-black dark:text-white mb-6 border-l-4 border-sky-500 pl-4">Project Gallery</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {project.gallery?.map((imgUrl, index) => (
                                        <div key={index} className="rounded-lg overflow-hidden aspect-video">
                                            <img src={imgUrl} alt={`Gallery image ${index + 1} for ${project.title}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Technical Details Section */}
                        {hasTechnicalDetails && (
                            <section>
                                <h2 className="text-2xl font-bold text-black dark:text-white mb-8 border-l-4 border-sky-500 pl-4">Technical Overview</h2>
                                <div className="space-y-6">
                                    {project.technicalDetails?.map((detail, index) => (
                                        <div key={index}>
                                            <h3 className="text-lg font-semibold text-black dark:text-white">{detail.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 mt-1">{detail.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Code Snippet Section */}
                        {hasCodeSnippet && (
                             <section>
                                <h2 className="text-2xl font-bold text-black dark:text-white mb-6 border-l-4 border-sky-500 pl-4">Code Highlight</h2>
                                {project.codeSnippet?.description && <p className="text-slate-600 dark:text-slate-400 mb-4">{project.codeSnippet.description}</p>}
                                <CodeSnippet language={project.codeSnippet.language} code={project.codeSnippet.code} />
                            </section>
                        )}

                        {/* Links Section */}
                        <section>
                             <h2 className="text-2xl font-bold text-black dark:text-white mb-6 border-l-4 border-sky-500 pl-4">Resources & Links</h2>
                             <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-white bg-black dark:bg-white dark:text-black font-semibold px-6 py-3 rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors" aria-label={`View repository for ${project.title} on GitHub`}>
                                    <GitHubIcon className="w-5 h-5" />
                                    <span>View on GitHub</span>
                                </a>
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-black dark:text-white bg-transparent border border-black dark:border-white font-semibold px-6 py-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label={`View live demo for ${project.title}`}>
                                        <ExternalLinkIcon className="w-5 h-5" />
                                        <span>View Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetailPage;