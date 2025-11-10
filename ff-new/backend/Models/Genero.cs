using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Genero")]
    public class Genero
    {
        [Key]
        public int ID_Genero { get; set; }

        [Column("Genero")]
        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public string Descripcion { get; set; } = string.Empty;
        
        public ICollection<PeliculaGenero> PeliculaGeneros { get; set; } = new List<PeliculaGenero>();
    }
}
