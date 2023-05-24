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
    public class TiposSangreRepository : IRepository<tbTiposSangre, VW_tbTiposSangre>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbTiposSangre Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbTiposSangre item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbTiposSangre> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);

            return db.Query<VW_tbTiposSangre>(ScriptsDataBase.UDP_Lista_TiposSangre, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbTiposSangre item)
        {
            throw new NotImplementedException();
        }
    }
}
