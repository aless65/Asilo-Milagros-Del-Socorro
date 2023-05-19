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

        #endregion

        #region Cargos

        #endregion

        #region Categorias Habitaciones

        #endregion

        #region Centros

        #endregion

        #region Dietas

        #endregion

        #region Donaciones

        #endregion

        #region Empleados

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
        public static string UDP_Lista_Expedientes = "asil.UDP_asil_tbExpedientes_List";
        public static string UDP_Inserta_Expedientes = "asil.UDP_asil_tbExpedientes_Insert";
        public static string UDP_Find_Expedientes = "asil.UDP_asil_tbExpedientes_Find";
        public static string UDP_Edita_Expedientes = "asil.UDP_asil_tbExpedientes_Update";
        public static string UDP_Elimina_Expedientes = "asil.UDP_asil_tbExpedientes_Delete";

        public static string UDP_Lista_HistorialExpedientes = "asil.UDP_asil_tbHistorialExpedientes_List";
        public static string UDP_Inserta_HistorialExpedientes = "asil.UDP_asil_tbHistorialExpedientes_Insert";
        public static string UDP_Edita_HistorialExpedientes = "asil.UDP_asil_tbHistorialExpedientes_Update";
        public static string UDP_Elimina_HistorialExpedientes = "asil.UDP_asil_tbHistorialExpedientes_Delete";
        #endregion

        #region Habitaciones

        #endregion

        #region Historial de pagos

        #endregion

        #region Medicamentos
        public static string UDP_Lista_Medicamentos = "asil.UDP_asil_tbMedicamentos_List";
        public static string UDP_Inserta_Medicamentos = "asil.UDP_asil_tbMedicamentos_Insert";
        public static string UDP_Find_Medicamentos = "asil.UDP_asil_tbMedicamentos_Find";
        public static string UDP_Edita_Medicamentos = "asil.UDP_asil_tbMedicamentos_Update";
        public static string UDP_Elimina_Medicamentos = "asil.UDP_asil_tbMedicamentos_Delete";
        #endregion

        #region Métodos Pago

        #endregion

        #region Muertos

        #endregion

        #region Parentescos

        #endregion

        #region Proveedores

        #endregion

        #region Residentes

        #endregion

        #region Tipos de sangre

        #endregion
    }
}
