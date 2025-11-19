using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Favorito")]
    public class Favorito
    {
        [Key, Column(Order = 0)]
        public int ID_Usuario { get; set; }

        [Key, Column(Order = 1)]
        public int ID_Pelicula { get; set; }

        public DateTime Fecha_Favorito { get; set; }
    }
}