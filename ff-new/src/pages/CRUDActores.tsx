import React, { useState } from "react";
import sample from '../assets/sample.svg';

const CRUDActores: React.FC = () => {
  // Estados simulados (estos normalmente se cargarían con un backend o API)
  const [nombreActor, setNombreActor] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [pais, setPais] = useState("");
  const [biografia, setBiografia] = useState("");
  const [actores, setActores] = useState<{ id: number; nombre: string }[]>([]);

  // Manejadores
  const handleAgregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombreActor.trim() === "") return;
    const nuevoActor = {
      id: Date.now(),
      nombre: nombreActor,
    };
    setActores([...actores, nuevoActor]);
    setNombreActor("");
    setFechaNacimiento("");
    setPais("");
    setBiografia("");
  };

  return (
    <div className="crud-container">
      {/* Logo */}
      <div className="container">
        <div className="row text-center">
          <div className="col p-5">
            <div className="p-2">
              <img
                id="LogoFilosofilm"
                src="img/logo.png"
                alt="Logo Filosofilm"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Formulario principal */}
      <div className="container my-5 bg-warning p-4 rounded">
        <h1 className="text-center mb-4">
          <strong>CRUD de Actores</strong>
        </h1>

        <form onSubmit={handleAgregar}>
          <div className="form-group">
            <label htmlFor="nombreActor">Nombre del Actor</label>
            <input
              type="text"
              className="form-control"
              id="nombreActor"
              placeholder="Ingrese el nombre"
              value={nombreActor}
              onChange={(e) => setNombreActor(e.target.value)}
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
            <label htmlFor="selectPais">País de Origen:</label>
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
              Agregar
            </button>
          </div>
        </form>

        <hr />

        <div className="text-center">
          <h2>Actores</h2>
        </div>

        <ul className="list-group">
          {actores.map((actor) => (
            <li key={actor.id} className="list-group-item">
              {actor.nombre}
            </li>
          ))}
        </ul>
      </div>

      {/* Enlace al admin */}
      <div className="d-flex justify-content-center align-items-center">
        <a href="/Admin" className="btn btn-secondary mb-3">
          Ir a Pantalla Admin
        </a>
      </div>
    </div>
  );
};

export default CRUDActores;
