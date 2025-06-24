import React, { useState } from 'react';
import type { ArtworkType } from '../types/ArtworkType';
import './Artwork.css';
import CreateCollectionButton from '../components/CreateCollectionButton';

interface Props {
  artwork: ArtworkType;
  showAddButton?: boolean;
}

const Artwork: React.FC<Props> = ({ artwork, showAddButton = true }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fallback = (value?: string) => value || 'Not available';

  return (
    <>
      <div className="artwork-card" onClick={handleCardClick}>
        <img src={artwork.imageUrl} alt={artwork.title} />
        <div className="artwork-info">
          <h3>{artwork.title}</h3>
          <p>{artwork.creator}</p>
        {showAddButton && <CreateCollectionButton artwork={artwork} />}
      </div>
    </div>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{fallback(artwork.title)}</h2>
            <img src={artwork.imageUrl} alt={artwork.title} className="modal-image" />
            <p><strong>Creator:</strong> {fallback(artwork.creator)}</p>
            <p><strong>Culture:</strong> {fallback(artwork.culture)}</p>
            <p><strong>Technique:</strong> {fallback(artwork.technique)}</p>
            <p><strong>Source:</strong> {fallback(artwork.source)}</p>
            <p><strong>Type:</strong> {fallback(artwork.type)}</p>

            <button className="btn-cancel" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Artwork;