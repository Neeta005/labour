import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Worker, PricingEstimate } from '../types';
import { gsap } from 'gsap';

interface PricingEstimatorModalProps {
    isOpen: boolean;
    onClose: () => void;
    worker: Worker | null;
}

const PricingEstimatorModal: React.FC<PricingEstimatorModalProps> = ({ isOpen, onClose, worker }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [estimate, setEstimate] = useState<PricingEstimate | null>(null);
    const [error, setError] = useState('');
    
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setJobDescription('');
            setEstimate(null);
            setError('');
            gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current, 
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out' }
            );
        }
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(modalRef.current, { 
            opacity: 0, 
            scale: 0.95, 
            y: 20,
            duration: 0.2, 
            ease: 'power3.in',
            onComplete: onClose 
        });
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.2 });
    };

    const handleGetEstimate = async () => {
        if (!jobDescription || !worker) {
            setError('Please describe the job first.');
            return;
        }
        setIsLoading(true);
        setError('');
        setEstimate(null);

        try {
            if (!process.env.API_KEY) throw new Error("API_KEY not set.");

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const schema = {
                type: Type.OBJECT,
                properties: {
                    laborEstimate: { type: Type.STRING, description: 'Estimated labor cost, including hours. E.g., "₹1000 (approx. 2 hours)"' },
                    materialsEstimate: { type: Type.STRING, description: 'Estimated material cost range. E.g., "₹500 - ₹800" or "Not applicable"' },
                    totalEstimate: { type: Type.STRING, description: 'The total estimated cost range (labor + materials). E.g., "₹1500 - ₹1800"' },
                    reasoning: { type: Type.STRING, description: 'A brief, clear explanation for the estimate, including assumed hours and potential materials.' },
                },
                required: ['laborEstimate', 'materialsEstimate', 'totalEstimate', 'reasoning']
            };

            const systemInstruction = `You are an expert cost estimator for home services in India. Your task is to provide a transparent price estimate based on a user's job description and a professional's hourly rate (in INR).
            
            Analysis Steps:
            1.  Estimate the hours required for the job. Be realistic. A simple fix might be 1-2 hours, a complex installation could be 4-6 hours.
            2.  Calculate the labor cost: estimated hours * hourly rate.
            3.  Estimate a reasonable cost range for potential materials. If none, state "Not applicable".
            4.  Calculate the total estimate by combining labor and materials.
            5.  Write a brief explanation for your estimate.
            
            You MUST respond in a valid JSON format that adheres to the provided schema.`;

            const prompt = `
            Professional's Details:
            ${JSON.stringify({ name: worker.name, service: worker.service, hourlyRate: worker.hourlyRate })}

            User's Job Description:
            "${jobDescription}"
            `;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: schema,
                }
            });

            const jsonString = response.text.trim();
            const parsedEstimate = JSON.parse(jsonString);
            setEstimate(parsedEstimate);

        } catch (e) {
            console.error(e);
            setError("Sorry, we couldn't generate an estimate. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div ref={backdropRef} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 opacity-0" onClick={handleClose}>
             <div ref={modalRef} className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-700/80 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Get a Price Estimate</h2>
                        <p className="text-slate-400 mt-1">For {worker?.name}</p>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-6">
                    <label htmlFor="job-description" className="block text-sm font-medium text-slate-300 mb-2">Describe the job in detail</label>
                    <textarea 
                        id="job-description"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={4}
                        className="w-full bg-slate-800 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., 'The shower tap is constantly dripping, and the flush tank in the main bathroom takes a very long time to refill.'"
                    />
                     <button 
                        onClick={handleGetEstimate} 
                        disabled={isLoading}
                        className="mt-4 w-full text-center px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                        {isLoading ? 'Calculating...' : 'Get Estimate'}
                    </button>
                    {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
                </div>

                {estimate && !isLoading && (
                    <div className="p-6 border-t border-slate-700/80 bg-slate-800/50 rounded-b-2xl">
                        <h3 className="font-semibold text-white text-lg mb-4">Your Estimate:</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-300">Labor Cost</span>
                                <span className="font-bold text-white">{estimate.laborEstimate}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-slate-300">Materials Cost</span>
                                <span className="font-bold text-white">{estimate.materialsEstimate}</span>
                            </div>
                             <div className="flex justify-between items-center text-lg border-t border-slate-600 pt-3 mt-3">
                                <span className="text-emerald-300">Total Estimated Cost</span>
                                <span className="font-extrabold text-emerald-300">{estimate.totalEstimate}</span>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-slate-400 p-3 bg-slate-700/50 rounded-lg">
                            <p><span className="font-semibold text-slate-300">Reasoning:</span> {estimate.reasoning}</p>
                        </div>
                         <p className="text-xs text-slate-500 mt-4 text-center">This is an AI-generated estimate. The final price may vary based on the actual scope of work.</p>
                    </div>
                )}
             </div>
        </div>
    );
};

export default PricingEstimatorModal;
