using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritosController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FavoritosController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodos() => Ok(_context.Favoritos.ToList());

        [HttpGet("{usuarioId}/{peliculaId}")]
        public IActionResult GetUno(int usuarioId, int peliculaId)
        {
            var favorito = _context.Favoritos
                .FirstOrDefault(f => f.ID_Usuario == usuarioId && f.ID_Pelicula == peliculaId);

            if (favorito == null) return NotFound();
            return Ok(favorito);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] Favorito favorito)
        {
            favorito.Fecha_Favorito = DateTime.Now;
            _context.Favoritos.Add(favorito);
            _context.SaveChanges();
            return Ok(favorito);
        }

        [HttpDelete("{usuarioId}/{peliculaId}")]
        public IActionResult Borrar(int usuarioId, int peliculaId)
        {
            var favorito = _context.Favoritos
                .FirstOrDefault(f => f.ID_Usuario == usuarioId && f.ID_Pelicula == peliculaId);

            if (favorito == null) return NotFound();

            _context.Favoritos.Remove(favorito);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
