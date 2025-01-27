import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./authContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      // Validar login
      const response = await axios.get(
        "https://localhost:7087/api/v1.0/usuario/consultaLogin",
        {
          params: { usuario: username, contrasena: password },
        }
      );

      if (response.data["Valor"] === true) {
        // Obtener el ID del usuario
        const userIdResponse = await axios.get(
          "https://localhost:7087/api/v1.0/usuario/consultaUsername",
          { params: { userName: username } }
        );

        // Verificar si la respuesta contiene 'Valor' y acceder a 'CON_USUARIO'
        const valores = userIdResponse.data?.Valor;
        if (valores && typeof valores.CON_USUARIO !== "undefined") {
          const conUsuario = valores.CON_USUARIO;
          login(conUsuario); // Almacenar el ID en el contexto
          navigate("/");
        } else {
          setErrorMessage("No se encontró el ID del usuario en la respuesta.");
        }
      } else {
        setErrorMessage(
          "No se ha permitido el ingreso, compruebe las credenciales y el estado de su cuenta."
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Hubo un error al intentar realizar el login.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
