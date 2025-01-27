import React, { useState, useEffect } from "react";
import { useAuth } from "./authContext";
import axios from "axios";

// Define el tipo de las props
interface ActivosProps {
  onSave: () => void; // Prop onSave que es una función sin argumentos ni retorno
}

const Activos: React.FC<ActivosProps> = ({ onSave }) => {
  const [consecutivo, setConsecutivo] = useState("");
  const [name, setName] = useState("");
  const [tipoActivo, setTipoActivo] = useState("");
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [tiposActivos, setTiposActivos] = useState([]);
  const { userId } = useAuth();

  const handleAction = () => {
    console.log(`Acción realizada por el usuario con ID: ${userId}`);
  };

  // Función para cargar los tipos de activos
  const cargarTiposActivos = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7087/api/v1.0/tipoActivo/consultaTipoActivos"
      );

      if (response.data.Codigo === 0 && Array.isArray(response.data.Valor)) {
        setTiposActivos(response.data.Valor);
      } else {
        setTiposActivos([]);
      }
    } catch (err) {
      setTiposActivos([]);
    }
  };

  useEffect(() => {
    cargarTiposActivos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para registrar o editar el activo
    // Una vez terminado, puedes llamar a onSave
    onSave();
  };

  // Función para consultar un activo
  const handleConsultarActivo = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7087/api/v1/activo/consultaActivo?idActivo=${name}`
      );

      if (response.data) {
        setConsecutivo(response.data.Valor.CON_ACTIVO);
        setTipoActivo(response.data.Valor.TIP_ACTIVO);
        setEstado(
          response.data.Valor.LOG_HABILITADO ? "habilitar" : "deshabilitar"
        );
        setCategoria(
          response.data.Valor.LOG_INSTITUCIONAL ? "institucional" : "externo"
        );
        setObservaciones(response.data.Valor.OBS_ACTIVO);
        setFechaCreacion(response.data.Valor.FEC_CREACION);
        setMensaje("Activo encontrado. Puede editarlo.");

        setIsEditable(true);
        setIsRegistering(false);
        setCanSubmit(true);
      }
    } catch (err) {
      setMensaje("El activo no existe. Puede registrarlo");
      setIsEditable(true);
      setIsRegistering(true);
      setCanSubmit(true);

      setTipoActivo("");
      setEstado("");
      setCategoria("");
      setObservaciones("");
    }
  };

  // Función para registrar un nuevo activo
  const handleRegistrarActivo = async () => {
    try {
      await axios.post("https://localhost:7087/api/v1/activo/registrarActivo", {
        IDE_ACTIVO: name,
        OBS_ACTIVO: observaciones,
        LOG_INSTITUCIONAL: categoria === "institucional",
        LOG_HABILITADO: estado === "habilitar",
        TIP_ACTIVO: tipoActivo,
        CON_USUARIO_CREACION: 1, // pendiente de implementar el login
        CON_USUARIO_MODIFICACION: 1, // pendiente de implementar el login
        FEC_CREACION: new Date().toISOString(),
        FEC_MODIFICACION: new Date().toISOString(),
      });

      setMensaje("Activo registrado exitosamente.");
      resetForm();
    } catch (err) {
      setMensaje("Ocurrió un error al registrar el activo.");
    }
  };

  // Función para editar un activo
  const handleEditarActivo = async () => {
    try {
      await axios.put("https://localhost:7087/api/v1/activo/editarActivo", {
        CON_ACTIVO: consecutivo,
        IDE_ACTIVO: name,
        OBS_ACTIVO: observaciones,
        LOG_INSTITUCIONAL: categoria === "institucional",
        LOG_HABILITADO: estado === "habilitar",
        TIP_ACTIVO: tipoActivo,
        CON_USUARIO_CREACION: 1, // pendiente de implementar el login
        CON_USUARIO_MODIFICACION: 1, // pendiente de implementar el login
        FEC_CREACION: fechaCreacion,
        FEC_MODIFICACION: new Date().toISOString(),
      });

      setMensaje("Activo editado exitosamente.");
      resetForm();
    } catch (err) {
      setMensaje("Ocurrió un error al editar el activo.");
    }
  };

  // Función para reiniciar el formulario
  const resetForm = () => {
    setName("");
    setTipoActivo("");
    setEstado("");
    setCategoria("");
    setObservaciones("");
    setCanSubmit(false);
    setIsEditable(false);
  };

  // Resto del componente

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <div className="card" style={{ width: "500px" }}>
        <div className="card-body">
          {mensaje && (
            <div
              className={`alert ${
                mensaje.includes("error") ? "alert-danger" : "alert-success"
              }`}
              role="alert"
            >
              {mensaje}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Activo</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setCanSubmit(false);
                }}
                required
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleConsultarActivo}
              >
                Consultar
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo de activo</label>
              <select
                name="tipoActivo"
                className="form-select"
                value={tipoActivo}
                onChange={(e) => setTipoActivo(e.target.value)}
                disabled={!isEditable}
              >
                <option value="">Seleccione</option>
                {tiposActivos.map((tipo) => (
                  <option key={tipo.TIP_ACTIVO} value={tipo.TIP_ACTIVO}>
                    {tipo.DSC_ACTIVO}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <div>
                <input
                  type="radio"
                  value="habilitar"
                  name="estado"
                  checked={estado === "habilitar"}
                  onChange={(e) => setEstado(e.target.value)}
                  disabled={!isEditable}
                />
                Habilitado
                <br />
                <input
                  type="radio"
                  value="deshabilitar"
                  name="estado"
                  checked={estado === "deshabilitar"}
                  onChange={(e) => setEstado(e.target.value)}
                  disabled={!isEditable}
                />
                Deshabilitado
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <div>
                <input
                  type="radio"
                  value="institucional"
                  name="categoria"
                  checked={categoria === "institucional"}
                  onChange={(e) => setCategoria(e.target.value)}
                  disabled={!isEditable}
                />
                Institucional
                <br />
                <input
                  type="radio"
                  value="externo"
                  name="categoria"
                  checked={categoria === "externo"}
                  onChange={(e) => setCategoria(e.target.value)}
                  disabled={!isEditable}
                />
                Externo
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea
                className="form-control"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                disabled={!isEditable}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canSubmit}
            >
              {isRegistering ? "Registrar" : "Editar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Activos;
