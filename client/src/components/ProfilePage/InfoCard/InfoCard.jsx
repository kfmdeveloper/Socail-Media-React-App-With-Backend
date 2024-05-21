import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import "./InfoCard.css";
import EditModal from "../../Modal/ProfileEditModal";
import { useNavigate } from "react-router-dom";
const InfoCard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="infoCard">
      <div className="infoHeading">
        <h4>Your Info </h4>
        <BiEditAlt onClick={handleEditClick} className="infoEdit" size={23} />
      </div>
      <div className="infoData">
        <div className="info">
          <span>
            <b>Status</b>
          </span>
          <span>in RelationShip</span>
        </div>
        <div className="info">
          <span>
            <b>Lives in</b>
          </span>
          <span>Multan</span>
        </div>
        <div className="info">
          <span>
            <b>Works at</b>
          </span>
          <span>Key2Code Software</span>
        </div>
      </div>

      <button className="cardinfobtn">LogOut</button>

      <EditModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default InfoCard;
