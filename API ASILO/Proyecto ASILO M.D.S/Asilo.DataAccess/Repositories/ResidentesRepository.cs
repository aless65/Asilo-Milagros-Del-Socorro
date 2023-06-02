using Asilo.Entities.Entities;
using System;
using System.Collections.Generic;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess.Repositories
{
    public class ResidentesRepository : IRepository<tbResidentes, VW_tbResidentes>
    {
        public RequestStatus Delete(int id)
        {

            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@resi_Id", id, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarResidentes, parametros, commandType: System.Data.CommandType.StoredProcedure);

            result.CodeStatus = resultado;

            return result;
        }

        public VW_tbResidentes Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@resi_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbResidentes>(ScriptsDataBase.ResidentesFind, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbResidentes item)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@resi_Nombres", item.resi_Nombres, DbType.String, ParameterDirection.Input);
            parameters.Add("@resi_Apellidos", item.resi_Apellidos, DbType.String, ParameterDirection.Input);
            parameters.Add("@resi_Identidad", item.resi_Identidad, DbType.String, ParameterDirection.Input);
            parameters.Add("@estacivi_Id", item.estacivi_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_Nacimiento", item.resi_Nacimiento, DbType.Date, ParameterDirection.Input);
            parameters.Add("@resi_Sexo", item.resi_Sexo, DbType.String, ParameterDirection.Input);
            parameters.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@diet_Id", item.diet_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_FechaIngreso", item.resi_FechaIngreso, DbType.Date, ParameterDirection.Input);
            parameters.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@agen_Id", item.agen_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_UsuCreacion", item.resi_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var result = db.QueryFirst<int>(ScriptsDataBase.AgregarResidentes, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Residente insertado"
            };

            return reques;
        }

        public IEnumerable<VW_tbResidentes> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            return db.Query<VW_tbResidentes>(ScriptsDataBase.ResidentesList, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbResidentes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@resi_Id", item.resi_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_Nombres", item.resi_Nombres, DbType.String, ParameterDirection.Input);
            parameters.Add("@resi_Apellidos", item.resi_Apellidos, DbType.String, ParameterDirection.Input);
            parameters.Add("@resi_Identidad", item.resi_Identidad, DbType.String, ParameterDirection.Input);
            parameters.Add("@estacivi_Id", item.estacivi_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_Nacimiento", item.resi_Nacimiento, DbType.Date, ParameterDirection.Input);
            parameters.Add("@resi_Sexo", item.resi_Sexo, DbType.String, ParameterDirection.Input);
            parameters.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@diet_Id", item.diet_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_FechaIngreso", item.resi_FechaIngreso, DbType.Date, ParameterDirection.Input);
            parameters.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@agen_Id", item.agen_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_UsuCreacion", item.resi_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_UsuModificacion", item.resi_UsuModificacion, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.ActualizarResidentes, parameters, commandType: System.Data.CommandType.StoredProcedure);
            result.CodeStatus = resultado;
            return result;
        }


        public RequestStatus IdentidadExiste(string resi_Identidad)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@resi_Identidad", resi_Identidad, DbType.String, ParameterDirection.Input);

            result = db.QueryFirst<RequestStatus>(ScriptsDataBase.IdentidadExisteResi, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public RequestStatus InsertPrincipal(VW_tbResidentes_Form item)
        {
            RequestStatus result = new RequestStatus();

            var parameters = new DynamicParameters();

            parameters.Add("@resi_Nombres", item.resi_Nombres, DbType.String, ParameterDirection.Input);
            parameters.Add("@resi_Apellidos", item.resi_Apellidos, DbType.String, ParameterDirection.Input);
            parameters.Add("@resi_Identidad", item.resi_Identidad, DbType.String, ParameterDirection.Input);
            parameters.Add("@estacivi_IdResi", item.estacivi_IdResi, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_Nacimiento", item.resi_Nacimiento, DbType.Date, ParameterDirection.Input);
            parameters.Add("@resi_Sexo", item.resi_Sexo, DbType.String, ParameterDirection.Input);
            parameters.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@diet_Id", item.diet_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_FechaIngreso", item.resi_FechaIngreso, DbType.Date, ParameterDirection.Input);
            parameters.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@agen_Id", item.agen_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@resi_UsuCreacion", item.resi_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@enca_Nombres", item.enca_Nombres, DbType.String, ParameterDirection.Input);
            parameters.Add("@enca_Apellidos", item.enca_Apellidos, DbType.String, ParameterDirection.Input);
            parameters.Add("@enca_Identidad", item.enca_Identidad, DbType.String, ParameterDirection.Input);
            parameters.Add("@estacivi_IdEnca", item.estacivi_IdEnca, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@enca_Nacimiento", item.enca_Nacimiento, DbType.Date, ParameterDirection.Input);
            parameters.Add("@enca_Sexo", item.enca_Sexo, DbType.String, ParameterDirection.Input);
            parameters.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parameters.Add("@enca_Direccion", item.enca_Direccion, DbType.String, ParameterDirection.Input);
            parameters.Add("@enca_Telefono", item.enca_Telefono, DbType.String, ParameterDirection.Input);
            parameters.Add("@resi_Id", null, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@pare_Id", item.pare_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@tiposang_Id", item.tiposang_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@expe_FechaApertura", item.expe_FechaApertura, DbType.Date, ParameterDirection.Input);
            parameters.Add("@expe_Fotografia", item.expe_Fotografia, DbType.String, ParameterDirection.Input);
            parameters.Add("@diet_Desayuno", item.diet_Desayuno, DbType.String, ParameterDirection.Input);
            parameters.Add("@diet_Almuerzo", item.diet_Almuerzo, DbType.String, ParameterDirection.Input);
            parameters.Add("@diet_Cena", item.diet_Cena, DbType.String, ParameterDirection.Input);
            parameters.Add("@diet_Merienda", item.diet_Merienda, DbType.String, ParameterDirection.Input);
            parameters.Add("@diet_Restricciones", item.diet_Restricciones, DbType.String, ParameterDirection.Input);
            parameters.Add("@diet_Observaciones", item.diet_Observaciones, DbType.String, ParameterDirection.Input);
            parameters.Add("@meto_Id", item.meto_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@pago_Fecha", item.pago_Fecha, DbType.Date, ParameterDirection.Input);
            parameters.Add("@habi_Id", item.habi_Id, DbType.Int32, ParameterDirection.Input);

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ResidentesForm, parameters, commandType: CommandType.StoredProcedure);

            if(result.CodeStatus == 1)
            {
                string[] ids = result.MessageStatus.Split("||", StringSplitOptions.RemoveEmptyEntries);

                if(item.expe_Enfermedades != null)
                {
                    foreach (var enfermedad in item.expe_Enfermedades)
                    {
                        var parameters2 = new DynamicParameters();
                        parameters2.Add("@resi_Id", ids[1], DbType.Int32, ParameterDirection.Input);
                        parameters2.Add("@enfe_Id", enfermedad, DbType.Int32, ParameterDirection.Input);
                        parameters2.Add("@enferesi_UsuCreacion", item.resi_UsuCreacion, DbType.Int32, ParameterDirection.Input);

                        var respuesta = db.QueryFirst<string>(ScriptsDataBase.UDP_Inserta_EnfermedadesXResidente, parameters2, commandType: CommandType.StoredProcedure);

                        if (respuesta == "Ha ocurrido un error")
                        {
                            result.MessageStatus = "Ha ocurrido un error en la asignación de enfermedades";
                            break;
                        }
                        else
                        {
                            result.MessageStatus = "todo biennnn";
                        }
                    }
                }
                else
                {
                    result.MessageStatus = "todo biennnn";
                }

                if (item.agen_Detalles != null && item.agen_Id != 1)
                {
                    foreach (var detalle in item.agen_Detalles)
                    {
                        var parameters2 = new DynamicParameters();
                        parameters2.Add("@agen_Id", ids[0], DbType.Int32, ParameterDirection.Input);
                        parameters2.Add("@agendeta_HoraStart", detalle.agendeta_HoraStart, DbType.String, ParameterDirection.Input);
                        parameters2.Add("@agendeta_HoraEnd", detalle.agendeta_HoraEnd, DbType.String, ParameterDirection.Input);
                        parameters2.Add("@acti_Id", detalle.acti_Id, DbType.Int32, ParameterDirection.Input);
                        parameters2.Add("@medi_Id", detalle.medi_Id, DbType.Int32, ParameterDirection.Input);
                        parameters2.Add("@agendeta_Observaciones", detalle.agendeta_Observaciones, DbType.String, ParameterDirection.Input);
                        parameters2.Add("@agendeta_UsuCreacion", item.resi_UsuCreacion, DbType.Int32, ParameterDirection.Input);

                        var respuesta = db.QueryFirst<string>(ScriptsDataBase.AgendaDetalle_Insert, parameters2, commandType: CommandType.StoredProcedure);

                        if (respuesta == "Ha ocurrido un error")
                        {
                            result.MessageStatus = "Ha ocurrido un error al insertar los detalles de la agenda";
                            break;
                        }
                        else
                        {
                            result.MessageStatus = "todo biennnn";
                        }
                    }
                }
                else
                {
                    result.MessageStatus = "todo biennnn";
                }
            }

            //RequestStatus reques = new()
            //{
            //    MessageStatus = result
            //};

            return result;
        }

    }
}
