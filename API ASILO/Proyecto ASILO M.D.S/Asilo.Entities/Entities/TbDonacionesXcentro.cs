﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class tbDonacionesXCentro
    {
        public int donacent_Id { get; set; }
        public int dona_Id { get; set; }
        public int cent_Id { get; set; }
        public int donacent_UsuCreacion { get; set; }
        public DateTime donacent_FechaCreacion { get; set; }
        public int? donacent_UsuModificacion { get; set; }
        public DateTime? donacent_FechaModificacion { get; set; }
        public bool? donacent_Estado { get; set; }

        public virtual tbUsuarios donacent_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios donacent_UsuModificacionNavigation { get; set; }
    }
}