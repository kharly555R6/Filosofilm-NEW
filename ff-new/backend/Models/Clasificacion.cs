using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Clasificacion")]
    public class Clasificacion
    {
        [Key]
        public int ID_Clasificacion { get; set; }

        [Column("Clasificacion")]
        [Required]
        [MaxLength(50)]
        public string ClasificacionNombre { get; set; } = string.Empty;

        [Required]
        public string Descripcion { get; set; } = string.Empty;

        [Required]
        public string Imagen_Clasif { get; set; } = string.Empty;
    }
}
