// src/logic/handshakeSim.ts
import { Position } from './orbitMath'

export interface HandshakeResult {
    handshakeCount: number // total number of handshake events
    blackoutCount: number // number of separate blackout periods
    totalBlackoutTime: number // in seconds
    averageBlackoutTime: number // in seconds
    blackoutEvents: Array<{
        start: number // t (seconds) when blackout starts
        end: number // t (seconds) when blackout ends
        duration: number // duration of blackout in seconds
    }>
}

/**
 * Given two position arrays (beacon & relay) sampled at the same times,
 * and a communication range(km), compute handshake events and blackouts.
 */
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
    let blackoutEvents: HandshakeResult['blackoutEvents'] = []
    let currentBlackoutStart: number | null = null
  
    for (let i = 0; i < beaconPath.length; i++) {
      const beacon = beaconPath[i]
      let anyInHandshake = false
  
      for (let j = 0; j < relayPaths.length; j++) {
        const relay = relayPaths[j][i]
        if (!relay) continue
  
        const dx = beacon.x - relay.x
        const dy = beacon.y - relay.y
        const dz = 'z' in beacon && 'z' in relay ? beacon.z - relay.z : 0
        const distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2)
  
        const angle = Math.acos(-dz / distance) * (180 / Math.PI)
        const inCone = angle <= coneFOV / 2
  
        if (distance <= range && inCone) {
          anyInHandshake = true
          break
        }
      }
  
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
  
      if (!anyInHandshake && inHandshake) {
        currentBlackoutStart = beacon.t
      }
  
      inHandshake = anyInHandshake
    }
  
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
  


