using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess
{
    public class ScriptsDataBase
    {
        #region Usuarios
        public static string UDP_Lista_Usuarios = "acce.UDP_acce_tbUsuarios_List";
        public static string UDP_Inserta_Usuarios = "acce.UDP_acce_tbUsuarios_Insert";
        public static string UDP_Find_Usuarios = "acce.UDP_acce_VW_tbUsuarios_Find";
        public static string UDP_Edita_Usuarios = "acce.UDP_acce_tbUsuarios_UPDATE";
        public static string UDP_Elimina_Usuarios = "acce.UDP_acce_tbUsuarios_DELETE";
        public static string Login = "acce.UDP_Login";

        #endregion

        #region Roles
        public static string UDP_Lista_Roles = "acce.UDP_acce_tbRoles_List";
        public static string UDP_Find_Roles = "acce.UDP_acce_tbRoles_Find";
        public static string UDP_Inserta_Roles = "acce.UDP_acce_tbRoles_Insert";
        public static string UDP_Edita_Roles = "acce.UDP_acce_tbRoles_Update";
        public static string UDP_Elimina_Roles = "acce.UDP_acce_tbRoles_Delete";

        public static string UDP_Lista_RolesXPantalla = "acce.UDP_acce_tbPantallasPorRoles_List";
        public static string UDP_Inserta_RolesXPantalla = "acce.UDP_acce_tbPantallasPorRoles_Insert";
        public static string UDP_Elimina_RolesXPantalla = "acce.UDP_acce_tbPantallaPorRoles_Delete";
        #endregion

        #region Pantallas
        public static string UDP_Lista_Pantallas = "acce.UDP_acce_tbPantallas_List";
        public static string UDP_Lista_PantallasMenu = "acce.UDP_opti_tbPantallas_ListMenu";

        public static string UDP_Accesos_Pantallas = "acce.UDP_tbRolesPorPantalla_Accesos";
        #endregion

        #region Departamentos
        public static string UDP_Lista_Departamentos = "gral.UDP_gral_tbDepartamentos_List";
        #endregion

        #region Municipios
        public static string UDP_Lista_Municipios = "gral.UDP_gral_tbMunicipios_List";
        #endregion

        #region Estados Civiles
        public static string UDP_Lista_EstadosCiviles = "gral.UDP_gral_tbEstadosCiviles_List";
        #endregion

        #region Actividades
        public static string UDP_Lista_Actividades = "asil.UDP_asil_tbActividades_List";
        #endregion

        #region Agendas
        public static string Agenda_List = "asil.UDP_asil_tbAgendas_List";
        public static string AgendaFind = "asil.UDP_asil_tbAgendas_Find";
        public static string AgregarAgenda = "asil.UDP_tbAgendas_Agregar";
        public static string ActualizarAgenda = "asil.UDP_tbAgendas_Actualizar";
        public static string EliminarAgenda = "asil.UPD_tbAgendas_Eliminar";

        public static string AgendaDetalle_List = "asil.UDP_asil_tbAgendaDetalles_List";
        public static string AgendaDetalle_Insert = "asil.UDP_asil_tbAgendaDetalles_EditOficial";
        public static string AgendaDetalle_Delete = "asil.UDP_asil_tbAgendaDetalles_Delete";
        #endregion

        #region Cargos
        public static string UDP_Lista_Cargos = "asil.UDP_asil_tbCargos_List";
        public static string UDP_Insert_Cargos = "asil.UDP_asil_tbCargos_Insert";
        public static string UDP_Update_Cargos = "asil.UDP_asil_tbCargos_Update";
        public static string UDP_Delete_Cargos = "asil.UDP_asil_tbCargos_Delete";
        #endregion

        #region Categorias Habitaciones
        public static string UDP_Lista_CategoriasHabitaciones = "asil.UDP_asil_tbCategoriasHabitaciones_List";
        #endregion

        #region Centros
        public static string CentroList = "asil.UDP_asil_tbCentros_List";
        public static string CentroFind = "asil.UDP_asil_VW_tbCentros_Find";
        public static string AgregarCentro= "asil.UDP_asil_tbCentros_Insert";
        public static string ActualizarCentro = "asil.UDP_asil_tbCentros_Update";
        public static string EliminarCentro = "asil.UDP_asil_tbCentros_Delete";
        #endregion

        #region Dietas

        #endregion

        #region Donaciones
        public static string UDP_Lista_Donaciones = "asil.UDP_asil_tbDonaciones_List";
        public static string UDP_Inserta_Donaciones = "asil.UDP_asil_tbDonaciones_Insert";
        public static string UDP_Find_Donaciones = "asil.UDP_asil_VW_tbDonaciones_Find";
        public static string UDP_Edita_Donaciones = "asil.UDP_asil_tbDonaciones_Update";
        public static string UDP_Elimina_Donaciones = "asil.UDP_asil_tbDonaciones_Delete";
        #endregion

        #region Empleados
        public static string EmpleadosList = "asil.UDP_asil_tbEmpleados_List";
        public static string EmpleadosFind = "asil.UDP_asil_tbEmpleados_Find";
        public static string AgregarEmpleados = "asil.UDP_asil_tbEmpleados_Insert";
        public static string ActualizarEmpleados = "asil.UDP_tnEmpleados_Actualizar";
        public static string EliminarEmpleados = "asil.UPD_tbEmpleados_Eliminar";

        public static string EmpleadosListCuidadoresDisponibles = "asil.UDP_asil_tbEmpleados_List_Cuidadores_Dispo";
        #endregion

        #region Encargados
        public static string UDP_Lista_Encargados = "asil.UDP_asil_tbEncargados_List";
        public static string UDP_Inserta_Encargados = "asil.UDP_asil_tbEncargados_Insert";
        public static string UDP_Find_Encargados = "asil.UDP_asil_tbEncargados_Find";
        public static string UDP_Edita_Encargados = "asil.UDP_asil_tbEncargados_Update";
        public static string UDP_Elimina_Encargados = "asil.UDP_asil_tbEncargados_Delete";

        public static string IdentidadExisteEnca = "asil.confirmarIdentidadRepetidaEnca";
        #endregion

        #region Enfermedades
        public static string UDP_Lista_Enfermedades = "asil.UDP_asil_tbEnfermedades_List";
        public static string UDP_Inserta_Enfermedades = "asil.UDP_asil_tbEnfermedades_Insert";
        public static string UDP_Find_Enfermedades = "asil.UDP_asil_VW_tbEnfermedades_Find";
        public static string UDP_Edita_Enfermedades = "asil.UDP_asil_tbEnfermedades_Update";
        public static string UDP_Elimina_Enfermedades = "asil.UDP_asil_tbEnfermedades_Delete";
        #endregion

        #region Expedientes
        public static string UDP_Lista_Expedientes = "asil.UDP_asil_tbExpedientes_List";
        public static string UDP_Inserta_Expedientes = "asil.UDP_asil_tbExpedientes_Insert";
        public static string UDP_Find_Expedientes = "asil.UDP_asil_tbExpedientes_Find";
        public static string UDP_Edita_Expedientes = "asil.UDP_asil_tbExpedientes_Update";
        public static string UDP_Elimina_Expedientes = "asil.UDP_asil_tbExpedientes_Delete";

        public static string UDP_Lista_HistorialExpedientes = "asil.UDP_asil_tbHistorialExpedientes_List";
        public static string UDP_Inserta_HistorialExpedientes = "asil.UDP_asil_tbHistorialExpedientes_Insert";
        public static string UDP_Edita_HistorialExpedientes = "asil.UDP_asil_tbHistorialExpedientes_Update";
        public static string UDP_Elimina_HistorialExpedientes = "asil.UDP_asil_tbHistorialExpedientes_Delete";

        public static string ListarResidentesPagan = "asil.UDP_ListarResiPagan";
        #endregion

        #region Habitaciones
        public static string HabitacionesList = "asil.UDP_asil_tbHabitaciones_List";
        public static string HabitacionesFind = "asil.UDP_asil_tbHabitaciones_Find";
        public static string AgregarHabitacion = "asil.UDP_tbHabitaciones_Agregar";
        public static string ActualizarHabitaciones = "asil.UDP_tbHabitaciones_Actulaizar";
        public static string EliminarHabitaciones = "asil.UDP_asil_tbHabitaciones_Delete";

        public static string HabitacionesListDisponibles = "asil.UDP_asil_tbHabitaciones_ListDispo";
        #endregion

        #region Historial de pagos
        public static string HistorialPagosList = "asil.UDP_asil_tbHistorialPagos_List";
        public static string HistorialPagosFind = "asil.UDP_asil_tbHistorialPagos_Find";
        public static string AgregarHistorialPagos = "asil.UDP_tbHistorialPagos_Agregar";
        public static string ActualizarHistorialPagos = "asil.UDP_tbHistorialPagos_Actualizar";
        public static string EliminarHistorialPagos = "asil.UPD_tbHistorialPagos_Eliminar";

        #endregion

        #region Medicamentos
        public static string UDP_Lista_Medicamentos = "asil.UDP_asil_tbMedicamentos_List";
        public static string UDP_Inserta_Medicamentos = "asil.UDP_asil_tbMedicamentos_Insert";
        public static string UDP_Find_Medicamentos = "asil.UDP_asil_tbMedicamentos_Find";
        public static string UDP_Edita_Medicamentos = "asil.UDP_asil_tbMedicamentos_Update";
        public static string UDP_Elimina_Medicamentos = "asil.UDP_asil_tbMedicamentos_Delete";
        #endregion

        #region Métodos Pago
        public static string UDP_Lista_MetodosPago = "gral.UDP_asil_tbMetodosPagos_List";
        #endregion

        #region Muertos
        public static string UDP_Lista_Muertos = "asil.UDP_asil_tbMuertos_List";
        public static string UDP_Inserta_Muertos = "asil.UDP_asil_tbMuertos_Insert";
        public static string UDP_Find_Muertos = "asil.UDP_asil_tbMuertos_Find";
        public static string UDP_Edita_Muertos = "asil.UDP_asil_tbMuertos_Update";
        public static string UDP_Elimina_Muertos = "asil.UDP_asil_tbMuertos_Delete";
        #endregion

        #region Parentescos
        public static string UDP_Lista_Parentescos = "asil.UDP_asil_tbParentescos_List";
        #endregion

        #region Proveedores
        public static string ProveedoresList = "asil.UDP_asil_tbProveedores_List";
        public static string ProveedoresFind = "asil.UDP_asil_tbProveedores_Find";
        public static string AgregarProveedores = "asil.UDP_asil_tbProveedores_Insert";
        public static string ActualizarProveedores = "asil.UDP_asil_tbProveedores_Update";
        public static string EliminarProveedores = "asil.UDP_asil_tbProveedores_Delete";

        #endregion

        #region Residentes
        public static string ResidentesList = "asil.UDP_asil_tbResidentes_List";
        public static string ResidentesFind = "asil.UDP_asil_tbResidentes_Find";
        public static string AgregarResidentes = "asil.UDP_tbResidentes_Agregar";
        public static string ActualizarResidentes = "asil.UDP_tbResidentes_Actualizar";
        public static string EliminarResidentes = "asil.UPD_tbResidentes_Eliminar";

        public static string ResidentesForm = "asil.UDP_tbResidentes_InsertPrincipal";
        public static string IdentidadExisteResi = "asil.confirmarIdentidadRepetidaResi";

        #endregion

        #region Tipos de sangre

        #endregion
    }
}
