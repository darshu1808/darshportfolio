'use client'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#00D4FF" />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#B026FF" />
        <Environment preset="city" />
        
        {/* Subtle background particles */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
          <Noise opacity={0.02} />
        </EffectComposer>

        <AnimatedBackground />
      </Canvas>
    </div>
  )
}

function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <icosahedronGeometry args={[15, 1]} />
      <meshPhysicalMaterial 
        color="#0F0F11" 
        wireframe 
        transparent 
        opacity={0.1} 
        roughness={0.2} 
        metalness={1.0}
      />
    </mesh>
  )
}
