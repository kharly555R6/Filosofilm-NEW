using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;  

namespace backend.Models

{
    [Table("Rol")] 
    public class Rol
    {
        [Key]
        public int ID_Rol { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; } = string.Empty;
    }
}
