// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface Bubble {
//   id: number;
//   x: number;
//   y: number;
//   size: number;
//   speed: number;
//   drift: number;
//   delay: number;
// }

// interface TrailPoint {
//   id: number;
//   x: number;
//   y: number;
// }

// const Fish: React.FC<{ startX: number; endX: number; y: number; speed: number, fishpng: string }> = ({ startX, endX, y, speed, fishpng }) => (
//   <motion.img
//     src={fishpng}
//     initial={{ x: startX }}
//     animate={{ x: endX }}
//     transition={{ duration: speed, repeat: Infinity, repeatType: "loop" }}
//     style={{ position: "absolute", top: y, width: "60px" }}
//   />
// );

// const OceanBackground: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
//   const [trail, setTrail] = useState<TrailPoint[]>([]);
//   const [bubbles, setBubbles] = useState<Bubble[]>([]);

//   // Track mouse movement for spotlight and trail
// // Trail state update (fix ID and timed removal)
// useEffect(() => {
//   let id = 0;
//   const handleMouseMove = (e: MouseEvent) => {
//     const pointId = id++;
//     const x = e.clientX;
//     const y = e.clientY;
//     setMousePos({ x, y });
//     setTrail((prev) => [...prev, { id: pointId, x, y }]);
//     setTimeout(() => {
//       setTrail((prev) => prev.filter((p) => p.id !== pointId));
//     }, 800); // Match animation duration
//   };
//   window.addEventListener("mousemove", handleMouseMove);
//   return () => window.removeEventListener("mousemove", handleMouseMove);
// }, []);


//   // Spawn bubbles periodically
//   useEffect(() => {
//     const id = setInterval(() => {
//       setBubbles((prev) => {
//         const newBubbles = [];
//         for (let i = 0; i < 2; i++) {
//           const size = 5 + Math.random() * 25;
//           const speed = 0.5 + Math.random() * 2;
//           const drift = (Math.random() - 0.5) * 3;
//           newBubbles.push({
//             id: Date.now() + i,
//             x: Math.random() * window.innerWidth,
//             y: window.innerHeight + 50,
//             size,
//             speed,
//             drift,
//             delay: Math.random() * 0.5,
//           });
//         }
//         return [...prev.filter((b) => b.y > -100), ...newBubbles];
//       });
//     }, 300);
//     return () => clearInterval(id);
//   }, []);

//   // Animate bubbles upward
//   useEffect(() => {
//     let frame: number;
//     const tick = () => {
//       setBubbles((prev) =>
//         prev
//           .map((b) => ({ ...b, y: b.y - b.speed, x: b.x + b.drift }))
//           .filter((b) => b.y > -100)
//       );
//       frame = requestAnimationFrame(tick);
//     };
//     tick();
//     return () => cancelAnimationFrame(frame);
//   }, [bubbles]);

//   // Enhanced color palette for vibrancy
//   const colors = {
//     surface: "#00b7eb",
//     mid: "#0077b6",
//     deep: "#004466",
//     lightRay: "rgba(200, 240, 255, 0.2)",
//     bubbleGlow: "rgba(220, 255, 255, 0.5)",
//     caustic: "rgba(255, 255, 255, 0.1)",
//     fog: "rgba(120, 180, 220, 0.1)",
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 overflow-hidden pointer-events-none"
//       style={{ zIndex: -1 }}
//     >
//       {/* Seabed Background */}
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: "url(/assets/seabedbg.jpeg)",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundPosition: "center bottom",
//           filter: "brightness(0.9) contrast(1.3)",
//         }}
//       />

//       {/* Depth Gradient */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background: `linear-gradient(to top, ${colors.deep}, ${colors.mid} 50%, transparent)`,
//           opacity: 0.7,
//           mixBlendMode: "overlay",
//         }}
//       />

//       {/* Fog Effect */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background: `radial-gradient(circle at 50% 100%, ${colors.fog}, transparent 60%)`,
//           opacity: 0.6,
//           animation: "fogDrift 25s ease-in-out infinite alternate",
//         }}
//       />

