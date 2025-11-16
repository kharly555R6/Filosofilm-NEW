namespace backend.DTOs
{
    public class CrearResenaDTO
    {
        public string Contenido { get; set; } = string.Empty;
        public int Calificacion { get; set; }
        public int ID_Pelicula { get; set; } // Agregamos esto
    }
}
