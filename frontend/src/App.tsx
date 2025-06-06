import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import MyGallery from './pages/MyGallery';


const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mygallery" element={<MyGallery />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;