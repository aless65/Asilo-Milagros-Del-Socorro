﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbCentros
    {
        public int cent_Id { get; set; }
        public string cent_Nombre { get; set; }
        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public string cent_Direccion { get; set; }
        public int cent_UsuCreacion { get; set; }
        public DateTime cent_FechaCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public int? cent_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? cent_FechaModificacion { get; set; }
        public bool cent_Estado { get; set; }
    }
}