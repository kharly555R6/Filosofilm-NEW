using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Pelicula_Genero")]
    public class PeliculaGenero
    {
        public int ID_Pelicula { get; set; }
        public int ID_Genero { get; set; }

        [ForeignKey("ID_Pelicula")]
        public Pelicula? Pelicula { get; set; }

        [ForeignKey("ID_Genero")]
        public Genero? Genero { get; set; }
    }
}
