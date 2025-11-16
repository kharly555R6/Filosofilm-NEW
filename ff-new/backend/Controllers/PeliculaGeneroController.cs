using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.DTOs;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeliculaGeneroController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PeliculaGeneroController(AppDbContext context) => _context = context;

        // GET: api/peliculagenero
        [HttpGet]
        public IActionResult GetAll() => Ok(_context.PeliculaGeneros.ToList());

        // POST: api/peliculagenero
        [HttpPost]
        public IActionResult Crear([FromBody] PeliculaGeneroDTO dto)
        {
            if (dto == null)
                return BadRequest("Datos inválidos.");

            var existe = _context.PeliculaGeneros
                .Any(pg => pg.ID_Pelicula == dto.ID_Pelicula && pg.ID_Genero == dto.ID_Genero);

            if (existe)
                return BadRequest("La relación ya existe.");

            var nuevaRelacion = new PeliculaGenero
            {
                ID_Pelicula = dto.ID_Pelicula,
                ID_Genero = dto.ID_Genero
            };

            _context.PeliculaGeneros.Add(nuevaRelacion);
            _context.SaveChanges();

            return Ok(nuevaRelacion);
        }

        // DELETE: api/peliculagenero/{idPelicula}/{idGenero}
        [HttpDelete("{idPelicula}/{idGenero}")]
        public IActionResult Eliminar(int idPelicula, int idGenero)
        {
            var registro = _context.PeliculaGeneros
                .FirstOrDefault(pg => pg.ID_Pelicula == idPelicula && pg.ID_Genero == idGenero);

            if (registro == null)
                return NotFound();

            _context.PeliculaGeneros.Remove(registro);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
