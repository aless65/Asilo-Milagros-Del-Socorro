using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class ProveedorViewModel
    {

        public int prov_Id { get; set; }
        public string prov_Nombre { get; set; }
        public string prov_CorreoElectronico { get; set; }
        public string prov_Telefono { get; set; }
        public string muni_Id { get; set; }
        public string prov_Direccion { get; set; }
        public int prov_UsuCreacion { get; set; }
        public DateTime prov_FechaCreacion { get; set; }
        public int? prov_UsuModificacion { get; set; }
        public DateTime? prov_FechaModificacion { get; set; }
        public bool? prov_Estado { get; set; }
        public string muni_Nombre { get; set; }
        public string depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }

    }
}
