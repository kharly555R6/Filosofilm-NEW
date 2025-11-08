import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import '../styles/Pages/Administrador.css';


interface Director {
  id: number;
  nombre: string;
  fechaNacimiento: string;
  pais: string;
  biografia: string;
}

const CRUDDirectores: React.FC = () => {
  const [directores, setDirectores] = useState<Director[]>([]);
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [pais, setPais] = useState("");
  const [biografia, setBiografia] = useState("");
  const [editando, setEditando] = useState<Director | null>(null);

  // ➕ Agregar o Actualizar Director
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !fechaNacimiento || !pais) return;

    if (editando) {
      setDirectores((prev) =>
        prev.map((d) =>
          d.id === editando.id ? { ...d, nombre, fechaNacimiento, pais, biografia } : d
        )
      );
      setEditando(null);
    } else {
      const nuevo: Director = {
        id: Date.now(),
        nombre,
        fechaNacimiento,
        pais,
        biografia,
      };
      setDirectores([...directores, nuevo]);
    }

    // Limpiar formulario
    setNombre("");
    setFechaNacimiento("");
    setPais("");
    setBiografia("");
  };

  // ✏️ Editar
  const handleEditar = (director: Director) => {
    setEditando(director);
    setNombre(director.nombre);
    setFechaNacimiento(director.fechaNacimiento);
    setPais(director.pais);
    setBiografia(director.biografia);
  };

  // ❌ Eliminar
  const handleEliminar = (id: number) => {
    setDirectores(directores.filter((d) => d.id !== id));
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

      <div className="container bg-warning py-4 p-4 rounded">
        <h1 className="text-center mb-4">
          CRUD de Directores
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombreDirector">Nombre del Director</label>
            <input
              type="text"
              className="form-control"
              id="nombreDirector"
              placeholder="Ingrese el nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="selectPais">País de Origen</label>
            <select
              className="form-control"
              id="selectPais"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            >
              <option value="">Seleccione un país</option>
              <option value="México">México</option>
              <option value="Argentina">Argentina</option>
              <option value="España">España</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="biografia">Biografía</label>
            <textarea
              className="form-control"
              id="biografia"
              rows={3}
              placeholder="Ingrese la biografía"
              value={biografia}
              onChange={(e) => setBiografia(e.target.value)}
            />
          </div>

          <div className="form-group text-center">
            <button type="submit" className="btn btn-secondary mr-2">
              {editando ? "Actualizar" : "Agregar"}
            </button>
            {editando && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setEditando(null)}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <hr />
        <h2 className="text-center">Directores</h2>

        <ul className="list-group">
          {directores.map((d) => (
            <li key={d.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{d.nombre}</strong> — {d.pais} ({d.fechaNacimiento})
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning mr-2"
                  onClick={() => handleEditar(d)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminar(d.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
          {directores.length === 0 && (
            <li className="list-group-item text-center text-muted">
              No hay directores registrados.
            </li>
          )}
        </ul>

        <div className="col-12 mt-4">
          <a
            href="Administrador"
            className="bg-dark list-group-item list-group-item-action mb-3 text-center text-light"
          >
            REGRESAR
          </a>
        </div>

      </div>
    </div>
  );
};

export default CRUDDirectores;
