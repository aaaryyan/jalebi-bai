// src/logic/orbitMath.ts
import { OrbitParams } from '../types'

export interface Position {
    x: number,
    y: number,
    z: number,
    t: number // seconds since start
}

/**
 * Given orbit parameters, calculate x and y positions over a full orbit duration
 * Simplified: Earth at center (0, 0), orbit is circular
 */
export function calculateOrbit(params: OrbitParams): Position[] {
  const radius = 6371 + params.altitude // Earth radius + altitude in km
  const numPoints = 1440
  const positions: Position[] = []

  const GMe = 3.986e5 // km^3/s^2
  const T = 2 * Math.PI * Math.sqrt(Math.pow(radius, 3) / GMe)
  const inclinationRad = (params.inclination ?? 97.5) * (Math.PI / 180)

  for (let i = 0; i < numPoints; i++) {
    const t = i * 60
    const angle = (2 * Math.PI / T) * t

    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle) * Math.cos(inclinationRad)
    const z = radius * Math.sin(angle) * Math.sin(inclinationRad)

    positions.push({ x, y, z, t })
  }
  
  return positions
}
