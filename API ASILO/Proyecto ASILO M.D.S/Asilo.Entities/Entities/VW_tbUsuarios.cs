﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class VW_tbUsuarios
    {
        public int usua_Id { get; set; }
        public string usua_NombreUsuario { get; set; }
        public string usua_Contrasena { get; set; }
        public bool? usua_EsAdmin { get; set; }
        public int? role_Id { get; set; }
        public string role_Nombre { get; set; }
        public int? empe_Id { get; set; }
        public string empe_NombreCompleto { get; set; }
        public int? usua_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime usua_FechaCreacion { get; set; }
        public int? usua_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? usua_FechaModificacion { get; set; }
        public bool usua_Estado { get; set; }
        public int? cent_Id { get; set; }
        public string empe_Correo { get; set; }
    }
}