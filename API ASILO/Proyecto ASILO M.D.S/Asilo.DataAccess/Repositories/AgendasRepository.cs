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
    public class AgendasRepository : IRepository<tbAgendas, VW_tbAgendas>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@agen_Id", id, DbType.Int32, ParameterDirection.Input);
            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarAgenda, parametros, commandType: System.Data.CommandType.StoredProcedure);

            result.CodeStatus = resultado;

            return result;
        }



        public VW_tbAgendas Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@agen_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbAgendas>(ScriptsDataBase.AgendaFind, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbAgendas item)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@agen_Nombre", item.agen_Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("@agen_UsuCreacion", item.agen_UsuCreacion, DbType.Int32, ParameterDirection.Input);
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var result = db.QueryFirst<int>(ScriptsDataBase.AgregarAgenda, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus reques = new()
            {
                CodeStatus = result,
                MessageStatus = "Agenda insertada"
            };

            return reques;
        }

        public IEnumerable<VW_tbAgendas> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();

            return db.Query<VW_tbAgendas>(ScriptsDataBase.Agenda_List, null, commandType: CommandType.StoredProcedure);
        }
      

        public RequestStatus Update(tbAgendas item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@agen_Id", item.agen_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@agen_Nombre", item.agen_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@agen_UsuModificacion", item.agen_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ActualizarAgenda, parametros, commandType: System.Data.CommandType.StoredProcedure);
            result.CodeStatus = resultado;

            return result;
        }

        public IEnumerable<VW_tbAgendaDetalles> ListDetalles(int id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@agen_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_tbAgendaDetalles>(ScriptsDataBase.AgendaDetalle_List, parametros, commandType: CommandType.StoredProcedure);
        }

    }
}
