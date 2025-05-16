export type OrbitType = 'Sun-synchronous' | 'Non-polar'

export interface OrbitParams {
    altitude: number;      // in kilometers
    inclination?: number;  // in degrees
    orbitType: 'Sun-synchronous' | 'Non-polar';
    localSolarTime?: string;
}
