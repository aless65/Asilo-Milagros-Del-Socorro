using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class AgendaDetallesViewModel
    {
        public int agendeta_Id { get; set; }
        public int agen_Id { get; set; }
        public string agendeta_HoraStart { get; set; }
        public string agendeta_HoraEnd { get; set; }
        public int? acti_Id { get; set; }
        public int? medi_Id { get; set; }
        public string agendeta_Observaciones { get; set; }
        public int agendeta_UsuCreacion { get; set; }
        public DateTime agendeta_FechaCreacion { get; set; }
        public int? agendeta_UsuModificacion { get; set; }
        public DateTime? agendeta_FechaModificacion { get; set; }
        public bool? agendeta_Estado { get; set; }
    }
}