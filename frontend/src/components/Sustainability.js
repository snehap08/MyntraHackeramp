import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Sustainability.css';

// Styled Button component
const Button = styled.button`
  font-size: 18px;
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 15px 30px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  margin-top: 25px;
  width: 275px;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:after {
    content: "";
    background-color: black;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 5px;
    left: 7px;
    transition: 0.2s;
    z-index: -1;
  }

  &:hover:after {
    top: 0px;
    left: 0px;
  }

  @media (min-width: 768px) {
    padding: 13px 50px;
  }
`;

const SustainabilityPage = () => {
  return (
    <div className="sustainability-container">
      <h1 className="sustainability-heading">
        Get Your<br />
        sustainable<br />
        fashion
      </h1>
      <h2 className="sustainability-subheading">With Eco-friendly Materials</h2>
      <p className="sustainability-paragraph">
        We begin with a commitment to a planet. We're passionate about preserving the Earth's natural <br />beauty with your product.
      </p>
      <Link to="/collection">
        <Button>SEE COLLECTION</Button>
      </Link>
      <div className="sustainability-image-container">
        <img src='./centreImg.png' alt="Sustainable Fashion" className="sustainability-image" />
      </div>
      <div className="recycled-fabric-container">
        <h2 className="recycled-fabric-heading">RECYCLED FABRIC</h2>
        <p className="recycled-fabric-paragraph">
          "Recycled fabrics offer several benefits, including reducing waste and conserving resources, making them a sustainable choice for eco-friendly fashion."
          <img src='./recycled.png' alt="Recycled Fabric" className="recycled-fabric-image" />
        </p>
      </div>
      <div className="sustainable-material-container">
        <h2 className="sustainable-material-heading">Sustainable Material</h2>
        <img src='./material.png' alt="Sustainable Material" className="sustainable-material-image" />
      </div>
      <div className='tshirt-container'>
        <img src='./tshirt2.png' alt='organic tshirt' className='tshirt' />
        <h2 className='tshirt-heading'>Organic Essentials</h2>
        <p className='tshirt-subheading'>OverSize Organic T-Shirt</p>
      </div>
    </div>
  );
};

export default SustainabilityPage;
