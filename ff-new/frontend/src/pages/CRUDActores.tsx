import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import '../styles/Pages/Administrador.css';

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

      <div className="container bg-warning p-4 rounded">
        <h1 className="text-center mb-4">
          CRUD de Actores
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
            <button 
              type="submit" 
              className="bg-dark list-group-item list-group-item-action mb-3 text-center text-light">
              AGREGAR
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

        <div className="col-12">
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

export default CRUDActores;
