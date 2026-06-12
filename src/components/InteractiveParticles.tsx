'use client'
import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ParticleProps {
  count?: number
}

export default function InteractiveParticles({ count = 1000 }: ParticleProps) {
  const ref = useRef<THREE.Points>(null)
  const { viewport, mouse } = useThree()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Add subtle movement
        positions[i3] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.002
        positions[i3 + 1] += Math.cos(state.clock.elapsedTime * 0.3 + i * 0.1) * 0.002

        // Add mouse influence
        const dx = (mouse.x * viewport.width) / 2 - positions[i3]
        const dy = (mouse.y * viewport.height) / 2 - positions[i3 + 1]
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 3) {
          const force = (3 - dist) * 0.01
          positions[i3] -= dx * force * 0.1
          positions[i3 + 1] -= dy * force * 0.1
        }
      }

      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  )
}