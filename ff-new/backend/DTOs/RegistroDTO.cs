namespace backend.DTOs
{
    public class RegistroDTO
    {
        public string Nickname { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Correo_Electronico { get; set; } = string.Empty;
        public string Contraseña { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Sexo { get; set; } = string.Empty;
        public DateTime Fecha_Nacimiento { get; set; }
        public string? FotoPerfil { get; set; } = null;
    }
}
