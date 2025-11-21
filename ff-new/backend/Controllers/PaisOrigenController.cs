using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaisOrigenController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PaisOrigenController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodos() => Ok(_context.PaisOrigen.ToList());

        [HttpPost]
        public IActionResult Crear([FromBody] PaisOrigen pais)
        {
            _context.PaisOrigen.Add(pais);
            _context.SaveChanges();
            return Ok(pais);
        }

        [HttpPut("{id}")]
        public IActionResult Actualizar(int id, [FromBody] PaisOrigen pais)
        {
            var existente = _context.PaisOrigen.FirstOrDefault(p => p.ID_Pais == id);
            if (existente == null) return NotFound();

            existente.Nombre = pais.Nombre;
            existente.Url_Foto = pais.Url_Foto;
            _context.SaveChanges();
            return Ok(existente);
        }

        [HttpDelete("{id}")]
        public IActionResult Borrar(int id)
        {
            var pais = _context.PaisOrigen.FirstOrDefault(p => p.ID_Pais == id);
            if (pais == null) return NotFound();

            _context.PaisOrigen.Remove(pais);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
