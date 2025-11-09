using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Like")]
    public class Like
    {
        [Required]
        public int ID_Usuario { get; set; }

        [Required]
        public int ID_Reseña { get; set; }

        [Required]
        public DateTime FechaLike { get; set; }

        // 🔹 Navegación opcional
        [ForeignKey("ID_Usuario")]
        public required Usuario Usuario { get; set; }

        [ForeignKey("ID_Reseña")]
        public required Resena Reseña { get; set; }
    }
}
