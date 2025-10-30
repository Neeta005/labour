import React from 'react';
import { WORKERS } from '../constants';
import WorkerCard from './WorkerCard';
import { Worker } from '../types';

interface FeaturedProsProps {
    onViewProfile: (worker: Worker) => void;
    onBookNow: (worker: Worker) => void;
}

const FeaturedPros: React.FC<FeaturedProsProps> = ({ onViewProfile, onBookNow }) => {
  // Get top 3 rated workers for featuring
  const featuredWorkers = [...WORKERS].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Meet Our Top Professionals</h2>
          <p className="max-w-2xl mx-auto text-slate-400 mt-4">Handpicked experts who consistently deliver five-star service.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWorkers.map(worker => (
            <WorkerCard 
              key={worker.id} 
              worker={worker} 
              onViewProfile={onViewProfile}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPros;
