
import React, { useState } from 'react';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignup: (name: string, email: string, pass: string) => void;
    onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSignup, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignup(name, email, password);
    }
    
    if (!isOpen) return null;
    
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleBackdropClick}>
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-sm">
                <div className="p-6 border-b border-slate-700/80 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Sign Up</h2>
                     <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="name-signup" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                            <input type="text" id="name-signup" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-slate-800 text-white p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div>
                            <label htmlFor="email-signup" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                            <input type="email" id="email-signup" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-800 text-white p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div>
                            <label htmlFor="password-signup" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <input type="password" id="password-signup" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-800 text-white p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                    </div>
                     <button type="submit" className="mt-6 w-full text-center px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Create Account</button>
                     <p className="text-sm text-slate-400 text-center mt-4">
                        Already have an account?{' '}
                        <button type="button" onClick={onSwitchToLogin} className="font-semibold text-emerald-400 hover:underline">Log In</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
