import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outfit, Inter } from 'next/font/google';
import TransitionLink from '../TransistionLink';
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// --- Artist's Color Palette: "Moonlit Depths" ---
const palette = {
  // Deep ocean foundation
  deepWater: '#0D1B2A',      // Midnight blue-black, like ocean depths
  midWater: '#1B263B',       // Slightly lighter, layered water
  surfaceWater: '#2D4A68',   // Where moonlight touches water (lighter blue)
  
  // Luminous accents
  moonGlow: '#E8F4FD',       // Soft moonlight on water (very light, cool white)
  pearlShimmer: '#C5E4FD',   // Pearl-like shimmer (slightly desaturated light blue)
  aquaGlow: '#7DD3FC',       // Gentle aqua luminescence (medium bright blue)
  
  // Warm coral accent
  coralWarm: '#FF6B9D',      // Soft coral pink, like underwater life
  coralDeep: '#D946A3',      // Deeper coral for depth (more magenta-pink)
  
  // Shadows and depths (explicitly named for clarity in usage)
  headerBgScrolled: 'rgba(13, 27, 42, 0.95)', // Background on scroll
  headerBgDefault: 'rgba(27, 38, 59, 0.85)', // Default background

  // Shadow colors for glowing elements
  shadowLight: 'rgba(125, 211, 252, 0.15)', // Glow Soft
  shadowMedium: 'rgba(125, 211, 252, 0.25)', // Glow Medium
  coralGlow: 'rgba(255, 107, 157, 0.20)', // Coral Glow
  //coralGlow: 'rgba(255, 107, 157, 0.20)',
  
  // Focus ring colors (new additions for accessibility)
  focusAqua: '#7DD3FC', // Matching aquaGlow for focus rings
  focusCoral: '#FF6B9D', // Matching coralWarm for focus rings
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-20 transition-all duration-700"
      style={{
        background: isScrolled ? palette.headerBgScrolled : palette.headerBgDefault,
        boxShadow: isScrolled
          ? `0 8px 32px ${palette.shadowMedium}`
          : `0 4px 24px ${palette.shadowLight}`,
        backdropFilter: 'blur(12px)'
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Artistic gradient overlay */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `linear-gradient(135deg, ${palette.deepWater} 0%, ${palette.midWater} 50%, ${palette.surfaceWater} 100%)`
        }}
      />

      {/* Luminous bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${palette.aquaGlow} 50%, transparent 100%)`,
          opacity: 0.4
        }}
      />

      <nav className="relative px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo - Harmonious design */}
          <motion.a
            href="/"
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${palette.aquaGlow} 0%, ${palette.coralWarm} 100%)`,
                  boxShadow: `0 4px 16px ${palette.coralGlow}`
                }}
                whileHover={{
                  boxShadow: `0 6px 20px ${palette.coralGlow}`,
                  rotate: 2
                }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="font-bold text-base z-10"
                  style={{ color: palette.deepWater }} // BW text in deep water for strong contrast
                >
                  BW
                </span>
              </motion.div>

              {/* Ethereal glow */}
              <motion.div
                className="absolute inset-0 rounded-xl blur-sm"
                style={{
                  background: `radial-gradient(circle, ${palette.aquaGlow}40, transparent 70%)`
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div>
              <motion.h1
                className="text-xl font-bold bg-clip-text text-transparent"
                style={{
                  fontFamily: outfit.style.fontFamily,
                  // Adjusted gradient for stronger contrast on text
                  backgroundImage: `linear-gradient(90deg, ${palette.moonGlow}, ${palette.pearlShimmer})`
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                BlogWave
              </motion.h1>
              <motion.p
                className="text-xs font-medium tracking-wide"
                style={{ color: palette.pearlShimmer, fontFamily: inter.style.fontFamily }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                oceanic stories
              </motion.p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Login Button - Subtle luminescence */}
            <TransitionLink href='/login' label='' open={false}>
            <motion.span
              className="px-5 py-2.5 font-medium rounded-lg border transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D1B2A] focus:ring-[${palette.focusAqua}]" // Added focus ring
              style={{
                color: palette.pearlShimmer,
                borderColor: `${palette.aquaGlow}60`,
                backgroundColor: `${palette.midWater}80`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`
              }}
              whileHover={{
                y: -1,
                scale: 1.01,
                boxShadow: `0 4px 16px ${palette.shadowLight}`,
                backgroundColor: `${palette.surfaceWater}60`
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span
                className="absolute inset-0 border rounded-lg opacity-0"
                style={{ borderColor: palette.aquaGlow, fontFamily: inter.style.fontFamily }}
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Login</span>
            </motion.span>
            </TransitionLink>

            {/* Register Button - Coral warmth */}
            <TransitionLink href='/register' label='' open={false}>
            <motion.span
              className="px-5 bg-gradient-to-r from-cyan-500 to-blue-500 py-2.5 font-medium rounded-lg transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D1B2A] focus:ring-[${palette.focusCoral}]" // Added focus ring
              style={{
                fontFamily: inter.style.fontFamily,
                color: palette.moonGlow,
               // background: `linear-gradient(135deg, ${palette.coralWarm} 0%, ${palette.coralDeep} 100%)`,
                boxShadow: `0 4px 16px ${palette.coralGlow}`
              }}
              whileHover={{
                y: -2,
                boxShadow: `0 6px 20px ${palette.coralGlow}`,
                background: `linear-gradient(135deg, #164e63 0%, #2563eb 100%)`,
                scale:1.05,
              }}
              whileTap={{ scale: 0.95, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Register
            </motion.span>
            </TransitionLink>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden p-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D1B2A] focus:ring-[${palette.focusAqua}]" // Added focus ring
            style={{
              color: palette.aquaGlow,
              backgroundColor: `${palette.midWater}80`,
              borderColor: `${palette.pearlShimmer}30`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </motion.svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pt-4 border-t space-y-3"
              style={{ borderColor: `${palette.pearlShimmer}30` }}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TransitionLink href='/login' label='' open={false}>
              <motion.span
                className="w-full text-left px-4 py-2.5 font-medium rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D1B2A] focus:ring-[${palette.focusAqua}]" // Added focus ring
                style={{
                  color: palette.pearlShimmer,
                  borderColor: `${palette.aquaGlow}40`,
                  backgroundColor: `${palette.midWater}60`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`
                }}
                whileTap={{ scale: 0.98 }}
                variants={mobileMenuItemVariants}
              >
                Login
              </motion.span>
                </TransitionLink>
                <TransitionLink href='/register' label='' open={false}>
              <motion.span
                className="w-full text-left px-4 py-2.5 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D1B2A] focus:ring-[${palette.focusCoral}]" // Added focus ring
                style={{
                  color: palette.moonGlow,
                  background: `linear-gradient(135deg, ${palette.coralWarm} 0%, ${palette.coralDeep} 100%)`,
                  boxShadow: `0 4px 16px ${palette.coralGlow}`
                }}
                whileTap={{ scale: 0.98 }}
                variants={mobileMenuItemVariants}
              >
                Register
              </motion.span>
              </TransitionLink>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
