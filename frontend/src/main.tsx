import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import { GalleryProvider } from './context/GalleryContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <GalleryProvider>
        <App />
      </GalleryProvider>
    </UserProvider>
  </React.StrictMode>
);
