﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class tbAgendas
    {
        public tbAgendas()
        {
            tbResidentes = new HashSet<tbResidentes>();
        }

        public int agen_Id { get; set; }
        public string agen_Nombre { get; set; }
        public int agen_UsuCreacion { get; set; }
        public DateTime agen_FechaCreacion { get; set; }
        public int? agen_UsuModificacion { get; set; }
        public DateTime? agen_FechaModificacion { get; set; }
        public bool? agen_Estado { get; set; }

        public virtual tbUsuarios agen_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios agen_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbResidentes> tbResidentes { get; set; }
    }
}