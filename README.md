# BankFlow - Micro-Frontend Banking Application

A modern, scalable Banking Application built using a Micro-Frontend architecture. This project demonstrates how to build, share, and compose independent React applications using Vite Module Federation, pnpm workspaces, and a shared design system.

## Architecture Overview

This monorepo is structured to support independent deployment and development of micro-frontends:

- **`apps/app-shell`** (Host): The main container application handling routing, layout, and lazy loading of remote modules. (Runs on Port `3000`)
- **`apps/loan-mfe`** (Remote): Handles the multi-step loan application process. (Runs on Port `3001`)
- **`apps/onboarding-mfe`** (Remote): Handles the user onboarding wizard, including camera-based liveness verification. (Runs on Port `3002`)
- **`packages/ui-library`**: A shared TailwindCSS-based UI component library (Buttons, Inputs, Cards, Steppers, FileUploaders, CameraPreview, etc.) used across all apps.
- **`packages/store`**: A shared Zustand global state management solution. This allows state (like user profiles, NID uploads, and loan details) to be seamlessly shared and pre-filled across the Host and Remote micro-frontends.

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Framework**: React 18
- **Build Tool**: Vite
- **Micro-Frontend Architecture**: `@originjs/vite-plugin-federation`
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Camera Access**: React Webcam
- **CSS Injection**: `vite-plugin-css-injected-by-js` (for loading remote styles in the host)

## Getting Started

Follow these steps to get the application running on your local machine.

### Prerequisites

Make sure you have **Node.js (v18+)** and **pnpm** installed globally.

```bash
npm install -g pnpm
git clone https://github.com/OmorGalib/Bank-App-Micro-Frontend.git
cd Bank-App-Micro-Frontend
pnpm install
pnpm dev


