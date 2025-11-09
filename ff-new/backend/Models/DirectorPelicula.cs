using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class DirectorPelicula
    {
        [Key, Column(Order = 0)]
        public int ID_Director { get; set; }

        [Key, Column(Order = 1)]
        public int ID_Pelicula { get; set; }

        // Relaciones opcionales
        public required Director Director { get; set; }
        public required Pelicula Pelicula { get; set; }
    }
}
