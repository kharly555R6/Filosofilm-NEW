using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectoresController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DirectoresController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetDirectores() => Ok(_context.Director.ToList());

        [HttpGet("{id}")]
        public IActionResult GetDirector(int id)
        {
            var director = _context.Director.Find(id);
            if (director == null) return NotFound();
            return Ok(director);
        }

        [HttpPost]
        public IActionResult CrearDirector([FromBody] Director director)
        {
            _context.Director.Add(director);
            _context.SaveChanges();
            return Ok(director);
        }

        [HttpPut("{id}")]
        public IActionResult ActualizarDirector(int id, [FromBody] Director director)
        {
            var existing = _context.Director.Find(id);
            if (existing == null) return NotFound();

            existing.Nombre = director.Nombre;
            existing.Fecha_Nacimiento = director.Fecha_Nacimiento;
            existing.Pais_Nacimiento = director.Pais_Nacimiento;
            existing.Biografia = director.Biografia;
            existing.Foto_Director = director.Foto_Director;

            _context.SaveChanges();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public IActionResult BorrarDirector(int id)
        {
            var director = _context.Director.Find(id);
            if (director == null) return NotFound();

            _context.Director.Remove(director);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
