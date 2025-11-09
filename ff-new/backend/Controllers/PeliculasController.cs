using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeliculasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PeliculasController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodas() => Ok(_context.Peliculas.ToList());

        [HttpGet("{id}")]
        public IActionResult GetPorId(int id)
        {
            var pelicula = _context.Peliculas.FirstOrDefault(p => p.ID_Pelicula == id);
            if (pelicula == null) return NotFound();
            return Ok(pelicula);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] Pelicula pelicula)
        {
            _context.Peliculas.Add(pelicula);
            _context.SaveChanges();
            return Ok(pelicula);
        }

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

            _context.SaveChanges();
            return Ok(existente);
        }

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
