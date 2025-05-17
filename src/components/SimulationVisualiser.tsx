import React from 'react';
import { Position } from '../logic/orbitMath'

interface Props {
    beaconPath: Position[]
    relayPath: Position[]
}

const SimulationVisualizer = ({ beaconPath, relayPath }: Props) => {
    return (
        <div>
            <h2>Satellite Orbit Visualisation</h2>
            {/* Orbit animation will go here */}
        </div>
    )
}

export default SimulationVisualizer