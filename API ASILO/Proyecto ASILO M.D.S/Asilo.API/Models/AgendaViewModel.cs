using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class AgendaViewModel
    {
        public int agen_Id { get; set; }
        public string agen_Nombre { get; set; }
        public int agen_UsuCreacion { get; set; }
        public DateTime agen_FechaCreacion { get; set; }
        public int? agen_UsuModificacion { get; set; }
        public DateTime? agen_FechaModificacion { get; set; }
        public bool? agen_Estado { get; set; }
        public string usuCrea { get; set; }
        public string usuModif { get; set; }

    }
}
