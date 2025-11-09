using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public RolesController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetTodos() => Ok(_context.Roles.ToList());

        [HttpGet("{id}")]
        public IActionResult GetPorId(int id)
        {
            var rol = _context.Roles.FirstOrDefault(r => r.ID_Rol == id);
            if (rol == null) return NotFound();
            return Ok(rol);
        }

        [HttpPost]
        public IActionResult Crear([FromBody] Rol rol)
        {
            _context.Roles.Add(rol);
            _context.SaveChanges();
            return Ok(rol);
        }

        [HttpPut("{id}")]
        public IActionResult Actualizar(int id, [FromBody] Rol rol)
        {
            var existente = _context.Roles.FirstOrDefault(r => r.ID_Rol == id);
            if (existente == null) return NotFound();

            existente.Nombre = rol.Nombre;
            _context.SaveChanges();
            return Ok(existente);
        }

        [HttpDelete("{id}")]
        public IActionResult Borrar(int id)
        {
            var rol = _context.Roles.FirstOrDefault(r => r.ID_Rol == id);
            if (rol == null) return NotFound();

            _context.Roles.Remove(rol);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
