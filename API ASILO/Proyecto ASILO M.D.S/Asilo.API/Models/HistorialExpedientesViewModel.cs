using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class HistorialExpedientesViewModel
    {
        public int histexpe_Id { get; set; }
        public int expe_Id { get; set; }
        public string histexpe_Observaciones { get; set; }
        public int empe_Id { get; set; }
        public string empe_NombreCompleto { get; set; }
        public DateTime histexpe_FechaActualizacion { get; set; }
    }
}
