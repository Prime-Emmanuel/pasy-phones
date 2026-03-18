import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import IPhoneModel from './iPhoneModel'; // Fixed import name
import './Scene3D.css';

const Scene3D = () => {
  return (
    <div className="scene-container">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          autoRotate={true}
          autoRotateSpeed={1.0}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 2 - 0.1}
        />
        
        <Suspense fallback={null}>
          <IPhoneModel position={[0, -0.5, 0]} scale={[2, 2, 2]} />
          <Environment preset="studio" background={false} />
        </Suspense>

        <ambientLight intensity={1.5} />
        <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
        <spotLight position={[-10, 0, -10]} angle={0.2} penumbra={1} intensity={1} color="#4444ff" />
      </Canvas>
      {/* Overlay removed, title is handled in HeroSection now */}
    </div>
  );
};

export default Scene3D;