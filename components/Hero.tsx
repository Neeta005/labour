
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HeroProps {
  onSearch: (service: string, location: string) => void;
  onOpenSmartMatch: () => void;
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, onOpenSmartMatch, showToast }) => {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [isListening, setIsListening] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElements = heroRef.current?.children;
    if (heroElements) {
      gsap.from(heroElements, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(service, location);
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('error', 'Voice search is not supported by your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech' || event.error === 'network') {
        showToast('error', 'Could not hear you. Please try again.');
      } else if (event.error === 'not-allowed') {
        showToast('error', 'Microphone access denied. Please enable it in your browser settings.');
      } else {
        showToast('error', 'An error occurred during voice recognition.');
      }
    };
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
      
      const services = ['electrician', 'plumber', 'cleaner', 'painter', 'carpenter', 'gardener'];
      let foundService = '';
      for (const s of services) {
        if (transcript.includes(s)) {
          foundService = capitalize(s);
          break;
        }
      }

      let foundLocation = '';
      const locationMatch = transcript.match(/in ([\w\s]+)/);
      if (locationMatch && locationMatch[1]) {
        foundLocation = capitalize(locationMatch[1].replace(/today|now|tomorrow/, '').trim());
      }
      
      setService(foundService);
      setLocation(foundLocation);

      if (foundService) {
        onSearch(foundService, foundLocation);
      } else {
        showToast('info', `Could not detect a known service in your speech.`);
      }
    };

    recognition.start();
  };


  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center text-center px-6 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-700/[0.05] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
      <div className="relative z-10" ref={heroRef}>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Find &amp; Book Trusted <br />
          <span className="text-emerald-400">Home Service Professionals</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-slate-300">
          From electricians to cleaners, get help from verified experts for any job, anytime.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50">
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="What service do you need?"
            className="flex-grow w-full bg-slate-800 text-white placeholder-slate-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`flex-shrink-0 p-3 rounded-lg transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-700 hover:bg-slate-600'}`}
            aria-label="Search by voice"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto flex-shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Search
          </button>
        </form>
        {isListening && <p className="text-cyan-400 mt-4 animate-pulse">Listening...</p>}
        <div className="mt-6 flex flex-col items-center">
            <p className="text-slate-400">Or, let us find the perfect match for you.</p>
            <button 
                onClick={onOpenSmartMatch}
                className="mt-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105"
            >
                Let AI Find a Pro
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
