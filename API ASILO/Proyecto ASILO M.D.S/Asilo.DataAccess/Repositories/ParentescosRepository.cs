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
    public class ParentescosRepository : IRepository<tbParentescos, VW_tbParentescos>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbParentescos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbParentescos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbParentescos> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            return db.Query<VW_tbParentescos>(ScriptsDataBase.UDP_Lista_Parentescos, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbParentescos item)
        {
            throw new NotImplementedException();
        }
    }
}
