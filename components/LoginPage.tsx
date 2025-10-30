import React, { useState, useEffect, useRef } from 'react';

// Ultra cute kawaii panda with maximum adorableness
const PandaLamp = ({ isLit, onClick }: { isLit: boolean; onClick: () => void; }) => {
    const [isBlinking, setIsBlinking] = useState(false);
    const [noseTwitch, setNoseTwitch] = useState(0);
    const [earWiggle, setEarWiggle] = useState(0);
    const [eyeDirection, setEyeDirection] = useState({ x: 0, y: 0 });
    const [mouthExpression, setMouthExpression] = useState(0);
    const [bodyBounce, setBodyBounce] = useState(0);
    const [pawWave, setPawWave] = useState(0);
    const [headTilt, setHeadTilt] = useState(0);
    
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 120);
        }, Math.random() * 3000 + 2000);
        
        const noseInterval = setInterval(() => {
            setNoseTwitch(1);
            setTimeout(() => setNoseTwitch(0), 150);
        }, Math.random() * 4000 + 3000);
        
        const earInterval = setInterval(() => {
            setEarWiggle(1);
            setTimeout(() => setEarWiggle(0), 300);
        }, Math.random() * 5000 + 4000);
        
        const eyeInterval = setInterval(() => {
            setEyeDirection({
                x: (Math.random() - 0.5) * 3,
                y: (Math.random() - 0.5) * 2
            });
        }, Math.random() * 2500 + 1500);
        
        const mouthInterval = setInterval(() => {
            setMouthExpression(Math.random() > 0.5 ? 1 : Math.random() > 0.7 ? 2 : 0);
        }, Math.random() * 5000 + 3000);
        
        const breatheInterval = setInterval(() => {
            setBodyBounce(1);
            setTimeout(() => setBodyBounce(0), 1200);
        }, 2500);
        
        const pawInterval = setInterval(() => {
            setPawWave(1);
            setTimeout(() => setPawWave(0.5), 200);
            setTimeout(() => setPawWave(1), 400);
            setTimeout(() => setPawWave(0), 600);
        }, Math.random() * 8000 + 6000);
        
        const headInterval = setInterval(() => {
            setHeadTilt(1);
            setTimeout(() => setHeadTilt(0), 800);
        }, Math.random() * 10000 + 7000);
        
        return () => {
            clearInterval(blinkInterval);
            clearInterval(noseInterval);
            clearInterval(earInterval);
            clearInterval(eyeInterval);
            clearInterval(mouthInterval);
            clearInterval(breatheInterval);
            clearInterval(pawInterval);
            clearInterval(headInterval);
        };
    }, []);
    
    return (
        <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 450 350" 
            className="max-w-lg cursor-pointer select-none" 
            onClick={onClick}
            aria-label="Panda Lamp"
            role="button"
        >
            <defs>
                <filter id="panda-glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation={isLit ? "18" : "0"} result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <radialGradient id="body-gradient-kawaii">
                    <stop offset="0%" stopColor={isLit ? '#FFFEFB' : '#F9FAFB'} />
                    <stop offset="60%" stopColor={isLit ? '#FEF9ED' : '#F3F4F6'} />
                    <stop offset="100%" stopColor={isLit ? '#FEF3C7' : '#E5E7EB'} />
                </radialGradient>
                <radialGradient id="blush-pink">
                    <stop offset="0%" stopColor="#FCA5A5" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.2" />
                </radialGradient>
                <radialGradient id="eye-shine">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <filter id="soft-shadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="0" dy="3" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.2"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <g style={{ filter: 'url(#panda-glow)', transition: 'filter 0.7s ease-in-out' }}>
                
                {/* Shadow */}
                <ellipse cx="225" cy="310" rx="90" ry="15" fill="#000000" opacity="0.15" />
                
                {/* Back legs */}
                <ellipse cx="260" cy="280" rx="28" ry="32" fill={isLit ? '#1F2937' : '#111827'} style={{ transition: 'fill 0.7s' }} />
                <ellipse cx="190" cy="280" rx="28" ry="32" fill={isLit ? '#1F2937' : '#111827'} style={{ transition: 'fill 0.7s' }} />
                
                {/* Main Body */}
                <g style={{ 
                    transform: `scale(${1 + bodyBounce * 0.02}) translateY(${-bodyBounce * 2}px)`,
                    transformOrigin: '225px 230px',
                    transition: 'transform 1.2s ease-in-out'
                }}>
                    {/* Body - super round */}
                    <circle
                        cx="225" 
                        cy="230" 
                        r="85" 
                        fill="url(#body-gradient-kawaii)"
                        style={{ 
                            transform: `scale(${isLit ? 1.04 : 1})`,
                            transformOrigin: '225px 230px',
                            transition: 'transform 0.7s ease-in-out',
                            filter: 'url(#soft-shadow)'
                        }}
                    />
                    
                    {/* Belly - lighter patch */}
                    <ellipse 
                        cx="225" 
                        cy="250" 
                        rx="55" 
                        ry="60" 
                        fill={isLit ? '#FFFEFB' : '#FFFFFF'}
                        opacity={isLit ? 0.8 : 0.5}
                        style={{ transition: 'opacity 0.7s' }}
                    />
                    
                    {/* Front paws */}
                    <g style={{
                        transform: `rotate(${pawWave * -15}deg)`,
                        transformOrigin: '180px 270px',
                        transition: 'transform 0.3s ease-out'
                    }}>
                        <ellipse cx="180" cy="270" rx="25" ry="30" fill={isLit ? '#1F2937' : '#111827'} style={{ transition: 'fill 0.7s' }} />
                        <ellipse cx="180" cy="285" rx="15" ry="12" fill={isLit ? '#4B5563' : '#1F2937'} opacity="0.7" />
                        {/* Toe beans */}
                        <circle cx="175" cy="290" r="3" fill={isLit ? '#F472B6' : '#BE185D'} opacity="0.8" />
                        <circle cx="180" cy="292" r="3" fill={isLit ? '#F472B6' : '#BE185D'} opacity="0.8" />
                        <circle cx="185" cy="290" r="3" fill={isLit ? '#F472B6' : '#BE185D'} opacity="0.8" />
                    </g>
                    
                    <ellipse cx="270" cy="270" rx="25" ry="30" fill={isLit ? '#1F2937' : '#111827'} style={{ transition: 'fill 0.7s' }} />
                    <ellipse cx="270" cy="285" rx="15" ry="12" fill={isLit ? '#4B5563' : '#1F2937'} opacity="0.7" />
                    <circle cx="265" cy="290" r="3" fill={isLit ? '#F472B6' : '#BE185D'} opacity="0.8" />
                    <circle cx="270" cy="292" r="3" fill={isLit ? '#F472B6' : '#BE185D'} opacity="0.8" />
                    <circle cx="275" cy="290" r="3" fill={isLit ? '#F472B6' : '#BE185D'} opacity="0.8" />
                    
                    {/* Head - extra large and round */}
                    <g style={{
                        transform: `rotate(${headTilt * 8}deg)`,
                        transformOrigin: '225px 150px',
                        transition: 'transform 0.8s ease-out'
                    }}>
                        <circle 
                            cx="225" 
                            cy="150" 
                            r="80" 
                            fill="url(#body-gradient-kawaii)"
                            style={{ 
                                transform: `scale(${isLit ? 1.03 : 1})`,
                                transformOrigin: '225px 150px',
                                transition: 'transform 0.7s ease-in-out',
                                filter: 'url(#soft-shadow)'
                            }}
                        />
                        
                        {/* Ears - super fluffy */}
                        <g>
                            <circle 
                                cx="175" 
                                cy="95" 
                                r="32" 
                                fill={isLit ? '#1F2937' : '#111827'}
                                style={{ 
                                    transform: `rotate(${-earWiggle * 12}deg)`,
                                    transformOrigin: '175px 95px',
                                    transition: 'transform 0.25s ease-out, fill 0.7s'
                                }}
                            />
                            <circle cx="175" cy="98" r="18" fill={isLit ? '#4B5563' : '#1F2937'} opacity="0.5" />
                            
                            <circle 
                                cx="275" 
                                cy="95" 
                                r="32" 
                                fill={isLit ? '#1F2937' : '#111827'}
                                style={{ 
                                    transform: `rotate(${earWiggle * 12}deg)`,
                                    transformOrigin: '275px 95px',
                                    transition: 'transform 0.25s ease-out, fill 0.7s'
                                }}
                            />
                            <circle cx="275" cy="98" r="18" fill={isLit ? '#4B5563' : '#1F2937'} opacity="0.5" />
                        </g>
                        
                        {/* Mega blush cheeks */}
                        <ellipse 
                            cx="280" 
                            cy="165" 
                            rx={isLit ? 26 : 20} 
                            ry={isLit ? 22 : 18}
                            fill="url(#blush-pink)"
                            opacity={isLit ? 1 : 0} 
                            style={{ transition: 'all 0.7s ease-in-out' }}
                        />
                        <circle 
                            cx="288" 
                            cy="160" 
                            r="6" 
                            fill="#FECACA"
                            opacity={isLit ? 0.8 : 0} 
                            style={{ transition: 'all 0.7s ease-in-out' }}
                        />
                        
                        <ellipse 
                            cx="170" 
                            cy="165" 
                            rx={isLit ? 26 : 20} 
                            ry={isLit ? 22 : 18}
                            fill="url(#blush-pink)"
                            opacity={isLit ? 1 : 0} 
                            style={{ transition: 'all 0.7s ease-in-out' }}
                        />
                        <circle 
                            cx="162" 
                            cy="160" 
                            r="6" 
                            fill="#FECACA"
                            opacity={isLit ? 0.8 : 0} 
                            style={{ transition: 'all 0.7s ease-in-out' }}
                        />
                        
                        {/* Eye patches - large */}
                        <ellipse cx="190" cy="145" rx="35" ry="33" fill={isLit ? '#1F2937' : '#111827'} style={{ transition: 'fill 0.7s' }} />
                        <ellipse cx="260" cy="145" rx="35" ry="33" fill={isLit ? '#1F2937' : '#111827'} style={{ transition: 'fill 0.7s' }} />
                        
                        {/* Kawaii eyes - huge and sparkly */}
                        <g style={{ transition: 'opacity 0.12s' }} opacity={isBlinking ? 0 : 1}>
                            {/* Left Eye */}
                            <circle 
                                cx={190 + eyeDirection.x} 
                                cy={145 + eyeDirection.y} 
                                r="13" 
                                fill={isLit ? '#0F172A' : '#1E293B'}
                                style={{ transition: 'all 0.5s ease-out' }}
                            />
                            <circle 
                                cx={194 + eyeDirection.x} 
                                cy={141 + eyeDirection.y} 
                                r="6" 
                                fill="url(#eye-shine)"
                                opacity={isLit ? 1 : 0.4}
                            />
                            <circle 
                                cx={186 + eyeDirection.x} 
                                cy={149 + eyeDirection.y} 
                                r="3" 
                                fill="white"
                                opacity={isLit ? 0.9 : 0.3}
                            />
                            <circle 
                                cx={198 + eyeDirection.x} 
                                cy={145 + eyeDirection.y} 
                                r="1.5" 
                                fill="white"
                                opacity={isLit ? 1 : 0.4}
                            />
                            
                            {/* Right Eye */}
                            <circle 
                                cx={260 + eyeDirection.x} 
                                cy={145 + eyeDirection.y} 
                                r="13" 
                                fill={isLit ? '#0F172A' : '#1E293B'}
                                style={{ transition: 'all 0.5s ease-out' }}
                            />
                            <circle 
                                cx={264 + eyeDirection.x} 
                                cy={141 + eyeDirection.y} 
                                r="6" 
                                fill="url(#eye-shine)"
                                opacity={isLit ? 1 : 0.4}
                            />
                            <circle 
                                cx={256 + eyeDirection.x} 
                                cy={149 + eyeDirection.y} 
                                r="3" 
                                fill="white"
                                opacity={isLit ? 0.9 : 0.3}
                            />
                            <circle 
                                cx={268 + eyeDirection.x} 
                                cy={145 + eyeDirection.y} 
                                r="1.5" 
                                fill="white"
                                opacity={isLit ? 1 : 0.4}
                            />
                        </g>
                        
                        {/* Closed eyes */}
                        <g style={{ transition: 'opacity 0.12s' }} opacity={isBlinking ? 1 : 0}>
                            <path 
                                d="M 175,145 Q 190,138 205,145" 
                                stroke={isLit ? '#0F172A' : '#1E293B'} 
                                strokeWidth="4" 
                                fill="none" 
                                strokeLinecap="round"
                            />
                            <path 
                                d="M 245,145 Q 260,138 275,145" 
                                stroke={isLit ? '#0F172A' : '#1E293B'} 
                                strokeWidth="4" 
                                fill="none" 
                                strokeLinecap="round"
                            />
                        </g>
                        
                        {/* Adorable nose */}
                        <ellipse 
                            cx="225" 
                            cy="175" 
                            rx="10" 
                            ry="8" 
                            fill={isLit ? '#0F172A' : '#1E293B'}
                            style={{ 
                                transform: `scale(${1 + noseTwitch * 0.25})`,
                                transformOrigin: '225px 175px',
                                transition: 'transform 0.15s ease-out, fill 0.7s'
                            }}
                        />
                        <ellipse 
                            cx="227" 
                            cy="173" 
                            rx="3" 
                            ry="2" 
                            fill="white"
                            opacity={isLit ? 0.7 : 0.3}
                        />
                        
                        {/* Mouth expressions */}
                        {mouthExpression === 0 && (
                            <path 
                                d="M 205,188 Q 225,196 245,188" 
                                stroke={isLit ? '#0F172A' : '#1E293B'} 
                                strokeWidth="3.5" 
                                fill="none" 
                                strokeLinecap="round"
                                style={{ transition: 'all 0.3s ease-out' }}
                            />
                        )}
                        {mouthExpression === 1 && (
                            <>
                                <path 
                                    d="M 205,188 Q 225,198 245,188" 
                                    stroke={isLit ? '#0F172A' : '#1E293B'} 
                                    strokeWidth="3.5" 
                                    fill="none" 
                                    strokeLinecap="round"
                                />
                                <ellipse 
                                    cx="225" 
                                    cy="195" 
                                    rx="8" 
                                    ry="6" 
                                    fill="#FDA4AF"
                                    opacity={isLit ? 0.9 : 0.4}
                                />
                            </>
                        )}
                        {mouthExpression === 2 && (
                            <circle 
                                cx="225" 
                                cy="188" 
                                r="6" 
                                fill={isLit ? '#0F172A' : '#1E293B'}
                                opacity="0.8"
                            />
                        )}
                    </g>
                </g>
                
                {/* Floating hearts */}
                {isLit && (
                    <g opacity="0.8">
                        {[...Array(6)].map((_, i) => (
                            <g key={i}>
                                <path 
                                    d={`M ${100 + i * 50},${180 + i * 10} C ${100 + i * 50},${172 + i * 10} ${108 + i * 50},${167 + i * 10} ${113 + i * 50},${172 + i * 10} C ${118 + i * 50},${167 + i * 10} ${126 + i * 50},${172 + i * 10} ${126 + i * 50},${180 + i * 10} C ${126 + i * 50},${188 + i * 10} ${113 + i * 50},${196 + i * 10} ${113 + i * 50},${196 + i * 10} C ${113 + i * 50},${196 + i * 10} ${100 + i * 50},${188 + i * 10} ${100 + i * 50},${180 + i * 10}`}
                                    fill={i % 2 === 0 ? '#FCA5A5' : '#F472B6'}
                                >
                                    <animate attributeName="opacity" values="0;1;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.2}s`} />
                                    <animateTransform attributeName="transform" type="translate" values={`0,0; ${(i % 2 === 0 ? -5 : 5)},${-30 - i * 5}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.2}s`} />
                                </path>
                            </g>
                        ))}
                    </g>
                )}
                
                {/* Musical notes */}
                {isLit && (
                    <g opacity="0.7">
                        <text x="350" y="140" fontSize="24" fill="#FDE047">♪
                            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                            <animateTransform attributeName="transform" type="translate" values="0,0; 10,-25" dur="3s" repeatCount="indefinite" />
                        </text>
                        <text x="90" y="160" fontSize="20" fill="#FEF3C7">♫
                            <animate attributeName="opacity" values="0;1;0" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
                            <animateTransform attributeName="transform" type="translate" values="0,0; -10,-30" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
                        </text>
                    </g>
                )}
                
                {/* Stars everywhere */}
                {isLit && (
                    <g opacity="0.9">
                        {[...Array(12)].map((_, i) => (
                            <circle 
                                key={i}
                                cx={80 + (i % 4) * 90} 
                                cy={80 + Math.floor(i / 4) * 70} 
                                r={2 + (i % 3)} 
                                fill={i % 2 === 0 ? '#FDE047' : '#FEF3C7'}
                            >
                                <animate attributeName="opacity" values="0;1;0" dur={`${1.5 + (i % 3) * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.1}s`} />
                                <animate attributeName="r" values={`${2 + (i % 3)};${3 + (i % 3)};${2 + (i % 3)}`} dur={`${1.5 + (i % 3) * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.1}s`} />
                            </circle>
                        ))}
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
    alert(`Welcome back! 🐼💕\nEmail: ${email}`);
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B192F] via-[#1a1464] to-[#111827] relative text-white p-4">
        <div 
            ref={backgroundRef}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(252,211,77,0.2),transparent_60%)] opacity-0"
            style={{ transition: 'opacity 1.2s ease-out' }}
        />

        <div className="absolute top-6 left-6 z-20 text-2xl font-extrabold tracking-tight hover:scale-105 transition-transform cursor-pointer">
            Urban<span className="text-emerald-400">Link</span>
        </div>
        
        {/* Panda Container */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative">
            <PandaLamp isLit={isLit} onClick={() => setIsLit(p => !p)} />
             <div 
                ref={hintRef} 
                className="text-center text-slate-400 mt-6 animate-pulse"
                style={{ transition: 'opacity 0.3s ease-in' }}
            >
                <p className="text-lg">💝 Click the panda for magic! ✨</p>
                <p className="text-sm mt-2 opacity-75">It loves you already~ 🥰</p>
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
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border-2 border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                       <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Welcome Back! 💖</h1>
                       <p className="text-slate-300 text-lg">Your panda friend missed you~</p>
                    </div>
                   <div>
                       <div className="space-y-5">
                           <div>
                               <label htmlFor="email-login" className="block text-sm font-semibold text-emerald-300 mb-2">✉️ Email</label>
                               <input 
                                   type="email" 
                                   id="email-login" 
                                   value={email} 
                                   onChange={e => setEmail(e.target.value)} 
                                   className="w-full bg-slate-700/60 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 border-2 border-slate-600/50 focus:border-emerald-400 transition-all placeholder-slate-400" 
                                   placeholder="you@example.com"
                               />
                           </div>
                           <div>
                               <label htmlFor="password-login" className="block text-sm font-semibold text-emerald-300 mb-2">🔒 Password</label>
                               <input 
                                   type="password" 
                                   id="password-login" 
                                   value={password} 
                                   onChange={e => setPassword(e.target.value)} 
                                   className="w-full bg-slate-700/60 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 border-2 border-slate-600/50 focus:border-emerald-400 transition-all placeholder-slate-400" 
                                   placeholder="••••••••" 
                               />
                           </div>
                       </div>
                       <button 
                           onClick={handleSubmit}
                           className="mt-8 w-full text-center px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-lg font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-emerald-500/50"
                       >
                           Log In 🚀
                       </button>
                       <p className="text-sm text-slate-300 text-center mt-6">
                           New here?{' '}
                           <button 
                               type="button" 
                               onClick={() => alert('Create account feature coming soon! 🎉')}
                               className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                           >
                               Create an account ✨
                           </button>
                       </p>
                   </div>
                </div>
            </div>
        </div>
        
        {/* Grass background with sparkles */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#062a06] via-[#0a3f0a]/50 to-transparent z-0">
             <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIHZpZXdCb3g9IjAgMCA0IDQiPgo8cmVjdCBmaWxsPSIjMDQxYzA0IiB3aWR0aD0iNCIgaGVpZ2h0PSI0Ii8+CjxwYXRoIGQ9Ik0wIDBMMiAyTDAgNFptMiAwTDQgMkwyIDRabTAgMkwyIDBMMCAyWk00IDJMMiA0TDAgMloiIHN0cm9rZT0iIzA1MDcwNSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-30"></div>
        </div>
    </div>
  );
};

export default LoginPage;