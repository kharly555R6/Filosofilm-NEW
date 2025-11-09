using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Aviso")]
    public class Aviso
    {
        [Key]
        public int ID_Aviso { get; set; }

        [Required]
        [MaxLength(250)]
        public string Mensaje { get; set; } = string.Empty;

        [Required]
        public int ID_Usuario_Receptor { get; set; } 

        [Required]
        public int ID_Moderador { get; set; }

        [Required]
        public bool Estatus { get; set; }
    }
}
