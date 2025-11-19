import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


type ActorOrDirectorItem =
  | {
      id_Actor: number;
      personaje: string;
      actor: {
        nombre: string;
        foto: string;
      };
    }
  | {
      id_Director: number;
      director: {
        nombre: string;
        foto: string;
      };
    };

interface CarruselActoresProps {
  endpoint: string;
}

const CarruselActores: React.FC<CarruselActoresProps> = ({ endpoint }) => {
  const [items, setItems] = useState<ActorOrDirectorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActores = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Error al cargar los actores");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActores();
  }, [endpoint]);

  if (loading) return <p className="text-light">Cargando actores...</p>;
  if (items.length === 0) return <p className="text-light my-5 pt-5 pb-3">No hay elementos registrados.</p>;

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
        {items.map((item) => {
          // Actor
          if ('actor' in item) {
            return (
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
            );
          }
          // Director
          if ('director' in item) {
            return (
              <SwiperSlide key={item.id_Director}>
                <div className="carousel-slot text-center">
                  <img
                    src={item.director.foto}
                    alt={item.director.nombre}
                    className="imgPelicula"
                  />
                  <h5 className="text-light mt-2">{item.director.nombre}</h5>
                </div>
              </SwiperSlide>
            );
          }
          return null;
        })}
      </Swiper>
    </div>
  );
};

export default CarruselActores;
