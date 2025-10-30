import React, { useState, useEffect } from 'react';
import { Worker } from '../types';

interface FilterBarProps {
    workers: Worker[];
    onFilter: (filteredWorkers: Worker[]) => void;
}

type SortOption = 'rating' | 'price_asc' | 'price_desc' | 'name_asc';

const FilterBar: React.FC<FilterBarProps> = ({ workers, onFilter }) => {
    const [sortBy, setSortBy] = useState<SortOption>('rating');

    useEffect(() => {
        let sortedWorkers = [...workers];
        switch (sortBy) {
            case 'rating':
                sortedWorkers.sort((a, b) => b.rating - a.rating);
                break;
            case 'price_asc':
                sortedWorkers.sort((a, b) => a.hourlyRate - b.hourlyRate);
                break;
            case 'price_desc':
                sortedWorkers.sort((a, b) => b.hourlyRate - a.hourlyRate);
                break;
            case 'name_asc':
                sortedWorkers.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }
        onFilter(sortedWorkers);
    }, [sortBy, workers, onFilter]);

    return (
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between">
            <span className="text-white font-semibold">Sort by:</span>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                <option value="rating">Best Rating</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name (A-Z)</option>
            </select>
        </div>
    );
};

export default FilterBar;
