import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ isOpen, onClose }) => {
  const [newStatus, setNewStatus] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newWorkplace, setNewWorkplace] = useState("");

  const handleSave = () => {
    console.log("Saving changes...");
    onClose();
  };

  return (
    isOpen && (
      <div className="modalOverlay">
        <div className="editModal">
          <h2>Your info</h2>
          <div className="formGroup">
            <label>Status:</label>
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label>Lives in:</label>
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label>Works at:</label>
            <input
              type="text"
              value={newWorkplace}
              onChange={(e) => setNewWorkplace(e.target.value)}
            />
          </div>
          <div className="buttonGroup">
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditModal;
