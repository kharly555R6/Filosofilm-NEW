import React, { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import "../styles/Pages/Administrador.css";
import API_URL from "../api/config";

interface Usuario {
  idUsuario: string;
  rolUsuario: string;
  nickname: string;
  correoUsuario: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  fechaRegistro: string;
  telefono: string;
  sexo: string;
  descripcion: string;
  fotoPerfil: string;
}

const CRUDUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [showDetalle, setShowDetalle] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState("");

  const [formData, setFormData] = useState({
    idUsuarioVisualizacion: "",
    rolUsuarioVisualizacion: "",
    nicknameVisualizacion: "",
    correoUsuarioVisualizacion: "",
    nombreVisualizacion: "",
    fechaNacimientoVisualizacion: "",
    fechaRegistroVisualizacion: "",
    apellidosVisualizacion: "",
    fotoPerfilVisualizacion: "",
    telefono: "",
    descripcion: "",
    gender: "",
  });

  // ➤ Manejo de cambios en inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // 🟡 MAPEO DE ROL POR ID
  const mapRol = (idRol: number): string => {
    switch (idRol) {
      case 1: return "Admin";
      case 2: return "Moderador";
      case 3: return "Usuario";
      case 4: return "Experto en cine";
      default: return "Desconocido";
    }
  };

  // 🔵 FETCH GET /usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("https://localhost:5001/api/Usuarios/usuarios");
        const data = await response.json();

        const usuariosMapeados: Usuario[] = data.map((u: any) => ({
          idUsuario: u.id_Usuario,
          nickname: u.nickname,
          correoUsuario: u.correo_Electronico,
          nombre: u.nombre,
          apellido: u.apellido,
          fechaNacimiento: u.fecha_Nacimiento,
          fechaRegistro: u.fecha_Registro,
          telefono: u.telefono,
          sexo: u.sexo,
          descripcion: u.descripcion ?? "",
          rolUsuario: mapRol(u.id_Rol),
        }));

        setUsuarios(usuariosMapeados);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const aplicarModificaciones = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioSeleccionado) return;

    // Mapear string de rol a ID
    const rolStringToId = (rol: string) => {
      switch (rol) {
        case "Admin": return 1;
        case "Moderador": return 2;
        case "Usuario": return 3;
        case "Experto en cine": return 4;
        default: return null;
      }
    };

    const payload = {
      ID_Usuario: usuarioSeleccionado.idUsuario,
      Nickname: formData.nicknameVisualizacion,
      Nombre: formData.nombreVisualizacion,
      Apellido: formData.apellidosVisualizacion,
      Telefono: formData.telefono,
      Sexo:
        formData.gender === "male"
          ? "Masculino"
          : formData.gender === "female"
          ? "Femenino"
          : "Otro",
      Fecha_Nacimiento: formData.fechaNacimientoVisualizacion || null,
      ID_Rol: rolStringToId(formData.rolUsuarioVisualizacion),
      Descripcion: formData.descripcion,
      Foto_Perfil: formData.fotoPerfilVisualizacion,
    };

    try {
      const res = await fetch(`${API_URL}/Usuarios/actualizarAdmin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al actualizar usuario");

      alert("Usuario actualizado correctamente ✔️");
      setShowDetalle(false);

      // Refrescar lista visual
      setUsuarios((prev) =>
        prev.map((u) =>
          u.idUsuario === usuarioSeleccionado.idUsuario
            ? {
                ...u,
                ...payload,
                rolUsuario: formData.rolUsuarioVisualizacion,
              }
            : u
        )
      );

    } catch (error) {
      console.error(error);
      alert("❌ Error al actualizar");
    }
    window.location.reload();
  };

  const eliminarUsuario = async () => {
    if (!usuarioSeleccionado) return;

    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      const res = await fetch(
        `https://localhost:5001/api/Usuarios/eliminar/${usuarioSeleccionado.idUsuario}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Error al eliminar usuario");

      alert("Usuario eliminado correctamente ✔️");

      // Quitar de la lista
      setUsuarios((prev) =>
        prev.filter((u) => u.idUsuario !== usuarioSeleccionado.idUsuario)
      );

      setShowDetalle(false);
    } catch (error) {
      console.error(error);
      alert("❌ Error al eliminar usuario");
    }
    window.location.reload();
  };

  // ➤ ABRIR DETALLES Y CARGAR FORM DATA
  const abrirDetalle = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setFormData({
      idUsuarioVisualizacion: usuario.idUsuario || "",
      rolUsuarioVisualizacion: usuario.rolUsuario || "",
      nicknameVisualizacion: usuario.nickname || "",
      nombreVisualizacion: usuario.nombre || "",
      correoUsuarioVisualizacion: usuario.correoUsuario || "",
      apellidosVisualizacion: usuario.apellido || "",
      fechaNacimientoVisualizacion: usuario.fechaNacimiento || "",
      fechaRegistroVisualizacion: usuario.fechaRegistro || "",
      fotoPerfilVisualizacion: usuario.fotoPerfil || "",
      telefono: usuario.telefono || "",
      descripcion: typeof usuario.descripcion === 'string' ? usuario.descripcion : (usuario.descripcion ? String(usuario.descripcion) : ""),
      gender:
        usuario.sexo?.toLowerCase() === "masculino"
          ? "male"
          : usuario.sexo?.toLowerCase() === "femenino"
          ? "female"
          : "otro",
    });
    setShowDetalle(true);
  };

  const cerrarDetalle = () => setShowDetalle(false);

  // ➤ Guardar cambios del usuario seleccionado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioSeleccionado) return;

    const payload = {
      idUsuario: usuarioSeleccionado.idUsuario,
      nombre: formData.nombreVisualizacion,
      apellido: formData.apellidosVisualizacion,
      descripcion: formData.descripcion,
      telefono: formData.telefono,
      sexo:
        formData.gender === "male"
          ? "Masculino"
          : formData.gender === "female"
          ? "Femenino"
          : "Otro",
    };

    try {
      const res = await fetch(`${API_URL}/Usuarios/actualizarAdmin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al actualizar usuario");

      alert("Usuario actualizado correctamente ✔️");
      setShowDetalle(false);

      // ➤ Refrescar lista del front
      setUsuarios((prev) =>
        prev.map((u) =>
          u.idUsuario === usuarioSeleccionado.idUsuario
            ? { ...u, ...payload }
            : u
        )
      );

    } catch (error) {
      console.error(error);
      alert("❌ Error al actualizar");
    }
  };

  return (
    <div>
      <div className="container adminPageBody">
        <div className="row text-center">
          <div className="col p-3">
            <img id="LogoFilosofilm" src={logo} alt="Logo" className="img-fluid logo-admin" />
          </div>
        </div>
      </div>

      <br />
      <hr />
      <br />

      <div className="container bg-warning py-4 rounded">
        <h1 className="text-center">CRUD de Usuarios</h1>

        <div className="row g-4 justify-content-center">
          {usuarios.map((usuario) => (
            <div key={usuario.idUsuario} className="col-12 col-md-6 col-lg-3 d-flex align-items-stretch">
              <div className="userCard w-100 d-flex flex-column justify-content-center align-items-center p-4"
                   style={{ minHeight: '220px', background: '#222', borderRadius: '12px' }}>
                <h5 className="card-title User mb-1 text-light fw-bold text-center" style={{ fontSize: '1.5rem' }}>
                  {usuario.nickname}
                </h5>
                <div className="text-warning fw-bold text-center" style={{ fontSize: '1.1rem' }}>
                  {usuario.rolUsuario}
                </div>

                <button className="crudBtn mt-3 w-75 mx-auto" onClick={() => abrirDetalle(usuario)}>
                  DETALLES
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 text-center mt-4">
          <a href="Administrador" className="crudBtn mb-3 text-center">
            REGRESAR
          </a>
        </div>

      </div>

      {showDetalle && usuarioSeleccionado && (
        <div className="modal d-block">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              
              <div className="modal-header">
                <h2 className="modal-title w-100 text-center">
                  Detalles del Usuario
                </h2>
                <button className="close text-white" onClick={cerrarDetalle}>
                  <span>&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="miinfo-row">

                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>ID Usuario</label>
                      <input
                        type="text"
                        name="idUsuarioVisualizacion"
                        value={formData.idUsuarioVisualizacion}
                        onChange={handleChange}
                        disabled
                      />
                    </div>

                    <div className="miinfo-field">
                      <label htmlFor="rolUsuarioVisualizacion" className="miinfo-label" style={{ color: '#000' }}>Rol</label>
                      <select
                        id="rolUsuarioVisualizacion"
                        name="rolUsuarioVisualizacion"
                        value={formData.rolUsuarioVisualizacion}
                        onChange={handleChange}
                        className="form-control"
                        style={{ background: "#fff", color: "#000", border: "1px solid #000" }}
                        required
                      >
                        <option value="">Seleccione un rol</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderador">Moderador</option>
                        <option value="Usuario">Usuario</option>
                        <option value="Experto en cine">Experto en cine</option>
                      </select>
                    </div>
                    
                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>Nickname</label>
                      <input
                        type="text"
                        name="nicknameVisualizacion"
                        value={formData.nicknameVisualizacion}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>Nombres</label>
                      <input
                        type="text"
                        name="nombreVisualizacion"
                        value={formData.nombreVisualizacion}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>Apellidos</label>
                      <input
                        type="text"
                        name="apellidosVisualizacion"
                        value={formData.apellidosVisualizacion}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>Correo electronico</label>
                      <input
                        type="text"
                        name="correoUsuarioVisualizacion"
                        value={formData.correoUsuarioVisualizacion}
                        onChange={handleChange}
                        disabled
                      />
                    </div>

                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>Fecha de Nacimiento</label>
                      <input
                        type="text"
                        name="fechaNacimientoVisualizacion"
                        value={formData.fechaNacimientoVisualizacion}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>Fecha de Registro</label>
                      <input
                        type="text"
                        name="fechaRegistroVisualizacion"
                        value={formData.fechaRegistroVisualizacion}
                        onChange={handleChange}
                        disabled
                      />
                    </div>

                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>Descripción</label>
                      <textarea
                        name="descripcion"
                        maxLength={200}
                        value={formData.descripcion || ""}
                        onChange={handleChange}
                        style={{ background: '#fff', color: '#222', border: '1px solid #222', borderRadius: '6px', minHeight: '90px' }}
                        placeholder="Agrega una descripción..."
                      />
                    </div>

                    <div className="miinfo-field">
                      <label className="miinfo-label" style={{ color: '#000' }}>Foto de perfil</label>
                      <input
                        type="text"
                        name="fotoPerfilVisualizacion"
                        value={formData.fotoPerfilVisualizacion}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="miinfo-field text-center p-4">
                      <label className="miinfo-label mb-2" style={{ color: '#000' }}>Género</label>
                      <div className="d-flex justify-content-center align-items-center gap-4" style={{ gap: '2rem' }}>
                        <label className="mb-0" style={{ color: '#000' }}>
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                          /> Hombre
                        </label>
                        <label className="mb-0" style={{ color: '#000' }}>
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                          /> Mujer
                        </label>
                        <label className="mb-0" style={{ color: '#000' }}>
                          <input
                            type="radio"
                            name="gender"
                            value="otro"
                            checked={formData.gender === "otro"}
                            onChange={handleChange}
                          /> Otro
                        </label>
                      </div>
                    </div>

                  </div>

                  <div className="row mt-4">

                    <div className="col-6 d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-danger w-100"
                        onClick={eliminarUsuario}
                        style={{ fontWeight: 'bold', height: '45px', maxWidth: '240px' }}
                      >
                        Eliminar Usuario
                      </button>
                    </div>

                    <div className="col-6 d-flex justify-content-start">
                      <button 
                      type="button" 
                      className="btn btn-success w-100" 
                      onClick={aplicarModificaciones}
                      style={{ fontWeight: 'bold', height: '45px', maxWidth: '240px' }}
                      >
                        Aplicar Modificaciones
                      </button>
                    </div>

                  </div>
                  
                </form>
              </div>

              <div className="modal-footer">
                <button className="miinfo-submit" onClick={cerrarDetalle}>
                  Cerrar
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
