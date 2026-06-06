import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group, MeshStandardMaterial, Color } from "three";

const BrainModel = () => {
  const { scene } = useGLTF("/public/brain.glb");
  const brainRef = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (brainRef.current) {
      brainRef.current.rotation.y = time * 0.3;
      brainRef.current.rotation.x = Math.sin(time * 0.2) * 0.05;
    }
  });

  // Apply emissive material with proper THREE.Color instance
  scene.traverse((child: any) => {
    if (child.isMesh) {
      const mat = child.material as MeshStandardMaterial;
      mat.emissive = new Color(0x00c8ff); // cyan glow
      mat.emissiveIntensity = 0.4;
      mat.metalness = 0.4;
      mat.roughness = 0.25;
    }
  });

  return (
    <primitive
      ref={brainRef}
      object={scene}
      scale={1.5}
      position={[-1, -2.0, 0]}
    />
  );
};

export const BrainVisualization = () => {
  return (
    <div className="fixed inset-0" style={{ zIndex: 2 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45}}
        style={{ background: "transparent" }}
      >
        {/* Ambient and Glow Lighting */}
        <ambientLight intensity={0.25} color="#ffffffff" />
          <directionalLight
            position={[3, 2, 5]}
            intensity={2}
            color={"#ffffff"}
          />
         <pointLight position={[-4, 2, -3]} intensity={2.5} color={"#86ced5ff"} />
         <pointLight position={[2, -1, 3]} intensity={1.5} color={"#ffffff"} />
        <spotLight position={[0, 10, 10]} intensity={1.2} color="#f0ffffff" angle={0.4} penumbra={0.5} />
        


        {/* === MODEL POSITION === */}
          <group position={[0, -0.3, 0]}>
            <BrainModel />
          </group>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.0}
         
        />
      </Canvas>
    </div>
  );
};
