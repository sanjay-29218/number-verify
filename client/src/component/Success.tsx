import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Success = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "grid", placeContent: "center", height: "100vh" }}>
      <h1 role="verified">SuccessFully Verified</h1>
      <button
        style={{
          padding: "10px",
          fontSize: "24px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
        }}
        onClick={() => navigate("/")}
      >
        Go back
      </button>
    </div>
  );
};

export default Success;
