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
    public class MedicamentosRepository : IRepository<tbMedicamentos, VW_tbMedicamentos>
    {
        public RequestStatus Delete(int id)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@medi_Id", id, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Elimina_Medicamentos, parameters, commandType: CommandType.StoredProcedure);

            return result;
        }

        public VW_tbMedicamentos Find(int? id)
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@medi_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbMedicamentos>(ScriptsDataBase.UDP_Find_Medicamentos, parameters, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbMedicamentos item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@medi_Nombre", item.medi_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Id", item.prov_Id, DbType.Int32, ParameterDirection.Input);
           /* parametros.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@invecent_Stock", item.invecent_Stock, DbType.Int32, ParameterDirection.Input);*/
            parametros.Add("@medi_UsuCreacion", item.medi_UsuCreacion, DbType.Int32, ParameterDirection.Input);


            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Inserta_Medicamentos, parametros, commandType: CommandType.StoredProcedure);

            return result;
        }

        public IEnumerable<VW_tbMedicamentos> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbMedicamentos>(ScriptsDataBase.UDP_Lista_Medicamentos, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMedicamentos item)
        {
            RequestStatus result = new RequestStatus();

            using var db = new SqlConnection(AsiloContext.ConnectionString);

            var parametros = new DynamicParameters();
            parametros.Add("@medi_Id", item.medi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@medi_Nombre", item.medi_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@prov_Id", item.prov_Id, DbType.Int32, ParameterDirection.Input);
          /*  parametros.Add("@cent_Id", item.cent_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@invecent_Stock", item.invecent_Stock, DbType.Int32, ParameterDirection.Input);*/
            parametros.Add("@medi_UsuModificacion", item.medi_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            result.MessageStatus = db.QueryFirst<string>(ScriptsDataBase.UDP_Edita_Medicamentos, parametros, commandType: CommandType.StoredProcedure);


            return result;
        }
    }
}
