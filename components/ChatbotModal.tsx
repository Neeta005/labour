
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

interface ChatbotModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', sender: 'bot', text: 'Hello! I am UrbanLink\'s AI assistant. How can I help you find a service today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<Chat | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if (isOpen && !chatRef.current) {
            if (!process.env.API_KEY) {
                console.error("API_KEY environment variable not set.");
                return;
            }
            // Fix: Use the correct constructor `GoogleGenAI` with a named `apiKey` parameter.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            // Fix: Use a recommended model name. 'gemini-2.5-flash' is suitable for chat.
            const model = 'gemini-2.5-flash';

            // Fix: Use `ai.chats.create` for conversational chat.
            chatRef.current = ai.chats.create({
              model,
              config: {
                systemInstruction: "You are a helpful AI assistant for UrbanLink, a platform that connects users with home service professionals like electricians, plumbers, and cleaners. Your goal is to help users find the right service, answer their questions about the platform, and provide information about available services. Be friendly, concise, and helpful."
              }
            });
        } else if (!isOpen) {
            chatRef.current = null;
        }
    }, [isOpen]);
    
    const handleSend = async () => {
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {

            // Fix: Use `chat.sendMessage` to send a message in the chat session.
            const result = await chatRef.current.sendMessage({ message: currentInput });
            
            // Fix: Access the response text directly from the `text` property.
            const botResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: result.text
            };
            setMessages(prev => [...prev, botResponse]);

        } catch (error) {
            console.error(error);
            const errorResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: 'Sorry, I encountered an error. Please try again.'
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[60]">
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-2xl w-full max-w-md h-[70vh] flex flex-col shadow-2xl animate-fade-in-up">
                <div className="p-4 flex items-center justify-between border-b border-slate-700/80 flex-shrink-0">
                    <div className='flex items-center gap-3'>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-white">UrbanLink AI</h3>
                            <p className="text-xs text-emerald-400">Online</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`${msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-700'} p-3 rounded-lg max-w-[85%] text-sm`}>
                                {typeof msg.text === 'string' ? msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>) : msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-700 p-3 rounded-lg">
                                <span className="animate-pulse">...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-slate-700/80 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            className="flex-grow bg-slate-800 text-white placeholder-slate-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-emerald-500 text-white p-2.5 rounded-full hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotModal;
