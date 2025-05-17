// src/logic/tleUtils.ts
import * as satellite from 'satellite.js'
import { Position } from './orbitMath'

/**
 * Extended position with geodetic info and ISO timestamp
 */
export interface TLEPosition extends Position {
  lat: number
  lon: number
  alt: number
  time: string
}

/** Parse two-line element sets into a SatRec */
export function parseTLE(tle1: string, tle2: string): satellite.SatRec {
  return satellite.twoline2satrec(tle1, tle2)
}

/**
 * Propagate a SatRec for `minutes` minutes at 1-minute intervals.
 * Returns an array of 3D ECI + geodetic positions with timestamps.
 */
export function propagateTLE(
  satrec: satellite.SatRec,
  minutes: number = 1440
): TLEPosition[] {
  const positions: TLEPosition[] = []
  const startTime = new Date()

  for (let i = 0; i < minutes; i++) {
    const time = new Date(startTime.getTime() + i * 60 * 1000)
    const posVel = satellite.propagate(satrec, time)
    if (posVel === null || posVel.position === undefined) continue

    const { position } = posVel
    const gmst = satellite.gstime(time)
    const geo   = satellite.eciToGeodetic(position, gmst)

    positions.push({
      // ECI
      x: position.x,
      y: position.y,
      z: position.z,
      t: i * 60,                   // seconds since start

      // geodetic
      lat: satellite.degreesLat(geo.latitude),
      lon: satellite.degreesLong(geo.longitude),  // fixed!
      alt: geo.height,

      // ISO timestamp
      time: time.toISOString(),
    })
  }

  return positions
}
