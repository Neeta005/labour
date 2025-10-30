import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => void;
  onSwitchToSignup: () => void;
  onHomeClick: () => void;
}

// A new, more accurate SVG recreation of the user's provided panda lamp image.
const PandaLamp = ({ isLit, onClick }: { isLit: boolean; onClick: () => void; }) => (
    <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 250" 
        className="max-w-md cursor-pointer" 
        onClick={onClick}
        aria-label="Panda Lamp"
        role="button"
    >
        <defs>
            <filter id="panda-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={isLit ? "12" : "0"} result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        
        <g style={{ filter: 'url(#panda-glow)', transition: 'filter 0.7s ease-in-out' }}>
            {/* Back Legs/Stripes */}
            <path d="M 320 180 C 340 120, 280 110, 270 120 L 290 200 Z" fill={isLit ? '#1F2937' : '#111827'} />
            <path d="M 80 180 C 60 120, 120 110, 130 120 L 110 200 Z" fill={isLit ? '#1F2937' : '#111827'} />

            {/* Main Body */}
            <path 
                d="M 25,180 C 25,130 80,100 150,100 H 250 C 320,100 375,130 375,180 C 375,230 320,220 250,220 H 150 C 80,220 25,230 25,180 Z"
                fill={isLit ? '#FFFBEB' : '#D1D5DB'}
                className="transition-colors duration-700 ease-in-out"
            />
            
            {/* Ears */}
            <path d="M 280 105 C 290 75, 320 80, 315 110 Z" fill={isLit ? '#1F2937' : '#111827'} />
            <path d="M 120 105 C 110 75, 80 80, 85 110 Z" fill={isLit ? '#1F2937' : '#111827'} />

            {/* Blush */}
            <circle cx="285" cy="175" r="15" fill="#F472B6" opacity={isLit ? 0.4 : 0} className="transition-opacity duration-500" />
            <circle cx="115" cy="175" r="15" fill="#F472B6" opacity={isLit ? 0.4 : 0} className="transition-opacity duration-500" />

            {/* Eye Patches */}
            <ellipse cx="230" cy="160" rx="28" ry="22" fill={isLit ? '#1F2937' : '#111827'} transform="rotate(-10 230 160)" />
            <ellipse cx="170" cy="160" rx="28" ry="22" fill={isLit ? '#1F2937' : '#111827'} transform="rotate(10 170 160)" />

            {/* Face details */}
            <g opacity={isLit ? 1 : 0.7} className="transition-opacity duration-500">
                <circle cx="200" cy="170" r="4" fill={isLit ? '#1A1A1A' : '#111827'} />
                <path d="M 196,178 Q 200,182 204,178" stroke={isLit ? '#1A1A1A' : '#111827'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
        </g>
    </svg>
);


const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignup, onHomeClick }) => {
  const [isLit, setIsLit] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  const timeline = useRef<gsap.core.Timeline>();

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(hintRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to(backgroundRef.current, { opacity: 1, duration: 1.2, ease: 'power3.out' }, 0)
      .fromTo(formRef.current, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 
      0.5);
  }, []);

  useEffect(() => {
    if (isLit) {
        timeline.current?.play();
    } else {
        timeline.current?.reverse();
    }
  }, [isLit]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B192F] to-[#111827] relative text-white p-4">
        <div 
            ref={backgroundRef}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(252,211,77,0.15),transparent_60%)] opacity-0"
        />

        <button onClick={onHomeClick} className="absolute top-6 left-6 z-20 text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity">
            Urban<span className="text-emerald-400">Link</span>
        </button>
        
        {/* Panda Container */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative">
            <PandaLamp isLit={isLit} onClick={() => setIsLit(p => !p)} />
             <div ref={hintRef} className="text-center text-slate-400 mt-4 animate-pulse">
                <p>Tap the panda to light the way</p>
            </div>
        </div>

        {/* Form Container */}
        <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
             <div ref={formRef} className="w-full max-w-sm p-4 z-10 opacity-0">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                    <div className="text-center mb-6">
                       <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                       <p className="text-slate-400">Sign in to continue</p>
                    </div>
                   <form onSubmit={handleSubmit}>
                       <div className="space-y-4">
                           <div>
                               <label htmlFor="email-login" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                               <input type="email" id="email-login" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-700/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 border border-transparent focus:border-emerald-400 transition-all" placeholder="you@example.com"/>
                           </div>
                           <div>
                               <label htmlFor="password-login" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                               <input type="password" id="password-login" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-700/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 border border-transparent focus:border-emerald-400 transition-all" placeholder="••••••••" />
                           </div>
                       </div>
                       <button type="submit" className="mt-6 w-full text-center px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]">Log In</button>
                       <p className="text-sm text-slate-400 text-center mt-6">
                           New here?{' '}
                           <button type="button" onClick={onSwitchToSignup} className="font-semibold text-emerald-400 hover:underline">Create an account</button>
                       </p>
                   </form>
                </div>
            </div>
        </div>
        
        {/* Grass background */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#062a06] to-transparent z-0">
             <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIHZpZXdCb3g9IjAgMCA0IDQiPgo8cmVjdCBmaWxsPSIjMDQxYzA0IiB3aWR0aD0iNCIgaGVpZ2h0PSI0Ii8+CjxwYXRoIGQ9Ik0wIDBMMiAyTDAgNFptMiAwTDQgMkwyIDRabTAgMkwyIDBMMCAyWk00IDJMMiA0TDAgMloiIHN0cm9rZT0iIzA1MDcwNSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-20"></div>
        </div>
    </div>
  );
};

export default LoginPage;