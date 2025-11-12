using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;  

namespace backend.Models
{
    [Table("Reseña")]
    public class Resena
    {
        [Key]
        public int ID_Reseña { get; set; }

        [Required]
        public string Contenido { get; set; } = string.Empty;

        [Required]
        public DateTime Fecha_Publicacion { get; set; }

        [Required]
        public double Calificacion { get; set; }

        [Required]
        public int ID_Usuario { get; set; }

        [Required]
        public int ID_Pelicula { get; set; }

        [ForeignKey("ID_Usuario")]
        public virtual Usuario Usuario { get; set; } = null!;

        [ForeignKey("ID_Pelicula")]
        public virtual Pelicula Pelicula { get; set; } = null!;
    }
}
