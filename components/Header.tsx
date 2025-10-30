import React from 'react';
import { User } from '../types';

interface HeaderProps {
    currentUser: User | null;
    onLoginClick: () => void;
    onSignupClick: () => void;
    onLogout: () => void;
    onDashboardClick: () => void;
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLoginClick, onSignupClick, onLogout, onDashboardClick, onHomeClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={onHomeClick} className="text-2xl font-extrabold text-white tracking-tight">
          Urban<span className="text-emerald-400">Link</span>
        </button>
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">For Professionals</a>
          {currentUser ? (
            <>
              <button onClick={onDashboardClick} className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">My Dashboard</button>
              <button onClick={onLogout} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Logout</button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="px-4 py-2 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">Log In</button>
              <button onClick={onSignupClick} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Sign Up</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;