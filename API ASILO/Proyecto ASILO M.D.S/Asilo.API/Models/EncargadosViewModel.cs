using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asilo.API.Models
{
    public class EncargadosViewModel
    {
        public int enca_Id { get; set; }
        public string enca_Nombres { get; set; }
        public string enca_Apellidos { get; set; }
        public string enca_Identidad { get; set; }
        public int estacivi_Id { get; set; }
        public string estacivi_Nombre { get; set; }
        public DateTime enca_Nacimiento { get; set; }
        public string enca_Sexo { get; set; }
        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string enca_Direccion { get; set; }
        public string enca_Telefono { get; set; }
        public int resi_Id { get; set; }
        public string resi_Nombres { get; set; }
        public string resi_Apellidos { get; set; }
        public bool resi_Estado { get; set; }
        public int pare_Id { get; set; }
        public string pare_Nombre { get; set; }
        public int enca_UsuCreacion { get; set; }
        public string usua_UsuCreacion_Nombre { get; set; }
        public DateTime enca_FechaCreacion { get; set; }
        public int? enca_UsuModificacion { get; set; }
        public DateTime? enca_FechaModificacion { get; set; }
        public string usua_UsuModificacion_Nombre { get; set; }
        public bool enca_Estado { get; set; }
    }
}
