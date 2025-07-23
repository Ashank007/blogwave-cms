import React, { useState, useEffect, useRef } from 'react';

const palette = {
    deepWater: '#0D1B2A',
    midWater: '#1B263B',
    surfaceWater: '#2D4A68',
    moonGlow: '#E8F4FD',
    pearlShimmer: '#C5E4FD',
    aquaGlow: '#7DD3FC',
    coralWarm: '#FF6B9D',
    coralDeep: '#D946A3',
    headerBgScrolled: 'rgba(13, 27, 42, 0.95)',
    headerBgDefault: 'rgba(27, 38, 59, 0.85)',
    shadowLight: 'rgba(125, 211, 252, 0.15)',
    shadowMedium: 'rgba(125, 211, 252, 0.25)',
    shadowCoral: 'rgba(255, 107, 157, 0.20)',
    focusAqua: '#7DD3FC',
    focusCoral: '#FF6B9D',
};

interface TrailParticle {
    id: number;
    x: number;
    y: number;
    size: number;
    // We'll use border for the bubble effect, so color can be less impactful
    initialOpacity: number;
    createdAt: number;
    swayOffset: number;
}

const AnimatedBackground: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [bubbleCount, setBubbleCount] = useState(20);
    const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
    const nextParticleId = useRef(0);

    useEffect(() => {
        const updateBubbleCount = () => {
            const width = window.innerWidth;
            setBubbleCount(Math.min(Math.floor(width / 30), 60));
        };

        updateBubbleCount();
        window.addEventListener('resize', updateBubbleCount);

        const handleMouseMove = (e: MouseEvent) => {
            const newX = (e.clientX / window.innerWidth) * 100;
            const newY = (e.clientY / window.innerHeight) * 100;
            setMousePosition({ x: newX, y: newY });

            // Generate particles more frequently for a dense trail
            setTrailParticles(prevParticles => {
                const newParticle: TrailParticle = {
                    id: nextParticleId.current++,
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 8 + 6, // Larger bubbles: 6px to 14px
                    initialOpacity: Math.random() * 0.2 + 0.3, // Subtle initial opacity for transparency
                    createdAt: Date.now(),
                    swayOffset: (Math.random() - 0.5) * 50, // Increased horizontal sway (-25 to 25)
                };
                // Keep more particles for a visible trail
                return [...prevParticles, newParticle].slice(-250); // Keep up to 250 particles
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup old particles based on their creation time
        const particleLifetime = 2000; // Bubbles live for 2 seconds (longer for full animation)
        const cleanupInterval = setInterval(() => {
            setTrailParticles(prevParticles =>
                prevParticles.filter(p => Date.now() - p.createdAt < particleLifetime)
            );
        }, 50); // Check more frequently

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', updateBubbleCount);
            clearInterval(cleanupInterval);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {/* ... (Previous background layers remain the same) ... */}
            <div
                className="absolute inset-0 animate-fadeIn"
                style={{
                    background: `linear-gradient(to bottom, ${palette.deepWater} 0%, ${palette.midWater} 50%, ${palette.surfaceWater} 100%)`,
                    opacity: 0.9
                }}
            ></div>

            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at center, ${palette.deepWater}00 0%, ${palette.deepWater}D0 80%)`,
                }}
            ></div>

            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${palette.aquaGlow}20 0%, transparent 40%)`,
                    opacity: 0.4,
                    filter: 'blur(50px)',
                }}
            ></div>

            <div className="absolute inset-0 opacity-15">
                <div
                    className="absolute w-full h-full animate-caustics"
                    style={{
                        background: `linear-gradient(180deg, ${palette.pearlShimmer}1A 0%, transparent 50%)`,
                    }}
                ></div>
                <div
                    className="absolute w-full h-full animate-caustics delay-1000"
                    style={{
                        background: `linear-gradient(180deg, ${palette.moonGlow}15 0%, transparent 60%)`,
                    }}
                ></div>
            </div>

            <div className="absolute inset-0">
                {[...Array(bubbleCount)].map((_, i) => {
                    const size = Math.random() * 8 + 3;
                    const duration = 6 + Math.random() * 6;
                    const delay = Math.random() * 6;
                    const sway = Math.random() * 2 - 1;

                    return (
                        <div
                            key={i}
                            className="absolute rounded-full animate-bubble"
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                left: `${Math.random() * 100}%`,
                                bottom: '-10%',
                                backgroundColor: `${palette.pearlShimmer}30`,
                                opacity: 0.2 + Math.random() * 0.4,
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                                transform: `translateX(${sway * 70}px)`,
                            }}
                        ></div>
                    );
                })}
            </div>

            {/* Mouse Trail Particles - Now "Bubbles" with enhanced visuals */}
            <div className="absolute inset-0 pointer-events-none">
                {trailParticles.map(p => 
                (
                    <div
                        key={p.id}
                        className="absolute rounded-full animate-mouse-bubble"
                        style={{
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            left: `${p.x}px`,
                            top: `${p.y}px`,
                            backgroundColor: `${palette.pearlShimmer}10`, // Very transparent background
                            opacity: p.initialOpacity,
                            // Translucent border for the bubble edge
                            border: `1px solid ${palette.pearlShimmer}80`,
                            // Subtle box-shadow for depth/shine
                            boxShadow: `0 0 5px ${palette.aquaGlow}20 inset, 0 0 10px ${palette.moonGlow}30`,
                            transform: `translate(-50%, -50%)`, // Center the particle initially
                            animationDuration: `${p.size * 0.09 + 1.2}s`, // Adjusted duration for smooth rise
                            animationFillMode: 'forwards',
                            animationTimingFunction: 'ease-out',
                          //   '--sway-offset': `${p.swayOffset}px`,
                          //  '--initial-opacity': p.initialOpacity, // Pass initial opacity to keyframes
                            ...{
                            '--sway-offset': `${p.swayOffset}px`,
                            '--initial-opacity': p.initialOpacity,
                          } as React.CSSProperties,
                        }}
                    />
                ))}
            </div>

            {/* Tailwind CSS keyframes for mouse bubble trail */}
            <style jsx>{`
                @keyframes mouse-bubble {
                    0% {
                        opacity: var(--initial-opacity);
                        transform: translate(-50%, -50%) translateY(0) translateX(0) scale(1);
                        border-width: 1px; // Ensure border is visible
                    }
                    80% {
                        opacity: var(--initial-opacity) * 0.8; // Start fading slightly before pop
                        transform: translate(-50%, -50%) translateY(-150px) translateX(var(--sway-offset)) scale(1.1);
                        border-width: 1px;
                    }
                    95% {
                        opacity: 0.2; // Quick fade and shrink before pop
                        transform: translate(-50%, -50%) translateY(-170px) translateX(var(--sway-offset) * 1.5) scale(0.2);
                        border-width: 0px; // Border disappears
                    }
                    100% {
                        opacity: 0; // Completely gone
                        transform: translate(-50%, -50%) translateY(-180px) translateX(var(--sway-offset) * 1.5) scale(0); // Shrink to nothing
                    }
                }
                .animate-mouse-bubble {
                    animation-name: mouse-bubble;
                }
            `}</style>
        </div>
    );
};

export default AnimatedBackground;