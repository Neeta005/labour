
import React from 'react';

const CleanerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-5.45-6.895l10.9 0M2.498 12.001l19.004 0M17.55 5.105l-11.1 0M17.55 18.895l-11.1 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.525 7.425C5.525 5.865 6.815 4.575 8.375 4.575h7.25c1.56 0 2.85 1.29 2.85 2.85v9.15c0 1.56-1.29 2.85-2.85 2.85h-7.25C6.815 19.425 5.525 18.135 5.525 16.575V7.425z" />
    </svg>
);

export default CleanerIcon;
