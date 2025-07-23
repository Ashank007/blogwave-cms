// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// // --- TypeScript Declaration for jQuery Ripples ---
// interface Bubble {
//   id: number;
//   x: number;
//   y: number;
//   size: number;
//   speed: number;
//   drift: number;
//   delay: number;
// }
// declare global {
//   interface JQuery {
//     ripples(options?: {
//       resolution?: number;
//       dropRadius?: number;
//       perturbance?: number;
//       imageUrl?: string;
//       interactive?: boolean;
//     }): JQuery;
//     ripples(command: "drop", x: number, y: number, radius: number, strength: number): JQuery;
//     ripples(command: "destroy"): JQuery;
//   }

//   interface Window {
//     $: JQueryStatic;
//     jQuery: JQueryStatic;
//   }
// }

// // --- Props (optional) ---
// interface WaterRippleBackgroundProps {
//   backgroundImage?: string;
//   zIndex?: number;
//   className?: string;
// }

// // --- Component ---
// const WaterRippleBackground: React.FC<WaterRippleBackgroundProps> = ({
//   backgroundImage = "/assets/seabedbg.jpeg",
//   zIndex = -1,
//   className = "",
// }) => {
//   const rippleRef = useRef<HTMLDivElement>(null);
//   const isRipplesPluginInitialized = useRef(false);

//   useEffect(() => {
//     let checkInterval: NodeJS.Timeout | null = null; // For checking plugin availability

//     const initializeAndSetupRipples = () => {
//       if (!rippleRef.current || typeof window === 'undefined' || !window.$ || typeof window.$.fn.ripples !== 'function') {
//         // console.log("jQuery or Ripples plugin not ready yet. Retrying...");
//         return;
//       }

//       if (isRipplesPluginInitialized.current) {
//         if (checkInterval) clearInterval(checkInterval);
//         return;
//       }

//       if (checkInterval) {
//         clearInterval(checkInterval);
//         checkInterval = null;
//       }

//       const $ = window.$;
//       const $rippleElement = $(rippleRef.current);

//       try {
//         $rippleElement.ripples({
//           resolution: 512,
//           dropRadius: 5, // Smaller drop radius for trail effect
//           perturbance: 0.01, // Lower perturbance for a subtle trail
//           imageUrl: backgroundImage,
//           interactive: false,
//         });
//         isRipplesPluginInitialized.current = true; // Mark as initialized
//         //console.log("jQuery Ripples plugin initialized successfully.");

//         // --- Manual Mouse Move Handler for Ripple Trail ---
//         const handleMouseMove = (e: MouseEvent) => {
//           // Ensure plugin is initialized and ref is valid
//           if (!rippleRef.current || !isRipplesPluginInitialized.current) return;

//           const rect = rippleRef.current.getBoundingClientRect();
//           const x = e.clientX - rect.left; // X coordinate relative to the ripple container
//           const y = e.clientY - rect.top;  // Y coordinate relative to the ripple container

//           $rippleElement.ripples("drop", x, y, 15, 0.03); // Adjust radius and strength for desired trail
//         };

//         document.body.addEventListener("mousemove", handleMouseMove);


//         setTimeout(() => {
//           if (rippleRef.current) {
//             const { clientWidth, clientHeight } = rippleRef.current;
//             $rippleElement.ripples("drop", clientWidth / 2, clientHeight / 2, 20, 0.04);
//             console.log("Initial ripple dropped.");
//           }
//         }, 1000);

//         return () => {
//           document.body.removeEventListener("mousemove", handleMouseMove);
//           if (isRipplesPluginInitialized.current) {
//             try {
//               const $el = $(rippleRef.current!);
//               const rippleCanvas = $el.find('canvas.jquery-ripples').get(0);
//               if (rippleCanvas) {
//                 rippleCanvas.remove();
//                 console.log("Ripples canvas removed during cleanup.");
//                 if (backgroundImage) {
//                   $el.css('background-image', `url(${backgroundImage})`);
//                   $el.css('background-size', 'cover');
//                   $el.css('background-position', 'center');
//                 }
//               }
//             } catch (e) {
//               console.warn("Error during ripples cleanup:", e);
//             }
//             isRipplesPluginInitialized.current = false;
//           }
//         };

//       } catch (error) {
//         console.error("Error initializing jQuery Ripples:", error);
//         isRipplesPluginInitialized.current = false;
//       }
//     };

//     checkInterval = setInterval(initializeAndSetupRipples, 100);

//     return () => {
//       if (checkInterval) {
//         clearInterval(checkInterval);
//       }
//     };

//   }, [backgroundImage]);
//   const [bubbles, setBubbles] = useState<Bubble[]>([]);
//  useEffect(() => {
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
//       ref={rippleRef}
//       className={`absolute inset-0 w-full h-full ${className}`}
//       style={{
//         zIndex,
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         overflow: "hidden",
//         pointerEvents: "auto",
//       }}
//     >
//          <AnimatePresence>
//                 {bubbles.map((b) => (
//                   <motion.div
//                     key={b.id}
//                     initial={{ opacity: 0, scale: 0.3 }}
//                     animate={{ opacity: 0.6, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0 }}
//                     transition={{ duration: 1.5, delay: b.delay }}
//                     style={{
//                       position: "absolute",
//                       left: b.x,
//                       top: b.y,
//                       width: b.size,
//                       height: b.size,
//                       borderRadius: "50%",
//                       background: `radial-gradient(circle at 30% 30%, white, ${colors.bubbleGlow} 80%, transparent)`,
//                       boxShadow: `0 0 ${b.size / 2}px ${colors.bubbleGlow}, inset 0 0 ${b.size / 8}px white`,
//                     }}
//                   />
//                 ))}
//               </AnimatePresence>
//     </div>
//   );
// };

// export default WaterRippleBackground;
