
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Worker } from '../types';

interface SmartMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    workers: Worker[];
    onWorkerSelect: (worker: Worker) => void;
}

const SmartMatchModal: React.FC<SmartMatchModalProps> = ({ isOpen, onClose, workers, onWorkerSelect }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<Worker | null>(null);
    const [error, setError] = useState('');

    const handleFindMatch = async () => {
        if (!prompt) {
            setError('Please describe your needs.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            if (!process.env.API_KEY) {
                throw new Error("API_KEY environment variable not set.");
            }
            // Fix: Use the correct constructor `GoogleGenAI` with a named `apiKey` parameter.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Fix: Use a recommended model name. 'gemini-2.5-flash' is suitable for this task.
            const model = 'gemini-2.5-flash';

            const systemInstruction = `You are an expert at matching customers with service professionals.
            You will be given a list of available professionals and a user's request.
            Your task is to analyze the user's request and select the single best professional from the list.
            The list of professionals will be a JSON array of objects.
            The user's request is a text description of their needs.
            You must only respond with the ID of the best-matched professional. Do not add any other text, explanation, or formatting.
            Your response should be just the number of the ID. For example: 3`;

            const fullPrompt = `
            Professionals List:
            ${JSON.stringify(workers, null, 2)}

            User's Request:
            "${prompt}"

            Based on the user's request, which professional from the list is the best match? Return only their ID.
            `;
            
            // Fix: Use `ai.models.generateContent` to generate content.
            const response = await ai.models.generateContent({
              model,
              contents: fullPrompt,
              config: {
                systemInstruction,
                temperature: 0.2,
              }
            });

            // Fix: Access the response text directly from the `text` property.
            const matchedId = parseInt(response.text.trim(), 10);
            
            if (isNaN(matchedId)) {
                 throw new Error("Model did not return a valid ID.");
            }

            const matchedWorker = workers.find(w => w.id === matchedId);

            if (matchedWorker) {
                setResult(matchedWorker);
            } else {
                setError("Could not find a matching professional. Please try rephrasing your request.");
            }
        } catch (e) {
            console.error(e);
            setError("Sorry, something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
             <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-700/80">
                    <h2 className="text-xl font-bold text-white">Smart Match</h2>
                    <p className="text-slate-400 mt-1">Describe your job and let AI find the perfect pro for you.</p>
                </div>
                <div className="p-6">
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                        className="w-full bg-slate-800 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., 'I need to fix a leaking tap in my kitchen and also check the main water valve. I prefer someone with good reviews and available this weekend.'"
                    />
                     <button 
                        onClick={handleFindMatch} 
                        disabled={isLoading}
                        className="mt-4 w-full text-center px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Analyzing...' : 'Find My Pro'}
                    </button>
                    {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
                </div>

                {result && !isLoading && (
                    <div className="p-6 border-t border-slate-700/80">
                        <h3 className="font-semibold text-white text-center mb-4">We found a great match for you!</h3>
                        <div className="bg-slate-800 p-4 rounded-lg flex items-center gap-4">
                            <img src={result.imageUrl} alt={result.name} className="w-16 h-16 rounded-full object-cover"/>
                            <div>
                                <h4 className="font-bold text-white text-lg">{result.name}</h4>
                                <p className="text-emerald-400">{result.service}</p>
                            </div>
                            <button onClick={() => onWorkerSelect(result)} className="ml-auto bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg">View Profile</button>
                        </div>
                    </div>
                )}
             </div>
        </div>
    );
};

export default SmartMatchModal;
