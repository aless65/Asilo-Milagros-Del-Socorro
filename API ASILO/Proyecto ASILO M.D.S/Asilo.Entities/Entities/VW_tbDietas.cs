﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbDietas
    {
        public int diet_Id { get; set; }
        public string diet_Desayuno { get; set; }
        public string diet_Almuerzo { get; set; }
        public string diet_Cena { get; set; }
        public string diet_Merienda { get; set; }
        public string diet_Restricciones { get; set; }
        public string diet_Observaciones { get; set; }
        public int diet_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime diet_FechaCreacion { get; set; }
        public int? diet_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? diet_FechaModificacion { get; set; }
        public bool diet_Estado { get; set; }
    }
}