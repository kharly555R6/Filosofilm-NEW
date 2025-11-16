import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/InicioDelUsuario.css";
import NavbarIn from "../components/NavbarIn";
import CarruselPelis from "../components/CarruselPelis";

interface Pelicula {
  iD_Pelicula: number;
  titulo: string;
  imagen: string;
}

interface Genero {
  iD_Genero: number;
  nombre: string;
  descripcion: string;
}

interface PeliculasPorGenero {
  genero: Genero;
  peliculas: Pelicula[];
}

const InicioDelUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [peliculasPorGenero, setPeliculasPorGenero] = useState<PeliculasPorGenero[]>([]);

  // Fetch de todas las películas
  useEffect(() => {
    fetch("https://localhost:5001/api/peliculas")
      .then((res) => res.json())
      .then((data) => setPeliculas(data))
      .catch((err) => console.error("Error al cargar películas:", err));
  }, []);

  // Fetch de todos los géneros
  useEffect(() => {
    fetch("https://localhost:5001/api/genero")
      .then((res) => res.json())
      .then((data) => setGeneros(data))
      .catch((err) => console.error("Error al cargar géneros:", err));
  }, []);

  // Para cada género, fetch de sus películas
  useEffect(() => {
    if (generos.length === 0) return;

    const fetchPeliculasPorGenero = async () => {
      try {
        const promises = generos.map(async (genero) => {
          const response = await fetch(`https://localhost:5001/api/peliculas/genero/${genero.iD_Genero}`);
          const peliculas = await response.json();
          return {
            genero: genero,
            peliculas: peliculas
          };
        });

        const resultados = await Promise.all(promises);
        setPeliculasPorGenero(resultados);
      } catch (err) {
        console.error("Error al cargar películas por género:", err);
      }
    };

    fetchPeliculasPorGenero();
  }, [generos]);

  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePerfil = () => navigate("/MiInformacion");
  const handleLogout = () => navigate("/");

  return (
    <div>
      {/* Navbar */}
      <NavbarIn
        onInicioClick={handleInicio}
        onPerfilClick={handlePerfil}
        onLogoutClick={handleLogout}
      />

      <br /><br />

      <h1>¡ Desplaza hacia la derecha para ver mas pelis !</h1>

      {/* Carrusel de películas recientes */}
      {peliculas.length > 0 && (
        <CarruselPelis
          titulo="Añadidas recientemente"
          peliculas={peliculas}
          classNameTitulo="catPeli h3 text-left catPeli1"
        />
      )}

      {/* Carruseles por género */}
      {peliculasPorGenero.map((item) => 
        item.peliculas && item.peliculas.length > 0 ? (
          <CarruselPelis
            key={item.genero.iD_Genero}
            titulo={item.genero.nombre}
            peliculas={item.peliculas}
            classNameTitulo="catPeli h3 text-left"
          />
        ) : null
      )}
    </div>
  );
};

export default InicioDelUsuario;