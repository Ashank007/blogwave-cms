import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-12 bg-slate-900 border-t border-cyan-500/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">BW</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              BlogWave
            </span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-cyan-300 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-cyan-300 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-cyan-300 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-cyan-500/20 text-center text-cyan-300/60">
          <p>© 2024 BlogWave. Made with 🌊 by WingRun</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;