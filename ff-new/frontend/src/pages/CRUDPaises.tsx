import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import logo from "../assets/img/logo.png";
import '../styles/Pages/Administrador.css';
import sample from "../assets/sample.svg";
import API_BASE_URL from "../api/config";

interface Pais {
  id_Pais: number;
  nombre: string;
  url_Foto?: string | null;
}

const CRUDPaises: React.FC = () => {
  const [nombrePais, setNombrePais] = useState("");
  const [urlPais, setUrlPais] = useState("");
  const [paises, setPaises] = useState<Pais[]>([]);
  const [modoEditar, setModoEditar] = useState(false);
  const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>(null);
  const [loading, setLoading] = useState(false);

  const PAISES_ENDPOINT = `${API_BASE_URL}/PaisOrigen`;

  const normalizarPais = (pais: any): Pais => ({
    id_Pais: pais.id_Pais ?? pais.id_pais ?? pais.iD_Pais ?? pais.id ?? 0,
    nombre: pais.nombre ?? pais.Nombre ?? "",
    url_Foto: pais.url_Foto ?? pais.Url_Foto ?? pais.urlFoto ?? pais.url_foto ?? null,
  });

  const obtenerPaises = async () => {
    setLoading(true);
    try {
      const response = await fetch(PAISES_ENDPOINT);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const data = await response.json();
      const paisesNormalizados = (Array.isArray(data) ? data : [])
        .map(normalizarPais)
        .filter((pais) => pais.id_Pais && pais.nombre);
      setPaises(paisesNormalizados);
    } catch (err) {
      console.error("Error al cargar países:", err);
      alert("No se pudieron cargar los países. Intenta nuevamente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPaises();
  }, []);

  const crearPais = async (payload: { Nombre: string; Url_Foto: string | null }) => {
    const response = await fetch(PAISES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en la respuesta del servidor: ${errorText}`);
    }
  };

  const actualizarPais = async (payload: { id_Pais: number; Nombre: string; Url_Foto: string | null }) => {
    const response = await fetch(`${PAISES_ENDPOINT}/${payload.id_Pais}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },            
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en la respuesta del servidor: ${errorText}`);
    }
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombrePais.trim()) return;

    const payload = {
      Nombre: nombrePais.trim(),
      Url_Foto: urlPais.trim() ? urlPais.trim() : null,
    };

    try {
      if (modoEditar && paisSeleccionado) {
        await actualizarPais({ id_Pais: paisSeleccionado.id_Pais, ...payload });
      } else {
        await crearPais(payload);
      }

      alert("Operación realizada con éxito.");
      await obtenerPaises();
      setModoEditar(false);
      setPaisSeleccionado(null);
      setNombrePais("");
      setUrlPais("");
    } catch (err) {
      console.error("Error al guardar el país:", err);
      alert("No se pudo guardar el país. Verifica la información e intenta nuevamente.");
    }
  };

  const editarPais = (pais: Pais) => {
    setModoEditar(true);
    setPaisSeleccionado(pais);
    setNombrePais(pais.nombre);
    setUrlPais(pais.url_Foto ?? "");
  };

  const eliminarPais = async (id_Pais: number) => {
    if (!window.confirm("¿Deseas eliminar este país?")) return;

    try {
      const response = await fetch(`${PAISES_ENDPOINT}/${id_Pais}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en la respuesta del servidor: ${errorText}`);
      }

      await obtenerPaises();
    } catch (err) {
      console.error("Error al eliminar el país:", err);
      alert("No se pudo eliminar el país. Intenta nuevamente.");
    }
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
          CRUD de Países
        </h1>

        <form onSubmit={manejarSubmit} className="mb-4">
          <div className="form-group mt-4">
            <label htmlFor="nombrePais" className="form-label fw-bold ml-2 mt-4">
              Nombre del País
            </label>
            <input
              type="text"
              className="form-control"
              id="nombrePais"
              value={nombrePais}
              onChange={(e) => setNombrePais(e.target.value)}
              placeholder="Ingrese el nombre del país"
              style={{ border: '2px solid #222', borderRadius: '8px', background: '#fff', color: '#222', fontWeight: 500 }}
              required
            />

            <label htmlFor="urlPais" className="form-label fw-bold ml-2 mt-4">
              URL de la foto del país
            </label>

            <input
              type="text"
              className="form-control"
              id="urlPais"
              value={urlPais}
              onChange={(e) => setUrlPais(e.target.value)}
              placeholder="Ingrese la URL de la foto del país"
              style={{ border: '2px solid #222', borderRadius: '8px', background: '#fff', color: '#222', fontWeight: 500 }}
              required
            />

          </div>
          <div className="form-group d-flex justify-content-center gap-3 mt-3">
            <button
              type="submit"
              className={modoEditar ? "crudBtn w-100" : "btn btn-success fw-bold w-100"}
              style={{ minWidth: 120, minHeight: 46, fontWeight: "bold" }}
            >
              {modoEditar ? "Actualizar" : "Agregar"}
            </button>
            {modoEditar && (
              <button
                type="button"
                className="btn btn-danger fw-bold ml-4"
                style={{ minWidth: 120, minHeight: 46, fontWeight: "bold" }}
                onClick={() => {
                  setModoEditar(false);
                  setNombrePais("");
                  setUrlPais("");
                  setPaisSeleccionado(null);
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <hr />
        <h1 className="text-center mt-5">Países disponibles</h1>

        <div id="ListadePaises">
          {loading ? (
            <p className="text-center text-muted">Cargando países...</p>
          ) : paises.length === 0 ? (
            <p className="text-center text-muted">No hay países registrados</p>
          ) : (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={24}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
            >
              {paises.map((pais) => {
                const imagenPais = pais.url_Foto && pais.url_Foto.trim() !== "" ? pais.url_Foto : sample;
                return (
                  <SwiperSlide key={pais.id_Pais}>
                    <div
                      className="userCard w-100 d-flex flex-column align-items-center p-4"
                      style={{ minHeight: "520px", background: "#222", borderRadius: "12px" }}
                    >
                      <h5 className="card-title text-light fw-bold text-center mb-3" style={{ fontSize: "1.3rem" }}>
                        {pais.nombre}
                      </h5>

                      <div className="text-center mb-4">
                        <img
                          src={imagenPais}
                          alt={pais.nombre}
                          className="img-fluid rounded"
                          style={{ minHeight: "220px", maxHeight: "220px", objectFit: "cover" }}
                        />
                      </div>

                      <div className="w-100 d-flex flex-column align-items-center">
                        <button
                          className="crudBtn"
                          style={{ minWidth: 140, fontWeight: "bold", fontSize: "1rem" }}
                          onClick={() => editarPais(pais)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-danger fw-bold mt-4 w-100"
                          style={{ minWidth: 140, minHeight: 46, fontSize: "1rem" }}
                          onClick={() => eliminarPais(pais.id_Pais)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>

        <div className="col-12 text-center">
          <a
            href="Administrador"
            className="crudBtn text-center fw-bold w-100"
          >
            REGRESAR
          </a>
        </div>

      </div>
    </div>
  );
};

export default CRUDPaises;
