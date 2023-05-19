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
    public class CentrosRepository : IRepository<tbCentros, VW_tbCentros>
    {

        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cent_Id", id, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarCentro, parametros, commandType: System.Data.CommandType.StoredProcedure);

            result.CodeStatus = resultado;

            return result;
        }

        public VW_tbCentros Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbCentros item)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@cent_Nombre", item.cent_Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@cent_Direccion", item.cent_Direccion, DbType.String, ParameterDirection.Input);
            parameters.Add("@cent_UsuCreacion", item.cent_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var result = db.QueryFirst<int>(ScriptsDataBase.AgregarCentro, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Centro insertado"
            };

            return reques;
        }

        public IEnumerable<VW_tbCentros> List()
        {

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();

            return db.Query<VW_tbCentros>(ScriptsDataBase.CentroList, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCentros item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cent_Nombre", item.cent_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cent_Direccion", item.cent_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@cent_UsuModificacion", item.cent_UsuModificacion, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.ActualizarCentro, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.CodeStatus = resultado;
            return result;
        }  
    }
}
