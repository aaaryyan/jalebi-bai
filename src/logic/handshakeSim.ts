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
    relayPath: Position[],
    range: number = 2000 // km
): HandshakeResult {
    if (beaconPath.length !== relayPath.length) {
        throw new Error('Paths must have the same length.')
    }

    let handshakeCount = 0
    let inHandshake = false
    let blackoutEvents: HandshakeResult['blackoutEvents'] = []
    let currentBlackoutStart: number | null = null

    for (let i = 0; i < beaconPath.length; i++) {
        const {x: bx, y: by, t} = beaconPath[i]
        const {x: rx, y: ry} = relayPath[i]

        const dx = bx - rx
        const dy = by - ry
        const distance = Math.hypot(dx, dy)

        const canHandshake = distance <= range

        // handshake event = entering a handshake zone
        if (canHandshake && !inHandshake) {
            handshakeCount++
            // If we were in a blackout, end it
            if (currentBlackoutStart !== null) {
                blackoutEvents.push({
                    start: currentBlackoutStart,
                    end: t,
                    duration: t - currentBlackoutStart
                })
                currentBlackoutStart = null
            }
        }

        // Track blackouts
        if (!canHandshake && inHandshake) {
            currentBlackoutStart = t
        }

        // Update handshake state
        inHandshake = canHandshake
    }

    // If ended in blackout, close it at last timestamp
    const lastTimestamp = beaconPath[beaconPath.length - 1].t
    if (!inHandshake && currentBlackoutStart !== null) {
        blackoutEvents.push({
            start: currentBlackoutStart,
            end: lastTimestamp,
            duration: lastTimestamp - currentBlackoutStart
        })
    }

    const totalBlackoutTime = blackoutEvents.reduce((sum, event) => sum + event.duration, 0)
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


