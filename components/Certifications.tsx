import React, { useState, useEffect } from 'react';
import type { Certification } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';


const certificationsData: Certification[] = [
  {
    name: 'Deep Learning Specialization',
    issuer: 'Coursera & deeplearning.ai',
    url: 'https://www.coursera.org/specializations/deep-learning',
    imageUrl: 'https://images.unsplash.com/photo-1588666301416-7c917b019b8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    headline: 'Mastering the Foundations of Deep Learning.',
  },
  {
    name: 'ROS for Beginners',
    issuer: 'Udemy',
    url: 'https://www.udemy.com/course/ros-for-beginners/',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    headline: 'Building the Brains for Intelligent Robots.',
  },
  {
    name: 'TensorFlow Developer Certificate',
    issuer: 'TensorFlow',
    url: 'https://www.tensorflow.org/certificate',
    imageUrl: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    headline: 'Deploying Production-Grade AI Models.',
  },
  {
    name: 'Certified SolidWorks Associate (CSWA)',
    issuer: 'Dassault Systèmes',
    url: 'https://www.solidworks.com/solidworks-certification-program',
    imageUrl: 'https://images.unsplash.com/photo-1593118435221-82de49a16f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    headline: 'From Digital Design to Physical Reality.',
  },
  {
    name: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
    imageUrl: 'https://images.unsplash.com/photo-1544890225-2fde0e66ea08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    headline: 'Architecting Intelligence in the Cloud.',
  },
  {
    name: 'NVIDIA Jetson AI Specialist',
    issuer: 'NVIDIA Deep Learning Institute',
    url: 'https://www.nvidia.com/en-us/training/certification/jetson-ai-specialist/',
    imageUrl: 'https://images.unsplash.com/photo-1617863262534-6b71c2f1f3a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    headline: 'Powering Artificial Intelligence at the Edge.',
  },
  {
    name: 'ROS2 Industrial Developer Certificate',
    issuer: 'The Construct',
    url: 'https://www.theconstructsim.com/ros2-industrial-developer-certificate/',
    imageUrl: 'https://images.unsplash.com/photo-1547134332-93822ba9e5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    headline: 'Orchestrating the Next Generation of Robotics.',
  },
];

const SLIDE_DURATION_MS = 5000;

const Certifications: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (isPlaying) {
            const timer = setTimeout(() => {
                setActiveIndex(prev => (prev + 1) % certificationsData.length);
            }, SLIDE_DURATION_MS);
            return () => clearTimeout(timer);
        }
    }, [activeIndex, isPlaying]);

    const handleTabClick = (index: number) => {
        setActiveIndex(index);
        setIsPlaying(true); // Always resume play on manual navigation
    };

    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <section id="certifications" className="py-24 md:py-32 bg-white dark:bg-black section-fade-in overflow-hidden">
            <div className="container mx-auto px-6">
                <header className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">Credentials & Certifications</h2>
                </header>

                <div className="relative w-full max-w-5xl mx-auto aspect-video md:aspect-[16/8] rounded-2xl overflow-hidden bg-slate-200 dark:bg-[#111] shadow-xl shadow-black/20">
                    <div
                        className="flex h-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {certificationsData.map((cert, index) => (
                            <div key={index} className="w-full h-full flex-shrink-0 relative">
                                <img
                                    src={cert.imageUrl}
                                    alt={`Background for ${cert.name}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60"></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                                    <h3 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl transition-opacity duration-500 text-white"
                                        style={{ opacity: activeIndex === index ? 1 : 0 }}
                                    >
                                        {cert.headline}
                                    </h3>
                                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-4 text-sky-400 hover:text-sky-300 transition-colors w-fit">
                                        <span>View Credential</span>
                                        <ExternalLinkIcon className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-5xl mx-auto mt-6 flex flex-col sm:flex-row items-center gap-4">
                    <button
                        onClick={togglePlayPause}
                        className="flex-shrink-0 bg-slate-200 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700/80 backdrop-blur-sm text-slate-800 dark:text-white rounded-full p-3 transition-colors"
                        aria-label={isPlaying ? 'Pause gallery' : 'Play gallery'}
                    >
                        {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                    </button>
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                        {certificationsData.map((cert, index) => (
                            <button
                                key={cert.name}
                                onClick={() => handleTabClick(index)}
                                className={`relative w-full text-left p-3 rounded-lg overflow-hidden transition-colors ${
                                    activeIndex === index ? 'bg-slate-300 dark:bg-slate-700/80' : 'bg-slate-200 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700/80'
                                }`}
                            >
                                <div className="absolute top-0 left-0 h-1 w-full bg-black/10 dark:bg-white/20">
                                    <div
                                        key={`${index}-${activeIndex}-${isPlaying}`}
                                        className={`h-full ${
                                            index < activeIndex ? 'w-full bg-black dark:bg-white' :
                                            index === activeIndex && isPlaying ? 'progress-bar-animate bg-black dark:bg-white' :
                                            'w-0'
                                        }`}
                                        style={{ animationDuration: `${SLIDE_DURATION_MS}ms` }}
                                    />
                                </div>
                                <span className="block text-sm font-semibold mt-2 truncate text-black dark:text-white">{cert.name}</span>
                                <span className="block text-xs text-slate-600 dark:text-slate-400 truncate">{cert.issuer}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;