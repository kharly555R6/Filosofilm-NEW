import React from "react";
import { useNavigate } from "react-router-dom";
import sample from "../assets/sample.svg";
import "../styles/Pages/InicioDelUsuario.css";
import NavbarIn from "../components/NavbarIn";

const InicioDelUsuario: React.FC = () => {
  const navigate = useNavigate();

  const handleInicio = () => navigate("/InicioDelUsuario");
  const handlePeliculas = () => navigate("/InicioPelicula");
  const handlePerfil = () => navigate("/MiInformacion");
  const handleLogout = () => navigate("/");
  const handleImagenClick = () => navigate("/InicioPelicula");

  return (
    <div>
      <NavbarIn
        onInicioClick={handleInicio}
        onPeliculasClick={handlePeliculas}
        onPerfilClick={handlePerfil}
        onLogoutClick={handleLogout}
      />

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

      <div className="row">
        <h3 className="catPeli">Lo más Visto</h3>
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

      <div className="row">
        <h3 className="catPeli">Recomendadas ¡para ti!</h3>
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
    </div>
  );
};

export default InicioDelUsuario;
