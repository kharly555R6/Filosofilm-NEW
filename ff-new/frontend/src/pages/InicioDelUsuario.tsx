
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

const InicioDelUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);

  // Fetch de películas desde tu API
  useEffect(() => {
    fetch("https://localhost:5001/api/peliculas")
      .then((res) => res.json())
      .then((data) => setPeliculas(data))
      .catch((err) => console.error("Error al cargar películas:", err));
  }, []);

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
          classNameTitulo="catPeli h3 text-left"
        />
      )}

    </div>
  );
};

export default InicioDelUsuario;