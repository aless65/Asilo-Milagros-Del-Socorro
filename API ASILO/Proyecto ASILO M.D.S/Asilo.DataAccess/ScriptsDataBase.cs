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

        #endregion

        #region Pantallas

        #endregion

        #region Roles

        #endregion

        #region Departamentos

        #endregion

        #region Municipios

        #endregion

        #region Estados Civiles

        #endregion

        #region Actividades

        #endregion

        #region Agendas
        public static string Agenda_List = "asil.UDP_asil_tbAgendas_List";
        public static string AgendaFind = "asil.UDP_asil_tbAgendas_Find";
        public static string AgregarAgenda = "asil.UDP_tbAgendas_Agregar";
        public static string ActualizarAgenda = "asil.UDP_tbAgendas_Actualizar";
        public static string EliminarAgenda = "asil.UPD_tbAgendas_Eliminar";

        #endregion

        #region Cargos

        #endregion

        #region Categorias Habitaciones

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

        #endregion

        #region Empleados
        public static string EmpleadosList = "asil.UDP_asil_tbEmpleados_List";
        public static string EmpleadosFind = "asil.UDP_asil_tbEmpleados_Find";
        public static string AgregarEmpleados = "asil.UDP_asil_tbEmpleados_Insert";
        public static string ActualizarEmpleados = "asil.UDP_tnEmpleados_Actualizar";
        public static string EliminarEmpleados = "asil.UPD_tbEmpleados_Eliminar";

        #endregion

        #region Encargados

        #endregion

        #region Enfermedades
        public static string UDP_Lista_Enfermedades = "asil.UDP_asil_tbEnfermedades_List";
        public static string UDP_Inserta_Enfermedades = "asil.UDP_asil_tbEnfermedades_Insert";
        public static string UDP_Find_Enfermedades = "asil.UDP_asil_VW_tbEnfermedades_Find";
        public static string UDP_Edita_Enfermedades = "asil.UDP_asil_tbEnfermedades_Update";
        public static string UDP_Elimina_Enfermedades = "asil.UDP_asil_tbEnfermedades_Delete";

        #endregion

        #region Expedientes

        #endregion

        #region Habitaciones

        #endregion

        #region Historial de pagos
        public static string HistorialPagosList = "asil.UDP_asil_tbHistorialPagos_List";
        public static string HistorialPagosFind = "asil.UDP_asil_tbHistorialPagos_Find";
        public static string AgregarHistorialPagos = "asil.UDP_tbHistorialPagos_Agregar";
        public static string ActualizarHistorialPagos = "asil.UDP_tbHistorialPagos_Actualizar";
        public static string EliminarHistorialPagos = "asil.UPD_tbHistorialPagos_Eliminar";

        #endregion

        #region Medicamentos

        #endregion

        #region Métodos Pago

        #endregion

        #region Muertos

        #endregion

        #region Parentescos

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

        #endregion

        #region Tipos de sangre

        #endregion
    }
}
