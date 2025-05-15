import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ArtworkList from './components/ArtworkList';

const App: React.FC = () => {

  return (
    <div>
      <div className="app-header">
        <h1 className="app-name">Exhibition Curator</h1>
      </div>
      <Navbar />
      <h2 className="app-subtitle">Manage your own Art Gallery</h2>
      <h3 className="app-subtitle-2">Create different Art Collections</h3>
      <div className="feature-artwork">
        <ArtworkList artworks={[]} />
      </div>
    </div>
  );
};

export default App;
