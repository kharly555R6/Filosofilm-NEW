using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using System.Linq;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeliculaGeneroController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PeliculaGeneroController(AppDbContext context)
        {
            _context = context;
        }

        // 🔹 Obtener todos los registros
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.PeliculaGeneros.ToList());
        }

        // 🔹 Obtener registro específico por película y género
        [HttpGet("{idPelicula}/{idGenero}")]
        public IActionResult Get(int idPelicula, int idGenero)
        {
            var registro = _context.PeliculaGeneros
                .FirstOrDefault(pg => pg.ID_Pelicula == idPelicula && pg.ID_Genero == idGenero);

            if (registro == null) return NotFound();
            return Ok(registro);
        }

        // 🔹 Crear un nuevo registro
        [HttpPost]
        public IActionResult Crear([FromBody] PeliculaGenero nuevoRegistro)
        {
            _context.PeliculaGeneros.Add(nuevoRegistro);
            _context.SaveChanges();
            return Ok(nuevoRegistro);
        }

        // 🔹 Eliminar un registro
        [HttpDelete("{idPelicula}/{idGenero}")]
        public IActionResult Eliminar(int idPelicula, int idGenero)
        {
            var registro = _context.PeliculaGeneros
                .FirstOrDefault(pg => pg.ID_Pelicula == idPelicula && pg.ID_Genero == idGenero);

            if (registro == null) return NotFound();

            _context.PeliculaGeneros.Remove(registro);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
