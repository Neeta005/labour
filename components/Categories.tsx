
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoriesProps {
  onCategorySelect: (categoryName: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
          <p className="max-w-2xl mx-auto text-slate-400 mt-4">Find the right professional for your specific needs.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map(category => (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className="group flex flex-col items-center justify-center p-6 bg-slate-800/80 rounded-2xl border border-slate-700/80 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-slate-700/50 rounded-full group-hover:bg-emerald-500/20 transition-colors">
                <category.icon className="w-8 h-8 text-slate-300 group-hover:text-emerald-400 transition-colors" />
              </div>
              <h3 className="font-semibold text-white text-center">{category.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
