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
    public class MetodosPagoRepository : IRepository<tbMetodosPago, tbMetodosPago>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbMetodosPago Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMetodosPago item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbMetodosPago> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<tbMetodosPago>(ScriptsDataBase.UDP_Lista_MetodosPago, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMetodosPago item)
        {
            throw new NotImplementedException();
        }
    }
}
