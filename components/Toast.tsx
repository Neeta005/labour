import React, { useEffect, useState } from 'react';
import { ToastMessage } from '../types';

interface ToastProps extends ToastMessage {
    onClose: () => void;
}

const ICONS = {
    success: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    error: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    info: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

const STYLES = {
    success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    error: 'bg-red-500/20 text-red-300 border-red-500/30',
    info: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
};


const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            const closeTimer = setTimeout(onClose, 300); // Wait for exit animation
            return () => clearTimeout(closeTimer);
        }, 2700);
        return () => clearTimeout(timer);
    }, [onClose]);

    const baseClasses = "flex items-center gap-4 w-full max-w-sm p-4 rounded-xl border shadow-lg backdrop-blur-sm mb-4 transition-all duration-300";
    const animationClasses = isExiting ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0";

    return (
        <div className={`${baseClasses} ${STYLES[type]} ${animationClasses}`}>
            <div>{ICONS[type]}</div>
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button onClick={onClose} className="text-white/50 hover:text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
