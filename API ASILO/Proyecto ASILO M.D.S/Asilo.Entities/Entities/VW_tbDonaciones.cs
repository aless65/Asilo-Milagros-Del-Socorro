﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbDonaciones
    {
        public int dona_Id { get; set; }
        public string dona_NombreDonante { get; set; }
        public DateTime dona_Fecha { get; set; }
        public string dona_QueEs { get; set; }
        public string esDescrip { get; set; }
        public int dona_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime dona_FechaCreacion { get; set; }
        public int? dona_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? dona_FechaModificacion { get; set; }
        public bool dona_Estado { get; set; }
    }
}