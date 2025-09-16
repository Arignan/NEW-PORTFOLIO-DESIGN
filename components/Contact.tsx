import React, { useState } from 'react';
import Tooltip from './Tooltip';
import { GitHubIcon } from './icons/GitHubIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { EmailIcon } from './icons/EmailIcon';
import { SendIcon } from './icons/SendIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { CheckIcon } from './icons/CheckIcon';

type FormStatus = 'idle' | 'submitting' | 'success';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setStatus('submitting');
            // Simulate a backend call
            setTimeout(() => {
                setStatus('success');
            }, 1500);
        }
    };
    
    const resetForm = () => {
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setStatus('idle');
    };

    if (status === 'success') {
        return (
            <section id="contact" className="py-24 md:py-32 bg-slate-100 dark:bg-slate-900 section-fade-in">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                         <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto">
                            <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-black dark:text-white mt-6">Message Sent!</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                            Thank you for reaching out. I'll get back to you as soon as possible.
                        </p>
                        <button 
                            onClick={resetForm}
                            className="mt-6 bg-black dark:bg-white text-white dark:text-black font-semibold px-6 py-2 rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300"
                        >
                            Send Another Message
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-24 md:py-32 bg-slate-100 dark:bg-slate-900 section-fade-in">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">Get In Touch</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Have a question or want to work together? Fill out the form below.
                    </p>
                </div>
                
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    aria-invalid={!!errors.name}
                                    className={`w-full bg-white dark:bg-slate-800 border rounded-lg px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-black dark:focus:ring-white'}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    aria-invalid={!!errors.email}
                                    className={`w-full bg-white dark:bg-slate-800 border rounded-lg px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-black dark:focus:ring-white'}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={5}
                                required
                                aria-invalid={!!errors.message}
                                className={`w-full bg-white dark:bg-slate-800 border rounded-lg px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 transition-all ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-black dark:focus:ring-white'}`}
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </div>
                        <div className="text-right">
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="inline-flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[180px]"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <SpinnerIcon className="w-5 h-5" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <SendIcon className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="text-center mt-16">
                     <p className="text-slate-600 dark:text-slate-400 mb-6">You can also find me on:</p>
                    <div className="flex justify-center items-center gap-6 stagger-children">
                        <Tooltip text="arignang@gmail.com">
                            <a href="mailto:arignang@gmail.com" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-4 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all duration-300">
                                <EmailIcon className="w-7 h-7" />
                                <span className="sr-only">Email</span>
                            </a>
                        </Tooltip>
                        <Tooltip text="View LinkedIn Profile">
                            <a href="https://www.linkedin.com/in/arignansritharan/" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-4 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all duration-300">
                                <LinkedInIcon className="w-7 h-7" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </Tooltip>
                        <Tooltip text="View GitHub Profile">
                            <a href="https://github.com/arignan" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-4 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all duration-300">
                                <GitHubIcon className="w-7 h-7" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;