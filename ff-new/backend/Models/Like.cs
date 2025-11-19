using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Like")]
    public class Like
    {
        [Key, Column(Order = 0)]
        public int ID_Usuario { get; set; }

        [Key, Column(Order = 1)]
        public int ID_Reseña { get; set; }

        public DateTime Fecha_Like { get; set; }
    }
}
