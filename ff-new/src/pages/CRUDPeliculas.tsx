import React, { useState, useEffect } from "react";
import logo from '../assets/img/logo.png';
import '../styles/Pages/Administrador.css';


interface Pelicula {
  titulo: string;
  sinopsis: string;
  fechaLanzamiento: string;
  duracion: number;
  presupuesto: number;
  recaudacion: number;
  pais: string;
}

const CRUDPeliculas: React.FC = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [form, setForm] = useState<Pelicula>({
    titulo: "",
    sinopsis: "",
    fechaLanzamiento: "",
    duracion: 0,
    presupuesto: 0,
    recaudacion: 0,
    pais: "",
  });
  const [modoEditar, setModoEditar] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState<number | null>(null);

  // Simulación de datos iniciales
  useEffect(() => {
    const inicial: Pelicula[] = [
      {
        titulo: "Ejemplo 1",
        sinopsis: "Sinopsis de ejemplo",
        fechaLanzamiento: "2025-01-01",
        duracion: 120,
        presupuesto: 1000000,
        recaudacion: 5000000,
        pais: "México",
      },
    ];
    setPeliculas(inicial);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modoEditar && indiceEditar !== null) {
      const nuevas = [...peliculas];
      nuevas[indiceEditar] = form;
      setPeliculas(nuevas);
      setModoEditar(false);
      setIndiceEditar(null);
    } else {
      setPeliculas([...peliculas, form]);
    }
    setForm({
      titulo: "",
      sinopsis: "",
      fechaLanzamiento: "",
      duracion: 0,
      presupuesto: 0,
      recaudacion: 0,
      pais: "",
    });
  };

  const editarPelicula = (index: number) => {
    setForm(peliculas[index]);
    setModoEditar(true);
    setIndiceEditar(index);
  };

  const eliminarPelicula = (index: number) => {
    setPeliculas(peliculas.filter((_, i) => i !== index));
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
          CRUD de Películas
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título de la Película</label>
            <input type="text" className="form-control" id="titulo" value={form.titulo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="sinopsis">Sinopsis</label>
            <textarea className="form-control" id="sinopsis" rows={3} value={form.sinopsis} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="fechaLanzamiento">Fecha de Lanzamiento</label>
            <input type="date" className="form-control" id="fechaLanzamiento" value={form.fechaLanzamiento} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="duracion">Duración (minutos)</label>
            <input type="number" className="form-control" id="duracion" value={form.duracion} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="presupuesto">Presupuesto</label>
            <input type="number" className="form-control" id="presupuesto" value={form.presupuesto} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="recaudacion">Recaudación</label>
            <input type="number" className="form-control" id="recaudacion" value={form.recaudacion} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pais">País de Origen</label>
            <input type="text" className="form-control" id="pais" value={form.pais} onChange={handleChange} />
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-secondary mr-2">{modoEditar ? "Actualizar" : "Agregar"}</button>
            {modoEditar && <button type="button" className="btn btn-danger" onClick={() => { setModoEditar(false); setForm({ titulo: "", sinopsis: "", fechaLanzamiento: "", duracion: 0, presupuesto: 0, recaudacion: 0, pais: "" }); }}>Cancelar</button>}
          </div>
        </form>

        <hr />
        <h2 className="text-center">Películas</h2>
        <ul className="list-group mt-3">
          {peliculas.map((p, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              {p.titulo}
              <div>
                <button className="btn btn-warning btn-sm mr-2" onClick={() => editarPelicula(i)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarPelicula(i)}>Eliminar</button>
              </div>
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

export default CRUDPeliculas;
