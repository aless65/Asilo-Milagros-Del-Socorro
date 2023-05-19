using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class EmpleadosViewModel
    {
        public int empe_Id { get; set; }
        public string empe_Nombres { get; set; }
        public string empe_Apellidos { get; set; }
        public string empe_Identidad { get; set; }
        public string empe_Sexo { get; set; }
        public int estacivi_Id { get; set; }
        public DateTime empe_Nacimiento { get; set; }
        public string muni_Id { get; set; }
        public string empe_Direccion { get; set; }
        public string empe_Telefono { get; set; }
        public string empe_Correo { get; set; }
        public int carg_Id { get; set; }
        public int cent_Id { get; set; }
        public int empe_UsuCreacion { get; set; }
        public DateTime empe_FechaCreacion { get; set; }
        public int? empe_UsuModificacion { get; set; }
        public DateTime? empe_FechaModificacion { get; set; }
        public bool? empe_Estado { get; set; }
        public string empe_NombreCompleto { get; set; }
        public string estacivi_Nombre { get; set; }
        public string muni_Nombre { get; set; }
        public string depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public string carg_Nombre { get; set; }
        public string cent_Nombre { get; set; }
        public string usuarioCrea { get; set; }
        public string usuarioModif { get; set; }
        public string SexoDes { get; set; }

    }
}
