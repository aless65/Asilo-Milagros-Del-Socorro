﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbMedicamentos
    {
        public int medi_Id { get; set; }
        public string medi_Nombre { get; set; }
        public int prov_Id { get; set; }
        public string prov_Nombre { get; set; }
        public int medi_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime medi_FechaCreacion { get; set; }
        public int? medi_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? medi_FechaModificacion { get; set; }
        public bool medi_Estado { get; set; }
    }
}