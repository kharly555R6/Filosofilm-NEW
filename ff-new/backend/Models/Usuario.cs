using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Usuario")]
    public class Usuario
    {
        [Key]
        public int ID_Usuario { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nickname { get; set; } = string.Empty;

        [Required]
        public int ID_Rol { get; set; }

        [Required]
        [MaxLength(200)]
        public string Correo_Electronico { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Contraseña { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Apellido { get; set; } = string.Empty;

        public string? Foto_Perfil { get; set; }

        [Required]
        public DateTime Fecha_Registro { get; set; }

        [Required]
        public DateTime Fecha_Nacimiento { get; set; }

        [Required]
        [MaxLength(50)]
        public string Sexo { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Telefono { get; set; } = string.Empty;

        public string? Descripcion { get; set; }
    }
}
