import React from 'react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

// Fix: The original component props type `{ filled: boolean }` was too restrictive and did not account for
// the `key` prop passed by React when rendering a list. Typing the component with `React.FC`
// correctly handles this special prop, resolving the TypeScript error.
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${filled ? 'text-amber-400' : 'text-slate-600'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex items-start space-x-4">
      <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover flex-shrink-0 mt-1" />
      <div>
        <div className="flex items-center space-x-2">
          <h4 className="font-bold text-slate-100">{review.author}</h4>
          <span className="text-slate-500 text-sm">&middot;</span>
          <span className="text-slate-500 text-sm">{review.date}</span>
        </div>
        <div className="flex mt-1">
          {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}
        </div>
        <p className="mt-2 text-slate-300">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
