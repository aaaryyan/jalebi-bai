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
    inclination: 97.5,
    localSolarTime: '12:00',
  })

  const [relayPaths, setRelayPaths] = useState<Position[][]>([])

  // Load and propagate both IRIDIUM and IRIDIUM-NEXT TLE files
  useEffect(() => {
    const loadAllTLEs = async () => {
      const fetchTLE = async (url: string): Promise<Position[][]> => {
        const text = await fetch(url).then(r => r.text())
        const lines = text.trim().split('\n')
        const sats: Position[][] = []

        for (let i = 0; i < lines.length; i += 3) {
          const tle1 = lines[i + 1]
          const tle2 = lines[i + 2]
          if (!tle1 || !tle2) continue
          try {
            const satrec = parseTLE(tle1, tle2)
            const path = propagateTLE(satrec, 1440)
            sats.push(path)
          } catch (err) {
            console.warn(`TLE parse error at line ${i}:`, err)
          }
        }

        return sats
      }

      const iridium = await fetchTLE('/iridium.tle')
      const iridiumNext = await fetchTLE('/iridium-next.tle')
      setRelayPaths([...iridium, ...iridiumNext])
    }

    loadAllTLEs().catch(console.error)
  }, [])

  // Beacon orbit based on user parameters
  const beaconPath = useMemo(() => calculateOrbit(params), [params])

  // Handshake computation against all relay satellites
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
        relayPaths={relayPaths}
      />
      <StatsPanel result={handshakeResult} />
    </div>
  )
}

export default App