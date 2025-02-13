# QuickProFixer Frontend

QuickProFixer is a web application that connects clients with professional fixers for various services. This repository contains the frontend code for the QuickProFixer application, built with React, TypeScript, and Vite.

## Table of Contents

- [QuickProFixer Frontend](#quickprofixer-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Configuration](#configuration)
  - [Available Scripts](#available-scripts)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- User authentication (login and registration)
- Profile creation for clients and fixers
- Service search and selection
- Location-based service requests
- Fixer profile management
- Responsive design with Tailwind CSS

## Project Structure

```plaintext
quickprofixer-frontend/
├── .gitignore
├── [index.html](http://_vscodecontentref_/0)
├── [package.json](http://_vscodecontentref_/1)
├── [package-lock.json](http://_vscodecontentref_/2)
├── [postcss.config.js](http://_vscodecontentref_/3)
├── public/
│   └── sample_img/
├── src/
│   ├── .env
│   ├── api/
│   │   ├── axios.ts
│   │   ├── context/
│   │   │   └── ApiContext.tsx
│   │   └── hooks/
│   │       └── useApi.ts
│   ├── App.css
│   ├── App.tsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── home/
│   │   │   ├── fixers/
│   │   │   │   ├── FixerCard.tsx
│   │   │   │   └── FixerList.tsx
│   │   │   ├── tab/
│   │   │   │   ├── AddressForm.tsx
│   │   │   │   ├── DateTab.tsx
│   │   │   │   ├── DescriptionTab.tsx
│   │   │   │   ├── FilesTab.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── LocationTab.tsx
│   │   │   │   ├── MapComponent.tsx
│   │   │   │   ├── PreviewTab.tsx
│   │   │   │   ├── SearchSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── TabProgressBar.tsx
│   │   │   │   └── TabsControl.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── ui/
│   │   │   └── Button.tsx
│   ├── config.ts
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── dummyData.ts
│   ├── index.css
│   ├── main.tsx
│   ├── pages/
│   │   ├── account/
│   │   │   ├── CreateProfile.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   ├── fixer/
│   │   │   └── FixerProfile.tsx
│   │   └── home/
│   │       └── HomePage.tsx
│   ├── routes.tsx
│   ├── services/
│   ├── utils/
│   ├── vite-env.d.ts
├── [tailwind.config.js](http://_vscodecontentref_/4)
├── [tsconfig.json](http://_vscodecontentref_/5)
├── [tsconfig.node.json](http://_vscodecontentref_/6)
├── [vite.config.ts](http://_vscodecontentref_/7)
└── [vite.config.ts.timestamp-1735825112698-806d40d5d199a.mjs](http://_vscodecontentref_/8)
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/Sarerrdy/quickprofixer-frontend.git
cd quickprofixer-frontend

```

2. Install dependencies:

```sh
npm install
```

### Running the Application

1. Start the development server:

```sh
npm run dev
```

2. Open your browser and navigate to http://localhost:5173.

## Configuration

The application uses environment variables for configuration. Create a .env file in the src directory with the following content:

```sh
VITE_API_BASE_URL=http://localhost:5199/api
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build.
- `npm run start`: Starts the Vite server.

## Contributing

Contributions are welcome! Please read the contributing guidelines for more information.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
