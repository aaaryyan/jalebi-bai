# Space Handshakes – Hackathon ’25 Submission

A real-time satellite communication simulation tool developed using React and TypeScript.  
This project was built for Hackathon ’25 in response to the challenge of visualizing orbital handshakes between a beacon satellite and a relay constellation in low Earth orbit.

---

## Overview 

**Space Handshakes** is a real-time simulation tool for modeling inter-satellite communication events. It simulates a beacon satellite in a customizable low Earth orbit (LEO) and calculates communication windows and outages with a relay constellation (e.g., Iridium) over a 24-hour period. The app visualizes:

- Orbital motion  
- Communication cone geometry  
- Real-time intersection events (handshakes)  
- Time periods without coverage (blackouts)  

The simulation simplifies orbital mechanics while preserving geometric accuracy for coverage modeling and intersection analysis.

---

## Technologies Used

- **React** + **TypeScript** – frontend architecture and user interaction  
- **Vite** – fast dev builds and hot reload  
- **Node.js** + **npm** – scripting and dependency management  
- **CSS** – clean UI styling, custom themed  

---

## Key Features

- Choose between **Sun-synchronous** and **Non-polar** orbit modes  
- Customizable satellite parameters:
  - Altitude (in km)  
  - Local Solar Time (LST) – for sun-synchronous orbits  
  - Inclination – for non-polar orbits  
- 24-hour discrete simulation  
- Real-time updates of:
  - Number of successful handshakes  
  - Duration and count of blackouts  
- Component-based, modular frontend for future expansion  

---

## Simulation Parameters
-Orbit Type       : Sun-synchronous
-Altitude         : 500 km
-Local Solar Time : 12:00 PM
These parameters define a beacon satellite in a sun-synchronous LEO orbit that passes the equator at 12:00 PM local solar time during its descending node.

---

## Simulation Outputs
-Total Handshakes       : 22
-Total Blackouts        : 22
-Total Blackout Time    : 23.20 hours
-Average Blackout Time  : 1.05 hours
-Communication Uptime   : 3.3%
## Live Deployment

🔗 [Vercel App](https://space-cadet-five.vercel.app/)  

---
## Project Structure
src/
├── components/
│ ├── OrbitSettings.tsx
│ ├── SimulationVisualizer.tsx
│ └── StatsPanel.tsx
├── logic/
│ ├── orbitMath.ts
│ └── handshakeSim.ts
├── App.tsx
├── main.tsx
├── App.css

 ---
**Interpretation:**
- The beacon is able to communicate with the Iridium constellation for only **3.3%** of the time.
- The satellite experiences 22 separate blackout periods with an average duration of just over 1 hour.
- This low uptime reflects the limited overlap between the beacon's horizontal antennas and the relay constellation’s coverage zones, highlighting the value of strategic orbit configuration and relay placement.

---

## How It Works

At each timestep in the 24-hour simulation:
1. **Orbital Positioning**: Satellite’s position is calculated using Keplerian motion equations simplified for circular LEO.
2. **Cone Modeling**: Antennas modeled as fixed-angle cones—beacon has two opposing horizon-aligned cones; Iridium has downward-pointing cones.
3. **Intersection Test**: Geometry engine checks cone overlaps to detect handshakes.
4. **Blackout Detection**: If no relay is within communication range, a blackout is recorded.

All computation is done in-browser and updates in real-time.

---

## Project Structure
 ## Team
- **Aaryan Mishra**
- **Mohammad Kaif**
- **Taskin Saadman**
- **Keshav Beswal**
- **Nirbhay Singla**
---

## Install
To run the project locally:
```bash git clone https://github.com/aaaryyan/jalebi-bai.git
cd jalebi-bai
npm install
npm run dev
```
---

## License
This project is open source under the [MIT License](https://github.com/aaaryyan/jalebi-bai/blob/7c2ef28f3743852fb2833a5fc24cd57f387abdac/LICENSE). 
