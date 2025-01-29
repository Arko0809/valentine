import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./taylor.css";

// Microphone component
const Microphone = () => {
  return (
    <group position={[0.3, 0, 0.2]}>
      {/* Mic head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#ff4081"
          metalness={0.1}
          roughness={0.1}
          emissive="#ff4081"
        />
      </mesh>
      {/* Mic stand */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.5, 32]} />
        <meshStandardMaterial color="#00bcd4" metalness={0.1} roughness={0.3} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial color="#009688" metalness={0.1} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Taylor Swift figure
const TaylorModel = () => {
  const group = useRef();

  useFrame((state) => {
    // Subtle swaying animation
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Body */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.25, 0.2, 1.5, 32]} />
        <meshStandardMaterial color="#ff9800" /> {/* Vibrant orange dress */}
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#ffeb3b" /> {/* Skin tone */}
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.23, 32, 32]} />
        <meshStandardMaterial color="#ffd54f" /> {/* Golden blonde hair */}
      </mesh>

      {/* Arms */}
      <mesh position={[0.3, 1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 32]} />
        <meshStandardMaterial color="#ffeb3b" />
      </mesh>
      <mesh position={[-0.3, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 32]} />
        <meshStandardMaterial color="#ffeb3b" />
      </mesh>
    </group>
  );
};

// Stage platform
const Stage = () => {
  return (
    <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[2, 32]} />
      <meshStandardMaterial color="#2bfd05" /> {/* Bright purple stage */}
    </mesh>
  );
};

// Twinkling lights
const TwinklingLights = () => {
  const points = useRef();
  const particlesCount = 2000; // Increased for higher density

  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // x (wider coverage)
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y (higher coverage)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z (depth coverage)
    }
    return positions;
  }, []);

  useFrame((state) => {
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;

    // Twinkle effect
    if (points.current.material) {
      points.current.material.size =
        Math.sin(state.clock.elapsedTime * 2) * 0.02 + 0.07;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07} // Bigger for visibility
        color="#f92323"
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};


// Main component
const TaylorScene = () => {
  return (
    <div className="scene-container">
      <Canvas shadows gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }} style={{ background: "#ffdbed" }}>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />
        <OrbitControls enableZoom={true} enablePan={true} />
        <TwinklingLights />
        <ambientLight intensity={1.5} color="#ffffff" />
        <spotLight
          position={[5, 5, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={4}
          castShadow={false}
          color="#ff4081" // Soft pink spotlight
        />
        <spotLight
          position={[-5, 5, 0]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow={false}
          color="#ff4081" // Soft pink spotlight
        />
        <Stage />
        <TaylorModel />
        <Microphone />
      </Canvas>
    </div>
  );
};

export default TaylorScene;