﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbResidentes
    {
        public int resi_Id { get; set; }
        public string resi_Nombres { get; set; }
        public string resi_Apellidos { get; set; }
        public string cent_Nombre { get; set; }
        public int cent_Id { get; set; }
        public int? tiposang_Id { get; set; }
        public string tiposang_Nombre { get; set; }
        public string resi_Identidad { get; set; }
        public int estacivi_Id { get; set; }
        public string estacivi_Nombre { get; set; }
        public DateTime resi_Nacimiento { get; set; }
        public string resi_Sexo { get; set; }
        public string SexoDes { get; set; }
        public int? diet_Id { get; set; }
        public string? diet_Desayuno { get; set; }
        public string? diet_Almuerzo { get; set; }
        public string? diet_Cena { get; set; }
        public string? empe_Nombres { get; set; }
        public string? empe_Apellidos { get; set; }
        public string? empe_NombreCompleto { get; set; }
        public string? diet_Merienda { get; set; }
        public string? diet_Observaciones { get; set; }
        public string? diet_Restricciones { get; set; }
        public DateTime resi_FechaIngreso { get; set; }
        public int? empe_Id { get; set; }
        public int agen_Id { get; set; }
        public string agen_Nombre { get; set; }
        public int resi_UsuCreacion { get; set; }
        public string usuCrea { get; set; }
        public DateTime resi_FechaCreacion { get; set; }
        public int? resi_UsuModificacion { get; set; }
        public string usuModif { get; set; }
        public DateTime? resi_FechaModificacion { get; set; }
        public bool resi_Estado { get; set; }
        public int expe_Id { get; set; }
        public string expe_Fotografia { get; set; }
        public string? expe_QRCode { get; set; }
        public DateTime? expe_FechaApertura { get; set; }
        public string? resi_Enfermedades { get; set; }
        public string? resi_EnfermedadesIds { get; set; }
        public int habi_Id { get; set; }
    }
}