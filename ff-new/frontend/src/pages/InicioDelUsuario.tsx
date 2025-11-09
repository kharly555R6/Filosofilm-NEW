
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages/InicioDelUsuario.css";
import NavbarIn from "../components/NavbarIn";
import CarruselPelis from "../components/CarruselPelis";
import sample from "../assets/sample.svg"

interface Pelicula {
  id_Pelicula: number;
  titulo: string;
  imagen: string;
  // agrega otros campos si los necesitas
}

const InicioDelUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);

  // Fetch de películas desde tu API
  useEffect(() => {
    fetch("https://localhost:5001/api/peliculas") // ajusta la URL según tu backend
      .then((res) => res.json())
      .then((data) => setPeliculas(data))
      .catch((err) => console.error("Error al cargar películas:", err));
  }, []);

  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/MiInformacion");
  const handleLogout = () => navigate("/");
  const handleImagenClick = () => navigate("/InicioPelicula");

  return (
    <div>
      {/* Navbar */}
      <NavbarIn
        onInicioClick={handleInicio}
        onPeliculasClick={handlePeliculas}
        onPerfilClick={handlePerfil}
        onLogoutClick={handleLogout}
      />

      {/* Título */}
      <div className="container mt-4">
        <h1 className="text-center mb-4">¡Veamos más Películas!</h1>
      </div>

      <div className="mt-1"></div>

      <div className="row">
        <h3 className="catPeli">Añadidas recientemente</h3>
      </div>

      <div className="row">
        <div className="container col-10">
          <div className="row">
            {[1, 2, 3].map((_, i) => (
              <div className="col-md-4 text-center" key={i}>
                <img
                  className="imgPelicula"
                  src={sample}
                  alt="sample"
                  onClick={handleImagenClick}
                  style={{ cursor: "pointer" }}
                />
                <h5 className="NombrePeli">@Pelicula</h5>
              </div>
            ))}
          </div>
        </div>

        <div className="col-1"></div>
        <div className="col-1">
          <div className="text-center botonMasPelis">
            <button type="button" className="btn">
              <p className="sigBoton">⮞</p>
            </button>
          </div>
        </div>
      </div>

      {/* Carrusel de películas recientes */}
      {peliculas.length > 0 && (
        <CarruselPelis
          titulo="Añadidas recientemente"
          peliculas={peliculas.slice(0, 5)} // muestra las primeras 5, ajusta según tu criterio
        />
      )}

      {/* Carrusel de películas top (opcional) */}
      {peliculas.length > 5 && (
        <CarruselPelis
          titulo="Top Películas"
          peliculas={peliculas.slice(5, 10)}
        />
      )}
    </div>
  );
};

export default InicioDelUsuario;