﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbHabitaciones
    {
        public int habi_Id { get; set; }
        public int habi_Numero { get; set; }
        public int cate_Id { get; set; }
        public string cate_Nombre { get; set; }
        public int cent_Id { get; set; }
        public string habi_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime habi_FechaCreacion { get; set; }
        public int? habi_UsuModificacion { get; set; }
        public DateTime? habi_FechaModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public bool habi_Estado { get; set; }
    }
}