//       {/* Caustic Patterns */}
//       <div
//         className="absolute inset-0 mix-blend-overlay"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 20% 20%, ${colors.caustic}, transparent 50%),
//             radial-gradient(circle at 60% 60%, ${colors.caustic}, transparent 50%),
//             radial-gradient(circle at 40% 80%, ${colors.caustic}, transparent 50%)
//           `,
//           backgroundSize: "500px 500px",
//           animation: "causticMove 20s ease-in-out infinite alternate",
//         }}
//       />

//       {/* Swimming Fish */}
//       <Fish fishpng="/assets/fish1.png" startX={-60} endX={window.innerWidth + 60} y={200} speed={25} />
//       <Fish fishpng="/assets/fish2.png"  startX={window.innerWidth + 60} endX={-60} y={400} speed={30} />

//       {/* Enhanced Light Shafts */}
//       {[...Array(12)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute top-0 h-full mix-blend-screen"
//           style={{
//             width: "6px",
//             left: `${(i + 1) * (100 / 13)}%`,
//             background: `linear-gradient(to bottom, ${colors.lightRay}, transparent 70%)`,
//             transform: `rotate(${i % 2 ? -15 : 15}deg) scaleY(${1 + Math.random() * 0.6})`,
//             animation: `lightShaft 35s ease-in-out infinite alternate`,
//             opacity: 0.4,
//             filter: "blur(3px)",
//           }}
//         />
//       ))}

//       {/* Mouse Spotlight */}
//       <motion.div
//         className="absolute rounded-full"
//         animate={{ x: mousePos.x - 200, y: mousePos.y - 200 }}
//         transition={{ type: "spring", stiffness: 50, damping: 12 }}
//         style={{
//           width: 400,
//           height: 400,
//           background: `radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)`,
//           filter: "blur(40px)",
//         }}
//       />

//       {/* Trail Bubbles */}
//       <AnimatePresence>
//        {trail.map((pt) => (
//   <motion.div
//     key={pt.id}
//     initial={{ opacity: 0.8, scale: 1, x: pt.x - 4, y: pt.y - 4 }}
//     animate={{ opacity: 0, scale: 0.2, x: pt.x - 8, y: pt.y - 8 }}
//     transition={{ duration: 0.8, ease: "easeOut" }}
//     style={{
//       position: "absolute",
//       width: 8,
//       height: 8,
//       borderRadius: "50%",
//       background: colors.bubbleGlow,
//       boxShadow: `0 0 12px ${colors.bubbleGlow}`,
//     }}
//   />
// ))}

//       </AnimatePresence>

//       {/* Rising Bubbles */}
//       <AnimatePresence>
//         {bubbles.map((b) => (
//           <motion.div
//             key={b.id}
//             initial={{ opacity: 0, scale: 0.3 }}
//             animate={{ opacity: 0.6, scale: 1 }}
//             exit={{ opacity: 0, scale: 0 }}
//             transition={{ duration: 1.5, delay: b.delay }}
//             style={{
//               position: "absolute",
//               left: b.x,
//               top: b.y,
//               width: b.size,
//               height: b.size,
//               borderRadius: "50%",
//               background: `radial-gradient(circle at 30% 30%, white, ${colors.bubbleGlow} 80%, transparent)`,
//               boxShadow: `0 0 ${b.size / 2}px ${colors.bubbleGlow}, inset 0 0 ${b.size / 8}px white`,
//             }}
//           />
//         ))}
//       </AnimatePresence>

//       {/* Global CSS Keyframes */}
//       <style jsx>{`
//         @keyframes sway {
//           0% { transform: rotate(-2deg); }
//           100% { transform: rotate(2deg); }
//         }
//         @keyframes causticMove {
//           0% { background-position: 0% 0%, 50% 50%, 20% 80%; }
//           50% { background-position: 100% 100%, 0% 20%, 80% 10%; }
//           100% { background-position: 0% 0%, 50% 50%, 20% 80%; }
//         }
//         @keyframes lightShaft {
//           0% { transform: translateX(0) translateY(0); }
//           50% { transform: translateX(25px) translateY(60px); }
//           100% { transform: translateX(0) translateY(0); }
//         }
//         @keyframes fogDrift {
//           0% { transform: translateX(0) translateY(0); opacity: 0.6; }
//           50% { transform: translateX(20px) translateY(10px); opacity: 0.7; }
//           100% { transform: translateX(0) translateY(0); opacity: 0.6; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OceanBackground;