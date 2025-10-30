import React from 'react';

const WorkerCardSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg">
      <div className="animate-pulse">
        <div className="bg-slate-700 h-48 w-full"></div>
        <div className="p-6">
          <div className="h-4 bg-slate-700 rounded w-1/3"></div>
          <div className="h-6 bg-slate-700 rounded w-2/3 mt-2"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2 mt-2"></div>
          <div className="flex items-center mt-3">
            <div className="h-4 bg-slate-700 rounded w-1/4"></div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="h-6 bg-slate-700 rounded w-1/4"></div>
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 grid grid-cols-2 gap-3">
            <div className="h-10 bg-slate-700 rounded-lg"></div>
            <div className="h-10 bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCardSkeleton;
