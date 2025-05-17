import * as satellite from 'satellite.js'

export function parseTLE(tle1: string, tle2: string) {
    return satellite.twoline2satrec(tle1, tle2)
}

export function propagateTLE(satrec: satellite.SatRec, minutes: number = 1440){
    const positions = []
    const startTime = new Date()

    for (let i = 0; i < minutes; i++) {
        const time = new Date(startTime.getTime() + i * 60 * 1000)
        const posVel = satellite.propagate(satrec, time)!
        if (!posVel.position) continue;

        const gmst = satellite.gstime(time)
        const geo = satellite.eciToGeodetic(posVel.position, gmst)

        positions.push({
            x: posVel.position.x,
            y: posVel.position.y,
            z: posVel.position.z,
            lat: satellite.degreesLat(geo.latitude),
            lon: satellite.degreesLat(geo.latitude),
            alt: geo.height,
            time: time.toISOString(),
            t: i*60,  // seconds since start
        })
    }
    return positions;
}