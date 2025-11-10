using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Actor_Pelicula")]
    public class ActorPelicula
    {
        [Key, Column(Order = 0)]
        public int ID_Actor { get; set; }

        [Key, Column(Order = 1)]
        public int ID_Pelicula { get; set; }

        [Required]
        [MaxLength(100)]
        public string Personaje { get; set; } = string.Empty;
    }
}
