import React from "react";

const FormIS: React.FC = () => {
  return (
    <div>
      <form id="UsuarioForm">
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            <i className="bx bx-envelope"></i> Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            name="email"
            placeholder="e.g email@addres.com"
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
            className="btn btn-dark font-weight-bold w-100"
          >
            Iniciar sesión
          </button>
        </div>

      </form>
    </div>
  );
};

export default FormIS;
