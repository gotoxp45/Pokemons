import React, { useState, useEffect, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const Details: React.FC = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url } = location.state || {};
  
  const [imgURL, setImgURL] = useState<string>("");
  const [details, setDetails] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
 
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json(); 
        setDetails(data);
        const imageUrl = data.sprites?.other?.['official-artwork']?.front_default;
        setImgURL(imageUrl || "");
      } catch (error) {
        console.log("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchDetails();
    }
  }, [url]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <ScaleLoader />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Details of {details.name}</h1>
      {imgURL && <img src={imgURL} alt={details.name} />}
      <div>
        <p>Height: {details.height}</p>
        <p>Weight: {details.weight}</p>
      </div>
      <button onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
});

export default Details;
