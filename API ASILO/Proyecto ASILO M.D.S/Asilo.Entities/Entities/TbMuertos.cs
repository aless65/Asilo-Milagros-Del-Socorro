﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class tbMuertos
    {
        public int muer_Id { get; set; }
        public int resi_Id { get; set; }
        public DateTime muer_FechaYHora { get; set; }
        public string muer_Descripcion { get; set; }
        public int muer_UsuCreacion { get; set; }
        public DateTime muer_FechaCreacion { get; set; }
        public int? muer_UsuModificacion { get; set; }
        public DateTime? muer_FechaModificacion { get; set; }
        public bool? muer_Estado { get; set; }

        public virtual tbUsuarios muer_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios muer_UsuModificacionNavigation { get; set; }
        public virtual tbResidentes resi { get; set; }
    }
}