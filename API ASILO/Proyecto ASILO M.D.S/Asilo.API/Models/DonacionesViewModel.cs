using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class DonacionesViewModel
    {
        public int dona_Id { get; set; }
        public int[] cent_Id { get; set; }
        public string dona_NombreDonante { get; set; }
        public string dona_QueEs { get; set; }
        public decimal dona_Cantidad { get; set; }
        public int dona_UsuCreacion { get; set; }
        public DateTime dona_Fecha { get; set; }
        public int dona_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime dona_FechaCreacion { get; set; }
        public int? dona_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? dona_FechaModificacion { get; set; }
        public bool dona_Estado { get; set; }
    }
}
