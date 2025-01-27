import React from "react";
import { useAuth } from "./authContext";

const activos: React.FC = () => {
  const { userId } = useAuth();
  const handleAction = () => {
    console.log(`Acción realizada por el usuario con ID: ${userId}`);
  };
  return (
    <div>
      <h1>Gestión de Activos</h1>
      <p>Aquí puedes gestionar los activos.</p>
      <button onClick={handleAction}>Registrar Activo</button>
    </div>
  );
};

export default activos;
