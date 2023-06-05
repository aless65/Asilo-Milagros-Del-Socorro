using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class DonacionesDetallesViewModel
    {
        public int deto_Id { get; set; }
        public int dona_Id { get; set; }
        public int? doco_Id { get; set; }
        public int? deto_Cantidad { get; set; }
        public string deto_Descripcion { get; set; }
        public bool? deto_Estado { get; set; }

    }
}
