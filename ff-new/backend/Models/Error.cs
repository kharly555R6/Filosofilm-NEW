using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Error")]
    public class Error
    {
        [Key]
        public int ID_Error { get; set; }

        [Required]
        [MaxLength(250)]
        public string Mensaje { get; set; } = string.Empty;

        [Required]
        public int ID_Experto { get; set; }  // FK a Usuario

        [Required]
        public int ID_Pelicula { get; set; } // FK a Pelicula

        [Required]
        public bool Estatus { get; set; }

        // Relaciones opcionales
        [ForeignKey("ID_Experto")]
        public required Usuario Experto { get; set; }

        [ForeignKey("ID_Pelicula")]
        public required Pelicula Pelicula { get; set; }
    }
}
