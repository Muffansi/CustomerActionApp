using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CustomerActionApp.Models
{
    public partial class CustomerAppDbContext : DbContext
    {
        public virtual DbSet<CustomerActions> CustomerActions { get; set; }
        public virtual DbSet<Customers> Customers { get; set; }

        public CustomerAppDbContext(DbContextOptions<CustomerAppDbContext> options)
 : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomerActions>(entity =>
            {
                entity.HasKey(e => e.ActId);

                entity.Property(e => e.CustomerAction).HasMaxLength(100);

                entity.Property(e => e.Timestamp).HasColumnType("datetime");

                entity.HasOne(d => d.Cst)
                    .WithMany(p => p.CustomerActions)
                    .HasForeignKey(d => d.CstId)
                    .HasConstraintName("FK_Action_Customer_CstId");
            });

            modelBuilder.Entity<Customers>(entity =>
            {
                entity.HasKey(e => e.CstId);

                entity.Property(e => e.CustomerId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CustomerName)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}
