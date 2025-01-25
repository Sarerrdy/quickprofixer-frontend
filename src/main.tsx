import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes';
import { AuthProvider } from '../src/api/context/AuthContext';
import { ApiProvider } from '../src/api/context/ApiContext'; // Import the ApiProvider

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider> {/* Wrap your application with ApiProvider */}
        <AppRoutes />
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>,
);