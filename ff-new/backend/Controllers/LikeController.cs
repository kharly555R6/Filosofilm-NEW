using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LikeController(AppDbContext context)
        {
            _context = context;
        }

        // 🔹 Obtener todos los likes
        [HttpGet]
        public IActionResult GetLikes()
        {
            var likes = _context.Likes.ToList();
            return Ok(likes);
        }

        // 🔹 Obtener un like específico por usuario y reseña
        [HttpGet("{idUsuario}/{idResena}")]
        public IActionResult GetLike(int idUsuario, int idResena)
        {
            var like = _context.Likes
                .FirstOrDefault(l => l.ID_Usuario == idUsuario && l.ID_Reseña == idResena);

            if (like == null) return NotFound();
            return Ok(like);
        }

        // 🔹 Crear un nuevo like
        [HttpPost]
        public IActionResult CrearLike([FromBody] Like nuevoLike)
        {
            _context.Likes.Add(nuevoLike);
            _context.SaveChanges();
            return Ok(nuevoLike);
        }

        // 🔹 Eliminar un like
        [HttpDelete("{idUsuario}/{idResena}")]
        public IActionResult EliminarLike(int idUsuario, int idResena)
        {
            var like = _context.Likes
                .FirstOrDefault(l => l.ID_Usuario == idUsuario && l.ID_Reseña == idResena);

            if (like == null) return NotFound();

            _context.Likes.Remove(like);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
