// "use client"
// import React, { useRef, useEffect, Suspense } from 'react';
// import { Canvas, useFrame, extend, useLoader } from '@react-three/fiber';
// import { shaderMaterial } from '@react-three/drei';
// import * as THREE from 'three';

// // This shader is the core of the effect. It calculates the ripple distortion.
// const WaterRippleMaterial = shaderMaterial(
//   // Uniforms: Data passed from React to the shader
//   {
//     u_time: 0,
//     u_texture: null, // The background image
//     u_mouse_history: Array(50).fill(0).map(() => new THREE.Vector3(0, 0, 0)), // Stores recent mouse positions (x, y, startTime)
//     u_mouse_index: 0, // Current position in the history array
//   },
//   // Vertex Shader: Positions the plane in 3D space
//   `
//     varying vec2 vUv;
//     void main() {
//       vUv = uv;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `,
//   // Fragment Shader: Calculates the color of each pixel
//   `
//     uniform float u_time;
//     uniform sampler2D u_texture;
//     uniform vec3 u_mouse_history[50];
//     varying vec2 vUv;

//     void main() {
//       vec2 uv = vUv;
//       vec2 displacement = vec2(0.0);

//       // Loop through all stored mouse positions to create ripples
//       for (int i = 0; i < 50; i++) {
//         vec3 ripple = u_mouse_history[i];
//         float ripple_startTime = ripple.z;

//         // Only process active ripples
//         if (ripple_startTime > 0.0) {
//           float time_since_ripple = u_time - ripple_startTime;
          
//           // Ripple properties
//           float ripple_duration = 2.0; // How long a ripple lasts
//           float max_amplitude = 0.05; // How strong the distortion is
//           float frequency = 50.0; // How many waves in the ripple

//           if (time_since_ripple < ripple_duration) {
//             // Calculate distance from current pixel to the ripple's origin
//             float dist = distance(uv, ripple.xy);
            
//             // Calculate the wave
//             // It expands outwards over time (dist - time_since_ripple * 0.2)
//             // It fades out over time (pow(1.0 - time_since_ripple / ripple_duration, 2.0))
//             float wave = sin(dist * frequency - time_since_ripple * 5.0);
//             float amplitude = max_amplitude * pow(1.0 - time_since_ripple / ripple_duration, 2.0);

//             // Make the wave strongest near its expanding edge
//             float circle_edge = smoothstep(0.0, 0.1, dist - time_since_ripple * 0.2) - smoothstep(0.1, 0.2, dist - time_since_ripple * 0.2);
            
//             // Calculate the displacement direction (away from the ripple center)
//             vec2 direction = normalize(uv - ripple.xy);
            
//             // Add this ripple's displacement to the total
//             displacement += direction * wave * amplitude * circle_edge;
//           }
//         }
//       }

//       // Apply the displacement to the texture coordinates
//       vec2 distorted_uv = uv + displacement;

//       // Sample the texture with the distorted coordinates
//       vec4 final_color = texture2D(u_texture, distorted_uv);

//       gl_FragColor = final_color;
//     }
//   `
// );

// extend({ WaterRippleMaterial });

// // Scene component containing the logic
// const Scene = () => {
//   const materialRef = useRef();
//   const mouseHistory = useRef(Array(50).fill(0).map(() => new THREE.Vector3(0, 0, 0)));
//   const mouseIndex = useRef(0);
//   const lastRippleTime = useRef(0);

//   // Load the background texture
//   const texture = useLoader(THREE.TextureLoader, 'https://images.unsplash.com/photo-1530531248238-a49f44900841?q=80&w=2574&auto=format&fit=crop');
  
//   // Ensure texture covers the plane without stretching
//   useEffect(() => {
//     if (texture) {
//         texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//         const aspect = window.innerWidth / window.innerHeight;
//         texture.repeat.set(aspect > 1 ? 1/aspect : 1, aspect > 1 ? 1 : aspect);
//         texture.offset.set(aspect > 1 ? (1 - 1/aspect) / 2 : 0, aspect > 1 ? 0 : (1 - aspect) / 2);
//     }
//   }, [texture]);

//   // Track mouse movement and create ripples
//   const onMouseMove = (event) => {
//     if (Date.now() - lastRippleTime.current < 50) return; // Throttle ripples
//     lastRippleTime.current = Date.now();

//     const { clientX, clientY } = event;
//     const { width, height } = event.target.getBoundingClientRect();
//     const uvX = clientX / width;
//     const uvY = 1.0 - (clientY / height); // Invert Y for shader coordinates

//     mouseHistory.current[mouseIndex.current].set(uvX, uvY, Date.now() / 1000.0);
//     mouseIndex.current = (mouseIndex.current + 1) % 50;
//   };

//   useFrame(({ clock }) => {
//     if (materialRef.current) {
//       materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
//       materialRef.current.uniforms.u_mouse_history.value = mouseHistory.current;
//     }
//   });

//   return (
//     <mesh onMouseMove={onMouseMove}>
//       <planeGeometry args={[2, 2]} />
//       <waterRippleMaterial ref={materialRef} u_texture={texture} />
//     </mesh>
//   );
// };

// export default Scene;