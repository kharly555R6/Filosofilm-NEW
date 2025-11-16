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
    public class VistosController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public VistosController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodos() => Ok(_context.Vistos.ToList());

        [HttpGet("mis-vistos")]
        [Authorize]
        public IActionResult GetMisVistos()
        {
            var userIdClaim = User.FindFirst("id")?.Value 
                           ?? User.FindFirst("id_Usuario")?.Value 
                           ?? User.FindFirst("ID_Usuario")?.Value 
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            var vistos = _context.Vistos
                .Where(v => v.ID_Usuario == usuarioId)
                .ToList();

            return Ok(vistos);
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

            var visto = _context.Vistos
                .FirstOrDefault(v => v.ID_Usuario == usuarioId && v.ID_Pelicula == peliculaId);

            if (visto == null) 
                return Ok(new { fueVista = false });
                
            return Ok(new { fueVista = true, visto });
        }

        [HttpPost]
        [Authorize]
        public IActionResult Crear([FromBody] Visto visto)
        {
            var userIdClaim = User.FindFirst("id")?.Value 
                           ?? User.FindFirst("id_Usuario")?.Value 
                           ?? User.FindFirst("ID_Usuario")?.Value 
                           ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int usuarioId))
                return Unauthorized(new { mensaje = "Usuario no autenticado" });

            visto.ID_Usuario = usuarioId;
            visto.Fecha_Vista = DateTime.Now;

            var yaExiste = _context.Vistos
                .Any(v => v.ID_Usuario == usuarioId && v.ID_Pelicula == visto.ID_Pelicula);

            if (yaExiste)
                return BadRequest(new { mensaje = "Ya tienes esta película marcada como vista" });

            _context.Vistos.Add(visto);
            _context.SaveChanges();
            
            return Ok(new { mensaje = "Película marcada como vista", visto });
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

            var visto = _context.Vistos
                .FirstOrDefault(v => v.ID_Usuario == usuarioId && v.ID_Pelicula == peliculaId);

            if (visto == null) 
                return NotFound(new { mensaje = "Registro de 'vista' no encontrado" });

            _context.Vistos.Remove(visto);
            _context.SaveChanges();
            
            return Ok(new { mensaje = "Película eliminada de vistas" });
        }
    }
}