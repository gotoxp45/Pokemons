import React, { useState, useEffect, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

const Details: React.FC = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url } = location.state || {};

  const [imgURL, setImgURL] = useState<string>("");
  const [details, setDetails] = useState<PokemonDetails | null>(null);
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ScaleLoader color="#d7d7d7" height={40} loading={loading} margin={2} radius={8} speedMultiplier={1} width={4} />
      </div>
    );
  }

  if (!details) {
    return <div>Error: Unable to fetch details</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <h1 style={{ textAlign: "center", textTransform: "capitalize" }}>{details.name} Details</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "0 0 300px",
            textAlign: "center",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={imgURL}
            alt={details.name}
            style={{
              width: "250px",
              height: "250px",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </div>

        <div
          style={{
            height: "255px",
            flex: "1",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>
            <strong>Height:</strong> {details.height}
          </p>
          <p>
            <strong>Weight:</strong> {details.weight}
          </p>
          <p>
            <strong>Base Experience:</strong> {details.base_experience}
          </p>
          <p>
            <strong>Abilities:</strong>{" "}
            {details.abilities
              .map((ability) => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1))
              .join(", ")}
          </p>
          <p>
            <strong>Stats:</strong>
            <br />
            {details.stats
              .map((stat) => stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1))
              .join(", ")}
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
});

export default Details;
