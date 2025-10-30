import React, { useState } from 'react';

interface SignupPageProps {
    onSignup: (name: string, email: string, pass: string) => void;
    onSwitchToLogin: () => void;
    onHomeClick: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onSwitchToLogin, onHomeClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignup(name, email, password);
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-slate-950 p-4 relative">
             <button onClick={onHomeClick} className="absolute top-6 left-6 z-20 text-2xl font-extrabold text-white tracking-tight">
                Urban<span className="text-emerald-400">Link</span>
            </button>
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-sm p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Create an Account</h2>
                    <p className="text-slate-400 mt-2">Join UrbanLink to find trusted pros.</p>
                </div>
                <form onSubmit={handleSubmit}>
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

export default SignupPage;
