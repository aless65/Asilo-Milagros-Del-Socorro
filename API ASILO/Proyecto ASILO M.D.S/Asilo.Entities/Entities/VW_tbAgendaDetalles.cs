﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbAgendaDetalles
    {
        public int agendeta_Id { get; set; }
        public int agen_Id { get; set; }
        public TimeSpan agendeta_Hora { get; set; }
        public int? acti_Id { get; set; }
        public int? medi_Id { get; set; }
        public string agendeta_Observaciones { get; set; }
        public int agendeta_UsuCreacion { get; set; }
        public DateTime agendeta_FechaCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public int? agendeta_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? agendeta_FechaModificacion { get; set; }
        public bool agendeta_Estado { get; set; }
    }
}