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
    public class MuertosRepository : IRepository<tbMuertos, VW_tbMuertos>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@muer_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Elimina_Muertos, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public VW_tbMuertos Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@muer_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbMuertos>(ScriptsDataBase.UDP_Find_Encargados, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbMuertos item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@resi_Id", item.resi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muer_FechaYHora", item.muer_FechaYHora, DbType.DateTime, ParameterDirection.Input);
            parametros.Add("@muer_Descripcion", item.muer_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@muer_UsuCreacion", item.muer_UsuCreacion, DbType.Int32, ParameterDirection.Input);


            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Inserta_Muertos, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbMuertos> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbMuertos>(ScriptsDataBase.UDP_Lista_Muertos, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMuertos item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@muer_Id", item.muer_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@resi_Id", item.resi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muer_FechaYHora", item.muer_FechaYHora, DbType.DateTime, ParameterDirection.Input);
            parametros.Add("@muer_Descripcion", item.muer_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@muer_UsuModificacion", item.muer_UsuModificacion, DbType.Int32, ParameterDirection.Input);


            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Edita_Muertos, parametros, commandType: CommandType.StoredProcedure);


            return result;
        }
    }
}
