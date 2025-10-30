import React, { useState, useEffect, useRef } from 'react';

// Advanced animated panda lamp with blinking eyes, twitching nose, and more
const PandaLamp = ({ isLit, onClick }: { isLit: boolean; onClick: () => void; }) => {
    const [isBlinking, setIsBlinking] = useState(false);
    const [noseTwitch, setNoseTwitch] = useState(0);
    const [earWiggle, setEarWiggle] = useState(0);
    const [eyeDirection, setEyeDirection] = useState({ x: 0, y: 0 });
    const [mouthExpression, setMouthExpression] = useState(0);
    const [bodyBounce, setBodyBounce] = useState(0);
    
    useEffect(() => {
        // Random blinking
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        }, Math.random() * 3000 + 2000);
        
        // Nose twitch animation
        const noseInterval = setInterval(() => {
            setNoseTwitch(1);
            setTimeout(() => setNoseTwitch(0), 200);
        }, Math.random() * 4000 + 3000);
        
        // Ear wiggle
        const earInterval = setInterval(() => {
            setEarWiggle(1);
            setTimeout(() => setEarWiggle(0), 400);
        }, Math.random() * 5000 + 4000);
        
        // Eye movement (subtle)
        const eyeInterval = setInterval(() => {
            setEyeDirection({
                x: (Math.random() - 0.5) * 6,
                y: (Math.random() - 0.5) * 3
            });
        }, Math.random() * 2000 + 1500);
        
        // Mouth expression changes
        const mouthInterval = setInterval(() => {
            setMouthExpression(Math.random() > 0.7 ? 1 : 0);
        }, Math.random() * 6000 + 4000);
        
        // Body breathing animation
        const breatheInterval = setInterval(() => {
            setBodyBounce(1);
            setTimeout(() => setBodyBounce(0), 1000);
        }, 3000);
        
        return () => {
            clearInterval(blinkInterval);
            clearInterval(noseInterval);
            clearInterval(earInterval);
            clearInterval(eyeInterval);
            clearInterval(mouthInterval);
            clearInterval(breatheInterval);
        };
    }, []);
    
    return (
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
                <radialGradient id="body-gradient">
                    <stop offset="0%" stopColor={isLit ? '#FFFEF5' : '#E5E7EB'} />
                    <stop offset="100%" stopColor={isLit ? '#FEF3C7' : '#D1D5DB'} />
                </radialGradient>
                <radialGradient id="blush-gradient">
                    <stop offset="0%" stopColor="#F472B6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#F472B6" stopOpacity="0.2" />
                </radialGradient>
            </defs>
            
            <g style={{ filter: 'url(#panda-glow)', transition: 'filter 0.7s ease-in-out' }}>
                {/* Back Legs/Stripes */}
                <path 
                    d="M 320 180 C 340 120, 280 110, 270 120 L 290 200 Z" 
                    fill={isLit ? '#1F2937' : '#111827'} 
                    style={{ transition: 'fill 0.7s' }} 
                />
                <path 
                    d="M 80 180 C 60 120, 120 110, 130 120 L 110 200 Z" 
                    fill={isLit ? '#1F2937' : '#111827'} 
                    style={{ transition: 'fill 0.7s' }} 
                />

                {/* Main Body with gradient and breathing animation */}
                <g style={{ 
                    transform: `scale(${1 + bodyBounce * 0.02}) translateY(${-bodyBounce * 2}px)`,
                    transformOrigin: 'center',
                    transition: 'transform 1s ease-in-out'
                }}>
                    <path 
                        d="M 25,180 C 25,130 80,100 150,100 H 250 C 320,100 375,130 375,180 C 375,230 320,220 250,220 H 150 C 80,220 25,230 25,180 Z"
                        fill="url(#body-gradient)"
                        style={{ 
                            transform: `scale(${isLit ? 1.02 : 1})`,
                            transformOrigin: 'center',
                            transition: 'transform 0.7s ease-in-out'
                        }}
                    />
                    
                    {/* Ears with wiggle animation */}
                    <path 
                        d="M 280 105 C 290 75, 320 80, 315 110 Z" 
                        fill={isLit ? '#1F2937' : '#111827'} 
                        style={{ 
                            transform: `rotate(${earWiggle * 8}deg)`,
                            transformOrigin: '297px 92px',
                            transition: 'transform 0.2s ease-out, fill 0.7s'
                        }}
                    />
                    <path 
                        d="M 120 105 C 110 75, 80 80, 85 110 Z" 
                        fill={isLit ? '#1F2937' : '#111827'} 
                        style={{ 
                            transform: `rotate(${-earWiggle * 8}deg)`,
                            transformOrigin: '103px 92px',
                            transition: 'transform 0.2s ease-out, fill 0.7s'
                        }}
                    />

                    {/* Enhanced Blush with gradient and pulse */}
                    <circle 
                        cx="285" 
                        cy="175" 
                        r={isLit ? 17 : 15} 
                        fill="url(#blush-gradient)"
                        opacity={isLit ? 0.8 : 0} 
                        style={{ transition: 'all 0.7s ease-in-out' }}
                    />
                    <circle 
                        cx="115" 
                        cy="175" 
                        r={isLit ? 17 : 15} 
                        fill="url(#blush-gradient)"
                        opacity={isLit ? 0.8 : 0} 
                        style={{ transition: 'all 0.7s ease-in-out' }}
                    />

                    {/* Eye Patches */}
                    <ellipse 
                        cx="230" 
                        cy="160" 
                        rx="28" 
                        ry="22" 
                        fill={isLit ? '#1F2937' : '#111827'} 
                        transform="rotate(-10 230 160)" 
                        style={{ transition: 'fill 0.7s' }} 
                    />
                    <ellipse 
                        cx="170" 
                        cy="160" 
                        rx="28" 
                        ry="22" 
                        fill={isLit ? '#1F2937' : '#111827'} 
                        transform="rotate(10 170 160)" 
                        style={{ transition: 'fill 0.7s' }} 
                    />

                    {/* Animated Eyes */}
                    <g style={{ transition: 'opacity 0.15s' }} opacity={isBlinking ? 0 : 1}>
                        {/* Left Eye */}
                        <ellipse 
                            cx={175 + eyeDirection.x} 
                            cy={160 + eyeDirection.y} 
                            rx="6" 
                            ry="8" 
                            fill={isLit ? '#1A1A1A' : '#374151'}
                            style={{ transition: 'all 0.5s ease-out' }}
                        />
                        <ellipse 
                            cx={176 + eyeDirection.x} 
                            cy={158 + eyeDirection.y} 
                            rx="2" 
                            ry="3" 
                            fill="white"
                            opacity={isLit ? 0.9 : 0.3}
                            style={{ transition: 'all 0.5s ease-out' }}
                        />
                        
                        {/* Right Eye */}
                        <ellipse 
                            cx={225 + eyeDirection.x} 
                            cy={160 + eyeDirection.y} 
                            rx="6" 
                            ry="8" 
                            fill={isLit ? '#1A1A1A' : '#374151'}
                            style={{ transition: 'all 0.5s ease-out' }}
                        />
                        <ellipse 
                            cx={226 + eyeDirection.x} 
                            cy={158 + eyeDirection.y} 
                            rx="2" 
                            ry="3" 
                            fill="white"
                            opacity={isLit ? 0.9 : 0.3}
                            style={{ transition: 'all 0.5s ease-out' }}
                        />
                    </g>
                    
                    {/* Blinking eyes (closed) */}
                    <g style={{ transition: 'opacity 0.15s' }} opacity={isBlinking ? 1 : 0}>
                        <path 
                            d="M 169,160 Q 175,158 181,160" 
                            stroke={isLit ? '#1A1A1A' : '#374151'} 
                            strokeWidth="2" 
                            fill="none" 
                            strokeLinecap="round"
                        />
                        <path 
                            d="M 219,160 Q 225,158 231,160" 
                            stroke={isLit ? '#1A1A1A' : '#374151'} 
                            strokeWidth="2" 
                            fill="none" 
                            strokeLinecap="round"
                        />
                    </g>

                    {/* Animated Nose with twitch */}
                    <circle 
                        cx="200" 
                        cy="170" 
                        r="4" 
                        fill={isLit ? '#1A1A1A' : '#374151'}
                        style={{ 
                            transform: `scale(${1 + noseTwitch * 0.3})`,
                            transformOrigin: '200px 170px',
                            transition: 'transform 0.2s ease-out, fill 0.7s'
                        }}
                    />
                    
                    {/* Animated Mouth with expressions */}
                    <path 
                        d={mouthExpression === 0 
                            ? "M 196,178 Q 200,182 204,178" 
                            : "M 196,178 Q 200,184 204,178"
                        }
                        stroke={isLit ? '#1A1A1A' : '#374151'} 
                        strokeWidth="2.5" 
                        fill="none" 
                        strokeLinecap="round"
                        style={{ transition: 'all 0.3s ease-out' }}
                    />
                    
                    {/* Whiskers */}
                    <g opacity={isLit ? 0.6 : 0.3} style={{ transition: 'opacity 0.7s' }}>
                        <line x1="180" y1="172" x2="150" y2="170" stroke={isLit ? '#1A1A1A' : '#374151'} strokeWidth="1.5" />
                        <line x1="180" y1="176" x2="150" y2="178" stroke={isLit ? '#1A1A1A' : '#374151'} strokeWidth="1.5" />
                        <line x1="220" y1="172" x2="250" y2="170" stroke={isLit ? '#1A1A1A' : '#374151'} strokeWidth="1.5" />
                        <line x1="220" y1="176" x2="250" y2="178" stroke={isLit ? '#1A1A1A' : '#374151'} strokeWidth="1.5" />
                    </g>
                </g>
                
                {/* Sparkles when lit */}
                {isLit && (
                    <g opacity="0.7">
                        <circle cx="100" cy="120" r="2" fill="#FDE047">
                            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="300" cy="130" r="2" fill="#FDE047">
                            <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                        </circle>
                        <circle cx="150" cy="90" r="1.5" fill="#FEF3C7">
                            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
                        </circle>
                        <circle cx="250" cy="95" r="1.5" fill="#FEF3C7">
                            <animate attributeName="opacity" values="0;1;0" dur="2.8s" repeatCount="indefinite" begin="0.3s" />
                        </circle>
                    </g>
                )}
            </g>
        </svg>
    );
};


