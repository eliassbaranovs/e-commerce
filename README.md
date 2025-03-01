# HackMotion E-commerce Platform

This project is an e-commerce platform for HackMotion, featuring a frontend built with Next.js and an analytics service for tracking user interactions.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Frontend](#frontend)
- [Analytics Service](#analytics-service)
- [API Routes](#api-routes)
- [Available URLs](#available-urls)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- E-commerce frontend with Next.js
- Analytics service for tracking user interactions
- Docker support for both frontend and analytics service
- TypeScript implementation

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker (optional)

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/hackmotion-ecommerce.git
cd hackmotion-ecommerce
```

### Frontend

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

### Analytics Service

Navigate to the analytics service directory and install dependencies:

```bash
cd analytics-service
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

### Docker Support

Build and run the Docker containers:

```bash
docker-compose up --build
```

## API Routes

### Frontend

- `/` - Home page
- `/?goal=break-[]` - Home page [80-90-100-par]
- `3001:/dashboard` - Dashboard for analytics
## Available URLs

### Analytics Service

- `/api/events` - Event tracking
- `/api/analytics/overview` - General analytics overview
- `/api/analytics/users` - User-specific analytics
- `/api/analytics/events` - Event-based analytics
