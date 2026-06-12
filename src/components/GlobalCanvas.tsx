'use client'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#0B1020']} />
        <fog attach="fog" args={['#0B1020', 8, 25]} />

        {/* Subtle Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00C2FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#6D5EF3" />

        {/* Very Subtle Stars */}
        <Stars radius={80} depth={30} count={1000} factor={3} saturation={0} fade speed={0.5} />

        {/* Subtle Floating Particles */}
        <FloatingOrbs />

        {/* Post-Processing - Subtle */}
        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            intensity={0.8}
            mipmapBlur
          />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.15} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  const orbs = [
    { position: [3, 2, -5] as [number, number, number], scale: 0.3, color: '#6D5EF3' },
    { position: [-4, 1, -4] as [number, number, number], scale: 0.2, color: '#00C2FF' },
    { position: [2, -2, -6] as [number, number, number], scale: 0.15, color: '#6D5EF3' },
    { position: [-2, 3, -5] as [number, number, number], scale: 0.25, color: '#00C2FF' },
  ]

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0} floatIntensity={2}>
          <mesh position={orb.position}>
            <sphereGeometry args={[orb.scale, 16, 16]} />
            <meshBasicMaterial color={orb.color} transparent opacity={0.15} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}