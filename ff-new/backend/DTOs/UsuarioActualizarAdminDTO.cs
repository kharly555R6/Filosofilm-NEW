public class UsuarioActualizarAdminDTO
{
    public int ID_Usuario { get; set; }

    public string? Nickname { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Telefono { get; set; }

    public string? Sexo { get; set; }

    public DateTime? Fecha_Nacimiento { get; set; }

    public int? ID_Rol { get; set; }

    public string? Descripcion { get; set; }

    public string? Foto_Perfil { get; set; }
}
