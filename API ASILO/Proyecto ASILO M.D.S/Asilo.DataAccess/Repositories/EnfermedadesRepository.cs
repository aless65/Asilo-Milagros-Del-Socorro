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
    public class EnfermedadesRepository : IRepository<tbEnfermedades, VW_tbEnfermedades>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@enfe_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Elimina_Enfermedades, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public VW_tbEnfermedades Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@enfe_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbEnfermedades>(ScriptsDataBase.UDP_Find_Enfermedades, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbEnfermedades item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@enfe_Nombre", item.enfe_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@enfe_UsuCreacion", item.enfe_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Inserta_Enfermedades, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbEnfermedades> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbEnfermedades>(ScriptsDataBase.UDP_Lista_Enfermedades, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEnfermedades item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@enfe_Id", item.enfe_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@enfe_Nombre", item.enfe_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@enfe_UsuModificacion", item.enfe_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Edita_Enfermedades, parametros, commandType: CommandType.StoredProcedure);


            return result;
        }
    }
}
