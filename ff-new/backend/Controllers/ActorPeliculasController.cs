using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActorPeliculasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ActorPeliculasController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodos() => Ok(_context.ActorPeliculas.ToList());

        [HttpGet("{actorId}/{peliculaId}")]
        public IActionResult GetUno(int actorId, int peliculaId)
        {
            var ap = _context.ActorPeliculas.Find(actorId, peliculaId);
            if (ap == null) return NotFound();
            return Ok(ap);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] ActorPelicula ap)
        {
            _context.ActorPeliculas.Add(ap);
            _context.SaveChanges();
            return Ok(ap);
        }

        [HttpPut("{actorId}/{peliculaId}")]
        public IActionResult Actualizar(int actorId, int peliculaId, [FromBody] ActorPelicula ap)
        {
            var existing = _context.ActorPeliculas.Find(actorId, peliculaId);
            if (existing == null) return NotFound();

            existing.Personaje = ap.Personaje;
            _context.SaveChanges();
            return Ok(existing);
        }

        [HttpDelete("{actorId}/{peliculaId}")]
        public IActionResult Borrar(int actorId, int peliculaId)
        {
            var existing = _context.ActorPeliculas.Find(actorId, peliculaId);
            if (existing == null) return NotFound();

            _context.ActorPeliculas.Remove(existing);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
