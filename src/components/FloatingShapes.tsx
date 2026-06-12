'use client'
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Torus, Octahedron, Tetrahedron, Icosahedron, TorusKnot } from '@react-three/drei'
import * as THREE from 'three'

const SHAPES_CONFIG = [
  { position: [-4, 2, -5] as [number, number, number], geometry: 'octahedron', color: '#00D4FF', speed: 1.2, scale: 0.6 },
  { position: [4, 1, -4] as [number, number, number], geometry: 'tetrahedron', color: '#B026FF', speed: 0.8, scale: 0.5 },
  { position: [-3, -1, -6] as [number, number, number], geometry: 'torus', color: '#00D4FF', speed: 1.5, scale: 0.4 },
  { position: [3, 2.5, -5.5] as [number, number, number], geometry: 'icosahedron', color: '#B026FF', speed: 1.0, scale: 0.35 },
  { position: [5, -1.5, -3] as [number, number, number], geometry: 'tetrahedron', color: '#00D4FF', speed: 1.3, scale: 0.45 },
  { position: [-5, 0.5, -4.5] as [number, number, number], geometry: 'torus', color: '#B026FF', speed: 0.9, scale: 0.5 },
  { position: [0, 3, -7] as [number, number, number], geometry: 'octahedron', color: '#ffffff', speed: 1.1, scale: 0.3 },
  { position: [-2, -2, -5] as [number, number, number], geometry: 'icosahedron', color: '#00D4FF', speed: 0.7, scale: 0.55 },
  { position: [2, -2.5, -6] as [number, number, number], geometry: 'torusKnot', color: '#B026FF', speed: 1.4, scale: 0.35 },
  { position: [0, -3, -4] as [number, number, number], geometry: 'octahedron', color: '#ffffff', speed: 0.6, scale: 0.4 },
]

function ShapeGeometry({ type, color }: { type: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.008
    }
  })

  const wireframeMaterial = useMemo(() => (
    <meshBasicMaterial color={color as any} wireframe transparent opacity={0.6} />
  ), [color])

  switch (type) {
    case 'torus':
      return (
        <mesh ref={meshRef}>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          {wireframeMaterial}
        </mesh>
      )
    case 'octahedron':
      return (
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.6, 0]} />
          {wireframeMaterial}
        </mesh>
      )
    case 'tetrahedron':
      return (
        <mesh ref={meshRef}>
          <tetrahedronGeometry args={[0.6, 0]} />
          {wireframeMaterial}
        </mesh>
      )
    case 'icosahedron':
      return (
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.5, 0]} />
          {wireframeMaterial}
        </mesh>
      )
    case 'torusKnot':
      return (
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[0.35, 0.1, 64, 16]} />
          {wireframeMaterial}
        </mesh>
      )
    default:
      return (
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.5, 0]} />
          {wireframeMaterial}
        </mesh>
      )
  }
}

export default function FloatingShapes() {
  return (
    <group>
      {SHAPES_CONFIG.map((config, index) => (
        <Float
          key={index}
          speed={config.speed}
          rotationIntensity={1}
          floatIntensity={2}
          position={config.position}
        >
          <group scale={config.scale}>
            <ShapeGeometry type={config.geometry} color={config.color} />
          </group>
        </Float>
      ))}
    </group>
  )
}