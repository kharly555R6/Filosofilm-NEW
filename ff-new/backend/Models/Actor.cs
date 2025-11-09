using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Actor")]
    public class Actor
    {
        [Key]
        public int ID_Actor { get; set; }

        [Required]
        [MaxLength(200)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public DateTime Fecha_Nacimiento { get; set; }

        [Required]
        public int Pais_Nacimiento { get; set; }

        [Required]
        public string Biografia { get; set; } = string.Empty;

        [Required]
        public string Foto_Actor { get; set; } = string.Empty;
    }
}
