import React, { useState } from "react";

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
    <div className="container my-5">
      {/* Logo */}
      <div className="row text-center">
        <div className="col p-5">
          <img id="LogoFilosofilm" src="img/logo.png" className="img-fluid" alt="Logo Filosofilm" />
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="container my-5 bg-warning p-4 rounded">
        <h1 className="text-center mb-4">CRUD de Usuarios</h1>
        <div className="row">
          {usuarios.map((usuario) => (
            <div key={usuario.idUsuario} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{usuario.nickname}</h5>
                  <p className="card-text">{usuario.correoUsuario}</p>
                  <button className="btn btn-primary mr-2" onClick={() => abrirDetalle(usuario)}>Ver Detalles</button>
                  <button className="btn btn-secondary" onClick={() => abrirRoles(usuario)}>Cambiar Rol</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalles */}
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
                <button className="btn btn-secondary" onClick={cerrarDetalle}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de roles */}
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
                <select className="form-control" value={rolSeleccionado} onChange={(e) => setRolSeleccionado(e.target.value)}>
                  <option value="">Seleccionar rol</option>
                  <option value="Admin">Admin</option>
                  <option value="Usuario">Usuario</option>
                  <option value="Moderador">Moderador</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarRoles}>Cerrar</button>
                <button className="btn btn-primary" onClick={cambiarRol}>Cambiar Rol</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón volver */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <a href="/Admin" className="btn btn-secondary">Ir a Pantalla Admin</a>
      </div>
    </div>
  );
};

export default CRUDUsuarios;
