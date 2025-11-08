import React from "react";
import { useNavigate } from "react-router-dom";

const FormIS: React.FC = () => {
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita recargar la página
    navigate("/InicioDelUsuario"); // Redirige al usuario
  };

  return (
    <div>
      <form id="UsuarioForm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            <i className="bx bx-envelope"></i> Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            name="email"
            placeholder="e.g email@address.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            <i className="bx bx-lock-alt"></i> Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            name="password"
            placeholder="*******"
          />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn font-weight-bold w-100 buttonIS"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormIS;
