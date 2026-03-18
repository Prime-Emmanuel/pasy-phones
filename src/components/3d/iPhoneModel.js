import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';

const IPhoneModel = ({ position, rotation, scale, ...props }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
        {/* Main body - Dark Titanium iPhone */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.6, 0.1]} radius={0.1} />
          <meshPhysicalMaterial
            color="#1d1d1f"
            metalness={1}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </mesh>

        {/* Screen with slight glass glow */}
        <mesh position={[0, 0, 0.052]}>
          <boxGeometry args={[0.76, 1.56, 0.01]} />
          <meshPhysicalMaterial
            color="#000000"
            metalness={0.8}
            roughness={0}
            transmission={0.9}
            thickness={0.5}
            envMapIntensity={2}
          />
        </mesh>

        {/* Camera module */}
        <mesh position={[0.2, 0.6, 0.06]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.05]} />
          <meshPhysicalMaterial
            color="#111111"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        
        {/* Lenses */}
        <mesh position={[0.27, 0.67, 0.08]}>
          <cylinderGeometry args={[0.06, 0.06, 0.015, 32]} />
          <meshPhysicalMaterial color="#000" metalness={1} roughness={0} />
        </mesh>
        <mesh position={[0.13, 0.53, 0.08]}>
          <cylinderGeometry args={[0.06, 0.06, 0.015, 32]} />
          <meshPhysicalMaterial color="#000" metalness={1} roughness={0} />
        </mesh>
        <mesh position={[0.13, 0.67, 0.08]}>
          <cylinderGeometry args={[0.04, 0.04, 0.015, 32]} />
          <meshPhysicalMaterial color="#000" metalness={1} roughness={0} />
        </mesh>

        {/* Apple logo (black/shiny) */}
        <mesh position={[0, 0, -0.052]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.15, 0.15]} />
          <meshPhysicalMaterial
            color="#000000"
            metalness={1}
            roughness={0}
            envMapIntensity={2}
          />
        </mesh>
      </group>

      {/* Ambient lights */}
      <Environment preset="city" />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </Float>
  );
};

export default IPhoneModel;