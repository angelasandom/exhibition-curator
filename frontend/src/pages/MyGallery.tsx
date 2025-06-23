import React, { useEffect, useState, useCallback } from "react";
import { useCollections } from "../hooks/useCollections";
import type { ArtworkType } from "../types/ArtworkType";
import { useUser } from "../context/UserContext";
import CollectionArtwork from "../components/CollectionArtwork";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import "./MyGallery.css";

const MyGallery: React.FC = () => {
  const { getCollections, removeArtwork, createCollection, deleteCollection } = useCollections();
  const { user, loading } = useUser(); 
  const [collections, setCollections] = useState<any[]>([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchCollections = useCallback(async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (err) {
      console.error("Error fetching collections", err);
    }
  }, [getCollections]);

  useEffect(() => {
    if (loading) return;
    if (!user) return; 

    fetchCollections();
  }, [user, loading, fetchCollections]);

  const handleRemove = async (collectionName: string, artworkId: string) => {
    try {
      await removeArtwork(collectionName, artworkId);
      setCollections((prev) =>
        prev.map((col) =>
          col.name === collectionName
            ? { ...col, artworks: col.artworks.filter((a: any) => a.id !== artworkId) }
            : col
        )
      );
    } catch (err) {
      alert("Failed to remove artwork");
    }
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    try {
      const updatedCollections = await createCollection(newCollectionName);
      setCollections(updatedCollections);
      setNewCollectionName("");
      setShowCreateForm(false);
    } catch (err) {
      console.error("Error creating collection:", err);
      alert("Failed to create collection");
    }
  };

  const handleDeleteCollection = async (collectionName: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the collection "${collectionName}"? This action cannot be undone.`);
    
    if (!confirmDelete) return;

    try {
      const result = await deleteCollection(collectionName);
      setCollections(result.collections);
      alert(`Collection "${collectionName}" deleted successfully`);
    } catch (err) {
      console.error("Error deleting collection:", err);
      alert("Failed to delete collection");
    }
  };

  if (loading) {
  return (
    <div className="my-gallery-container">
      <LoadingSpinner />
    </div>
  );
}

  if (!user) {
    return (
      <div className="my-gallery-container">
        <div className="login-message">Please log in to view your collections</div>
      </div>
    );
  }

  return (
    <div className="my-gallery-container">
      <Navbar />
      
      <div className="create-collection-section">
        {!showCreateForm ? (
          <button 
            onClick={() => setShowCreateForm(true)}
            className="create-collection-btn"
          >
            + Create New Collection
          </button>
        ) : (
          <form onSubmit={handleCreateCollection} className="create-collection-form">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Enter collection name"
              className="collection-name-input"
              autoFocus
            />
            <button type="submit" className="form-submit-btn">
              Create
            </button>
            <button 
              type="button"
              onClick={() => {
                setShowCreateForm(false);
                setNewCollectionName("");
              }}
              className="form-cancel-btn"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {collections.length === 0 ? (
        <p className="no-collections-message">No collections yet. Create your first collection!</p>
      ) : (
        collections.map((col) => (
          <div key={col.name} className="collection-card">
            <div className="collection-header">
              <h3 className="collection-title">{col.name} ({col.artworks?.length || 0} artworks)</h3>
              <button 
                onClick={() => handleDeleteCollection(col.name)}
                className="delete-collection-btn"
                title="Delete entire collection"
              >
                Delete Collection
              </button>
            </div>
            
            {col.artworks && col.artworks.length > 0 ? (
              <div className="collection-artworks-grid">
                {col.artworks.map((art: ArtworkType) => (
                  <div key={art.id} className="collection-artwork-wrapper">
                    <CollectionArtwork artwork={art} />
                    <button 
                      onClick={() => handleRemove(col.name, art.id)}
                      className="remove-from-collection-btn"
                      title="Remove from collection"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-artworks-message">No artworks in this collection</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyGallery;