// src/components/OrbitSettings.tsx
import React from 'react'
import { OrbitParams } from '../types'

interface Props {
  params: OrbitParams
  setParams: React.Dispatch<React.SetStateAction<OrbitParams>>
}

const OrbitSettings: React.FC<Props> = ({ params, setParams }) => {
  const update = (fields: Partial<OrbitParams>) =>
    setParams(prev => ({ ...prev, ...fields }))

  return (
    <section>
      <h2>Orbit Settings</h2>

      <label>
        Orbit Type:&nbsp;
        <select
          value={params.orbitType}
          onChange={e => update({ orbitType: e.target.value as any })}
        >
          <option value="Sun-synchronous">Sun-Synchronous</option>
          <option value="Non-polar">Non-polar</option>
        </select>
      </label>
      <br /><br />

      <label>
        Altitude (km):&nbsp;
        <input
          type="number"
          value={params.altitude}
          min={200}
          max={2000}
          onChange={e => update({ altitude: Number(e.target.value) })}
        />
      </label>
      <br /><br />

      {params.orbitType === 'Sun-synchronous' ? (
        <label>
          Local Solar Time:&nbsp;
          <input
            type="time"
            value={params.localSolarTime}
            onChange={e => update({ localSolarTime: e.target.value })}
          />
        </label>
      ) : (
        <label>
          Inclination (°):&nbsp;
          <input
            type="number"
            value={params.inclination}
            min={30}
            max={98}
            onChange={e => update({ inclination: Number(e.target.value) })}
          />
        </label>
      )}
      <br /><br />   
    </section>
  )
}

export default OrbitSettings
