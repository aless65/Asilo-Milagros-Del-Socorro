using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class HistorialPagosViewModel
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

        public string resi_NombreCompleto { get; set; }
        public string meto_Nombre { get; set; }
        public string usuCrea { get; set; }
        public string usuModif { get; set; }

    }
}
