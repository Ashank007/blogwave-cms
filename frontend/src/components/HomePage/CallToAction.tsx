import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { JetBrains_Mono,  Space_Grotesk, Gloock } from 'next/font/google';

const jet = Gloock({
  weight: '400',
  subsets: ['latin']
})
const OceanBedSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  // Parallax effects
  const textureY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const footerOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const footerY = useTransform(scrollYProgress, [0.7, 1], [100, 0]);
  const ctaScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const ctaOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden min-h-[100vh]"
      style={{ 
        background: 'linear-gradient(to bottom, #2C5282, #0d1b2a)', fontFamily: jet.style.fontFamily
      }}
    >
      {/* Water particles for ambiance */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Light rays filtering from above */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-0 h-full bg-gradient-to-b from-cyan-500/20 to-transparent"
            style={{
              width: '2px',
              left: `${i * 20 + 10}%`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
              animation: `ray-pulse ${Math.random() * 10 + 5}s infinite`,
            }}
          />
        ))}
      </div>
      
      {/* Layer 1: Call to Action (stays visible) */}
      <motion.div 
        className="relative z-20 py-20 px-6 min-h-screen flex items-center justify-center"
        style={{
          scale: ctaScale,
          opacity: ctaOpacity
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Make Waves?
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed text-cyan-100/90">
            Join our community of storytellers and let your voice ripple across the digital ocean
          </p>
          
          <motion.button 
            className="relative px-12 py-5 rounded-full text-xl font-semibold transition-all duration-500 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #7DD3FC, #38BDF8)',
              color: '#0d1b2a',
              boxShadow: '0 5px 25px rgba(125, 211, 252, 0.5), 0 0 15px rgba(197, 228, 253, 0.8)',
            }}
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-transparent to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
          
          {/* Scroll indicator */}
         
        </div>
      </motion.div>

      {/* Layer 2: Seabed Texture (Parallax Layer) */}
      <motion.div 
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ 
          backgroundImage: `url(/texture.png)`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          y: textureY,
          opacity: useTransform(scrollYProgress, [0.2, 0.8], [0, 0.5])
        }}
      />

      {/* Layer 3: Footer (Appears last) */}
      <motion.footer 
        className="fixed bottom-0 left-0 w-full z-30 py-12 backdrop-blur-[4px]"
        style={{ 
          backgroundColor: 'rgba(15, 23, 42, 0.35)',
          borderTop: '1px solid rgba(125, 211, 252, 0.2)',
          opacity: footerOpacity,
          y: footerY
        }}
      >
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
              <a href="#" className="text-cyan-300 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-cyan-500/20 text-center text-cyan-300/60">
            <p>© 2024 BlogWave. Made with 🌊 by Arch</p>
          </div>
        </div>
      </motion.footer>
      
      {/* Ocean floor details */}
     
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes ray-pulse {
          0% { opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default OceanBedSection;