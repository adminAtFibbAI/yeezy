# Yeezy MLB Strike Predictor

## A modern web application that predicts baseball strike probabilities using machine learning. Built with React, Vite, and Tailwind CSS.

## Features

⚾ Real-time strike probability predictions
📊 Interactive data visualization
📱 Responsive MLB-themed design
📈 Historical prediction tracking
⚡ Fast performance with Vite

## Tech Stack

Framework: React 18
Build Tool: Vite
Styling: Tailwind CSS
UI Components: shadcn/ui
Charts: Recharts
Icons: Lucide React
Deployment: Netlify

Project Structure
yeezy/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── alert.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       └── input.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore


## Architecture


graph TD
    A[Client Browser] -->|HTTP Request| B[Netlify CDN]
    B -->|Static Assets| C[React Application]
    
    subgraph "Frontend Application"
        C -->|State Management| D[React Hooks]
        D -->|Updates| E[UI Components]
        E -->|User Input| F[Prediction Logic]
        F -->|Results| G[Data Visualization]
    end

    subgraph "UI Components"
        E --> H[Input Forms]
        E --> I[Strike Predictions]
        E --> J[History Graph]
    end

    subgraph "Data Flow"
        F --> K[Calculate Probabilities]
        K --> L[Update History]
        L --> M[Render Updates]
    end


## Credits 
Credits

MLB data structure inspired by Baseball Savant
Design system inspired by MLB.com
Icons by Lucide React

