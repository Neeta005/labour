import React from 'react';
import { Worker } from '../types';

interface WorkerCardProps {
    worker: Worker;
    onViewProfile: (worker: Worker) => void;
    onBookNow: (worker: Worker) => void;
}

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onViewProfile, onBookNow }) => {
  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="relative">
        <img src={worker.imageUrl} alt={worker.name} className="w-full h-48 object-cover" />
        {worker.verified && (
            <span className="absolute top-3 right-3 bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" /></svg>
                Verified
            </span>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-sm text-emerald-400 font-semibold">{worker.service}</p>
        <h3 className="text-xl font-bold text-white mt-1">{worker.name}</h3>
        <p className="text-slate-400 text-sm mt-1">{worker.location}</p>
        
        <div className="flex items-center mt-3 text-sm">
          <div className="flex items-center">
            <StarIcon />
            <span className="text-white font-bold ml-1">{worker.rating}</span>
          </div>
          <span className="text-slate-500 mx-2">&middot;</span>
          <span className="text-slate-400">{worker.reviewCount} reviews</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-700 flex-grow flex items-end justify-between">
            <p className="text-lg font-bold text-white">₹{worker.hourlyRate}<span className="text-sm font-normal text-slate-400">/hr</span></p>
        </div>
      </div>
       <div className="p-4 bg-slate-800/50 grid grid-cols-2 gap-3">
          <button onClick={() => onViewProfile(worker)} className="w-full text-center px-4 py-2 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">View Profile</button>
          <button onClick={() => onBookNow(worker)} className="w-full text-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Book Now</button>
        </div>
    </div>
  );
};

export default WorkerCard;
