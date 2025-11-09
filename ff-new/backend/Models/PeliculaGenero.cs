using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Pelicula_Genero")]
    public class PeliculaGenero
    {
        [Required]
        public int ID_Pelicula { get; set; }

        [Required]
        public int ID_Genero { get; set; }

        // 🔹 Navegación opcional
        [ForeignKey("ID_Pelicula")]
        public required Pelicula Pelicula { get; set; }

        [ForeignKey("ID_Genero")]
        public required Genero Genero { get; set; }
    }
}
