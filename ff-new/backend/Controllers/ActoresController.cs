using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActoresController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ActoresController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetActores()
        {
            var actores = _context.Actores
                .Select(a => new 
                {
                    id_Actor = a.ID_Actor,
                    actor = new 
                    {
                        nombre = a.Nombre,
                        foto = a.Foto_Actor
                    }
                })
                .ToList();

            return Ok(actores);
        }

        [HttpGet("{id}")]
        public IActionResult GetActor(int id)
        {
            var actor = _context.Actores.Find(id);
            if (actor == null) return NotFound();
            return Ok(actor);
        }

        [HttpPost]
        public IActionResult CrearActor([FromBody] Actor actor)
        {
            _context.Actores.Add(actor);
            _context.SaveChanges();
            return Ok(actor);
        }

        [HttpPut("{id}")]
        public IActionResult ActualizarActor(int id, [FromBody] Actor actor)
        {
            var existing = _context.Actores.Find(id);
            if (existing == null) return NotFound();

            existing.Nombre = actor.Nombre;
            existing.Fecha_Nacimiento = actor.Fecha_Nacimiento;
            existing.Pais_Nacimiento = actor.Pais_Nacimiento;
            existing.Biografia = actor.Biografia;
            existing.Foto_Actor = actor.Foto_Actor;

            _context.SaveChanges();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public IActionResult BorrarActor(int id)
        {
            var actor = _context.Actores.Find(id);
            if (actor == null) return NotFound();

            _context.Actores.Remove(actor);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
