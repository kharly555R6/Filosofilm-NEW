using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResenasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResenasController(AppDbContext context) => _context = context;

        // 🔹 Obtener todas las reseñas con información básica del usuario
        [HttpGet]
        public IActionResult GetTodos()
        {
            var resenas = _context.Resenas
                .Include(r => r.Usuario)
                .Select(r => new
                {
                    r.ID_Reseña,
                    r.Contenido,
                    r.Calificacion,
                    Usuario = new
                    {
                        r.Usuario.ID_Usuario,
                        r.Usuario.Nickname
                    },
                    r.ID_Pelicula,
                    r.ID_Usuario
                })
                .ToList();

            return Ok(resenas);
        }

        // 🔹 Obtener reseña por ID
        [HttpGet("{id}")]
        public IActionResult GetPorId(int id)
        {
            var resena = _context.Resenas
                .Include(r => r.Usuario)
                .Where(r => r.ID_Reseña == id)
                .Select(r => new
                {
                    r.ID_Reseña,
                    r.Contenido,
                    r.Calificacion,
                    Usuario = new
                    {
                        r.Usuario.ID_Usuario,
                        r.Usuario.Nickname
                    },
                    r.ID_Pelicula,
                    r.ID_Usuario
                })
                .FirstOrDefault();

            if (resena == null)
                return NotFound();

            return Ok(resena);
        }

        // 🔹 Crear una nueva reseña (solo contenido y calificación)
        [HttpPost("{idPelicula}")]
        public IActionResult CrearResena(int idPelicula, [FromBody] CrearResenaDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Contenido))
                return BadRequest(new { mensaje = "Contenido de reseña inválido." });

            // TODO: Obtener ID del usuario logueado (JWT, sesión, etc.)
            int idUsuario = ObtenerIdUsuarioLogueado();

            var nuevaResena = new Resena
            {
                Contenido = dto.Contenido,
                Calificacion = dto.Calificacion,
                ID_Usuario = idUsuario,
                ID_Pelicula = idPelicula,
                Fecha_Publicacion = DateTime.UtcNow
            };

            _context.Resenas.Add(nuevaResena);
            _context.SaveChanges();

            return Ok(nuevaResena);
        }

        // 🔹 Eliminar una reseña
        [HttpDelete("{id}")]
        public IActionResult Borrar(int id)
        {
            var resena = _context.Resenas.FirstOrDefault(r => r.ID_Reseña == id);
            if (resena == null) return NotFound();

            _context.Resenas.Remove(resena);
            _context.SaveChanges();
            return NoContent();
        }

        // 🔹 Obtener reseñas por ID de usuario
        [HttpGet("usuario/{idUsuario}")]
        public IActionResult GetPorUsuario(int idUsuario)
        {
            var resenas = _context.Resenas
                .Include(r => r.Usuario)
                .Include(r => r.Pelicula) // 🔹 Incluye la entidad Pelicula
                .Where(r => r.ID_Usuario == idUsuario)
                .Select(r => new
                {
                    r.ID_Reseña,
                    r.Contenido,
                    r.Calificacion,
                    Usuario = new
                    {
                        r.Usuario.ID_Usuario,
                        r.Usuario.Nickname
                    },
                    Pelicula = new
                    {
                        r.Pelicula.ID_Pelicula,
                        r.Pelicula.Titulo
                    },
                    r.ID_Pelicula,
                    r.ID_Usuario
                })
                .ToList();

            if (!resenas.Any())
                return NotFound(new { mensaje = "Este usuario no tiene reseñas." });

            return Ok(resenas);
        }

        // 🔹 Obtener reseñas por ID de película
        [HttpGet("pelicula/{idPelicula}")]
        public IActionResult GetPorPelicula(int idPelicula)
        {
            var resenas = _context.Resenas
                .Include(r => r.Usuario)
                .Where(r => r.ID_Pelicula == idPelicula)
                .Select(r => new
                {
                    r.ID_Reseña,
                    r.Contenido,
                    r.Calificacion,
                    Usuario = new
                    {
                        r.Usuario.ID_Usuario,
                        r.Usuario.Nickname
                    },
                    r.ID_Pelicula,
                    r.ID_Usuario
                })
                .ToList();

            if (!resenas.Any())
                return NotFound(new { mensaje = "Esta película no tiene reseñas." });

            return Ok(resenas);
        }

        // 🔹 Obtener reseña específica por usuario y película
        [HttpGet("usuario/{idUsuario}/pelicula/{idPelicula}")]
        public IActionResult GetPorUsuarioYPelicula(int idUsuario, int idPelicula)
        {
            var resena = _context.Resenas
                .Include(r => r.Usuario)
                .Where(r => r.ID_Usuario == idUsuario && r.ID_Pelicula == idPelicula)
                .Select(r => new
                {
                    r.ID_Reseña,
                    r.Contenido,
                    r.Calificacion,
                    Usuario = new
                    {
                        r.Usuario.ID_Usuario,
                        r.Usuario.Nickname
                    },
                    r.ID_Pelicula,
                    r.ID_Usuario
                })
                .FirstOrDefault();

            if (resena == null)
                return NotFound(new { mensaje = "El usuario no ha hecho reseña de esta película." });

            return Ok(resena);
        }

        // 🔹 Placeholder: reemplazar según tu lógica de autenticación
        private int ObtenerIdUsuarioLogueado()
        {
            // Ejemplo temporal:
            return 1;
        }
    }

    // DTO para creación de reseña
    public class CrearResenaDTO
    {
        public string Contenido { get; set; } = string.Empty;
        public int Calificacion { get; set; }
    }
}
