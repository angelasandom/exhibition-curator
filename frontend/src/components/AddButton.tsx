import React, { useState, useEffect } from "react";
import { useCollections } from "../hooks/useCollections";
import type { ArtworkType } from "../types/ArtworkType";
import "./CreateCollectionButton.css";

interface CreateCollectionButtonProps {

  artwork?: ArtworkType;
}

const CreateCollectionButton: React.FC<CreateCollectionButtonProps> = ({ artwork }) => {
  const { createCollection, addArtwork, getCollections } = useCollections();
  const [showModal, setShowModal] = useState(false);
  const [newCollectionName,  setNewCollectionName] = useState("");
  const [existingCollections, setExistingCollections] = useState<any[]>([]);
  const [selectedCollection, setSelectedCollection]= useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showModal) {
      fetchCollections();
    }
  }, [showModal]);

  const fetchCollections = async () => {

    try {
      const collections = await getCollections();
      setExistingCollections(collections);
      if (collections.length === 0) {
        setIsCreatingNew(true);
      }
    } catch (err) {
      console.error("Error fetching collections:", err);
      setIsCreatingNew(true); 
    }
  };


  const handleCreateAndAdd = async () => {
    if (!artwork) return;

    setIsLoading(true);
    try {
      if (isCreatingNew) {
        if (!newCollectionName.trim()) {
          alert("Please enter a collection name,");
          setIsLoading(false);
          return;
        }
   
        await createCollection(newCollectionName);
        
        await addArtwork(newCollectionName, artwork);
        
        alert(`Artwork added to new collection "${newCollectionName}"`);
      } else {
        if (!selectedCollection) {
          alert("Please select a collection");
          setIsLoading(false);

          return;
        }
        
  
        await addArtwork(selectedCollection, artwork);
        
        alert(`Artwork added to "${selectedCollection}"`);
      }
      
      closeModal();
    } catch (err: any) {
      alert(err.message || "Failed to add artwork to collection");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNewCollectionName("");
    setSelectedCollection("");
    setIsCreatingNew(false);
    setIsLoading(false);
  };

  if (!artwork) {
    return null;
  }

  return (
    <>
      <button 
        className="add-to-collection-btn"
        onClick={() => setShowModal(true)}
      >
       ♡  Add to Collection
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add to Collection</h3>
            
            {existingCollections.length > 0 && (
              <div className="radio-option">
                <label>
                  <input
                    type="radio"
                    checked={!isCreatingNew}
                    onChange={() => setIsCreatingNew(false)}
                  />
                  Add to existing collection
                </label>
              </div>
            )}

            {!isCreatingNew && existingCollections.length > 0 && (
              <select
                className="collection-select"
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
              >
                <option value="">Select a collection</option>

                {existingCollections.map((collection) => (
                  <option key= {collection.name} value={collection.name}>
                    {collection.name} ({collection.artworks?.length || 0} artworks)
                  </option>
                ))}
              </select>
            )}

            {existingCollections.length === 0 && (
              <p className="no-collections-message">
                No existing collections. Create your first one below!
              </p>
            )}

            <div className= "radio-option">
              <label>
                <input
                  type="radio"
                  checked={isCreatingNew}
                  onChange={() => setIsCreatingNew(true)}
                />
                Create new collection
              </label>
            </div>

            { isCreatingNew && (
              <input
                type="text"
                className="collection-input"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Enter  collection name"
                autoFocus
              />
            )}

            <div className="modal-buttons">
              <button 
                className="btn-cancel"
                onClick={closeModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                className="btn-add"
                onClick={handleCreateAndAdd}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Artwork"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCollectionButton;