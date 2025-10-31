import React, { useState } from "react";

const Configuracion: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreVisualizacion: "",
    apellidosVisualizacion: "",
    nuevaContrasena: "",
    contrasena: "",
    telefono: "",
    descripcion: "",
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos guardados:", formData);
    alert("Configuración guardada correctamente ✅");
  };

  const handleLogout = () => {
    alert("Sesión cerrada");
  };

  return (
    <div>
      {/* Navbar superior */}
      <div className="bg-secondary">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link" href="/Inicio">
              <strong>Inicio</strong>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Perfil" id="nombreUsuario">
              <strong>@Usuario</strong>
            </a>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link text-decoration-none"
              id="cerrarSesionLink"
              onClick={handleLogout}
            >
              <strong>Cerrar Sesión</strong>
            </button>
          </li>
        </ul>
      </div>

      {/* Contenedor principal */}
      <div className="container mt-5">
        <h1 className="text-center bg-secondary text-light p-2 rounded">
          Mi configuración
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreVisualizacion" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreVisualizacion"
              name="nombreVisualizacion"
              value={formData.nombreVisualizacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="apellidosVisualizacion" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className="form-control"
              id="apellidosVisualizacion"
              name="apellidosVisualizacion"
              value={formData.apellidosVisualizacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nuevaContrasena" className="form-label">
              Nueva Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="nuevaContrasena"
              name="nuevaContrasena"
              value={formData.nuevaContrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <input
              type="tel"
              className="form-control"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción (máx. 200 caracteres)
            </label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              name="descripcion"
              maxLength={200}
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="male">
                Hombre
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="female">
                Mujer
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="otro"
                value="otro"
                checked={formData.gender === "otro"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="otro">
                Otro
              </label>
            </div>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Configuracion;
