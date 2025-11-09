using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectorPeliculaController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DirectorPeliculaController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodos() => Ok(_context.DirectorPelicula.ToList());

        [HttpGet("{idDirector}/{idPelicula}")]
        public IActionResult GetPorIds(int idDirector, int idPelicula)
        {
            var relacion = _context.DirectorPelicula
                .FirstOrDefault(dp => dp.ID_Director == idDirector && dp.ID_Pelicula == idPelicula);
            if (relacion == null) return NotFound();
            return Ok(relacion);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] DirectorPelicula dp)
        {
            _context.DirectorPelicula.Add(dp);
            _context.SaveChanges();
            return Ok(dp);
        }

        [HttpDelete("{idDirector}/{idPelicula}")]
        public IActionResult Borrar(int idDirector, int idPelicula)
        {
            var relacion = _context.DirectorPelicula
                .FirstOrDefault(dp => dp.ID_Director == idDirector && dp.ID_Pelicula == idPelicula);
            if (relacion == null) return NotFound();

            _context.DirectorPelicula.Remove(relacion);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
