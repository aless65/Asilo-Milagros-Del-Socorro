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
    public class MunicipiosRepository : IRepository<tbMunicipios, tbMunicipios>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbMunicipios Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMunicipios item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbMunicipios> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<tbMunicipios>(ScriptsDataBase.UDP_Lista_Municipios, null, commandType: CommandType.StoredProcedure);
        }
        //public IEnumerable<tbMunicipios> List(string depa)
        //{
        //    using var db = new SqlConnection(AsiloContext.ConnectionString);

        //    var parameters = new DynamicParameters();
        //    parameters.Add("@depa_Id", depa, DbType.String, ParameterDirection.Input);

        //    return db.Query<tbMunicipios>(ScriptsDataBase.UDP_Lista_Municipios, parameters, commandType: CommandType.StoredProcedure);
        //}


        public RequestStatus Update(tbMunicipios item)
        {
            throw new NotImplementedException();
        }
    }
}
