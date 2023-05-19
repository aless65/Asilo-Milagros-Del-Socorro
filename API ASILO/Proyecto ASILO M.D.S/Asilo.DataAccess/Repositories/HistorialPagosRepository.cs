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
    public class HistorialPagosRepository : IRepository<tbHistorialPagos, VW_tbHistorialPagos>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pago_Id", id, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarHistorialPagos, parametros, commandType: System.Data.CommandType.StoredProcedure);

            result.CodeStatus = resultado;

            return result;
        }

        public VW_tbHistorialPagos Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@pago_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbHistorialPagos>(ScriptsDataBase.HistorialPagosFind, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbHistorialPagos item)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@resi_Id", item.resi_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@meto_Id", item.meto_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@pago_Fecha", item.pago_Fecha, DbType.Date, ParameterDirection.Input);
            parameters.Add("@pago_UsuCreacion", item.pago_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var result = db.QueryFirst<int>(ScriptsDataBase.AgregarHistorialPagos, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Historial de pago insertado"
            };

            return reques;
        }

        public IEnumerable<VW_tbHistorialPagos> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();

            return db.Query<VW_tbHistorialPagos>(ScriptsDataBase.HistorialPagosList, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbHistorialPagos item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@pago_Id", item.pago_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@resi_Id", item.resi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@meto_Id", item.meto_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pago_Fecha", item.pago_Fecha, DbType.Date, ParameterDirection.Input);
            parametros.Add("@pago_UsuModificacion", item.pago_UsuModificacion, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.ActualizarHistorialPagos, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.CodeStatus = resultado;
            return result;
        }

       

    }
}
