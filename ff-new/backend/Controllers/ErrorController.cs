using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ErrorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ErrorController(AppDbContext context)
        {
            _context = context;
        }

        // 🔹 Obtener todos los errores
        [HttpGet]
        public IActionResult GetErrores()
        {
            var errores = _context.Errores.ToList();
            return Ok(errores);
        }

        // 🔹 Obtener un error por ID
        [HttpGet("{id}")]
        public IActionResult GetError(int id)
        {
            var error = _context.Errores.Find(id);
            if (error == null) return NotFound();
            return Ok(error);
        }

        // 🔹 Crear un nuevo error
        [HttpPost]
        public IActionResult CrearError([FromBody] Error nuevoError)
        {
            _context.Errores.Add(nuevoError);
            _context.SaveChanges();
            return Ok(nuevoError);
        }

        // 🔹 Actualizar un error
        [HttpPut("{id}")]
        public IActionResult ActualizarError(int id, [FromBody] Error errorActualizado)
        {
            var error = _context.Errores.Find(id);
            if (error == null) return NotFound();

            error.Mensaje = errorActualizado.Mensaje;
            error.ID_Experto = errorActualizado.ID_Experto;
            error.ID_Pelicula = errorActualizado.ID_Pelicula;
            error.Estatus = errorActualizado.Estatus;

            _context.SaveChanges();
            return Ok(error);
        }

        // 🔹 Eliminar un error
        [HttpDelete("{id}")]
        public IActionResult EliminarError(int id)
        {
            var error = _context.Errores.Find(id);
            if (error == null) return NotFound();

            _context.Errores.Remove(error);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
