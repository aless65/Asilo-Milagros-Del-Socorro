﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbEnfermedadesXResidente
    {
        public int enferesi_Id { get; set; }
        public int enfe_Id { get; set; }
        public string enfe_Nombre { get; set; }
        public int resi_Id { get; set; }
        public string resi_Nombres { get; set; }
        public int enferesi_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime enferesi_FechaCreacion { get; set; }
        public int? enferesi_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? enferesi_FechaModificacion { get; set; }
        public bool enferesi_Estado { get; set; }
    }
}