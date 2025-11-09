using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClasificacionPeliculasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ClasificacionPeliculasController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodos() => Ok(_context.ClasificacionPeliculas.ToList());

        [HttpGet("{clasificacionId}/{peliculaId}")]
        public IActionResult GetUno(int clasificacionId, int peliculaId)
        {
            var item = _context.ClasificacionPeliculas
                .FirstOrDefault(cp => cp.ID_Clasificacion == clasificacionId && cp.ID_Pelicula == peliculaId);

            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] ClasificacionPelicula cp)
        {
            _context.ClasificacionPeliculas.Add(cp);
            _context.SaveChanges();
            return Ok(cp);
        }

        [HttpDelete("{clasificacionId}/{peliculaId}")]
        public IActionResult Borrar(int clasificacionId, int peliculaId)
        {
            var item = _context.ClasificacionPeliculas
                .FirstOrDefault(cp => cp.ID_Clasificacion == clasificacionId && cp.ID_Pelicula == peliculaId);

            if (item == null) return NotFound();

            _context.ClasificacionPeliculas.Remove(item);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
