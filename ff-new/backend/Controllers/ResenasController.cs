using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResenasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ResenasController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodos() => Ok(_context.Resenas.ToList());

        [HttpGet("{id}")]
        public IActionResult GetPorId(int id)
        {
            var resena = _context.Resenas.FirstOrDefault(r => r.ID_Reseña == id);
            if (resena == null) return NotFound();
            return Ok(resena);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] Resena resena)
        {
            _context.Resenas.Add(resena);
            _context.SaveChanges();
            return Ok(resena);
        }

        [HttpPut("{id}")]
        public IActionResult Actualizar(int id, [FromBody] Resena resena)
        {
            var existente = _context.Resenas.FirstOrDefault(r => r.ID_Reseña == id);
            if (existente == null) return NotFound();

            existente.Contenido = resena.Contenido;
            existente.Fecha_Publicacion = resena.Fecha_Publicacion;
            existente.Calificacion = resena.Calificacion;
            existente.ID_Usuario = resena.ID_Usuario;
            existente.ID_Pelicula = resena.ID_Pelicula;

            _context.SaveChanges();
            return Ok(existente);
        }

        [HttpDelete("{id}")]
        public IActionResult Borrar(int id)
        {
            var resena = _context.Resenas.FirstOrDefault(r => r.ID_Reseña == id);
            if (resena == null) return NotFound();

            _context.Resenas.Remove(resena);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
