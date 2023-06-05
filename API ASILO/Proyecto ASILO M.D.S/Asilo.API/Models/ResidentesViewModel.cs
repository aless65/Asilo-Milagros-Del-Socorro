using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class ResidentesViewModel
    {
        public int resi_Id { get; set; }
        public string? resi_Nombres { get; set; }
        public string? resi_Apellidos { get; set; }
        public string? resi_Identidad { get; set; }
        public int? estacivi_Id { get; set; }
        public int? estacivi_IdResi { get; set; }
        public DateTime? resi_Nacimiento { get; set; }
        public string? resi_Sexo { get; set; }
        public int? cent_Id { get; set; }
        public int? diet_Id { get; set; }
        public DateTime? resi_FechaIngreso { get; set; }
        public int? empe_Id { get; set; }
        public int? agen_Id { get; set; }
        public int? resi_UsuCreacion { get; set; }
        public string? enca_Nombres { get; set; }
        public string? enca_Apellidos { get; set; }
        public string? enca_Identidad { get; set; }
        public int? estacivi_IdEnca { get; set; }
        public DateTime? enca_Nacimiento { get; set; }
        public string? enca_Sexo { get; set; }
        public string? muni_Id { get; set; }
        public string? enca_Direccion { get; set; }
        public string? enca_Telefono { get; set; }
        public int? pare_Id { get; set; }
        public int? enca_UsuCreacion { get; set; }
        public int? tiposang_Id { get; set; }
        public DateTime? expe_FechaApertura { get; set; }
        public string? expe_Fotografia { get; set; }
        public string? expe_QRCode { get; set; }
        public int[]? expe_Enfermedades { get; set; }
        public string? diet_Desayuno { get; set; }
        public string? diet_Almuerzo { get; set; }
        public string? diet_Cena { get; set; }
        public string? diet_Merienda { get; set; }
        public string? diet_Restricciones { get; set; }
        public string? diet_Observaciones { get; set; }
        public int? meto_Id { get; set; }
        public DateTime? pago_Fecha { get; set; }
        public int? habi_Id { get; set; }

    }
}
