import React, { useState, useEffect } from "react";
import { useCollections } from "../hooks/useCollections";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import type { ArtworkType } from "../types/ArtworkType";
import "./CreateCollectionButton.css";

interface CreateCollectionButtonProps {
  artwork?: ArtworkType;
 }

const CreateCollectionButton: React.FC<CreateCollectionButtonProps> = ({ artwork }) => {

  const { createCollection, addArtwork, getCollections } =useCollections();
  const { user } = useUser();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [existingCollections, setExistingCollections] = useState<any[]>([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState( false);
  const [isLoading , setIsLoading] = useState(false);
  const [authWarning, setAuthWarning] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");


  const fetchCollections = async () => {
    try {
      const collections = await getCollections();
      setExistingCollections(collections);
      setIsCreatingNew(collections.length === 0);
    } catch (err) {
      console.error("Error fetching collections:", err);
      setIsCreatingNew(true);
    }
  };

  useEffect(() => {
    if (showModal && user) fetchCollections();
  }, [showModal, user]);


  const handleClick = () => {
    if (!user) {
      setAuthWarning(true);
      return;
    }
    setShowModal(true);
  };

  const handleCreateAndAdd = async () => {
    if (!artwork) return;

    setIsLoading(true);
    setFeedbackMessage("");

    try {
      const collectionName = isCreatingNew ? newCollectionName.trim() : selectedCollection;

      if (!collectionName) {
        setFeedbackMessage("Please provide a collection name.");
        setIsLoading(false);
        return;
      }

      if (isCreatingNew) await createCollection(collectionName);

      await addArtwork(collectionName, artwork);
      setFeedbackMessage(`Artwork "${artwork.title}" added to "${collectionName}".`);
      closeModal();
    } catch (err: any) {
      console.error(err);
      setFeedbackMessage(err.message || "Failed to add artwork.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNewCollectionName("");
    setSelectedCollection("");
    setIsCreatingNew(false);
    setExistingCollections([]);
    setFeedbackMessage("");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  if (!artwork) return null;

  return (
    <>
      <button className="add-to-collection-btn" onClick={handleClick}>
        ♡ Add to Collection
      </button>

      {authWarning && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Login Required</h3>
            <p>You need to be logged in to save artworks to collections.</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setAuthWarning(false)}>
                Cancel
              </button>
              <button className="btn-add" onClick={handleLoginRedirect}>
                Log In
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Add "{artwork.title}" to a Collection</h3>

            {existingCollections.length > 0 && (
  <>
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

    <select
      className="collection-select"
      value={selectedCollection}
      onChange={(e) => setSelectedCollection(e.target.value)}
    >
      <option value="">Select a collection</option>
      {existingCollections.map((collection) => (
        <option key={collection.name} value={collection.name}>
          {collection.name} ({collection.artworks?.length || 0})
        </option>
      ))}
    </select>
  </>
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
              />
            )}

            {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}

            <div className="modal-buttons">
              <button className="btn-cancel" onClick={closeModal} disabled={isLoading}>
                Cancel
              </button>
              <button className="btn-add" onClick={handleCreateAndAdd} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCollectionButton;