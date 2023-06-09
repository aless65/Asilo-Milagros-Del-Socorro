﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class tbEncargados
    {
        public int enca_Id { get; set; }
        public string enca_Nombres { get; set; }
        public string enca_Apellidos { get; set; }
        public string enca_Identidad { get; set; }
        public int estacivi_Id { get; set; }
        public DateTime enca_Nacimiento { get; set; }
        public string enca_Sexo { get; set; }
        public string muni_Id { get; set; }
        public string enca_Direccion { get; set; }
        public string enca_Telefono { get; set; }
        public int resi_Id { get; set; }
        public int pare_Id { get; set; }
        public int enca_UsuCreacion { get; set; }
        public DateTime enca_FechaCreacion { get; set; }
        public int? enca_UsuModificacion { get; set; }
        public DateTime? enca_FechaModificacion { get; set; }
        public bool? enca_Estado { get; set; }

        public virtual tbUsuarios enca_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios enca_UsuModificacionNavigation { get; set; }
        public virtual tbEstadosCiviles estacivi { get; set; }
        public virtual tbMunicipios muni { get; set; }
        public virtual tbParentescos pare { get; set; }
        public virtual tbResidentes resi { get; set; }
    }
}