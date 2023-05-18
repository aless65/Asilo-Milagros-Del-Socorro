﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace Asilo.Entities.Entities
{
    public partial class tbUsuarios
    {
        public tbUsuarios()
        {
            Inverseusua_UsuCreacionNavigation = new HashSet<tbUsuarios>();
            Inverseusua_UsuModificacionNavigation = new HashSet<tbUsuarios>();
            tbActividadesacti_UsuCreacionNavigation = new HashSet<tbActividades>();
            tbActividadesacti_UsuModificacionNavigation = new HashSet<tbActividades>();
            tbAgendaDetallesagendeta_UsuCreacionNavigation = new HashSet<tbAgendaDetalles>();
            tbAgendaDetallesagendeta_UsuModificacionNavigation = new HashSet<tbAgendaDetalles>();
            tbAgendasagen_UsuCreacionNavigation = new HashSet<tbAgendas>();
            tbAgendasagen_UsuModificacionNavigation = new HashSet<tbAgendas>();
            tbCargoscarg_UsuCreacionNavigation = new HashSet<tbCargos>();
            tbCargoscarg_UsuModificacionNavigation = new HashSet<tbCargos>();
            tbCategoriasHabitacionescate_UsuCreacionNavigation = new HashSet<tbCategoriasHabitaciones>();
            tbCategoriasHabitacionescate_UsuModificacionNavigation = new HashSet<tbCategoriasHabitaciones>();
            tbCentroscent_UsuCreacionNavigation = new HashSet<tbCentros>();
            tbCentroscent_UsuModificacionNavigation = new HashSet<tbCentros>();
            tbCentrosmuni = new HashSet<tbCentros>();
            tbDepartamentosdepa_UsuCreacionNavigation = new HashSet<tbDepartamentos>();
            tbDepartamentosdepa_UsuModificacionNavigation = new HashSet<tbDepartamentos>();
            tbDietasdiet_UsuCreacionNavigation = new HashSet<tbDietas>();
            tbDietasdiet_UsuModificacionNavigation = new HashSet<tbDietas>();
            tbDonacionesXCentrodonacent_UsuCreacionNavigation = new HashSet<tbDonacionesXCentro>();
            tbDonacionesXCentrodonacent_UsuModificacionNavigation = new HashSet<tbDonacionesXCentro>();
            tbDonacionesdona_UsuCreacionNavigation = new HashSet<tbDonaciones>();
            tbDonacionesdona_UsuModificacionNavigation = new HashSet<tbDonaciones>();
            tbEmpleadosempe_UsuCreacionNavigation = new HashSet<tbEmpleados>();
            tbEmpleadosempe_UsuModificacionNavigation = new HashSet<tbEmpleados>();
            tbEncargadosenca_UsuCreacionNavigation = new HashSet<tbEncargados>();
            tbEncargadosenca_UsuModificacionNavigation = new HashSet<tbEncargados>();
            tbEnfermedadesenfe_UsuCreacionNavigation = new HashSet<tbEnfermedades>();
            tbEnfermedadesenfe_UsuModificacionNavigation = new HashSet<tbEnfermedades>();
            tbEstadosCivilesestacivi_UsuCreacionNavigation = new HashSet<tbEstadosCiviles>();
            tbEstadosCivilesestacivi_UsuModificacionNavigation = new HashSet<tbEstadosCiviles>();
            tbExpedientesexpe_UsuCreacionNavigation = new HashSet<tbExpedientes>();
            tbExpedientesexpe_UsuModificacionNavigation = new HashSet<tbExpedientes>();
            tbHabitacionesXResidentehabiresi_UsuCreacionNavigation = new HashSet<tbHabitacionesXResidente>();
            tbHabitacionesXResidentehabiresi_UsuModificacionNavigation = new HashSet<tbHabitacionesXResidente>();
            tbHabitacioneshabi_UsuCreacionNavigation = new HashSet<tbHabitaciones>();
            tbHabitacioneshabi_UsuModificacionNavigation = new HashSet<tbHabitaciones>();
            tbHistorialExpedienteshistexpe_UsuCreacionNavigation = new HashSet<tbHistorialExpedientes>();
            tbHistorialExpedienteshistexpe_UsuModificacionNavigation = new HashSet<tbHistorialExpedientes>();
            tbHistorialPagospago_UsuCreacionNavigation = new HashSet<tbHistorialPagos>();
            tbHistorialPagospago_UsuModificacionNavigation = new HashSet<tbHistorialPagos>();
            tbMedicamentosmedi_UsuCreacionNavigation = new HashSet<tbMedicamentos>();
            tbMedicamentosmedi_UsuModificacionNavigation = new HashSet<tbMedicamentos>();
            tbMetodosPagometo_UsuCreacionNavigation = new HashSet<tbMetodosPago>();
            tbMetodosPagometo_UsuModificacionNavigation = new HashSet<tbMetodosPago>();
            tbMuertosmuer_UsuCreacionNavigation = new HashSet<tbMuertos>();
            tbMuertosmuer_UsuModificacionNavigation = new HashSet<tbMuertos>();
            tbMunicipiosmuni_UsuCreacionNavigation = new HashSet<tbMunicipios>();
            tbMunicipiosmuni_UsuModificacionNavigation = new HashSet<tbMunicipios>();
            tbPantallasPorRolespantrole_UsuCreacionNavigation = new HashSet<tbPantallasPorRoles>();
            tbPantallasPorRolespantrole_UsuModificacionNavigation = new HashSet<tbPantallasPorRoles>();
            tbParentescospare_UsuCreacionNavigation = new HashSet<tbParentescos>();
            tbParentescospare_UsuModificacionNavigation = new HashSet<tbParentescos>();
            tbProveedoresprov_UsuCreacionNavigation = new HashSet<tbProveedores>();
            tbProveedoresprov_UsuModificacionNavigation = new HashSet<tbProveedores>();
            tbResidentesresi_UsuCreacionNavigation = new HashSet<tbResidentes>();
            tbResidentesresi_UsuModificacionNavigation = new HashSet<tbResidentes>();
            tbRolesrole_UsuCreacionNavigation = new HashSet<tbRoles>();
            tbRolesrole_UsuModificacionNavigation = new HashSet<tbRoles>();
            tbTiposSangretiposang_UsuCreacionNavigation = new HashSet<tbTiposSangre>();
            tbTiposSangretiposang_UsuModificacionNavigation = new HashSet<tbTiposSangre>();
        }

        public int usua_Id { get; set; }
        public string usua_NombreUsuario { get; set; }
        public string usua_Contrasena { get; set; }
        public bool? usua_EsAdmin { get; set; }
        public int? role_Id { get; set; }
        public int? empe_Id { get; set; }
        public int? usua_UsuCreacion { get; set; }
        public DateTime usua_FechaCreacion { get; set; }
        public int? usua_UsuModificacion { get; set; }
        public DateTime? usua_FechaModificacion { get; set; }
        public bool? usua_Estado { get; set; }

        public virtual tbRoles role { get; set; }
        public virtual tbUsuarios usua_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbUsuarios> Inverseusua_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbUsuarios> Inverseusua_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbActividades> tbActividadesacti_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbActividades> tbActividadesacti_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbAgendaDetalles> tbAgendaDetallesagendeta_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbAgendaDetalles> tbAgendaDetallesagendeta_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbAgendas> tbAgendasagen_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbAgendas> tbAgendasagen_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbCargos> tbCargoscarg_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbCargos> tbCargoscarg_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbCategoriasHabitaciones> tbCategoriasHabitacionescate_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbCategoriasHabitaciones> tbCategoriasHabitacionescate_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbCentros> tbCentroscent_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbCentros> tbCentroscent_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbCentros> tbCentrosmuni { get; set; }
        public virtual ICollection<tbDepartamentos> tbDepartamentosdepa_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbDepartamentos> tbDepartamentosdepa_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbDietas> tbDietasdiet_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbDietas> tbDietasdiet_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbDonacionesXCentro> tbDonacionesXCentrodonacent_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbDonacionesXCentro> tbDonacionesXCentrodonacent_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbDonaciones> tbDonacionesdona_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbDonaciones> tbDonacionesdona_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosempe_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosempe_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEncargados> tbEncargadosenca_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbEncargados> tbEncargadosenca_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEnfermedades> tbEnfermedadesenfe_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbEnfermedades> tbEnfermedadesenfe_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivilesestacivi_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivilesestacivi_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbExpedientes> tbExpedientesexpe_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbExpedientes> tbExpedientesexpe_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbHabitacionesXResidente> tbHabitacionesXResidentehabiresi_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbHabitacionesXResidente> tbHabitacionesXResidentehabiresi_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbHabitaciones> tbHabitacioneshabi_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbHabitaciones> tbHabitacioneshabi_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbHistorialExpedientes> tbHistorialExpedienteshistexpe_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbHistorialExpedientes> tbHistorialExpedienteshistexpe_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbHistorialPagos> tbHistorialPagospago_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbHistorialPagos> tbHistorialPagospago_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbMedicamentos> tbMedicamentosmedi_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbMedicamentos> tbMedicamentosmedi_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbMetodosPago> tbMetodosPagometo_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbMetodosPago> tbMetodosPagometo_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbMuertos> tbMuertosmuer_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbMuertos> tbMuertosmuer_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipiosmuni_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipiosmuni_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolespantrole_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolespantrole_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbParentescos> tbParentescospare_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbParentescos> tbParentescospare_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbProveedores> tbProveedoresprov_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbProveedores> tbProveedoresprov_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbResidentes> tbResidentesresi_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbResidentes> tbResidentesresi_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesrole_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesrole_UsuModificacionNavigation { get; set; }
        public virtual ICollection<tbTiposSangre> tbTiposSangretiposang_UsuCreacionNavigation { get; set; }
        public virtual ICollection<tbTiposSangre> tbTiposSangretiposang_UsuModificacionNavigation { get; set; }
    }
}