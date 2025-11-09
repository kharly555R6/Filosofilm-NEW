using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeneroController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GeneroController(AppDbContext context)
        {
            _context = context;
        }

        // 🔹 Obtener todos los géneros
        [HttpGet]
        public IActionResult GetGeneros()
        {
            var generos = _context.Generos.ToList();
            return Ok(generos);
        }

        // 🔹 Obtener un género por ID
        [HttpGet("{id}")]
        public IActionResult GetGenero(int id)
        {
            var genero = _context.Generos.Find(id);
            if (genero == null) return NotFound();
            return Ok(genero);
        }

        // 🔹 Crear un nuevo género
        [HttpPost]
        public IActionResult CrearGenero([FromBody] Genero nuevoGenero)
        {
            _context.Generos.Add(nuevoGenero);
            _context.SaveChanges();
            return Ok(nuevoGenero);
        }

        // 🔹 Actualizar un género
        [HttpPut("{id}")]
        public IActionResult ActualizarGenero(int id, [FromBody] Genero generoActualizado)
        {
            var genero = _context.Generos.Find(id);
            if (genero == null) return NotFound();

            genero.Nombre = generoActualizado.Nombre;
            genero.Descripcion = generoActualizado.Descripcion;
            genero.Imagen_Genero = generoActualizado.Imagen_Genero;

            _context.SaveChanges();
            return Ok(genero);
        }

        // 🔹 Eliminar un género
        [HttpDelete("{id}")]
        public IActionResult EliminarGenero(int id)
        {
            var genero = _context.Generos.Find(id);
            if (genero == null) return NotFound();

            _context.Generos.Remove(genero);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
