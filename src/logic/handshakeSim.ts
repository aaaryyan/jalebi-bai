// src/logic/handshakeSim.ts
import { Position } from './orbitMath'

export interface HandshakeResult {
  handshakeCount: number
  blackoutCount: number
  totalBlackoutTime: number
  averageBlackoutTime: number
  blackoutEvents: Array<{
    start: number
    end: number
    duration: number
  }>
}

export function calculateHandshakes(
  beaconPath: Position[],
  relayPaths: Position[][],
  range: number = 2000,
  coneFOV: number = 62
): HandshakeResult {
  if (!relayPaths.length || !beaconPath.length) {
    return {
      handshakeCount: 0,
      blackoutCount: 0,
      totalBlackoutTime: 0,
      averageBlackoutTime: 0,
      blackoutEvents: []
    }
  }

  let handshakeCount = 0
  let inHandshake = false
  const blackoutEvents: HandshakeResult['blackoutEvents'] = []
  let currentBlackoutStart: number | null = null

  for (let i = 0; i < beaconPath.length; i++) {
    const beacon = beaconPath[i]
    let anyInHandshake = false

    for (const path of relayPaths) {
      const relay = path[i]
      if (!relay) continue

      const dx = beacon.x - relay.x
      const dy = beacon.y - relay.y
      const dz = beacon.z - relay.z
      const distance = Math.hypot(dx, dy, dz)
      if (distance === 0) continue  // skip degenerate case

      const angleDeg = (Math.acos(-dz / distance) * 180) / Math.PI
      const inCone = angleDeg <= coneFOV / 2

      if (distance <= range && inCone) {
        anyInHandshake = true
        break
      }
    }

    // entering handshake
    if (anyInHandshake && !inHandshake) {
      handshakeCount++
      if (currentBlackoutStart !== null) {
        blackoutEvents.push({
          start: currentBlackoutStart,
          end: beacon.t,
          duration: beacon.t - currentBlackoutStart
        })
        currentBlackoutStart = null
      }
    }

    // entering blackout
    if (!anyInHandshake && inHandshake) {
      currentBlackoutStart = beacon.t
    }

    inHandshake = anyInHandshake
  }

  // close final blackout
  const lastT = beaconPath[beaconPath.length - 1].t
  if (!inHandshake && currentBlackoutStart !== null) {
    blackoutEvents.push({
      start: currentBlackoutStart,
      end: lastT,
      duration: lastT - currentBlackoutStart
    })
  }

  const totalBlackoutTime = blackoutEvents.reduce((sum, e) => sum + e.duration, 0)
  const blackoutCount = blackoutEvents.length
  const averageBlackoutTime = blackoutCount > 0 ? totalBlackoutTime / blackoutCount : 0

  return {
    handshakeCount,
    blackoutCount,
    totalBlackoutTime,
    averageBlackoutTime,
    blackoutEvents
  }
}

  


