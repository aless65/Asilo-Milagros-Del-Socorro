using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class MedicamentosViewModel
    {
        public int medi_Id { get; set; }
        public string medi_Nombre { get; set; }
        public int prov_Id { get; set; }
        public int prov_Nombre { get; set; }
        public int cent_Id { get; set; }
        public int invecent_Stock { get; set; }
        public int medi_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime medi_FechaCreacion { get; set; }
        public int? medi_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? medi_FechaModificacion { get; set; }
        public bool medi_Estado { get; set; }
    }
}
