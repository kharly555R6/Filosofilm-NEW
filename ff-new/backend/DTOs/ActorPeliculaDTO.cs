namespace backend.DTOs
{
    public class ActorPeliculaDTO
    {
        public int ID_Pelicula { get; set; }
        public int ID_Actor { get; set; }
        public string Personaje { get; set; } = string.Empty;
    }
}
