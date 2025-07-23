import React from 'react';
import Image from 'next/image';
import BlogCard from './util/BlogCard';

// Import fonts from next/font/google
import { IBM_Plex_Sans_Thai, DM_Sans, Gloock } from 'next/font/google';

// Configure IBM Plex Sans Thai for headings
const ibmPlexSansThai = Gloock({
  subsets: ['latin'],
  weight: '400', // Bold weights for headings
  variable: '--font-ibm-plex-sans-thai',
  display: 'swap',
});

// Configure DM Sans for body text, card titles, and meta
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Normal, medium, bold for various uses
  variable: '--font-dm-sans',
  display: 'swap',
});

// Re-defining palette for clarity, ensuring consistency
const palette = {
    deepWater: '#0D1B2A',      // Darkest, ocean bed
    midWater: '#1B263B',       // Mid-depth, slightly less light
    surfaceWater: '#2D4A68',   // Lighter, top layers
    moonGlow: '#E8F4FD',       // Bright white/blue for highlights
    pearlShimmer: '#C5E4FD',   // Light blue/cyan for shimmer
    aquaGlow: '#7DD3FC',       // Vibrant aqua for glow
    coralWarm: '#FF6B9D',      // Warm pink for contrast/buttons
    coralDeep: '#D946A3',      // Deeper pink/purple for contrast/buttons
    // New: Specific colors for the gradient that represent top to middle depth
    topOceanStart: '#0891b2', // Brighter cyan, like sunlit surface (similar to cyan-600)
    midOceanEnd: '#2C5282',   // Deeper, slightly muted blue (deeper than surfaceWater)
};


const blogPosts = [
  {
    id: 1,
    title: "Deep Sea Mysteries",
    owner: "Captain Nemo",
    profilepic: "/sample/bg.jpg",
    views: 1200,
    comments: 23,
    likes: 400,
    coverpic: "/sample/island.jpg",
  },
  {
    id: 2,
    title: "Marine Life Wonders",
    owner: "Aqua Jane",
    profilepic: "/sample/bg.jpg",
    views: 980,
    comments: 15,
    likes: 350,
    coverpic: "/sample/island.jpg",
  },
  {
    id: 3,
    title: "Underwater Photography Tips",
    owner: "Lens Finn",
    profilepic: "/sample/bg.jpg",
    views: 1500,
    comments: 30,
    likes: 550,
    coverpic: "/sample/island.jpg",
  },
  // {
  //   id: 4,
  //   title: "Coral Reef Conservation",
  //   owner: "Eco Diver",
  //   profilepic: "/sample/bg.jpg",
  //   views: 1100,
  //   comments: 18,
  //   likes: 420,
  //   coverpic: "/sample/island.jpg",
  // },
  // {
  //   id: 5,
  //   title: "The Breathtaking Abyss",
  //   owner: "Deep Sea Sam",
  //   profilepic: "/sample/bg.jpg",
  //   views: 1800,
  //   comments: 45,
  //   likes: 600,
  //   coverpic: "/sample/island.jpg",
  // },
];

const FeaturedBlogs: React.FC = () => {
  return (
    <section 
      className={`relative z-10 py-24 px-6 ${ibmPlexSansThai.variable} ${dmSans.variable}`}
      style={{
        // Use custom palette colors for top to middle ocean transition
        background: `linear-gradient(to bottom, ${palette.topOceanStart} 0%, ${palette.midOceanEnd} 100%)`,
        // Subtle inset shadow to imply depth
        //boxShadow: `inset 0 10px 20px rgba(0, 0, 0, 0.2), inset 0 -10px 20px rgba(0, 0, 0, 0.1)`, // Added top inset for more rounded depth
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-6xl font-extrabold mb-4 pb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent relative inline-block"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans-thai)',
              textShadow: `0 0 10px ${palette.aquaGlow}30, 0 0 20px ${palette.aquaGlow}15`,
            }}
          >
            Trending in the Depths
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-aquaGlow to-pearlShimmer rounded-full opacity-70"></span>
          </h2>
          <p
            className="text-cyan-100/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              textShadow: `0 0 5px ${palette.pearlShimmer}10`,
            }}
          >
            Discover the most captivating stories from our ocean of writers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>

       <div className="text-center mt-12 relative z-20">
          <button
            className="px-10 py-5 rounded-full text-xl font-semibold text-white
                      relative overflow-hidden group transition-all duration-700
                      border-2 border-transparent hover:scale-105"
            style={{ 
              fontFamily: 'var(--font-dm-sans)',
              background: `linear-gradient(135deg, 
                ${palette.pearlShimmer}99 0%, 
                ${palette.aquaGlow} 30%, 
                ${palette.midOceanEnd} 100%)`,
              boxShadow: `0 0 15px ${palette.aquaGlow}80, 
                          0 4px 30px ${palette.deepWater}80,
                          inset 0 0 10px ${palette.moonGlow}40`
            }}
          >
            {/* Ocean Surface Reflection */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent opacity-40"></div>
            
            {/* Moving Bubbles Animation */}
            <div className="absolute inset-0 opacity-50 group-hover:opacity-80 transition-opacity duration-500">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    bottom: '-20px',
                    left: `${Math.random() * 100}%`,
                    animation: `rise ${Math.random() * 6 + 4}s infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: Math.random() * 0.5 + 0.2
                  }}
                />
              ))}
            </div>
            
            {/* Text with Depth Effect */}
            <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(13,27,42,0.8)]">
              View All Stories
            </span>
            
            {/* Hover Effect - Water Ripple */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-1/2 left-1/2 w-[300%] pb-[300%] -translate-x-1/2 -translate-y-1/2 
                              bg-radial-gradient(circle,white,transparent) opacity-0 
                              group-hover:animate-ripple group-hover:opacity-30"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;