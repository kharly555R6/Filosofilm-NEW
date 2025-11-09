using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly string _jwtKey = "EstaEsUnaClaveSuperSecretaMuySegura12345!"; // >32 caracteres

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // 🔹 REGISTRO
        [HttpPost("registro")]
        public IActionResult RegistrarUsuario([FromBody] RegistroDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validar correo duplicado
            if (_context.Usuarios.Any(u => u.Correo_Electronico == dto.Correo_Electronico))
                return BadRequest("Ya existe un usuario con ese correo.");

            var nuevoUsuario = new Usuario
            {
                Nickname = dto.Nickname,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Correo_Electronico = dto.Correo_Electronico,
                Contraseña = dto.Contraseña,
                Telefono = dto.Telefono,
                Sexo = dto.Sexo,
                Fecha_Nacimiento = dto.Fecha_Nacimiento,
                Foto_Perfil = string.IsNullOrEmpty(dto.FotoPerfil) ? null : dto.FotoPerfil,
                Fecha_Registro = DateTime.Now,
                ID_Rol = 3 // Por defecto "Usuario"
            };

            _context.Usuarios.Add(nuevoUsuario);
            _context.SaveChanges();

            return Ok(new { message = "Usuario registrado correctamente." });
        }

        // 🔹 LOGIN con JWT
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO credenciales)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var usuario = _context.Usuarios
                .FirstOrDefault(u =>
                    u.Correo_Electronico == credenciales.Correo_Electronico &&
                    u.Contraseña == credenciales.Contraseña);

            if (usuario == null)
                return Unauthorized("Correo o contraseña incorrectos.");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.ID_Usuario.ToString()),
                    new Claim(ClaimTypes.Name, usuario.Nickname),
                    new Claim(ClaimTypes.Role, usuario.ID_Rol.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                message = "Inicio de sesión exitoso.",
                token = tokenString,
                usuario.ID_Usuario,
                usuario.Nickname,
                usuario.Correo_Electronico,
                usuario.ID_Rol
            });
        }

        // 🔹 PERFIL (Protegido)
        [HttpGet("perfil")]
        [Authorize]
        public IActionResult Perfil()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userId, out int idUsuario))
                return BadRequest("ID de usuario inválido o no encontrado en el token.");

            var usuario = _context.Usuarios.Find(idUsuario);

            if (usuario == null)
                return NotFound("Usuario no encontrado.");

            return Ok(usuario);
        }

        // 🔹 ACTUALIZAR DATOS DE USUARIO (Protegido)
        [HttpPut("actualizar")]
        [Authorize]
        public IActionResult ActualizarUsuario([FromBody] UsuarioActualizarDTO datos)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userId, out int idUsuario))
                return BadRequest("ID de usuario inválido o no encontrado en el token.");

            var usuario = _context.Usuarios.FirstOrDefault(u => u.ID_Usuario == idUsuario);

            if (usuario == null)
                return NotFound("Usuario no encontrado.");

            if (!string.IsNullOrEmpty(datos.Nombre))
                usuario.Nombre = datos.Nombre;
            if (!string.IsNullOrEmpty(datos.Apellido))
                usuario.Apellido = datos.Apellido;
            if (!string.IsNullOrEmpty(datos.Descripcion))
                usuario.Descripcion = datos.Descripcion;
            if (!string.IsNullOrEmpty(datos.Telefono))
                usuario.Telefono = datos.Telefono;
            if (!string.IsNullOrEmpty(datos.Sexo))
                usuario.Sexo = datos.Sexo;
            if (!string.IsNullOrEmpty(datos.Contrasena))
                usuario.Contraseña = datos.Contrasena;

            _context.SaveChanges();

            return Ok(new { message = "Usuario actualizado correctamente." });
        }

        // 🔹 ELIMINAR USUARIO POR ID (Admin)
        [HttpDelete("eliminar/{id}")]
        public IActionResult EliminarUsuarioPorId(int id)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.ID_Usuario == id);

            if (usuario == null)
                return NotFound(new { message = "Usuario no encontrado." });

            _context.Usuarios.Remove(usuario);
            _context.SaveChanges();

            return Ok(new { message = $"Usuario con ID {id} eliminado correctamente." });
        }
    }
}
