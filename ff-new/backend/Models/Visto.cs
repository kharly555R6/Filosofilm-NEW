using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Visto")]
    public class Visto
    {
        [Key, Column(Order = 0)]
        public int ID_Usuario { get; set; }

        [Key, Column(Order = 1)]
        public int ID_Pelicula { get; set; }

        [Required]
        public DateTime Fecha_Vista { get; set; }
    }
}
