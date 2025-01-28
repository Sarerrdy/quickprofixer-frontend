import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext'; // Ensure the correct path
import { ApiProvider } from './api/context/ApiContext'; // Import the ApiProvider

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <AppRoutes />
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>,
);