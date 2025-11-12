import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface ActorItem {
  id_Actor: number;
  personaje: string;
  actor: {
    nombre: string;
    foto: string;
  };
}

interface CarruselActoresProps {
  endpoint: string; // URL del backend (por ejemplo: api/ActorPeliculas/pelicula/1)
}

const CarruselActores: React.FC<CarruselActoresProps> = ({ endpoint }) => {
  const [actores, setActores] = useState<ActorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActores = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Error al cargar los actores");
        const data = await response.json();
        setActores(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActores();
  }, [endpoint]);

  if (loading) return <p className="text-light">Cargando actores...</p>;
  if (actores.length === 0) return <p className="text-light my-5 pt-5 pb-3">No hay actores registrados.</p>;

  return (
    <div className="carrusel-container">
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
        {actores.map((item) => (
          <SwiperSlide key={item.id_Actor}>
            <div className="carousel-slot text-center">
              <img
                src={item.actor.foto}
                alt={item.actor.nombre}
                className="imgPelicula"
              />
              <h5 className="text-light mt-2">{item.actor.nombre}</h5>
              <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
                {item.personaje}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselActores;
