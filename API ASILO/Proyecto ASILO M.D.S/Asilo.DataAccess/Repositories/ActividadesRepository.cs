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
    public class ActividadesRepository : IRepository<tbActividades, VW_tbActividades>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbActividades Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbActividades item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbActividades> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbActividades>(ScriptsDataBase.UDP_Lista_Actividades, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbActividades item)
        {
            throw new NotImplementedException();
        }
    }
}
