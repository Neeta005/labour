
import React, { useState } from 'react';
import { Worker } from '../types';

interface ChatModalProps {
    worker: Worker | null;
    isOpen: boolean;
    onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ worker, isOpen, onClose }) => {
    const [message, setMessage] = useState('');

    if (!isOpen || !worker) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleBackdropClick}>
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md h-[70vh] flex flex-col">
                <div className="p-4 flex items-center gap-4 border-b border-slate-700/80">
                    <img src={worker.imageUrl} alt={worker.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <h3 className="font-bold text-white">{worker.name}</h3>
                        <p className="text-xs text-emerald-400">Online</p>
                    </div>
                    <button onClick={onClose} className="ml-auto text-slate-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                    {/* Mocked conversation */}
                    <div className="flex justify-start">
                        <div className="bg-slate-700 p-3 rounded-lg max-w-xs">
                            <p className="text-sm">Hi there! How can I help you with your {worker.service.toLowerCase()} needs today?</p>
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <div className="bg-emerald-600 text-white p-3 rounded-lg max-w-xs">
                            <p className="text-sm">Hello! I was wondering about your availability next week.</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-700/80">
                    <div className="flex items-center gap-2">
                        <input 
                            type="text" 
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-grow bg-slate-800 text-white placeholder-slate-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button className="bg-emerald-500 text-white p-2.5 rounded-full hover:bg-emerald-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
