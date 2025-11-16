using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
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

        [HttpGet("mis-favoritos")]
        [Authorize]
        public IActionResult GetMisFavoritos()
        {
            var userIdClaim = User.FindFirst("id")?.Value 
                           ?? User.FindFirst("id_Usuario")?.Value 
                           ?? User.FindFirst("ID_Usuario")?.Value 
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            var favoritos = _context.Favoritos
                .Where(f => f.ID_Usuario == usuarioId)
                .ToList();

            return Ok(favoritos);
        }

        [HttpGet("pelicula/{peliculaId}")]
        [Authorize]
        public IActionResult GetPorPelicula(int peliculaId)
        {
            var userIdClaim = User.FindFirst("id")?.Value 
                           ?? User.FindFirst("id_Usuario")?.Value 
                           ?? User.FindFirst("ID_Usuario")?.Value 
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            var favorito = _context.Favoritos
                .FirstOrDefault(f => f.ID_Usuario == usuarioId && f.ID_Pelicula == peliculaId);

            if (favorito == null) 
                return Ok(new { esFavorito = false });
                
            return Ok(new { esFavorito = true, favorito });
        }

        [HttpPost]
        [Authorize]
        public IActionResult Crear([FromBody] Favorito favorito)
        {
            var userIdClaim = User.FindFirst("id")?.Value 
                           ?? User.FindFirst("id_Usuario")?.Value 
                           ?? User.FindFirst("ID_Usuario")?.Value 
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            favorito.ID_Usuario = usuarioId;
            favorito.Fecha_Favorito = DateTime.Now;

            var yaExiste = _context.Favoritos
                .Any(f => f.ID_Usuario == usuarioId && f.ID_Pelicula == favorito.ID_Pelicula);

            if (yaExiste)
                return BadRequest(new { mensaje = "Ya tienes esta película en favoritos" });

            _context.Favoritos.Add(favorito);
            _context.SaveChanges();
            
            return Ok(new { mensaje = "Película agregada a favoritos", favorito });
        }

        [HttpDelete("pelicula/{peliculaId}")]
        [Authorize]
        public IActionResult Borrar(int peliculaId)
        {
            var userIdClaim = User.FindFirst("id")?.Value 
                           ?? User.FindFirst("id_Usuario")?.Value 
                           ?? User.FindFirst("ID_Usuario")?.Value 
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            var favorito = _context.Favoritos
                .FirstOrDefault(f => f.ID_Usuario == usuarioId && f.ID_Pelicula == peliculaId);

            if (favorito == null) 
                return NotFound(new { mensaje = "Favorito no encontrado" });

            _context.Favoritos.Remove(favorito);
            _context.SaveChanges();
            
            return Ok(new { mensaje = "Película eliminada de favoritos" });
        }
    }
}