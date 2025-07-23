// Submarine.tsx
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // Import THREE if not already imported by useGLTF/useFrame

useGLTF.preload('/assets/submarine.glb');

const Submarine: React.FC = () => {
  const { scene } = useGLTF('/assets/submarine.glb');
  const submarineRef = useRef<THREE.Group>(null);

  // Use useFrame for continuous, simple motion
  useFrame((state) => {
    if (submarineRef.current) {
      const time = state.clock.elapsedTime;
      const initialY = -2; // Keep the base position around -2 as per initial setup
      const amplitude = 0.3; // How much it moves up and down
      const frequency = 0.5; // How fast it bobs

      // Simple sine motion for up and down
      submarineRef.current.position.y = initialY + Math.sin(time * frequency) * amplitude;

      // You can keep these subtle rotations if you like a little extra movement,
      // or remove them to make it purely vertical bobbing.
      // Keeping them for a little more organic feel without complexity.
      submarineRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      submarineRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
    }
  });

  return (
    <primitive
      ref={submarineRef}
      object={scene}
      scale={[0.6, 0.6, 0.6]} // Initial scale
      position={[0, -2, 0]}  // Initial position (Y will be overridden by useFrame)
      rotation={[0, 0, 0]}   // Initial rotation (Y and Z will be overridden by useFrame)
    />
  );
};

export default Submarine;