using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{idUsuario}/{idPelicula}")]
        public IActionResult GetPorIds(int idUsuario, int idPelicula)
        {
            var visto = _context.Vistos.FirstOrDefault(v => v.ID_Usuario == idUsuario && v.ID_Pelicula == idPelicula);
            if (visto == null) return NotFound();
            return Ok(visto);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] Visto visto)
        {
            _context.Vistos.Add(visto);
            _context.SaveChanges();
            return Ok(visto);
        }

        [HttpPut("{idUsuario}/{idPelicula}")]
        public IActionResult Actualizar(int idUsuario, int idPelicula, [FromBody] Visto visto)
        {
            var existente = _context.Vistos.FirstOrDefault(v => v.ID_Usuario == idUsuario && v.ID_Pelicula == idPelicula);
            if (existente == null) return NotFound();

            existente.Fecha_Vista = visto.Fecha_Vista;
            _context.SaveChanges();
            return Ok(existente);
        }

        [HttpDelete("{idUsuario}/{idPelicula}")]
        public IActionResult Borrar(int idUsuario, int idPelicula)
        {
            var visto = _context.Vistos.FirstOrDefault(v => v.ID_Usuario == idUsuario && v.ID_Pelicula == idPelicula);
            if (visto == null) return NotFound();

            _context.Vistos.Remove(visto);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
