import React, { useState } from 'react';
import { Worker } from '../types';
import WorkerCard from './WorkerCard';
import FilterBar from './FilterBar';
import WorkerCardSkeleton from './WorkerCardSkeleton';

interface SearchResultsProps {
    workers: Worker[];
    isLoading: boolean;
    onViewProfile: (worker: Worker) => void;
    onBookNow: (worker: Worker) => void;
    searchQuery: {service: string, location: string};
}

const SearchResults: React.FC<SearchResultsProps> = ({ workers, isLoading, onViewProfile, onBookNow, searchQuery }) => {
    const [filteredWorkers, setFilteredWorkers] = useState<Worker[] | null>(null);
    
    const displayWorkers = filteredWorkers || workers;

    return (
        <div className="bg-slate-900 min-h-screen py-12">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Search Results for "{searchQuery.service}" {searchQuery.location && `in "${searchQuery.location}"`}
                    </h1>
                    <p className="text-slate-400 mt-2">{isLoading ? 'Finding professionals...' : `${displayWorkers.length} professionals found`}</p>
                </div>
                
                <FilterBar workers={workers} onFilter={setFilteredWorkers} />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {isLoading ? (
                        [...Array(6)].map((_, i) => <WorkerCardSkeleton key={i} />)
                    ) : displayWorkers.length > 0 ? (
                        displayWorkers.map(worker => (
                            <WorkerCard 
                                key={worker.id} 
                                worker={worker} 
                                onViewProfile={onViewProfile}
                                onBookNow={onBookNow}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-slate-800 rounded-lg">
                            <h2 className="text-2xl font-semibold text-white">No Professionals Found</h2>
                            <p className="text-slate-400 mt-2">Try adjusting your search or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
