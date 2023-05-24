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
    public class RolesRepository : IRepository<tbRoles, tbRoles>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@role_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.EliminarRol, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public tbRoles Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRoles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@role_Nombre", item.role_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_UsuCreacion", item.role_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.AgregarRol, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbRoles> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbRoles>(ScriptsDataBase.RolList, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbRoles item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@role_Nombre", item.role_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_UsuModificacion", item.role_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.ActualizarRol, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        IEnumerable<tbRoles> IRepository<tbRoles, tbRoles>.List()
        {
            throw new NotImplementedException();
        }
    }
}
