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
    public class CargosRepository : IRepository<tbCargos, VW_tbCargos>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbCargos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbCargos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbCargos> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            return db.Query<VW_tbCargos>(ScriptsDataBase.UDP_Lista_Cargos, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCargos item)
        {
            throw new NotImplementedException();
        }
    }
}
