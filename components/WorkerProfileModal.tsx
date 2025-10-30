import React, { useEffect, useRef } from 'react';
import { Worker } from '../types';
import ReviewCard from './ReviewCard';
import { gsap } from 'gsap';

interface WorkerProfileModalProps {
    worker: Worker | null;
    onClose: () => void;
    onBookNow: (worker: Worker) => void;
    onGetEstimate: () => void;
}

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const WorkerProfileModal: React.FC<WorkerProfileModalProps> = ({ worker, onClose, onGetEstimate, onBookNow }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (worker) {
            gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current, 
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out' }
            );
        }
    }, [worker]);

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

    if (!worker) return null;

    const handleBookClick = () => {
        onBookNow(worker);
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div ref={backdropRef} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 opacity-0" onClick={handleBackdropClick}>
            <div 
                ref={modalRef}
                className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex-shrink-0 p-6 flex justify-between items-center border-b border-slate-700/80">
                    <h2 className="text-xl font-bold text-white">Professional Profile</h2>
                    <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto">
                    {/* Hero section */}
                    <div className="relative">
                        <img src={worker.imageUrl} alt={worker.name} className="w-full h-48 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    </div>
                    <div className="p-6 -mt-16 relative">
                        <div className="flex items-end space-x-4">
                            <img src={worker.imageUrl} alt={worker.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-800" />
                            <div>
                                <h3 className="text-2xl font-bold text-white">{worker.name}</h3>
                                <p className="text-emerald-400 font-semibold">{worker.service}</p>
                                <p className="text-slate-400 text-sm mt-1">{worker.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center mt-3 text-sm">
                            <div className="flex items-center">
                                <StarIcon />
                                <span className="text-white font-bold ml-1">{worker.rating}</span>
                                <span className="text-slate-400 ml-2">({worker.reviewCount} reviews)</span>
                            </div>
                            <span className="text-slate-600 mx-3">|</span>
                             <p className="text-lg font-bold text-white">₹{worker.hourlyRate}<span className="text-sm font-normal text-slate-400">/hr</span></p>
                        </div>
                    </div>

                    {/* Details section */}
                    <div className="px-6 pb-6 space-y-6">
                        <div>
                            <h4 className="font-semibold text-white mb-2">About {worker.name.split(' ')[0]}</h4>
                            <p className="text-slate-300">{worker.description}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-3">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {worker.skills.map(skill => (
                                    <span key={skill} className="bg-slate-700/50 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Reviews</h4>
                            <div className="space-y-6">
                                {worker.reviews.length > 0 ? (
                                    worker.reviews.map(review => <ReviewCard key={review.id} review={review} />)
                                ) : (
                                    <p className="text-slate-400">No reviews yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 p-6 border-t border-slate-700/80 bg-slate-900/50 grid grid-cols-1 sm:grid-cols-2 gap-3">
                     <button onClick={onGetEstimate} className="w-full text-center px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors">Get a Price Estimate</button>
                     <button onClick={handleBookClick} className="w-full text-center px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default WorkerProfileModal;
