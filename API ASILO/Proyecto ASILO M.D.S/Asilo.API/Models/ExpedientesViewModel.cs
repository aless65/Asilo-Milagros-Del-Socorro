using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class ExpedientesViewModel
    {
        public int expe_Id { get; set; }
        public int resi_Id { get; set; }
        public string resi_NombreCompleto { get; set; }
        public bool? resi_Estado { get; set; }
        public int tiposang_Id { get; set; }
        public string tiposang_Nombre { get; set; }
        public DateTime expe_FechaApertura { get; set; }
        public string expe_Fotografia { get; set; }
        public int expe_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime expe_FechaCreacion { get; set; }
        public int? expe_UsuModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public DateTime? expe_FechaModificacion { get; set; }
        public bool expe_Estado { get; set; }
        public int[] expe_Enfermedades { get; set; }
    }
}
