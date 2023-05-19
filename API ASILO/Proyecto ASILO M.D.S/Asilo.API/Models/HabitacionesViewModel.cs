using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class HabitacionesViewModel
    {
        public int habi_Id { get; set; }
        public int habi_Numero { get; set; }
        public int cate_Id { get; set; }
        public int cent_Id { get; set; }
        public int habi_UsuCreacion { get; set; }
        public DateTime habi_FechaCreacion { get; set; }
        public int? habi_UsuModificacion { get; set; }
        public DateTime? habi_FechaModificacion { get; set; }
        public bool? habi_Estado { get; set; }
        public string cate_Nombre { get; set;}
        public string cent_Nombre { get; set;}
        public string usuCrea { get; set;}
        public string usuModif { get; set; }

    }
}
