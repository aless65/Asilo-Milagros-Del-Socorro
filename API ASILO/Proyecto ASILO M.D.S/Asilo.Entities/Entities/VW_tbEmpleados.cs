﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbEmpleados
    {
        public int empe_Id { get; set; }
        public string empe_Nombres { get; set; }
        public string empe_Apellidos { get; set; }
        public string empe_NombreCompleto { get; set; }
        public string empe_Identidad { get; set; }
        public DateTime empe_Nacimiento { get; set; }
        public string empe_Sexo { get; set; }
        public int estacivi_Id { get; set; }
        public string Empe_EstadoCivilNombre { get; set; }
        public string empe_Telefono { get; set; }
        public string empe_Correo { get; set; }
        public string empe_Direccion { get; set; }
        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string depa_Id { get; set; }
        public int carg_Id { get; set; }
        public string carg_Nombre { get; set; }
        public int cent_Id { get; set; }
        public string empe_UsuCreacion { get; set; }
        public string Empe_NombreUsuarioCreacion { get; set; }
        public DateTime empe_FechaCreacion { get; set; }
        public int? empe_UsuModificacion { get; set; }
        public string Empe_NombreUsuarioModificacion { get; set; }
        public DateTime? empe_FechaModificacion { get; set; }
        public bool empe_Estado { get; set; }
    }
}