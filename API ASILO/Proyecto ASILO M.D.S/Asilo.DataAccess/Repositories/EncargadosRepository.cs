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
    public class EncargadosRepository : IRepository<tbEncargados, VW_tbEncargados>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@enca_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Elimina_Encargados, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public VW_tbEncargados Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@enca_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbEncargados>(ScriptsDataBase.UDP_Find_Encargados, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbEncargados item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@enca_Nombres", item.enca_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@enca_Apellidos", item.enca_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@enca_Identidad", item.enca_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@estacivi_Id", item.estacivi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@enca_Nacimiento", item.enca_Nacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@enca_Sexo", item.enca_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@enca_Direccion", item.enca_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@enca_Telefono", item.enca_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@resi_Id", item.resi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pare_Id", item.pare_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@enca_UsuCreacion", item.enca_UsuCreacion, DbType.Int32, ParameterDirection.Input);


            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Inserta_Encargados, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbEncargados> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbEncargados>(ScriptsDataBase.UDP_Lista_Encargados, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEncargados item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@enca_Id", item.enca_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@enca_Nombres", item.enca_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@enca_Apellidos", item.enca_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@enca_Identidad", item.enca_Identidad, DbType.String, ParameterDirection.Input);
            parametros.Add("@estacivi_Id", item.estacivi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@enca_Nacimiento", item.enca_Nacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@enca_Sexo", item.enca_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@enca_Direccion", item.enca_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@enca_Telefono", item.enca_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@resi_Id", item.resi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pare_Id", item.pare_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@enca_UsuCreacion", item.enca_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Edita_Encargados, parametros, commandType: CommandType.StoredProcedure);


            return result;
        }
    }
}
