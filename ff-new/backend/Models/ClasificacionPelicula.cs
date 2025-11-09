using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ClasificacionPelicula
    {
        [Key, Column(Order = 0)]
        public int ID_Clasificacion { get; set; }

        [Key, Column(Order = 1)]
        public int ID_Pelicula { get; set; }
    }
}
