import React, { useState, useEffect } from "react";
import { useCollections } from "../hooks/useCollections";
import type { ArtworkType } from "../types/ArtworkType";
import "./CreateCollectionButton.css";

interface CreateCollectionButtonProps {
  artwork?: ArtworkType;
 }

const CreateCollectionButton: React.FC<CreateCollectionButtonProps> = ({ artwork }) => {

  const { createCollection, addArtwork, getCollections } =useCollections();

  const [showModal, setShowModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [existingCollections, setExistingCollections] = useState<any[]>([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState( false);
  const [isLoading , setIsLoading] = useState(false);

  const fetchCollections = async () => {

    try {
      console.log("Fetching collections for modal...");
      const collections = await getCollections();
      console.log("Collections received:", collections);
      setExistingCollections(collections);
  
      if (collections.length === 0) {
        setIsCreatingNew(true);
      }
    } catch (err) {
      console.error("Error fetching collections:", err);
      setIsCreatingNew(true);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchCollections();
    }

  }, [showModal]); 

  const handleCreateAndAdd = async () => {
    if (!artwork) return;

    setIsLoading(true);
    try {
      if (isCreatingNew) {
        if (!newCollectionName.trim()) {

          alert("Please enter a  collection name");
          setIsLoading( false);

          return;
        }
        
        console.log("Creating new collection:", newCollectionName);
        await createCollection(newCollectionName);
        
        console.log ("Adding artwork to new collection");
        await addArtwork(newCollectionName, artwork);
        
        alert(`Artwork "${artwork.title}" added to new collection "${newCollectionName}"`);
      } else {

        if (!selectedCollection) {
          alert("Please select a collection.");
          setIsLoading(false);

          return;
        }
        
        console.log("Adding artwork to existing collection:", selectedCollection);
        await addArtwork(selectedCollection, artwork);
        
        alert(`Artwork "${artwork.title}" added to "${selectedCollection}"`);
      }
      
      closeModal();
    } catch (err: any) {
      console.error("nError adding artwork:", err);
      alert(err.message || "Failed to add artwork to collection");

    } finally {
      setIsLoading (false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNewCollectionName("");
    setSelectedCollection("");
    setIsCreatingNew(false);
    setIsLoading( false);
    setExistingCollections([]); 
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
        ♡ Add to Collection
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add "{artwork.title}" to Collection</h3>
         
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

            {!isCreatingNew && existingCollections.length  > 0 && (
              <select
                className="collection-select"
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
              >
                <option value="">Select a collection</option>
                {existingCollections.map ((collection) => (
                  <option key={collection.name} value={collection.name}>
                    {collection.name} ({collection.artworks?.length || 0} artworks)
                  </option>

                ))}
              </select>
            )}

            {existingCollections.length === 0 && (
              <p className="no-collections-message">
                No existing collections.
              </p>
            )}

            <div className="radio-option">
              <label>
                <input
                  type="radio"
                  checked={isCreatingNew}
                  onChange={() => setIsCreatingNew(true)}
                />
                Create new collection
              </label>
            </div>

            {isCreatingNew && (
              <input
                type="text"
                className="collection-input"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Enter collection name"
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

export default CreateCollectionButton ;
