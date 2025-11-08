import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import "../styles/Pages/Administrador.css";

interface Usuario {
  idUsuario: string;
  idRol: string;
  nickname: string;
  correoUsuario: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  fechaRegistro: string;
  telefono: string;
  sexo: string;
  descripcion: string;
}

const CRUDUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      idUsuario: "1",
      idRol: "Admin",
      nickname: "usuario1",
      correoUsuario: "user1@example.com",
      nombre: "Juan",
      apellido: "Pérez",
      fechaNacimiento: "1990-01-01",
      fechaRegistro: "2023-01-01",
      telefono: "1234567890",
      sexo: "Masculino",
      descripcion: "Usuario de prueba",
    },
  ]);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [showDetalle, setShowDetalle] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState("");

  const abrirDetalle = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowDetalle(true);
  };

  const cerrarDetalle = () => setShowDetalle(false);

  const abrirRoles = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowRoles(true);
  };

  const cerrarRoles = () => setShowRoles(false);

  const cambiarRol = () => {
    if (usuarioSeleccionado) {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.idUsuario === usuarioSeleccionado.idUsuario
            ? { ...u, idRol: rolSeleccionado }
            : u
        )
      );
      setShowRoles(false);
    }
  };

  return (
    <div>
      <div className="container adminPageBody">
        <div className="row text-center">
          <div className="col p-3">
            <div className="p-2">
              <img
                id="LogoFilosofilm"
                src={logo}
                alt="Logo Filosofilm"
                className="img-fluid logo-admin"
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      <hr />
      <br />

      <div className="container bg-warning py-4 rounded">
        
        <h1 className="text-center">
          CRUD de Usuarios
        </h1>

        <div className="row ml-1">
          {usuarios.map((usuario) => (
            <div key={usuario.idUsuario} className="col-4">
              <div className="userCard">
                <div className="card-body text-center">
                  <h5 className="card-title User">{usuario.nickname}</h5>
                  <p className="card-text User">{usuario.correoUsuario}</p>
                  <div
                    className="Container d-flex justify-content-center"
                    style={{ gap: "25px" }}
                  >
                    <button className="crudBtn" onClick={() => abrirDetalle(usuario)}>
                      Detalles
                    </button>
                    <button className="crudBtn" onClick={() => abrirRoles(usuario)}>
                      Rol
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12">
          <a
            href="Administrador"
            className="bg-dark list-group-item list-group-item-action mb-3 text-center text-light"
          >
            REGRESAR
          </a>
        </div>
      </div>

      {showDetalle && usuarioSeleccionado && (
        <div className="modal d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Detalles del Usuario</h5>
                <button type="button" className="close text-white" onClick={cerrarDetalle}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>ID Usuario:</strong> {usuarioSeleccionado.idUsuario}</p>
                    <p><strong>ID Rol:</strong> {usuarioSeleccionado.idRol}</p>
                    <p><strong>Nickname:</strong> {usuarioSeleccionado.nickname}</p>
                    <p><strong>Correo:</strong> {usuarioSeleccionado.correoUsuario}</p>
                    <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
                    <p><strong>Apellido:</strong> {usuarioSeleccionado.apellido}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {usuarioSeleccionado.fechaNacimiento}</p>
                    <p><strong>Fecha de Registro:</strong> {usuarioSeleccionado.fechaRegistro}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Teléfono:</strong> {usuarioSeleccionado.telefono}</p>
                    <p><strong>Sexo:</strong> {usuarioSeleccionado.sexo}</p>
                    <p><strong>Descripción:</strong></p>
                    <p>{usuarioSeleccionado.descripcion}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarDetalle}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRoles && usuarioSeleccionado && (
        <div className="modal d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Seleccionar Rol para {usuarioSeleccionado.nickname}:
                </h5>
                <button type="button" className="close" onClick={cerrarRoles}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <select
                  className="form-control"
                  value={rolSeleccionado}
                  onChange={(e) => setRolSeleccionado(e.target.value)}
                >
                  <option value="">Seleccionar rol</option>
                  <option value="Admin">Admin</option>
                  <option value="Usuario">Usuario</option>
                  <option value="Moderador">Moderador</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarRoles}>
                  Cerrar
                </button>
                <button className="btn btn-primary" onClick={cambiarRol}>
                  Cambiar Rol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDUsuarios;
