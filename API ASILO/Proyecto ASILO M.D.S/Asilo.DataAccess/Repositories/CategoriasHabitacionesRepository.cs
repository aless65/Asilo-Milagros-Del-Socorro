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
    public class CategoriasHabitacionesRepository : IRepository<tbCategoriasHabitaciones, VW_tbCategoriasHabitaciones>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public VW_tbCategoriasHabitaciones Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbCategoriasHabitaciones item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbCategoriasHabitaciones> List()
        {
            using var db = new SqlConnection(AsiloContext.ConnectionString);
            return db.Query<VW_tbCategoriasHabitaciones>(ScriptsDataBase.UDP_Lista_CategoriasHabitaciones, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCategoriasHabitaciones item)
        {
            throw new NotImplementedException();
        }
    }
}
