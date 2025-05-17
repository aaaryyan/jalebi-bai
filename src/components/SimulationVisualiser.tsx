// src/components/SimulationVisualizer.tsx
import React from 'react'
import { Position } from '../logic/orbitMath'

interface Props {
  beaconPath: Position[]
  relayPaths: Position[][]
}

const SimulationVisualizer: React.FC<Props> = ({
  beaconPath,
  relayPaths
}) => {
  // Computing a simple bounding box around all positions
  const allPositions = [
    ...beaconPath,
    ...relayPaths.flat()
  ]
  const xs = allPositions.map(p => p.x)
  const ys = allPositions.map(p => p.y)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const width = maxX - minX, height = maxY - minY

  return (
    <section>
      <h2>Satellite Orbit Visualization</h2>

      <svg
        width={600}
        height={600}
        viewBox={`${minX} ${minY} ${width} ${height}`}
        style={{ border: '1px solid #444' }}
      >
        {/* Draw beacon path in cyan */}
        <polyline
          fill="none"
          stroke="#0ff"
          strokeWidth={2}
          points={beaconPath.map(p => `${p.x},${p.y}`).join(' ')}
        />

        {/* Draw each relay path in a faded white */}
        {relayPaths.map((path, idx) => (
          <polyline
            key={idx}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={1}
            points={path.map(p => `${p.x},${p.y}`).join(' ')}
          />
        ))}

        {/* Draw current satellite positions as circles */}
        {beaconPath.map((p, i) => (
          <circle
            key={`b-${i}`}
            cx={p.x}
            cy={p.y}
            r={ width/200 }            
            fill="#0ff"
            opacity={i === beaconPath.length-1 ? 1 : 0.3}
          />
        ))}

        {relayPaths.flatMap((path, j) =>
          path.map((p, i) => (
            <circle
              key={`r-${j}-${i}`}
              cx={p.x}
              cy={p.y}
              r={ width/300 }
              fill="white"
              opacity={i === path.length-1 ? 0.6 : 0.1}
            />
          ))
        )}
      </svg>
    </section>
  )
}

export default SimulationVisualizer
