import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/50 border-t border-slate-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight mb-4">
              Urban<span className="text-emerald-400">Link</span>
            </h3>
            <p className="text-slate-400">Connecting communities with skilled professionals.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">For Homeowners</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Find a Pro</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Safety Tips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">For Professionals</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Join as a Pro</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Benefits</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Verification</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} UrbanLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;