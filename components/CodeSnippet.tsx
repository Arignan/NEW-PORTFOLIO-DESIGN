import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

// Basic syntax highlighting logic (can be expanded)
const highlightSyntax = (code: string, language: string): string => {
    if (language.toLowerCase() !== 'python') {
        // Basic escaping for non-python code
        return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // A very simple regex-based highlighter for Python keywords, strings, comments, etc.
    let highlightedCode = code
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\b(import|from|as|def|return|while|if|not|in|for|True|False|None|break|continue|class)\b/g, '<span class="token keyword">$&</span>')
        .replace(/(\b\w+)\s*(?=\()/g, (match, funcName) => {
             // Avoid highlighting keywords as functions
            if (/\b(import|from|def|while|if|for|class)\b/.test(funcName)) return match;
            return `<span class="token function">${funcName}</span>`
        })
        .replace(/(['"])(.*?)\1/g, '<span class="token string">$&</span>')
        .replace(/#.*/g, '<span class="token comment">$&</span>')
        .replace(/\b(\d+)\b/g, '<span class="token number">$&</span>');

    return highlightedCode;
};


interface CodeSnippetProps {
    code: string;
    language: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
        });
    };
    
    // Reset the "Copied" state after a short delay
    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    const highlightedCode = highlightSyntax(code, language);

    return (
        <div className="relative code-snippet group">
            <button 
                onClick={handleCopy}
                className="absolute top-3 right-3 bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white rounded-md p-2 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Copy code"
            >
                {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
            </button>
            <pre>
                <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
        </div>
    );
};

export default CodeSnippet;