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
    public class DonacionesRepository : IRepository<tbDonaciones, VW_tbDonaciones>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@dona_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Elimina_Donaciones, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public VW_tbDonaciones Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@dona_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbDonaciones>(ScriptsDataBase.UDP_Find_Donaciones, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbDonaciones item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@dona_NombreDonante", item.dona_NombreDonante, DbType.String, ParameterDirection.Input);
            parametros.Add("@dona_Cantidad", item.dona_Cantidad, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@dona_Fecha", item.dona_Fecha, DbType.Date, ParameterDirection.Input);
            parametros.Add("@dona_UsuCreacion", item.dona_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Inserta_Donaciones, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbDonaciones> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbDonaciones>(ScriptsDataBase.UDP_Lista_Donaciones, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDonaciones item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@dona_Id", item.dona_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@dona_NombreDonante", item.dona_NombreDonante, DbType.String, ParameterDirection.Input);
            parametros.Add("@dona_Cantidad", item.dona_Cantidad, DbType.Decimal, ParameterDirection.Input);
            parametros.Add("@dona_Fecha", item.dona_Fecha, DbType.Date, ParameterDirection.Input);
            parametros.Add("@dona_UsuModificacion", item.dona_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Edita_Donaciones, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }
    }
}
