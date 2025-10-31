import React from "react";

const Perfil: React.FC = () => {
  return (
    <div>
      {/* NAVBAR PRINCIPAL */}
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
            <a id="cerrarSesionLink" className="nav-link" href="#">
              <strong>Cerrar Sesión</strong>
            </a>
          </li>
        </ul>
      </div>

      {/* SUBNAV DE PERFIL */}
      <div className="bg-secondary">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <a className="nav-link" href="/Perfil">
              Actividad
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/MisResenas">
              Mis Reseñas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/MisLikes">
              Likes
            </a>
          </li>
          <li className="nav-item bgactivo">
            <a className="nav-link" href="/MiInformacion">
              Información
            </a>
          </li>
        </ul>
      </div>

      {/* INFORMACIÓN DEL USUARIO */}
      <div className="container mt-2 bg-dark text-white d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto bg-dark p-4 rounded shadow text-left">
              <h2 className="text-center mb-4">Información del Usuario</h2>

              <div className="form-group">
                <label>Nickname:</label>
                <span id="nombreVisualizacionSpan" className="ml-2"></span>
              </div>

              <div className="form-group">
                <label>ID_Rol:</label>
                <span id="RolSpan" className="ml-2"></span>
              </div>

              <div className="form-group">
                <label>Nombre:</label>
                <span id="nombreSpan" className="ml-2"></span>
              </div>

              <div className="form-group">
                <label>Apellidos:</label>
                <span id="Apellidos" className="ml-2"></span>
              </div>

              <div className="form-group">
                <label>Correo Electrónico:</label>
                <span id="correoElectronicoSpan" className="ml-2"></span>
              </div>

              <div className="form-group">
                <label>Fecha de creación:</label>
                <span id="fechacreacionSpan" className="ml-2"></span>
              </div>

              <div className="form-group">
                <label>
                  Descripción:
                  <span id="DescripcionCampo" className="ml-2"></span>
                </label>
              </div>

              <div className="form-group">
                <label>
                  Fecha de nacimiento:
                  <span id="fechaNacimientoSpan" className="ml-2"></span>
                </label>
              </div>

              <div className="form-group">
                <label>
                  Género:
                  <span id="generoSpan" className="ml-2"></span>
                </label>
              </div>

              <div className="form-group">
                <label>Fecha de registro:</label>
                <span id="fechaRegistroSpan" className="ml-2"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÓN DE CONFIGURACIÓN */}
      <div className="text-center my-3">
        <a href="/Configuracion" className="btn btn-primary">
          Ir a Configuración
        </a>
      </div>
    </div>
  );
};

export default Perfil;
