import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ActorPelicula {
  id_Actor: number;
  nombre?: string;
  imagen?: string;
}

const ActoresDePelicula: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [actores, setActores] = useState<ActorPelicula[]>([]);

  useEffect(() => {
    if (!id) return;
    fetch(`https://localhost:5001/api/peliculaActor/${id}`)
      .then((res) => res.json())
      .then((data) => setActores(data))
      .catch((err) => console.error("Error al cargar actores:", err));
  }, [id]);

  if (actores.length === 0) {
    return (
      <div className="text-center text-light mt-4">
        <h4>No hay actores registrados para esta película.</h4>
      </div>
    );
  }

  return (
    <div className="container text-center text-light mt-4">
      <h2 className="mb-3">Actores de la Película</h2>
      <div className="row">
        {actores.map((actor) => (
          <div className="col-md-4 mb-4" key={actor.id_Actor}>
            <div className="card bg-dark text-light p-3">
              {actor.imagen && (
                <img
                  src={actor.imagen}
                  alt={actor.nombre || `Actor ${actor.id_Actor}`}
                  className="rounded-circle mb-3 mx-auto"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
              )}
              <h5>{actor.nombre || `Actor ID: ${actor.id_Actor}`}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActoresDePelicula;
