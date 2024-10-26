# Yeezy MLB Strike Predictor

A modern web application that predicts baseball strike probabilities using machine learning. Built with React, Vite, and Tailwind CSS.

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
