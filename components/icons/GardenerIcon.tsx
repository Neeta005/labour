
import React from 'react';

const GardenerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0 1.172 1.953 1.172 5.119 0 7.072z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.5V12m0 0V3.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12H12" />
    </svg>
);

export default GardenerIcon;
