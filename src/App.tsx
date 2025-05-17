// src/App.tsx

import React, { useState, useMemo, useEffect } from 'react'
import OrbitSettings from './components/OrbitSettings'
import SimulationVisualizer from './components/SimulationVisualiser'
import StatsPanel from './components/StatsPanel'
import { OrbitParams } from './types'
import { calculateOrbit, Position } from './logic/orbitMath'
import { calculateHandshakes } from './logic/handshakeSim'
import { parseTLE, propagateTLE } from './logic/tleUtils'
import './App.css'

const App: React.FC = () => {
  const [params, setParams] = useState<OrbitParams>({
    orbitType: 'Sun-synchronous',
    altitude: 500,
    inclination: 98.6,
    localSolarTime: '12:00',
  })

  const [relayPaths, setRelayPaths] = useState<Position[][]>([])

  // === Parse and propagate all Iridium + Iridium-NEXT TLEs ===
  useEffect(() => {
    const loadAllTLEs = async () => {
      const fetchTLE = async (url: string) => {
        const text = await (await fetch(url)).text()
        const lines = text.trim().split('\n')
        const sats = []

        for (let i = 0; i < lines.length; i += 3) {
          const tle1 = lines[i + 1]
          const tle2 = lines[i + 2]
          if (!tle1 || !tle2) continue
          try {
            sats.push(propagateTLE(parseTLE(tle1, tle2), 1440))
          } catch (err) {
            console.warn(`TLE parse error at line ${i}: ${err}`)
          }
        }

        return sats
      }

      const iridium = await fetchTLE('/iridium.tle')
      const iridiumNext = await fetchTLE('/iridium-next.tle')
      setRelayPaths([...iridium, ...iridiumNext])
    }

    loadAllTLEs()
  }, [])

  // === Beacon path based on user inputs ===
  const beaconPath = useMemo(() => calculateOrbit(params), [params])

  // === Handshake logic against all Iridium satellites ===
  const handshakeResult = useMemo(
    () => calculateHandshakes(beaconPath, relayPaths),
    [beaconPath, relayPaths]
  )

  return (
    <div className="app">
      <h1>🛰️ Space Satellite Handshakes Visualizer</h1>

      <OrbitSettings params={params} setParams={setParams} />
      <SimulationVisualizer
        beaconPath={beaconPath}
        relayPath={relayPaths[0] || []} // TEMP: visualizing 1 relay path for now
      />
      <StatsPanel result={handshakeResult} />
    </div>
  )
}

export default App


