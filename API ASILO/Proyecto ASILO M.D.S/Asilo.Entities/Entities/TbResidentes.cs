﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class tbResidentes
    {
        public tbResidentes()
        {
            tbEncargados = new HashSet<tbEncargados>();
            tbEnfermedadesXResidente = new HashSet<tbEnfermedadesXResidente>();
            tbHabitacionesXResidente = new HashSet<tbHabitacionesXResidente>();
            tbHistorialPagos = new HashSet<tbHistorialPagos>();
            tbMuertos = new HashSet<tbMuertos>();
        }

        public int resi_Id { get; set; }
        public string resi_Nombres { get; set; }
        public string resi_Apellidos { get; set; }
        public string resi_Identidad { get; set; }
        public int estacivi_Id { get; set; }
        public DateTime resi_Nacimiento { get; set; }
        public string resi_Sexo { get; set; }
        public int cent_Id { get; set; }
        public int? diet_Id { get; set; }
        public DateTime resi_FechaIngreso { get; set; }
        public int? empe_Id { get; set; }
        public int agen_Id { get; set; }
        public int resi_UsuCreacion { get; set; }
        public DateTime resi_FechaCreacion { get; set; }
        public int? resi_UsuModificacion { get; set; }
        public DateTime? resi_FechaModificacion { get; set; }
        public bool? resi_Estado { get; set; }

        public virtual tbAgendas agen { get; set; }
        public virtual tbCentros cent { get; set; }
        public virtual tbDietas diet { get; set; }
        public virtual tbEmpleados empe { get; set; }
        public virtual tbEstadosCiviles estacivi { get; set; }
        public virtual tbUsuarios resi_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios resi_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEncargados> tbEncargados { get; set; }
        public virtual ICollection<tbEnfermedadesXResidente> tbEnfermedadesXResidente { get; set; }
        public virtual ICollection<tbHabitacionesXResidente> tbHabitacionesXResidente { get; set; }
        public virtual ICollection<tbHistorialPagos> tbHistorialPagos { get; set; }
        public virtual ICollection<tbMuertos> tbMuertos { get; set; }
    }
}