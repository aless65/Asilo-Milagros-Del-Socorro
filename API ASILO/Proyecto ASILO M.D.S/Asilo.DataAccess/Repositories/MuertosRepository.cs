using Asilo.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess.Repositories
{
    public class MuertosRepository : IRepository<tbMuertos, tbMuertos>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbMuertos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbMuertos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbMuertos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbMuertos item)
        {
            throw new NotImplementedException();
        }
    }
}
