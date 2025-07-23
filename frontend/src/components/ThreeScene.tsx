import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { Mesh, PointLight, Vector2 } from 'three/src/Three.js';
import gsap from 'gsap'
interface GLTFModelProps {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  inView:boolean;
}

const GLTFModel: React.FC<GLTFModelProps> = ({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], inView }) => {
  const { scene } = useGLTF(url);
  const mesh = useRef<Mesh>(null);
 
  useEffect(() => {
    if(mesh.current) {
      if(inView){
        gsap.to(mesh.current.scale, { x: 1, y: 1, z: 1, duration: 4, ease:'power1.out'});
        gsap.to(mesh.current.rotation, { x: 0, y: -0.3, z: 0, duration: 4,  ease:'power1.out'});
      }else {
        gsap.set(mesh.current.rotation, { x: 0, y: -1.57, z: 0 });
        gsap.set(mesh.current.scale, { x: 0.2, y: 0.2, z: 0.2 });
    }}
  }, [inView]);
  const initialY = useRef(position[1]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      const time = clock.getElapsedTime();
      const amplitude = 0.3;
      const frequency = 1;
      mesh.current.position.y = initialY.current + Math.sin(time * frequency) * amplitude;
    }
  });
  return (
    <primitive
      object={scene}
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

useGLTF.preload('/submarine.glb');

const CursorLight: React.FC<{ mouse: Vector2 }> = ({ mouse }) => {
  const lightRef = useRef<PointLight>(null);
  const { size } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.set(mouse.x * size.width / 2, mouse.y * size.height / 2, 5);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color={0xffffff}
      intensity={1}
      distance={15}
      decay={2}
    />
  );
};
type SceneProps={
  inView:boolean
}
const Scene: React.FC<SceneProps> = ({inView}) => {
  const [mouse, setMouse] = useState(new Vector2(0, 0));

  const handleMouseMove = (event: React.PointerEvent) => {
    setMouse(new Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    ));
  };
  return (
    <Canvas onPointerMove={handleMouseMove}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="sunset" />
      <OrbitControls enableZoom={false} enableRotate={false} />
      <CursorLight mouse={mouse} />
      <GLTFModel
        url="/submarine.glb"
        position={[-0.1, 0, 0]}
        rotation={[0, -1.57, 0]}
        scale={[0.2, 0.2, 0.2]}
        inView={inView}
      />
    </Canvas>
  );
};

export default Scene;
