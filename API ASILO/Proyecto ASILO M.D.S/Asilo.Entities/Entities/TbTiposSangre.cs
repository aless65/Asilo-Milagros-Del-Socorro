﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class tbTiposSangre
    {
        public tbTiposSangre()
        {
            tbExpedientes = new HashSet<tbExpedientes>();
        }

        public int tiposang_Id { get; set; }
        public string tiposang_Nombre { get; set; }
        public int tiposang_UsuCreacion { get; set; }
        public DateTime tiposang_FechaCreacion { get; set; }
        public int? tiposang_UsuModificacion { get; set; }
        public DateTime? tiposang_FechaModificacion { get; set; }
        public bool? tiposang_Estado { get; set; }

        public virtual tbUsuarios tiposang_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios tiposang_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbExpedientes> tbExpedientes { get; set; }
    }
}