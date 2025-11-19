using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LikesController(AppDbContext context) => _context = context;

        [HttpGet("mis-likes")]
        [Authorize]
        public IActionResult GetMisLikes()
        {
            var userIdClaim = User.FindFirst("id")?.Value
                           ?? User.FindFirst("id_Usuario")?.Value
                           ?? User.FindFirst("ID_Usuario")?.Value
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            var likes = _context.Likes
                .Where(l => l.ID_Usuario == usuarioId)
                .ToList();

            var resultado = likes
                .Select(l => {
                    var resena = _context.Resenas
                        .Where(r => r.ID_Reseña == l.ID_Reseña)
                        .Select(r => new
                        {
                            id_Reseña = r.ID_Reseña,
                            contenido = r.Contenido,
                            calificacion = r.Calificacion,
                            usuario = new {
                                id_Usuario = r.Usuario.ID_Usuario,
                                nickname = r.Usuario.Nickname
                            },
                            pelicula = new {
                                iD_Pelicula = r.Pelicula.ID_Pelicula,
                                titulo = r.Pelicula.Titulo
                            }
                        })
                        .FirstOrDefault();

                    return new { reseña = resena };
                })
                .Where(x => x.reseña != null)
                .ToList();

            return Ok(resultado);
        }

        [HttpGet("resena/{resenaId}")]
        [Authorize]
        public IActionResult ObtenerPorResena(int resenaId)
        {
            var userIdClaim = User.FindFirst("id")?.Value
                           ?? User.FindFirst("id_Usuario")?.Value
                           ?? User.FindFirst("ID_Usuario")?.Value
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            var like = _context.Likes
                .FirstOrDefault(l => l.ID_Usuario == usuarioId && l.ID_Reseña == resenaId);

            if (like == null)
                return Ok(new { dioLike = false });

            return Ok(new { dioLike = true});
        }

        [HttpPost]
        [Authorize]
        public IActionResult Crear([FromBody] Like like)
        {
            var userIdClaim = User.FindFirst("id")?.Value
                           ?? User.FindFirst("id_Usuario")?.Value
                           ?? User.FindFirst("ID_Usuario")?.Value
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            like.ID_Usuario = usuarioId;
            like.Fecha_Like = DateTime.Now;

            var yaExiste = _context.Likes
                .Any(l => l.ID_Usuario == usuarioId && l.ID_Reseña == like.ID_Reseña);

            if (yaExiste)
                return BadRequest(new { mensaje = "Ya diste like a esta reseña" });

            _context.Likes.Add(like);
            _context.SaveChanges();

            return Ok(new { mensaje = "Like agregado a la reseña", like });
        }

        [HttpDelete("resena/{resenaId}")]
        [Authorize]
        public IActionResult Borrar(int resenaId)
        {
            var userIdClaim = User.FindFirst("id")?.Value
                           ?? User.FindFirst("id_Usuario")?.Value
                           ?? User.FindFirst("ID_Usuario")?.Value
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            var like = _context.Likes
                .FirstOrDefault(l => l.ID_Usuario == usuarioId && l.ID_Reseña == resenaId);

            if (like == null)
                return NotFound(new { mensaje = "Like no encontrado" });

            _context.Likes.Remove(like);
            _context.SaveChanges();

            return Ok(new { mensaje = "Like eliminado de la reseña" });
        }
    }
}
