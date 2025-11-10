using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Pelicula")]
    public class Pelicula
    {
        [Key]
        public int ID_Pelicula { get; set; }

        [Required, MaxLength(200)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        public string Sinopsis { get; set; } = string.Empty;

        [Required]
        public DateTime Fecha_Lanzamiento { get; set; }

        [Required]
        [Column(TypeName = "decimal(5,2)")]
        public decimal Duracion { get; set; }

        public int? Presupuesto { get; set; }

        public string Imagen { get; set; } = string.Empty;

        public int? Recaudacion { get; set; }

        [Required]
        public int ID_Pais_Origen { get; set; }

        public string? Clasificacion { get; set; } = string.Empty;

        public ICollection<PeliculaGenero> PeliculaGeneros { get; set; } = new List<PeliculaGenero>();

    }
}
