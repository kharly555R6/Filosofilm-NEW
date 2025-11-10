using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // 🔹 Tablas
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Actor> Actores { get; set; }
        public DbSet<ActorPelicula> ActorPeliculas { get; set; }
        public DbSet<Director> Director { get; set; }
        public DbSet<DirectorPelicula> DirectorPelicula { get; set; }
        public DbSet<Pelicula> Peliculas { get; set; }
        public DbSet<PeliculaGenero> PeliculaGeneros { get; set; }
        public DbSet<Genero> Generos { get; set; }
        public DbSet<Favorito> Favoritos { get; set; }
        public DbSet<Visto> Vistos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Resena> Resenas { get; set; }
        public DbSet<Aviso> Avisos { get; set; }
        public DbSet<Error> Errores { get; set; }
        public DbSet<PaisOrigen> PaisOrigen { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 🔹 Claves compuestas
            modelBuilder.Entity<ActorPelicula>()
                .HasKey(ap => new { ap.ID_Actor, ap.ID_Pelicula });

            modelBuilder.Entity<DirectorPelicula>()
                .HasKey(dp => new { dp.ID_Director, dp.ID_Pelicula });

            modelBuilder.Entity<PeliculaGenero>()
                .HasKey(pg => new { pg.ID_Pelicula, pg.ID_Genero });

            modelBuilder.Entity<Favorito>()
                .HasKey(f => new { f.ID_Usuario, f.ID_Pelicula });

            modelBuilder.Entity<Visto>()
                .HasKey(v => new { v.ID_Usuario, v.ID_Pelicula });

            modelBuilder.Entity<Like>()
                .HasKey(l => new { l.ID_Usuario, l.ID_Reseña });

            // 🔹 Relaciones (opcional, EF puede inferir algunas automáticamente)
            modelBuilder.Entity<Actor>()
                .HasOne<PaisOrigen>()
                .WithMany()
                .HasForeignKey(a => a.Pais_Nacimiento);

            modelBuilder.Entity<Director>()
                .HasOne<PaisOrigen>()
                .WithMany()
                .HasForeignKey(d => d.Pais_Nacimiento);

            modelBuilder.Entity<Pelicula>()
                .HasOne<PaisOrigen>()
                .WithMany()
                .HasForeignKey(p => p.ID_Pais_Origen);

            modelBuilder.Entity<Usuario>()
                .HasOne<Rol>()
                .WithMany()
                .HasForeignKey(u => u.ID_Rol);

            // Puedes agregar más relaciones según las necesites
        }
    }
}
