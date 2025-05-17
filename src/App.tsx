// src/App.tsx

import React, { useState, useMemo } from 'react'
import OrbitSettings from './components/OrbitSettings'
import SimulationVisualizer from './components/SimulationVisualiser'
import StatsPanel from './components/StatsPanel'
import { OrbitParams } from './types'
import { calculateOrbit } from './logic/orbitMath'
import { calculateHandshakes } from './logic/handshakeSim'
import './App.css'

//  Temporary fixed relay satellite config
const defaultRelayParams: OrbitParams = {
  orbitType: 'Non-polar',
  altitude: 780,
  inclination: 98.6,
  localSolarTime: '12:00', // unused for non-polar but required by type
}

const App: React.FC = () => {
  const [params, setParams] = useState<OrbitParams>({
    orbitType: 'Sun-synchronous',
    altitude: 500,
    inclination: 98.6,
    localSolarTime: '12:00',
  })

  const beaconPath = useMemo(() => calculateOrbit(params), [params])
  const relayPath = useMemo(() => calculateOrbit(defaultRelayParams), [])
  const handshakeResult = useMemo(
    () => calculateHandshakes(beaconPath, relayPath),
    [beaconPath, relayPath]
  )

  return (
    <div className="app">
      <h1>🛰️ Space Satellite Handshakes Visualizer</h1>

      <OrbitSettings params={params} setParams={setParams} />
      <SimulationVisualizer beaconPath={beaconPath} relayPath={relayPath} />
      <StatsPanel result={handshakeResult} />
    </div>
  )
}

export default App

