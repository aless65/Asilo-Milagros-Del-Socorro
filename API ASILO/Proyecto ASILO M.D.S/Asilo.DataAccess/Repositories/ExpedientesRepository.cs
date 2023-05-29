using Asilo.Entities.Entities;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess.Repositories
{
    public class ExpedientesRepository : IRepository<tbExpedientes, VW_tbExpedientes>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@expe_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Elimina_Expedientes, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public RequestStatus DeleteHistorial(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@histexpe_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Elimina_HistorialExpedientes, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public VW_tbExpedientes Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@expe_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbExpedientes>(ScriptsDataBase.UDP_Find_Expedientes, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbExpedientes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@resi_Id", item.resi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tiposang_Id", item.tiposang_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@expe_FechaApertura", item.expe_FechaApertura, DbType.Date, ParameterDirection.Input);
            parametros.Add("@expe_Fotografia", item.expe_Fotografia, DbType.String, ParameterDirection.Input);
            parametros.Add("@expe_UsuCreacion", item.expe_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Inserta_Expedientes, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public RequestStatus InsertHistorial(tbHistorialExpedientes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@expe_Id", item.expe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@histexpe_Observaciones", item.histexpe_Observaciones, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@histexpe_FechaActualizacion", item.histexpe_FechaActualizacion, DbType.Date, ParameterDirection.Input);
            parametros.Add("@histexpe_UsuCreacion", item.histexpe_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Inserta_HistorialExpedientes, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbExpedientes> ListarPagan()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbExpedientes>(ScriptsDataBase.ListarResidentesPagan, null, commandType: CommandType.StoredProcedure);
        }
        public IEnumerable<VW_tbExpedientes> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbExpedientes>(ScriptsDataBase.UDP_Lista_Expedientes, null, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<VW_tbHistorialExpedientes> ListHistorial(int id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@expe_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_tbHistorialExpedientes>(ScriptsDataBase.UDP_Lista_HistorialExpedientes, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbExpedientes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@expe_Id", item.expe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tiposang_Id", item.tiposang_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@expe_FechaApertura", item.expe_FechaApertura, DbType.Date, ParameterDirection.Input);
            parametros.Add("@expe_Fotografia", item.expe_Fotografia, DbType.String, ParameterDirection.Input);
            parametros.Add("@expe_UsuModificacion", item.expe_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Edita_Expedientes, parametros, commandType: CommandType.StoredProcedure);


            return result;
        }

        public RequestStatus UpdateHistorial(tbHistorialExpedientes item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@histexpe_Id", item.histexpe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@histexpe_Observaciones", item.histexpe_Observaciones, DbType.String, ParameterDirection.Input);
            parametros.Add("@empe_Id", item.empe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@histexpe_FechaActualizacion", item.histexpe_FechaActualizacion, DbType.Date, ParameterDirection.Input);
            parametros.Add("@histexpe_UsuModificacion", item.histexpe_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Edita_HistorialExpedientes, parametros, commandType: CommandType.StoredProcedure);


            return result;
        }
    }
}
