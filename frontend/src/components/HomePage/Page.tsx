"use client";
import React from 'react';
import Header from './Header';
import Hero from './Hero';
import WaveSeparator from './WaveSeparator';
import FeaturedBlogs from './FeaturedBlogs';
import CallToAction from './CallToAction';
import Footer from './Footer';
import AnimatedBackground from './AnimationBackground';

export default function BlogWaveHomepage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-cyan-900 text-white overflow-hidden">
      <AnimatedBackground />
      <Header />
      <Hero />
      <WaveSeparator />
      <FeaturedBlogs />
      <CallToAction />
      
    </div>
  );
}