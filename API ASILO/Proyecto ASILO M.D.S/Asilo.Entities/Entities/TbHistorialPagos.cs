﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class tbHistorialPagos
    {
        public int pago_Id { get; set; }
        public int resi_Id { get; set; }
        public int meto_Id { get; set; }
        public DateTime pago_Fecha { get; set; }
        public int pago_UsuCreacion { get; set; }
        public DateTime pago_FechaCreacion { get; set; }
        public int? pago_UsuModificacion { get; set; }
        public DateTime? pago_FechaModificacion { get; set; }
        public bool? pago_Estado { get; set; }

        public virtual tbMetodosPago meto { get; set; }
        public virtual tbUsuarios pago_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios pago_UsuModificacionNavigation { get; set; }
        public virtual tbResidentes resi { get; set; }
    }
}