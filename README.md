# Space Handshakes – Hackathon ’25 Submission

A real-time satellite communication simulation tool developed using React and TypeScript.  
This project was built for Hackathon ’25 in response to the challenge of visualizing orbital handshakes between a beacon satellite and a relay constellation in low Earth orbit.

---

## Overview

**Space Handshakes** allows users to simulate the behavior of a beacon satellite in either sun-synchronous or non-polar orbits, and calculate its communication events with relay satellites over a 24-hour period. The tool provides an interactive visual representation of:

- Orbital paths
- Communication cone intersections
- Handshake events
- Blackout durations

The simulation is simplified but grounded in basic orbital mechanics and communication geometry.

---

## Technologies Used

- **React** + **TypeScript** – for the frontend interface
- **Vite** – as the build tool for faster development
- **Node.js** + **npm** – for dependency and script management
- **CSS** – for styling (custom, extendable to frameworks)

---

## Key Features

- Selection between **Sun-synchronous** and **Non-polar** orbit types
- Customizable parameters:
  - Altitude (in km)
  - Local Solar Time (for Sun-synchronous orbits)
  - Inclination (for Non-polar orbits)
- 24-hour orbit simulation in discrete time steps
- Real-time calculation of:
  - Number of communication handshakes
  - Duration and frequency of communication blackouts
- Modular and extendable component-based architecture

---

## How It Works

This simulation is built on a simplified model of circular low Earth orbits (LEO). At each timestep, the following are calculated:

- Satellite position using orbital period and angular motion
- Coverage cones for communication
- Cone intersection checks to determine handshakes
- Time windows where no communication occurs (blackouts)

All visual and data updates are dynamically rendered based on user input.

---

## Live Deployment

🔗 [https://jalebi-bai.vercel.app](https://jalebi-bai.vercel.app)  

---

## Project Structure
