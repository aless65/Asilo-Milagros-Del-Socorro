using Asilo.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess.Repositories
{
    public class AgendasRepository : IRepository<tbAgendas, tbAgendas>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbAgendas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbAgendas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbAgendas> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbAgendas item)
        {
            throw new NotImplementedException();
        }
    }
}
