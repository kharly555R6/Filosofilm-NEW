import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // 👈 Importante
import "../styles/Components/CarruselPelis.css";

interface Pelicula {
  iD_Pelicula: number;
  titulo: string;
  imagen: string;
}

interface CarruselPelisProps {
  titulo: string;
  peliculas: Pelicula[];
  classNameTitulo?: string;
}

const CarruselPelis: React.FC<CarruselPelisProps> = ({ titulo, peliculas, classNameTitulo }) => {
  const navigate = useNavigate(); 
  const handleClick = (id: number) => {
    navigate(`/InicioPelicula/${id}`);
  };

  return (
    <div className="carrusel-container CarruselContainer">
      <h2 className={classNameTitulo ? classNameTitulo : "carrusel-title text-xl font-bold"}>
        {titulo}
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          1200: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
      >
        {peliculas.map((peli) => (
          <SwiperSlide key={peli.iD_Pelicula}>
            <div
              className="carousel-slot text-center"
              onClick={() => handleClick(peli.iD_Pelicula)}
              style={{ cursor: "pointer" }}
            >
              <img src={peli.imagen} alt={peli.titulo} className="imgPelicula" />
              <p className="NombrePeli">{peli.titulo}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselPelis;
