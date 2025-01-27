import React from "react";
import { useAuth } from "./authContext";

const salidaActivos: React.FC = () => {
  const { userId } = useAuth();
  const handleAction = () => {
    console.log(`Acción realizada por el usuario con ID: ${userId}`);
  };
  return (
    <div>
      <h1>Gestión de Salidas de Activos</h1>
      <p>Aquí puedes gestionar las salidas de activos.</p>
      <button onClick={handleAction}>Registrar Salida</button>
    </div>
  );
};

export default salidaActivos;
