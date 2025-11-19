using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace backend.Models
{
    [Table("Pais_Origen")]
    public class PaisOrigen
    {
        [Key]
        public int ID_Pais { get; set; }

        [Required]
        [MaxLength(20)]
        public string Nombre { get; set; } = string.Empty;
    }
}
