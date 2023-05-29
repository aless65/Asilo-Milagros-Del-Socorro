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
    public class HabitacionesRepository : IRepository<tbHabitaciones, VW_tbHabitaciones>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@habi_Id", id, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarHabitaciones, parametros, commandType: System.Data.CommandType.StoredProcedure);

            result.CodeStatus = resultado;

            return result;
        }

        public VW_tbHabitaciones Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@habi_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbHabitaciones>(ScriptsDataBase.HabitacionesFind, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbHabitaciones item)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@habi_Numero", item.habi_Numero, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@cate_Id", item.cate_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@habi_UsuCreacion", item.habi_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var result = db.QueryFirst<int>(ScriptsDataBase.AgregarHabitacion, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Habitación insertada"
            };

            return reques;
        }

        public IEnumerable<VW_tbHabitaciones> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();

            return db.Query<VW_tbHabitaciones>(ScriptsDataBase.HabitacionesList, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbHabitaciones item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@habi_Id", item.habi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@habi_Numero", item.habi_Numero, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cate_Id", item.cate_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@habi_UsuModificacion", item.habi_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ActualizarHabitaciones, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.CodeStatus = resultado;

            return result;
        }

        public IEnumerable<VW_tbHabitaciones> ListHabitacionesDisponibles(int cent_Id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("cent_Id", cent_Id, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_tbHabitaciones>(ScriptsDataBase.HabitacionesListDisponibles, parametros, commandType: CommandType.StoredProcedure);
        }

    }
}
