import React, { useState } from 'react';
import { generateResearchIdeas } from '../services/geminiService';
import type { ResearchIdea } from '../types';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

const SkeletonCard: React.FC = () => (
    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 animate-pulse">
        <div className="h-5 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-5/6"></div>
        <div className="flex flex-wrap gap-2 mt-4">
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700/80 rounded-full"></div>
            <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700/80 rounded-full"></div>
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700/80 rounded-full"></div>
        </div>
    </div>
);

const IdeaCard: React.FC<{ idea: ResearchIdea }> = ({ idea }) => (
    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
        <h3 className="text-lg font-semibold text-black dark:text-white">{idea.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">{idea.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
            {idea.keywords.map(keyword => (
                <span key={keyword} className="bg-slate-200 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">{keyword}</span>
            ))}
        </div>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => {
    let title = "Oops! Something went wrong.";
    let description = message;

    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('api key')) {
        title = "Invalid API Key";
        description = "The API key configured for this application is either missing or invalid. This feature cannot work without a valid key.";
    } else if (lowerCaseMessage.includes('network error')) {
        title = "Network Connection Error";
        description = "We couldn't connect to the AI service. Please check your internet connection and try again.";
    } else if (lowerCaseMessage.includes('quota')) {
        title = "API Quota Exceeded";
        description = "The request limit for the AI service has been reached. Please try again later.";
    } else if (lowerCaseMessage.includes('api response error')) {
        title = "Service Response Error";
        description = "The AI service returned an unexpected response. This might be a temporary issue. Please try again in a few moments.";
    }

    return (
        <div className="mt-8 bg-red-500/10 dark:bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl text-left flex items-start gap-3">
            <AlertTriangleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    );
};


const ResearchIdeaGenerator: React.FC = () => {
    const [keywords, setKeywords] = useState<string>('');
    const [ideas, setIdeas] = useState<ResearchIdea[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!keywords.trim()) {
            setError('Please enter a topic or keyword.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setIdeas([]);

        try {
            const result = await generateResearchIdeas(keywords);
            setIdeas(result);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const LoadingSpinner: React.FC = () => (
        <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
    );

    return (
        <section id="research-generator" className="py-24 md:py-32 bg-white dark:bg-black section-fade-in">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">Research Idea Generator</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Powered by Google's Gemini API. Enter a topic like 'human-robot interaction' to brainstorm potential research directions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input
                        type="text"
                        value={keywords}
                        onChange={(e) => {
                            setKeywords(e.target.value);
                            if (error) setError(null);
                        }}
                        placeholder="e.g., 'computer vision for robotics'"
                        className="flex-grow w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-black dark:text-white rounded-full px-5 py-3 focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white focus:outline-none transition-all"
                        disabled={isLoading}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !keywords.trim()}
                        className="bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center min-w-[180px]"
                    >
                        {isLoading ? <LoadingSpinner /> : 'Generate Ideas'}
                    </button>
                </div>
                
                <div className="mt-8 text-left grid grid-cols-1 gap-6">
                    {isLoading && (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    )}
                    {error && <ErrorDisplay message={error} />}
                    {ideas.map((idea, index) => (
                       <IdeaCard key={index} idea={idea} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchIdeaGenerator;