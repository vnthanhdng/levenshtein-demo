# Levenshtein Summary Comparison App

This project is a demo web application that allows users to compare two summaries using the Levenshtein distance algorithm. The application also features a progress bar to show the percentage difference between two summaries, and users can only submit a new summary if the difference reaches a certain threshold.

## Features

- Calculate Levenshtein distance between two text inputs
- Display the difference as a percentage using a progress bar
- Users can submit a new summary once the difference exceeds a predefined threshold

## Tech Stack

- **React** (Next.js)
- **TypeScript**
- **Levenshtein Distance Algorithm** via the `js-levenshtein` library

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 18.x or above)
- **npm** (Node Package Manager, which comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vnthanhdng/levenshtein-demo.git
cd levenshtein-demo
```

### 2. Install dependencies

Install the necessary dependencies using npm:

```bash
npm install
```

### 3. Build the project

To build the project for production, run:

```bash
npm run build
```

This will create an optimized production build in the `.next` directory.

### 4. Start the application

After the build is complete, start the application:

```bash
npm run start
```

The application should now be running on [http://localhost:3000](http://localhost:3000). Open your browser and go to that address to access the app.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm install`: Installs the necessary dependencies for the project.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server to serve the built application.
- `npm run dev`: (Optional) Runs the app in development mode with hot-reloading.
