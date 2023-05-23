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


    }
}
