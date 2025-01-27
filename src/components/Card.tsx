import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import placeholder from "/public/pokemon_ball.png"

interface CardProps {
  name: string,
  url: string
}

const Card: React.FC<CardProps> = ({ name, url }) => {
  const [imgURL, setImgURL] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImgURL(data.sprites.other.dream_world?.front_default || placeholder);
      } catch (error) {
        console.log("Error fetching Pokemon Details:", error);
      }
    };
    fetchImg();
  }, [url]);

  const handleCardClick = () => {
    navigate(`/details/${name}`, { state: { url } });
  };

  const cardStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'center',
    width: '250px',
    height: '235px',
    backgroundColor: '#d3d3d3',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    margin: '10px',
  };

  const cardHoverStyle: React.CSSProperties = {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#b0b0b0',
  };

  const imageStyle: React.CSSProperties = {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    marginBottom: '10px',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={isHovered ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {imgURL ? (
        <img src={imgURL} alt={name} style={imageStyle} />
      ) : (
        <div className="w-full h-32 bg-gray-200 mb-2">Loading...</div>
      )}
      <h2 style={nameStyle}>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
    </div>
  );
};

export default Card;
