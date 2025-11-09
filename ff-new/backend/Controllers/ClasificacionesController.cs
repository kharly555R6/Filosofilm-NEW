using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClasificacionesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ClasificacionesController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodos() => Ok(_context.Clasificaciones.ToList());

        [HttpGet("{id}")]
        public IActionResult GetUno(int id)
        {
            var clasif = _context.Clasificaciones.Find(id);
            if (clasif == null) return NotFound();
            return Ok(clasif);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] Clasificacion clasificacion)
        {
            _context.Clasificaciones.Add(clasificacion);
            _context.SaveChanges();
            return Ok(clasificacion);
        }

        [HttpPut("{id}")]
        public IActionResult Actualizar(int id, [FromBody] Clasificacion clasificacion)
        {
            var existing = _context.Clasificaciones.Find(id);
            if (existing == null) return NotFound();

            existing.ClasificacionNombre = clasificacion.ClasificacionNombre;
            existing.Descripcion = clasificacion.Descripcion;
            existing.Imagen_Clasif = clasificacion.Imagen_Clasif;

            _context.SaveChanges();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public IActionResult Borrar(int id)
        {
            var existing = _context.Clasificaciones.Find(id);
            if (existing == null) return NotFound();

            _context.Clasificaciones.Remove(existing);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
