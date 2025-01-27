import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";

const MainPage: React.FC = () => {
  const { logout, userId } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Bienvenido</h1>
      <p>Usuario ID: {userId}</p>
      <div>
        <button onClick={() => navigate("/manage-assets")}>
          Gestión de Activos
        </button>
        <button onClick={() => navigate("/manage-outgoing-assets")}>
          Gestión de Salidas de Activos
        </button>
        <button onClick={() => navigate("/authorize-assets")}>
          Autorización de Activos
        </button>
      </div>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
};

export default MainPage;