const LoginPage = () => {
  const [isLit, setIsLit] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLit) {
        if (hintRef.current && backgroundRef.current && formRef.current) {
            hintRef.current.style.opacity = '0';
            backgroundRef.current.style.opacity = '1';
            formRef.current.style.opacity = '1';
            formRef.current.style.transform = 'translateX(0)';
        }
    } else {
        if (hintRef.current && backgroundRef.current && formRef.current) {
            hintRef.current.style.opacity = '1';
            backgroundRef.current.style.opacity = '0';
            formRef.current.style.opacity = '0';
            formRef.current.style.transform = 'translateX(50px)';
        }
    }
  }, [isLit]);
  
  const handleSubmit = () => {
    console.log('Login with:', email, password);
    alert(`Login attempted with email: ${email}`);
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B192F] to-[#111827] relative text-white p-4">
        <div 
            ref={backgroundRef}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(252,211,77,0.15),transparent_60%)] opacity-0"
            style={{ transition: 'opacity 1.2s ease-out' }}
        />

        <div className="absolute top-6 left-6 z-20 text-2xl font-extrabold tracking-tight">
            Urban<span className="text-emerald-400">Link</span>
        </div>
        
        {/* Panda Container */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative">
            <PandaLamp isLit={isLit} onClick={() => setIsLit(p => !p)} />
             <div 
                ref={hintRef} 
                className="text-center text-slate-400 mt-4 animate-pulse"
                style={{ transition: 'opacity 0.3s ease-in' }}
            >
                <p>Tap the panda to light the way ✨</p>
            </div>
        </div>

        {/* Form Container */}
        <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
             <div 
                ref={formRef} 
                className="w-full max-w-sm p-4 z-10 opacity-0"
                style={{ 
                    transform: 'translateX(50px)',
                    transition: 'opacity 0.7s ease-out 0.5s, transform 0.7s ease-out 0.5s'
                }}
            >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                    <div className="text-center mb-6">
                       <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                       <p className="text-slate-400">Sign in to continue</p>
                    </div>
                   <div>
                       <div className="space-y-4">
                           <div>
                               <label htmlFor="email-login" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                               <input 
                                   type="email" 
                                   id="email-login" 
                                   value={email} 
                                   onChange={e => setEmail(e.target.value)} 
                                   className="w-full bg-slate-700/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 border border-transparent focus:border-emerald-400 transition-all" 
                                   placeholder="you@example.com"
                               />
                           </div>
                           <div>
                               <label htmlFor="password-login" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                               <input 
                                   type="password" 
                                   id="password-login" 
                                   value={password} 
                                   onChange={e => setPassword(e.target.value)} 
                                   className="w-full bg-slate-700/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 border border-transparent focus:border-emerald-400 transition-all" 
                                   placeholder="••••••••" 
                               />
                           </div>
                       </div>
                       <button 
                           onClick={handleSubmit}
                           className="mt-6 w-full text-center px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                       >
                           Log In
                       </button>
                       <p className="text-sm text-slate-400 text-center mt-6">
                           New here?{' '}
                           <button 
                               type="button" 
                               onClick={() => alert('Switch to signup')}
                               className="font-semibold text-emerald-400 hover:underline"
                           >
                               Create an account
                           </button>
                       </p>
                   </div>
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