// src/components/SatelliteOrbitScene.tsx
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function SatelliteModel({ modelPath, orbitRadius, orbitSpeed }: { modelPath: string, orbitRadius: number, orbitSpeed: number }) {
  const ref = useRef<THREE.Group>(null)
  const { scene } = useGLTF(modelPath)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * orbitSpeed
    const x = orbitRadius * Math.cos(t)
    const z = orbitRadius * Math.sin(t)
    if (ref.current) {
      ref.current.position.set(x, 0, z)
      ref.current.rotation.y = t
    }
  })

  return <primitive ref={ref} object={scene} scale={0.5} />
}

export default function SatelliteOrbitScene() {
  return (
    <Canvas camera={{ position: [0, 200, 600], fov: 45 }}>
      <ambientLight intensity={1} />
      <pointLight position={[500, 500, 500]} />
      <Environment files="/stars.hdr" background />

      <SatelliteModel modelPath="/satellite.glb" orbitRadius={300} orbitSpeed={0.2} />
      <SatelliteModel modelPath="/relay.glb" orbitRadius={500} orbitSpeed={0.1} />

      <OrbitControls enableZoom={true} />
    </Canvas>
  )
}

// preload models
useGLTF.preload('/satellite.glb')
useGLTF.preload('/relay.glb')
