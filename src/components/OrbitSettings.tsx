import React, { useState } from "react"

type OrbitType = 'Sun-synchronous' | 'Nonpolar'

const OrbitSettings = ( ) => {
    const [orbitType, setOrbitType] = useState<OrbitType>('Sun-synchronous')
    const [altitude, setAltitude] = useState(500) //km
    const [localSolarTime, setLocalSolarTime] = useState('12:00') // for sun-sync
    const [inclination, setInclination] = useState(45)  // for non-polar

    const handleOrbitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrbitType(e.target.value as OrbitType)

    }
    return (
        <div>
            <h2> Orbit Settings </h2>

            <label>
                Orbit Type:&nbsp;
                <select value={orbitType} onChange={handleOrbitChange}>
                    <option value="Sun-synchronous">Sun-Synchronous</option>
                    <option value="Non-polar">Non-polar</option>
                </select>
            </label>
            <br /><br />
            
            <label>
                Altitude (km):&nbsp;
                <input
                    type="number"
                    value={altitude}
                    onChange={(e) => setAltitude(Number(e.target.value))}
                    min={200}
                    max={2000}
                />
            </label>
            <br /><br />
            {orbitType === 'Sun-synchronous' ? (
                <label>
                    Local Solar Time:&nbsp;
                    <input
                        type="time"
                        value={localSolarTime}
                        onChange={(e) => setLocalSolarTime(e.target.value)}
                    />
                </label>
            ) : (
                <label>
                    Inclination (degrees):&nbsp;
                    <input
                    type="number"
                    value={inclination}
                    min={30}
                    max={98}
                    onChange={(e) => setInclination(Number(e.target.value))}
                    />
                </label>
            )}
            <br /><br />

            <pre style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '1rem' }}>
                DEBUG:
                {JSON.stringify({ orbitType, altitude, localSolarTime, inclination }, null, 2)}
            </pre>
        </div>
    )
}