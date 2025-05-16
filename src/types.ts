export type OrbitType = 'Sun-synchronous' | 'Non-polar'

export interface OrbitParams {
  orbitType: OrbitType
  altitude: number            // km
  localSolarTime: string      // HH:MM
  inclination: number         // degrees
}