import React from "react";
import { useAuth } from "./authContext";

const autorizacionActivos: React.FC = () => {
  const { userId } = useAuth();
  const handleAction = () => {
    console.log(`Acción realizada por el usuario con ID: ${userId}`);
  };
  return (
    <div>
      <h1>Autorización de Activos</h1>
      <p>Aquí puedes autorizar activos.</p>
      <button onClick={handleAction}>Registrar Autorizacion</button>
    </div>
  );
};

export default autorizacionActivos;
