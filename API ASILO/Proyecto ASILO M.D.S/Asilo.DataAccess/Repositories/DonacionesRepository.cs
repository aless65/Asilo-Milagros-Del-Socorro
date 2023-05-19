using Asilo.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Asilo.DataAccess.Repositories
{
    public class DonacionesRepository : IRepository<tbDonaciones, tbDonaciones>
    {
        public RequestStatus Delete(int id)
        {
            throw new NotImplementedException();
        }

        public tbDonaciones Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbDonaciones item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbDonaciones> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbDonaciones item)
        {
            throw new NotImplementedException();
        }
    }
}
