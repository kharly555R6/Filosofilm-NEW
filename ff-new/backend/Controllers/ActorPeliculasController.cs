using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.DTOs; // 👈 Asegúrate de tener este using si el DTO está en esa carpeta
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActorPeliculasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActorPeliculasController(AppDbContext context)
        {
            _context = context;
        }

        // 🔹 Obtener todos los registros
        [HttpGet]
        public IActionResult GetTodos()
        {
            return Ok(_context.ActorPeliculas.ToList());
        }

        // 🔹 Obtener un registro específico por actor y película
        [HttpGet("{actorId}/{peliculaId}")]
        public IActionResult GetUno(int actorId, int peliculaId)
        {
            var ap = _context.ActorPeliculas
                .Include(a => a.Actor)
                .FirstOrDefault(a => a.ID_Actor == actorId && a.ID_Pelicula == peliculaId);

            if (ap == null)
                return NotFound();

            return Ok(ap);
        }

        // ✅ 🔹 Obtener todos los actores de una película
        [HttpGet("pelicula/{idPelicula}")]
        public IActionResult GetPorPelicula(int idPelicula)
        {
            var actores = _context.ActorPeliculas
                .Include(ap => ap.Actor)
                .Where(ap => ap.ID_Pelicula == idPelicula)
                .Select(ap => new
                {
                    id_Actor = ap.ID_Actor,
                    personaje = ap.Personaje,
                    actor = new
                    {
                        nombre = ap.Actor!.Nombre,
                        foto = ap.Actor.Foto_Actor
                    }
                })
                .ToList();

            if (actores.Count == 0)
                return NotFound(new { mensaje = "No hay actores registrados para esta película." });

            return Ok(actores);
        }

        // 🔹 Crear un nuevo registro Actor-Pelicula
        [HttpPost]
        public IActionResult Crear([FromBody] ActorPelicula ap)
        {
            _context.ActorPeliculas.Add(ap);
            _context.SaveChanges();

            return Ok(ap);
        }

        // 🔹 Actualizar el personaje de un actor en una película
        [HttpPut("{actorId}/{peliculaId}")]
        public IActionResult Actualizar(int actorId, int peliculaId, [FromBody] ActorPelicula ap)
        {
            var existing = _context.ActorPeliculas.Find(actorId, peliculaId);
            if (existing == null)
                return NotFound();

            existing.Personaje = ap.Personaje;
            _context.SaveChanges();

            return Ok(existing);
        }

        // 🔹 Eliminar un registro Actor-Pelicula
        [HttpDelete("{actorId}/{peliculaId}")]
        public IActionResult Borrar(int actorId, int peliculaId)
        {
            var existing = _context.ActorPeliculas.Find(actorId, peliculaId);
            if (existing == null)
                return NotFound();

            _context.ActorPeliculas.Remove(existing);
            _context.SaveChanges();

            return NoContent();
        }

        // ✅ 🔹 Crear relación entre un actor y una película (solo id y personaje)
        [HttpPost("asignar")]
        public IActionResult AsignarActorAPelicula([FromBody] ActorPeliculaDTO data)
        {
            if (data == null)
                return BadRequest(new { mensaje = "Datos inválidos." });

            int idPelicula = data.ID_Pelicula;
            int idActor = data.ID_Actor;
            string personaje = data.Personaje;

            // Verificar si ya existe la relación
            var existe = _context.ActorPeliculas
                .FirstOrDefault(ap => ap.ID_Actor == idActor && ap.ID_Pelicula == idPelicula);

            if (existe != null)
                return Conflict(new { mensaje = "El actor ya está asignado a esta película." });

            var nuevo = new ActorPelicula
            {
                ID_Pelicula = idPelicula,
                ID_Actor = idActor,
                Personaje = personaje
            };

            _context.ActorPeliculas.Add(nuevo);
            _context.SaveChanges();

            return Ok(new
            {
                mensaje = "Actor asignado correctamente a la película.",
                nuevo
            });
        }
    }
}
