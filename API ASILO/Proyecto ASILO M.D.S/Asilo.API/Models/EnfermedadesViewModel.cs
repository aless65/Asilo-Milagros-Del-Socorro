using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class EnfermedadesViewModel
    {
        public int enfe_Id { get; set; }
        public string enfe_Nombre { get; set; }
        public int enfe_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime enfe_FechaCreacion { get; set; }
        public int? enfe_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? enfe_FechaModificacion { get; set; }
        public bool enfe_Estado { get; set; }
    }
}
