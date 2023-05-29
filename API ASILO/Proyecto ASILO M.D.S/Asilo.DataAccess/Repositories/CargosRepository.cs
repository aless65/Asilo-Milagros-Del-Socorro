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
    public class CargosRepository : IRepository<tbCargos, VW_tbCargos>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@carg_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Delete_Cargos, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public VW_tbCargos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbCargos item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@carg_Nombre", item.carg_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_UsuCreacion", item.carg_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Insert_Cargos, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbCargos> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            return db.Query<VW_tbCargos>(ScriptsDataBase.UDP_Lista_Cargos, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCargos item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@carg_Nombre", item.carg_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_UsuModificacion", item.carg_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Update_Cargos, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }
    }
}
