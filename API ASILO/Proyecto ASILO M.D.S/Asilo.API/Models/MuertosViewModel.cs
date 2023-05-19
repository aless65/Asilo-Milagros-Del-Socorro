using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class MuertosViewModel
    {
        public int muer_Id { get; set; }
        public int resi_Id { get; set; }
        public string resi_NombreCompleto { get; set; }
        public DateTime muer_FechaYHora { get; set; }
        public string muer_Descripcion { get; set; }
        public int muer_UsuCreacion { get; set; }
        public DateTime muer_FechaCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public int? muer_UsuModificacion { get; set; }
        public DateTime? muer_FechaModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public bool muer_Estado { get; set; }
    }
}
