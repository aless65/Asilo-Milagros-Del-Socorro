using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class CargosViewModel
    {
        public int carg_Id { get; set; }
        public string carg_Nombre { get; set; }
        public int carg_UsuCreacion { get; set; }
        public DateTime carg_FechaCreacion { get; set; }
        public int? carg_UsuModificacion { get; set; }
        public DateTime? carg_FechaModificacion { get; set; }
        public bool? carg_Estado { get; set; }
    }
}
