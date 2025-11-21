import React, { useState, useEffect } from "react";
import logo from '../assets/img/logo.png';
import '../styles/Pages/Administrador.css';
import CarruselPelis from "../components/CarruselPelis";
import API_BASE_URL from "../api/config";
import fallbackPoster from "../assets/img/cine.jpg";


interface PeliculaForm {
  titulo: string;
  sinopsis: string;
  fechaLanzamiento: string;
  duracion: number;
  presupuesto: number;
  recaudacion: number;
  pais: string;
}

interface PeliculaCarrusel {
  iD_Pelicula: number;
  titulo: string;
  imagen: string;
}

const CRUDPeliculas: React.FC = () => {
  const [peliculas, setPeliculas] = useState<PeliculaForm[]>([]);
  const [form, setForm] = useState<PeliculaForm>({
    titulo: "",
    sinopsis: "",
    fechaLanzamiento: "",
    duracion: 0,
    presupuesto: 0,
    recaudacion: 0,
    pais: "",
  });
  const [peliculasCarrusel, setPeliculasCarrusel] = useState<PeliculaCarrusel[]>([]);
  const [modoEditar, setModoEditar] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState<number | null>(null);

  // Simulación de datos iniciales
  useEffect(() => {
    const inicial: PeliculaForm[] = [
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

  useEffect(() => {
    const cargarPeliculasCarrusel = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/peliculas`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        const normalizadas = (Array.isArray(data) ? data : [])
          .map((pelicula: any) => {
            const imagenCruda = pelicula.imagen ?? pelicula.Imagen ?? "";
            const imagenNormalizada = typeof imagenCruda === "string" && imagenCruda.trim() !== ""
              ? imagenCruda
              : fallbackPoster;

            return {
              iD_Pelicula: pelicula.iD_Pelicula ?? pelicula.id_Pelicula ?? pelicula.id ?? 0,
              titulo: pelicula.titulo ?? pelicula.Titulo ?? "Sin título",
              imagen: imagenNormalizada,
            };
          })
          .filter((pelicula: PeliculaCarrusel) => pelicula.iD_Pelicula !== 0);

        setPeliculasCarrusel(normalizadas);
      } catch (error) {
        console.error("Error al cargar el carrusel de películas:", error);
      }
    };

    cargarPeliculasCarrusel();
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
            <button type="submit" className="crudBtn w-100 fw-bold">{modoEditar ? "Actualizar" : "Agregar"}</button>
            {modoEditar && <button type="button" className="btn btn-danger" onClick={() => { setModoEditar(false); setForm({ titulo: "", sinopsis: "", fechaLanzamiento: "", duracion: 0, presupuesto: 0, recaudacion: 0, pais: "" }); }}>Cancelar</button>}
          </div>
        </form>
      </div>

      <br /><hr />

      <h1 className="text-center mt-5 pt-5">Películas disponibles</h1>

      <div className="container" style={{ backgroundColor: "#000" }}>
          {peliculasCarrusel.length > 0 && (
            <CarruselPelis
              titulo=""
              peliculas={peliculasCarrusel}
              classNameTitulo="catPeli text-left catPeli1"
            />
          )}
        </div>

        <div className="col-12">
          <a
            href="Administrador"
            className="crudBtn w-100 fw-bold"
          >
            REGRESAR
          </a>
        </div>

    </div>
  );
};

export default CRUDPeliculas;
