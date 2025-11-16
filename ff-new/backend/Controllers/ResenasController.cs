using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

        // 🔹 Crear una nueva reseña (con autenticación)
        [HttpPost]
        [Authorize]
        public IActionResult CrearResena([FromBody] CrearResenaDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Contenido))
                return BadRequest(new { mensaje = "Contenido de reseña inválido." });

            // 🔹 Obtener el ID del usuario desde el token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int idUsuario))
                return Unauthorized(new { mensaje = "Usuario no válido o no autenticado." });

            // Validar que la película exista
            var pelicula = _context.Peliculas.Find(dto.ID_Pelicula);
            if (pelicula == null)
                return BadRequest(new { mensaje = "La película especificada no existe." });

            // Verificar si el usuario ya ha reseñado esta película
            bool yaExiste = _context.Resenas
                .Any(r => r.ID_Usuario == idUsuario && r.ID_Pelicula == dto.ID_Pelicula);

            if (yaExiste)
                return BadRequest(new { mensaje = "Ya has publicado una reseña para esta película." });

            // Crear la reseña
            var nuevaResena = new Resena
            {
                Contenido = dto.Contenido,
                Calificacion = dto.Calificacion,
                ID_Usuario = idUsuario,
                ID_Pelicula = dto.ID_Pelicula,
                Fecha_Publicacion = DateTime.UtcNow
            };

            _context.Resenas.Add(nuevaResena);
            _context.SaveChanges();

            // Devolver la reseña creada con datos del usuario
            var resenaCreada = _context.Resenas
                .Include(r => r.Usuario)
                .Where(r => r.ID_Reseña == nuevaResena.ID_Reseña)
                .Select(r => new
                {
                    id_Reseña = r.ID_Reseña,
                    contenido = r.Contenido,
                    calificacion = r.Calificacion,
                    usuario = new
                    {
                        id_Usuario = r.Usuario.ID_Usuario,
                        nickname = r.Usuario.Nickname
                    },
                    id_Pelicula = r.ID_Pelicula,
                    id_Usuario = r.ID_Usuario
                })
                .FirstOrDefault();

            return Ok(resenaCreada);
        }

        // 🔹 Obtener reseñas por ID de usuario
        [HttpGet("usuario/{idUsuario}")]
        public IActionResult GetPorUsuario(int idUsuario)
        {
            var resenas = _context.Resenas
                .Include(r => r.Usuario)
                .Include(r => r.Pelicula)
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
    }
}