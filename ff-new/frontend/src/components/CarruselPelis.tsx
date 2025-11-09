import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Pelicula {
  id_Pelicula: number;
  titulo: string;
  imagen: string;
}

interface Props {
  titulo: string;
  peliculas: Pelicula[];
}

const CarruselPelis: React.FC<Props> = ({ titulo, peliculas }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3">{titulo}</h2>
      <Slider {...settings}>
        {peliculas.map((peli) => (
          <div key={peli.id_Pelicula} className="p-2 text-center">
            <img
              src={peli.imagen}
              alt={peli.titulo}
              className="rounded-2xl w-full h-64 object-cover shadow-lg"
            />
            <p className="mt-2 font-semibold">{peli.titulo}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarruselPelis;
