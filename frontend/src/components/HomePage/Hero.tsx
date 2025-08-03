import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Submarine from './Submarine';
import FloatingParticles from './FloatingParticles';
import { OrbitControls } from '@react-three/drei';

// Import fonts from next/font/google
//import { Fascinate_Inline } from 'next/font/google'; // Corrected import for IBM Plex Sans Thai
import localFont from 'next/font/local';

// Configure IBM Plex Sans Thai for headings
const ibmPlexSansThai = localFont({
  src: '../../app/fonts/FascinateInline-Regular.ttf',
  weight: '400',
  variable: '--font-ibm-plex-sans-thai',
  display: 'swap',
});

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate slight horizontal drift based on scrollY
  const parallaxX = scrollY * 0.05; // Adjust multiplier for desired horizontal movement

  return (
    // Apply font variables globally to the section
    <section className={`relative z-10 min-h-screen flex items-center justify-center px-6 ${ibmPlexSansThai.variable}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div 
          className="transform transition-all duration-1000"
          // Apply both translateY and translateX for a subtle current effect
          style={{ transform: `translateY(${scrollY * 0.3}px) translateX(${parallaxX}px)` }}
        >
          <h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent leading-tight"
            // Use the font variable for IBM Plex Sans Thai
            style={{ fontFamily: 'var(--font-ibm-plex-sans-thai)' }}
          >
            Dive Into
            <br />
            <span className="text-white">BlogWave</span>
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 text-cyan-100/80 max-w-2xl mx-auto leading-relaxed"
            // Use the font variable for DM Sans
            //style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Where stories flow like ocean currents, connecting minds across the digital depths
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Start Writing Button with enhanced hover for glow effect */}
            <button
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg
                        
                         border border-transparent
                         
                         hover:button-glow-primary" 
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Start Writing
            </button>
            {/* Explore Stories Button with enhanced hover for glowing border */}
            <button
              className="px-8 py-4 rounded-full text-lg font-semibold transition-all 
                         // Use a custom class for the gradient border and hover glow
                         button-border-gradient hover:button-glow-secondary" 
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Explore Stories
            </button>
          </div>
        </div>
      </div>

      {/* Adding custom styles for refined text shimmer and button glows */}
      <style jsx>{`
        h1 {
          /* Very subtle text shimmer, like light diffusing through water */
          text-shadow: 0 0 5px rgba(125, 211, 252, 0.1), /* Aqua hint */
                       0 0 10px rgba(125, 211, 252, 0.05); /* Wider, softer aqua hint */
        }
        h1 span {
            /* Subtler shimmer for the white text portion */
            text-shadow: 0 0 8px rgba(232, 244, 253, 0.15), /* Moon glow hint */
                         0 0 15px rgba(232, 244, 253, 0.08); /* Wider, softer moon glow hint */
        }
        p {
            /* Minimal shimmer for body text for readability */
            text-shadow: 0 0 3px rgba(197, 228, 253, 0.08); /* Pearl shimmer hint */
        }

        /* Custom Button Styles for Gradient Border and Glows */
        .button-border-gradient {
          border: 2px solid transparent; /* Base transparent border */
          background-origin: border-box; /* Make background appear inside border */
          background-clip: padding-box, border-box; /* Clip background to padding-box, clip border to border-box */
          // Set initial background that matches your theme, with transparency for seamless look
          background-image: linear-gradient(to right, rgba(27, 38, 59, 0.7), rgba(27, 38, 59, 0.7)), 
                            linear-gradient(to right, #7DD3FC, #C5E4FD); /* Aqua glow, Pearl shimmer */
          color: white; /* Ensure text is visible */
        }

        .button-border-gradient:hover {
          background-image: linear-gradient(to right, rgba(27, 38, 59, 0.5), rgba(27, 38, 59, 0.5)), 
                            linear-gradient(to right, #7DD3FC, #C5E4FD); /* Slightly more transparent bg on hover */
          border-image-slice: 1; /* Ensure gradient border is used */
        }

        .hover\\:button-glow-primary:hover {
            box-shadow: 0 0 15px rgba(79, 194, 245, 0.6), 0 0 30px rgba(79, 194, 245, 0.3); /* Stronger glow for primary */
        }

        .hover\\:button-glow-secondary:hover {
            box-shadow: 0 0 10px rgba(197, 228, 253, 0.4), 0 0 20px rgba(197, 228, 253, 0.2); /* Muted glow for secondary */
        }
      `}</style>

      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-96 h-96 hidden lg:block">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-3, 1, -10]} intensity={10} />
          <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={100} />

          <Suspense fallback={null}>
            <Submarine />
          </Suspense>
          <FloatingParticles />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;