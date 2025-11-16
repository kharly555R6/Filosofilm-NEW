using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeliculasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PeliculasController(AppDbContext context) => _context = context;

        // GET: api/peliculas
        [HttpGet]
        public IActionResult GetTodas() => Ok(_context.Peliculas.ToList());

        // GET: api/peliculas/{id} con géneros
        [HttpGet("{id}")]
        public IActionResult GetPorId(int id)
        {
            var pelicula = _context.Peliculas
                .Include(p => p.PeliculaGeneros)
                    .ThenInclude(pg => pg.Genero)
                .FirstOrDefault(p => p.ID_Pelicula == id);

            if (pelicula == null) return NotFound();

            var result = new
            {
                pelicula.ID_Pelicula,
                pelicula.Titulo,
                pelicula.Sinopsis,
                pelicula.Fecha_Lanzamiento,
                pelicula.Duracion,
                pelicula.Presupuesto,
                pelicula.Imagen,
                pelicula.Recaudacion,
                pelicula.ID_Pais_Origen,
                pelicula.Clasificacion,
                Genero = pelicula.PeliculaGeneros
                            .Where(pg => pg.Genero != null)
                            .Select(pg => new { pg.Genero!.ID_Genero, pg.Genero!.Nombre, pg.Genero!.Descripcion })
                            .ToList()
            };

            return Ok(result);
        }

    // GET: api/peliculas/genero/{idGenero}
        [HttpGet("genero/{idGenero}")]
        public IActionResult GetPorGenero(int idGenero)
        {
            var peliculas = _context.Peliculas
                .Where(p => p.PeliculaGeneros.Any(pg => pg.ID_Genero == idGenero))
                .Select(p => new 
                { 
                    p.ID_Pelicula, 
                    p.Titulo, 
                    p.Imagen 
                })
                .ToList();

            return Ok(peliculas);
        }

        // POST: api/peliculas
        [HttpPost]
        public IActionResult Crear([FromBody] Pelicula pelicula)
        {
            _context.Peliculas.Add(pelicula);
            _context.SaveChanges();
            return Ok(pelicula);
        }

        // PUT: api/peliculas/{id}
        [HttpPut("{id}")]
        public IActionResult Actualizar(int id, [FromBody] Pelicula pelicula)
        {
            var existente = _context.Peliculas.FirstOrDefault(p => p.ID_Pelicula == id);
            if (existente == null) return NotFound();

            existente.Titulo = pelicula.Titulo;
            existente.Sinopsis = pelicula.Sinopsis;
            existente.Fecha_Lanzamiento = pelicula.Fecha_Lanzamiento;
            existente.Duracion = pelicula.Duracion;
            existente.Presupuesto = pelicula.Presupuesto;
            existente.Imagen = pelicula.Imagen;
            existente.Recaudacion = pelicula.Recaudacion;
            existente.ID_Pais_Origen = pelicula.ID_Pais_Origen;
            existente.Clasificacion = pelicula.Clasificacion;

            _context.SaveChanges();
            return Ok(existente);
        }

        // DELETE: api/peliculas/{id}
        [HttpDelete("{id}")]
        public IActionResult Borrar(int id)
        {
            var pelicula = _context.Peliculas.FirstOrDefault(p => p.ID_Pelicula == id);
            if (pelicula == null) return NotFound();

            _context.Peliculas.Remove(pelicula);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
